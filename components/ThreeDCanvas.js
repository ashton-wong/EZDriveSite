import React, { useEffect, useRef, useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, Environment, ContactShadows, Html } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import StickyTextReveal from './StickyTextReveal'

gsap.registerPlugin(ScrollTrigger)

function PhoneModel({ modelPath, flipped }) {
  const [hasModel, setHasModel] = useState(null)

  useEffect(() => {
    let cancelled = false
    if (!modelPath) {
      setHasModel(false)
      return
    }
    // check that the model file is available before attempting to load with useGLTF
    fetch(modelPath, { method: 'HEAD' })
      .then(res => {
        if (cancelled) return
        setHasModel(res.ok)
      })
      .catch(() => {
        if (cancelled) return
        setHasModel(false)
      })

    return () => {
      cancelled = true
    }
  }, [modelPath])

  // GLTF renderer separated to keep hooks stable
  function GLTFRenderer({ path, flipped }) {
    const ref = useRef()
    const gltf = useGLTF(path)
    const [screenTransform, setScreenTransform] = useState({ pos: [0, 0, 0], rot: [0, 0, 0] })

    useEffect(() => {
      if (!gltf || !gltf.scene) return
      // enable shadows and set material defaults
      gltf.scene.traverse(node => {
        if (node.isMesh) {
          node.castShadow = true
          node.receiveShadow = true
          if (node.material) {
            node.material.metalness = node.material.metalness ?? 0.2
            node.material.roughness = node.material.roughness ?? 0.4
          }
        }
      })

      // find mesh index 14 (0-based) among scene meshes
      const meshes = []
      gltf.scene.traverse(n => n.isMesh && meshes.push(n))
      const screenMesh = meshes[14]
      if (screenMesh) {
        // ensure world matrices are updated
        gltf.scene.updateWorldMatrix(true, true)
        const worldPos = new THREE.Vector3()
        const worldQuat = new THREE.Quaternion()
        screenMesh.getWorldPosition(worldPos)
        screenMesh.getWorldQuaternion(worldQuat)

        // convert world position to gltf.scene local coordinates
        const localPos = gltf.scene.worldToLocal(worldPos.clone())

        // compute local rotation relative to scene
        const sceneWorldQuat = new THREE.Quaternion()
        gltf.scene.getWorldQuaternion(sceneWorldQuat)
        const inv = sceneWorldQuat.clone().invert()
        const localQuat = worldQuat.clone().multiply(inv)
        const euler = new THREE.Euler().setFromQuaternion(localQuat)

        setScreenTransform({ pos: [localPos.x, localPos.y, localPos.z], rot: [euler.x, euler.y, euler.z] })
      }
    }, [gltf])

    return (
      <group>
        <primitive ref={ref} object={gltf.scene} dispose={null} />

        {/* attach Html at computed screen transform (local to gltf.scene) */}
        <Html transform position={screenTransform.pos} rotation={screenTransform.rot} scale={0.008} center occlude>
          <div className="w-[320px] h-[650px] rounded-2xl overflow-hidden shadow-md bg-white">
            {!flipped ? (
              <div className="w-full h-full bg-white flex items-center justify-center">
                <img src="/images/ezdrive-iphone-image.png" alt="EZDrive" className="w-2/3 h-2/3 object-contain" />
              </div>
            ) : (
              <div className="w-full h-full bg-white flex items-center justify-center">
                <img src="/images/ezdrive-logo.png" alt="EZDrive" className="w-2/3 h-2/3 object-contain" />
              </div>
            )}
          </div>
        </Html>
      </group>
    )
  }

  if (hasModel === null) {
    // still checking — render nothing so the Canvas shows while we probe
    return null
  }

  if (!hasModel) {
    console.warn('Phone model not found at', modelPath, '- rendering fallback mesh. To use a real model, place it at public/models/iPhone17Pro.glb and set modelPath accordingly.')
    return (
      <group>
        <mesh position={[0, 0, 0]}> 
          <boxGeometry args={[1.6, 3.2, 0.12]} />
          <meshStandardMaterial color="#0b1220" metalness={0.1} roughness={0.6} />
        </mesh>
      </group>
    )
  }

  return <GLTFRenderer path={modelPath} />
}

