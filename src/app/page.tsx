import TopNavbar from "@/components/top-navbar";
import HeroSection from "@/components/hero-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
      <div className="flex flex-col w-full">
          <TopNavbar/>
          <HeroSection/>
          <Footer/>
      </div>
  );
}
