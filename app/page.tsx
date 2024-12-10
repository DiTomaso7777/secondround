import FetchStock from "./components/FetchStock";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
   <div>
            <HeroSection />
            <FetchStock />
            <Footer />
   </div>
  );
}