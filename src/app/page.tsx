import HeroSection from "@/components/hero-section";
import Banner from "@/components/ui/banner";

export default function Home() {
  return (
      <>
          <Banner title={"شروع مسیر تازه یادگیری"} description={"با آموزش های تخصصی قدم بعدی رو در زندگی و کار بردار "} linkAvailable={true} linkTitle="شروع یادگیری" link="/courses"/>
          <HeroSection/>
      </>
  );
}
