import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";

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
    <>
      <main className="flex flex-col md:flex-row items-center justify-center min-h-[80vh] w-full px-6 md:px-16 py-12 gap-12" style={{ background: "linear-gradient(135deg, #f5f5f4 0%, #e7e5e4 100%)" }}>
        {/* Left: Image */}
        <div className="flex-1 flex items-center justify-center w-full h-full min-h-[400px] md:min-h-[600px]">
          <div className="relative w-full h-[350px] md:h-[600px] max-w-[500px]">
            <Image
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
              alt="Neighborhood community"
              fill
              className="object-cover"
              priority
            />
          </div>
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

      {/* New To NeighborFit Section with Features - Background image */}
      <section
        className="w-full flex flex-col md:flex-row justify-center items-stretch py-16 px-4 md:px-0 gap-12 md:gap-24 relative overflow-hidden"
        style={{ minHeight: 400 }}
      >
        {/* Background image and overlay */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/photo-1578163883439-fe475746b7a7.avif"
            alt="Houses in a neighborhood"
            fill
            className="object-cover w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-100 to-stone-200 opacity-50" />
        </div>
        <div className="flex-1 flex flex-col justify-center items-start max-w-md mx-auto md:mx-0 p-0 mb-8 md:mb-0" data-aos="fade-right">
          <span className="text-2xl font-bold mb-4 text-stone-700">New To NeighborFit?</span>
          <p className="text-gray-800 mb-6">Discover your ideal living space with NeighborFit. Sign up to get personalized neighborhood recommendations, access detailed area reviews, and find valuable resources for making your next move.</p>
          <a href="/signup" className="px-6 py-3 bg-stone-700 text-white rounded-full font-semibold shadow hover:bg-stone-800 transition-colors text-lg mb-2">Create Your Account</a>
        </div>
        <div className="flex-1 flex flex-col justify-center items-start max-w-xl mx-auto md:mx-0 p-0" data-aos="fade-left">
          <h2 className="text-xl font-bold mb-4 text-stone-700">What NeighborFit Provides:</h2>
          <ul className="space-y-4 text-gray-800">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-center text-gray-800 text-lg">
                <FaCheckCircle className="mr-3 text-stone-700" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Third Section: Why Choose NeighborFit */}
      <section className="w-full py-16 px-4 md:px-8 bg-stone-100" data-aos="fade-left">
        <div className="container mx-auto text-center max-w-4xl text-gray-800">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-12">
            Discover Your Dream Neighborhood. <span className="text-stone-700">Without the Headache.</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 md:gap-8 text-left">
            {/* Column 1: No extra work */}
            <div className="p-0">
              <h3 className="text-xl font-bold mb-3 text-stone-700">Effortless Research</h3>
              <p className="text-gray-800">
                Forget countless hours sifting through websites. We aggregate all the vital data – safety scores, school quality, market trends, and more – into one intuitive platform. Your neighborhood research is now a breeze.
              </p>
            </div>

            {/* Column 2: All in One Place */}
            <div className="p-0">
              <h3 className="text-xl font-bold mb-3 text-stone-700">Authentic Local Insights</h3>
              <p className="text-gray-800">
                Beyond the stats, hear from the heart of the community. Dive into authentic, resident-written reviews that reveal the true vibe and hidden gems of any neighborhood. Get the inside story, all in one place.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
