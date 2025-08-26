"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { cornerIcon } from "@/icons/cornerIcon";

const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slideData = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      title: "Discover Amazing Destinations",
      description: "Explore the world with our exclusive travel packages and create unforgettable memories.",
      cta: "Explore Now",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
      title: "Adventure Awaits You",
      description: "From mountain peaks to ocean depths, find your next great adventure with us.",
      cta: "Start Adventure",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      title: "Nature's Beauty Unleashed",
      description: "Experience the breathtaking beauty of nature in its purest form.",
      cta: "Discover Nature",
    },
  ];

  return (
    <div className="relative h-[650] w-full overflow-hidden">
      {/* Image Slider */}
      <div className="absolute inset-0 z-0">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          effect={"fade"}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, EffectFade, Navigation, Pagination]}
          pagination={{ clickable: true }}
          onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
          className="h-full w-full"
        >
          {slideData.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div
                className="relative h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Gradient Overlay - from bottom to middle */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
          }}
        />
      </div>

      {/* Content Section */}
      <div className="relative z-10 flex h-full w-full items-center justify-center px-4 pt-16">
        <div className="container flex items-center justify-between">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-6 text-white animate-slideInRight" key={activeSlide}>
            <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">{slideData[activeSlide].title}</h1>
            <p className="text-lg md:text-xl">{slideData[activeSlide].description}</p>
            <button className="w-fit rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition-all hover:bg-blue-700">
              {slideData[activeSlide].cta}
            </button>
          </div>

          {/* Right Form */}
          <div className="hidden items-center justify-center p-2 backdrop-blur-2xl rounded-2xl lg:flex">
            <div className="w-full min-w-[450px] rounded-2xl bg-white p-6">
              <h2 className="mb-6 text-2xl font-bold text-gray-800">Get Started</h2>
              <form className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Your Name</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition-all hover:bg-blue-700"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="container relative hidden lg:block">
        <div className="absolute left-0 -bottom-[15px]">{cornerIcon()}</div>
        <div className="absolute left-10 bottom-0 bg-white py-4 px-8 rounded-t-[30px] flex items-center gap-4">
          <div className="scroll-down-item flex flex-col items-center space-y-2">
            {/* Mousey Container */}
            <div className="relative float-left w-[22px] h-[34px] rounded-[10px] px-[6px] border border-[#ddd] bg-[#f9f9f9] shadow-[0_10px_12px_0_rgba(0,0,0,0.07)]">
              {/* Scroller */}
              <div className="absolute left-1/2 top-[6px] -ml-[2px] w-[4px] h-[4px] rounded-full bg-secondary animate-scroll"></div>
              {/* Vertical line */}
              <div className="absolute right-1/2 bottom-0 w-[1px] h-[10px] bg-[#ddd]"></div>
            </div>
          </div>

          <p className="text-xs font-normal">scroll Down To Discover</p>
        </div>
        <div className="absolute left-[260px] -bottom-3 rotate-90">{cornerIcon()}</div>
      </div>
    </div>
  );
};

export default HeroSection;
6;
