import TopNavbar from "@/components/top-navbar";
import HeroSection from "@/components/hero-section";
import Footer from "@/components/footer";
import Banner from "@/components/ui/banner";

export default function Home() {
  return (
      <div className="flex flex-col w-full">
          <TopNavbar/>
          <Banner/>
          <HeroSection/>
          <Footer/>
      </div>
  );
}
