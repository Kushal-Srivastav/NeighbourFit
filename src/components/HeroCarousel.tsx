"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import icons

interface HeroCarouselProps {
  images: string[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ images }) => {
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free-snap",
    slides: { perView: 1 },
    drag: true,
  });

  return (
    <div className="relative w-full h-[350px] md:h-[700px] max-w-3xl mx-auto">
      <div ref={sliderRef} className="keen-slider rounded-2xl overflow-hidden shadow-2xl w-full h-full">
        {images.map((src, idx) => (
          <div className="keen-slider__slide flex items-center justify-center" key={idx}>
            <Image
              src={src}
              alt={`Neighborhood community ${idx + 1}`}
              fill
              className="object-cover"
              priority={idx === 0}
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {sliderRef.current && (
        <>
          <button
            onClick={() => sliderRef.current?.prev()}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-3 shadow-md hover:bg-opacity-75 transition-opacity focus:outline-none"
            aria-label="Previous slide"
          >
            <FaChevronLeft size={20} className="text-gray-800" />
          </button>
          <button
            onClick={() => sliderRef.current?.next()}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-3 shadow-md hover:bg-opacity-75 transition-opacity focus:outline-none"
            aria-label="Next slide"
          >
            <FaChevronRight size={20} className="text-gray-800" />
          </button>
        </>
      )}
    </div>
  );
};

export default HeroCarousel;