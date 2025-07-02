


import Image from "next/image";
import { FaMapMarkerAlt, FaGraduationCap, FaDollarSign, FaClock } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const heroImages = [
  "/images/neighborhood_pic2.avif",
  "/images/neighborhood_pic3.avif",
  "/images/neighborhood_pic4.avif",
];

const features = [
  "Personalized neighborhood matching",
  "Area reviews and ratings",
  "Neighborhood rankings",
  "Home buying tips and resources",
  "Data-driven recommendations",
  "User account for saving preferences"
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-90"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
              Find Your Perfect Neighborhood
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Discover the perfect place to call home based on your lifestyle, budget, and needs
            </p>
            <Link href="/matching">
              <Button className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 text-lg">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose NeighborFit</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We help you find the perfect neighborhood that fits your lifestyle and budget
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                <FaMapMarkerAlt className="text-3xl text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Location Analysis</h3>
              <p className="text-gray-600">
                Detailed neighborhood insights including safety scores, commute times, and local amenities
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                <FaGraduationCap className="text-3xl text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">School Ratings</h3>
              <p className="text-gray-600">
                Comprehensive school district information and ratings for every neighborhood
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                <FaDollarSign className="text-3xl text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Market Insights</h3>
              <p className="text-gray-600">
                Real estate market trends, price ranges, and investment opportunities
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                <FaClock className="text-3xl text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quick Results</h3>
              <p className="text-gray-600">
                Get personalized neighborhood recommendations in minutes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple steps to find your perfect neighborhood
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-6">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Set Your Preferences</h3>
              <p className="text-gray-600">
                Tell us about your ideal neighborhood - budget, commute time, amenities, and more
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-6">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Recommendations</h3>
              <p className="text-gray-600">
                Our algorithm matches you with neighborhoods that fit your lifestyle and needs
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-6">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Explore & Decide</h3>
              <p className="text-gray-600">
                View detailed neighborhood profiles, read resident reviews, and make an informed decision
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Real Resident Reviews</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from people who live in these neighborhoods
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center text-white">
                    <span className="font-bold text-2xl">J</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">John D.</h3>
                  <p className="text-gray-600 mb-4">
                    "The neighborhood is safe, friendly, and has great schools. Perfect for families."
                  </p>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                    <span className="text-sm text-gray-500">5.0</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center text-white">
                    <span className="font-bold text-2xl">M</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Mary S.</h3>
                  <p className="text-gray-600 mb-4">
                    "Perfect location for young professionals. Great restaurants and nightlife."
                  </p>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">⭐⭐⭐⭐</span>
                    <span className="text-sm text-gray-500">4.5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 md:gap-8 text-left">
            {/* Column 1: No extra work */}
            <div className="p-0">
              <h3 className="text-xl font-bold mb-3 text-stone-200">Effortless Research</h3>
              <p className="text-gray-100">
                Forget countless hours sifting through websites. We aggregate all the vital data – safety scores, school quality, market trends, and more – into one intuitive platform. Your neighborhood research is now a breeze.
              </p>
            </div>

            {/* Column 2: All in One Place */}
            <div className="p-0">
              <h3 className="text-xl font-bold mb-3 text-stone-200">Authentic Local Insights</h3>
              <p className="text-gray-100">
                Beyond the stats, hear from the heart of the community. Dive into authentic, resident-written reviews that reveal the true vibe and hidden gems of any neighborhood. Get the inside story, all in one place.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