export default function ThreeDCanvas({ modelPath = '../models/phone.glb', disableScroll = false }) {
  const containerRef = useRef(null)
  const groupRef = useRef(null)
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    let ctx
    const initWhenReady = () => {
      if (!groupRef.current || !containerRef.current) {
        requestAnimationFrame(initWhenReady)
        return
      }

      ctx = gsap.context(() => {
        const computeTargetX = () => {
          const cameraZ = 3.5 // matches Canvas camera prop
          const fov = 45 // matches Canvas fov
          const depth = cameraZ - (groupRef.current?.position?.z ?? 0)
          const halfHeight = depth * Math.tan((fov * Math.PI) / 180 / 2)
          const aspect = window.innerWidth / window.innerHeight
          const halfWidth = halfHeight * aspect
          const targetNDC = -2 / 3 // center of left third -> NDC x = -2/3
          return targetNDC * halfWidth
        }

        // ensure group starts at a responsive x (start centered)
        if (groupRef.current) {
          groupRef.current.position.x = 0
        }

        const handleResize = () => {
          if (!groupRef.current) return
          const newX = computeTargetX()
          // if in standalone mode, animate to computed left-third on resize
          if (!disableScroll) {
            gsap.to(groupRef.current.position, { x: newX, duration: 0.35, ease: 'power1.out' })
          }
        }

        window.addEventListener('resize', handleResize)

        if (disableScroll) {
          // Expose a global callback to control flip progress from an external timeline
          const cb = (progress) => {
            if (!groupRef.current) return
            const fullRot = progress * Math.PI * 2
            gsap.to(groupRef.current.rotation, { y: fullRot, duration: 0.12, ease: 'none' })
            const targetX = computeTargetX()
            gsap.to(groupRef.current.position, { x: progress * targetX, duration: 0.12, ease: 'none' })

            // update flipped state
            const twoPi = Math.PI * 2
            const normalized = ((fullRot % twoPi) + twoPi) % twoPi
            const shouldBeFlipped = normalized >= Math.PI
            setFlipped(prev => (prev === shouldBeFlipped ? prev : shouldBeFlipped))
          }

          // set global callback
          window.__PHONE_FLIP_PROGRESS_CALLBACK__ = cb

          return () => {
            window.removeEventListener('resize', handleResize)
            if (window.__PHONE_FLIP_PROGRESS_CALLBACK__ === cb) delete window.__PHONE_FLIP_PROGRESS_CALLBACK__
          }
        }

        // Standalone behavior: create local ScrollTrigger timeline
        const extraPause = window.innerHeight // one viewport height pause after flip
        const scrollEnd = 1200 + extraPause

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: `+=${scrollEnd}`,
            scrub: 0.8,
            pin: true,
            anticipatePin: 1
          }
        })

        // Fade and subtly shift the flanking intro text as the phone begins to move.
        // Use scoped selector (gsap.context) so these target elements inside `containerRef`.
        tl.to('.hero-intro-text', { opacity: 0, duration: 0.5, ease: 'power1.out' }, 0)
        // shift left text slightly outward, right text outward to the right
        tl.to('.hero-intro-left', { x: -50, duration: 0.5, ease: 'power1.out' }, 0)
        tl.to('.hero-intro-right', { x: 50, duration: 0.5, ease: 'power1.out' }, 0)

        // rotate full 360 degrees while moving left (start together)
        // onUpdate checks rotation and toggles `flipped` when rotation crosses 180deg
        tl.to(
          groupRef.current.rotation,
          {
            y: `+=${Math.PI * 2}`,
            ease: 'none',
            duration: 1,
            onUpdate: () => {
              if (!groupRef.current) return
              const rawY = groupRef.current.rotation.y
              const twoPi = Math.PI * 2
              const normalized = ((rawY % twoPi) + twoPi) % twoPi
              const shouldBeFlipped = normalized >= Math.PI
              setFlipped(prev => (prev === shouldBeFlipped ? prev : shouldBeFlipped))
            }
          },
          0
        )
          .to(groupRef.current.position, { x: computeTargetX(), duration: 1, ease: 'none' }, 0)

        // add a label when flip completes
        tl.add('afterFlip', 1)

        // pause the timeline for one viewport height after the flip (keeps content pinned/visible)
        tl.to({}, { duration: extraPause / (scrollEnd || 1) * 1.0 }, 'afterFlip+=0.6')

        // Reveal the right-side text container once the flip completes, then initialize per-block rolodex ScrollTriggers
        const textEl = containerRef.current.querySelector('.rightText')
        if (textEl) {
          tl.fromTo(textEl, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power1.out' }, 'afterFlip')

          // Create the per-block ScrollTriggers only when the timeline reaches 'afterFlip'
          tl.add(() => {
            const blocks = containerRef.current.querySelectorAll('.rightText .reveal-block')
            if (!blocks || !blocks.length) return

            // set a dramatic baseline for inactive items (low opacity, small scale, rotated and blurred, positioned below)
            blocks.forEach(b => gsap.set(b, { opacity: 0.1, scale: 0.75, rotationX: 45, filter: 'blur(8px)', yPercent: 40, transformOrigin: 'center center' }))

            // ensure first block is visible immediately after flip (centered)
            const first = blocks[0]
            if (first) gsap.set(first, { opacity: 1, scale: 1, rotationX: 0, filter: 'blur(0px)', yPercent: 0 })

            // attach a single scrubbed timeline per block: move up from bottom -> center -> leave upward
            blocks.forEach((block) => {
              const bt = gsap.timeline({
                scrollTrigger: {
                  trigger: block,
                  // start when block's bottom reaches bottom of viewport (so it comes up from below)
                  start: 'bottom bottom',
                  // make the scrub very long: 3x viewport height so transitions are slow and smooth
                  end: () => `+=${Math.round(window.innerHeight * 3)}`,
                  scrub: true
                }
              })

              // approach center: from below (yPercent positive) to centered
              bt.to(block, {
                yPercent: 0,
                opacity: 1,
                scale: 1,
                rotationX: 0,
                filter: 'blur(0px)',
                ease: 'power3.out',
                duration: 1.5
              })

              // leave center: continue upward (yPercent negative) and fade/blur
              bt.to(block, {
                yPercent: -40,
                opacity: 0.1,
                scale: 0.8,
                rotationX: 45,
                filter: 'blur(8px)',
                ease: 'power3.in',
                duration: 1.5
              })
            })
          }, 'afterFlip+=0.01')
        }

        return () => {
          window.removeEventListener('resize', handleResize)
          tl.scrollTrigger && tl.scrollTrigger.kill()
          tl.kill()
        }
      }, containerRef)
    }

    initWhenReady()

    return () => ctx && ctx.revert()
  }, [disableScroll])

        return (
      <div ref={containerRef} className={disableScroll ? 'w-full h-full relative overflow-visible z-10 bg-transparent' : 'w-full h-screen relative overflow-hidden z-10 bg-transparent'}>
        {/* Flanking hero intro text (visible before scroll begins). */}
        <div className="hero-intro-text hero-intro-left absolute left-8 md:left-24 top-1/2 -translate-y-1/2 text-6xl md:text-9xl font-bold tracking-tighter text-[#1d1d1f] z-20 pointer-events-none" style={{ left: '8.1667vw', fontSize: '100px', fontFamily: 'Inter, sans-serif' }}>
          EZDrive
        </div>
        <div
          className="hero-intro-text hero-intro-right absolute top-1/2 -translate-y-1/2 z-20 pointer-events-none"
          style={{ left: '63.1667vw', width: '33.3333vw' }}
        >
          <div className="w-full h-full flex items-center justify-center px-4">
            <p className="text-center text-lg md:text-2xl lg:text-8xl font-medium tracking-tight text-[#86868b] break-words" style={{ fontSize: '40px', fontFamily: 'Inter, sans-serif' }}>
              Providing peace of mind to parents of young drivers
            </p>
          </div>
        </div>
        <Canvas className="absolute inset-0 w-full h-full block z-10 pointer-events-none" style={{ display: 'block', background: 'transparent' }} shadows camera={{ position: [0, 0, 3.5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
          {/* transparent background (removed solid color to allow page to show through) */}

        {/* lighting: soft ambient + directional key light + hemisphere for fill */}
        <ambientLight intensity={0.25} />
        <directionalLight
          castShadow
          position={[5, 8, 5]}
          intensity={1}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.5}
          shadow-camera-far={50}
        />
        <hemisphereLight skyColor={0xffffff} groundColor={0x444444} intensity={0.4} />

        <Suspense fallback={null}>
          <group ref={groupRef} scale={[16, 16, 16]} position={[0, -0.1, 0]}>
            <PhoneModel modelPath={modelPath} flipped={flipped} />

            {/* Html overlay anchored to the phone group - rotates/moves with the phone */}
            <Html
              transform
              position={[0, 0, 0.005]}
              rotation={[0, 0, 0]}
              scale={0.0092}
              center
              occlude
            >
              <div className="w-[320px] h-[650px] rounded-2xl overflow-hidden shadow-md">
                {!flipped ? (
                  <div className="w-full h-full bg-white flex items-center justify-center">
                    <img src="/images/ezdrive-iphone-image.png" alt="EZDrive" className="w-100/100 h-100/100 object-contain" />
                  </div>
                ) : (
                  <div className="w-full h-full bg-white flex items-center justify-center">
                    <img src="/images/ezdrive-logo.png" alt="EZDrive" className="w-100/100 h-100/100 object-contain" />
                  </div>
                )}
              </div>
            </Html>
          </group>

          {/* soft contact shadow beneath the phone */}
          <ContactShadows position={[0, -1.8, 0]} opacity={0.35} width={4} height={4} blur={2} far={1.8} />

          <Environment preset="studio" />
        </Suspense>
          {/* Right two-thirds text panel rendered inside the Canvas DOM using Html (fullscreen overlay) */}
          <Html fullscreen>
            <div className="absolute top-0 h-screen pointer-events-none z-50" style={{ left: '33.3333%', width: '66.6667%' }}>
              <div className="rightText h-full flex items-center justify-center px-12">
                <div className="max-w-2xl text-white pointer-events-auto">
                  <StickyTextReveal />
                </div>
              </div>
            </div>
          </Html>
        </Canvas>
    </div>
  )
}
