import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Benefits from "@/components/Benefits";
import Pricing from "@/components/Pricing";
import Compatibility from "@/components/Compatibility";
import PreorderForm from "@/components/PreorderForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Features />
      <Benefits />
      <Pricing />
      <Compatibility />
      <PreorderForm />
      <Footer />
    </main>
  );
}
