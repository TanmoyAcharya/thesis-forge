import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import FieldCards from "@/components/FieldCards";
import Testimonials from "@/components/Testimonials";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      <FieldCards />
      <Testimonials />
      <PricingSection />
      <Footer />
    </main>
  );
}
