"use client";
import React from "react";
import HeroCarousel from "./HeroCarousel";

const heroImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
  "/images/neighborhood_pic2.avif",
  "/images/neighborhood_pic3.avif",
  "/images/neighborhood_pic4.avif",
];

const HeroSection = () => (
  <main className="flex flex-col md:flex-row items-center justify-center min-h-[80vh] w-full px-2 md:px-16 py-12 gap-12" style={{ background: "linear-gradient(135deg, #f5f5f4 0%, #e7e5e4 100%)" }}>
    {/* Left: Carousel */}
    <div className="flex-1 flex items-center justify-center w-full h-full min-h-[400px] md:min-h-[700px]">
      <HeroCarousel images={heroImages} />
    </div>
    {/* Right: Description */}
    <div className="flex-1 flex flex-col items-start justify-center w-full max-w-xl p-0">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-stone-700">
        Find Your Perfect Neighborhood
      </h1>
      <p className="text-lg md:text-xl text-gray-800 mb-8">
        NeighborFit helps you discover, compare, and choose the best places to live based on your lifestyle, preferences, and real neighborhood data. Explore rankings, reviews, and expert tips to make confident home decisions.
      </p>
      <div className="flex gap-4 flex-wrap">
        <a href="/find" className="px-6 py-3 bg-stone-700 text-white rounded-full font-semibold hover:bg-stone-800 transition-colors">Find Places to Live</a>
        <a href="/review" className="px-6 py-3 border border-stone-700 text-stone-700 rounded-full font-semibold hover:bg-stone-700 hover:text-white transition-colors">Review Your Area</a>
      </div>
    </div>
  </main>
);

export default HeroSection; 