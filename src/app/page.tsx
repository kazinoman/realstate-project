import Image from "next/image";
import Header from "../components/common/header";
import HeroSection from "@/components/sections/home/HeroSectionSlider";

export default function Home() {
  return (
    <div className="">
      <Header />

      <HeroSection />
    </div>
  );
}
