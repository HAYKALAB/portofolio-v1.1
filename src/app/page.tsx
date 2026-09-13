import HeroSection from "@/components/hero";
import Navbar from "@/components/navbar";
import InteractiveRocket from "@/components/angkasa/rocket";
import AboutSection from "@/components/AboutSection";
import StudySection from "@/components/StudySection";
import CertificateSection from "@/components/certifikat";
import ContactSection from "@/components/contact";
import FutureSection from "@/components/footere";

export default function Home() {
  return (
    <>
   
      <HeroSection />
      <Navbar />
      <InteractiveRocket />
      <AboutSection />
      <StudySection/>
      <CertificateSection />
      <ContactSection />
      <FutureSection />
    </>
  );
}
