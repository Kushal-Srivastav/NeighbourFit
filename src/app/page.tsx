"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  MapPin, 
  GraduationCap, 
  DollarSign, 
  Clock, 
  Star, 
  Shield, 
  Users, 
  TrendingUp,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Home as HomeIcon,
  Heart,
  Award,
  Search,
  Zap,
  Globe,
  BarChart3,
  Brain,
  Target,
  ChevronRight,
  Quote
} from "lucide-react";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Animated Counter Component
function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: string; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (isInView) {
      const numericValue = parseInt(value.replace(/[^\d]/g, ''));
      let current = 0;
      const increment = numericValue / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  const formatValue = (num: number) => {
    if (value.includes('k')) return `${(num / 1000).toFixed(1)}k`;
    if (value.includes('/')) return `${(num / 10).toFixed(1)}/5`;
    if (value.includes('%')) return `${num}%`;
    return num.toString();
  };

  return (
    <span ref={ref} className="font-bold text-2xl sm:text-3xl">
      {prefix}{formatValue(count)}{suffix}
    </span>
  );
}

// Feature Card Component
function FeatureCard({ icon: Icon, title, description, delay }: {
  icon: any;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group cursor-pointer"
    >
      <Card className="h-full bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900/80 transition-all duration-300 p-1">
        <CardHeader className="text-center pb-4 sm:pb-2">
          <motion.div 
            className="mx-auto mb-3 sm:mb-4 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-500/20 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
          </motion.div>
          
          <CardTitle className="text-lg sm:text-xl text-white mb-2 sm:mb-3">{title}</CardTitle>
          <CardDescription className="text-zinc-400 leading-relaxed text-sm sm:text-base">
            {description}
          </CardDescription>
        </CardHeader>
      </Card>
    </motion.div>
  );
}

export default function HomePage() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  const handleGetStarted = useCallback(() => {
    if (isSignedIn) {
      router.push('/matching');
    } else {
      router.push('/sign-in/');
    }
  }, [isSignedIn, router]);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Matching",
      description: "Advanced algorithms analyze 1000+ data points to find neighborhoods that perfectly match your lifestyle and preferences."
    },
    {
      icon: Shield,
      title: "Verified Community Data",
      description: "Real-time safety scores, crime statistics, and community insights from verified residents and local authorities."
    },
    {
      icon: TrendingUp,
      title: "Market Intelligence",
      description: "Live market trends, property values, investment potential, and future development insights for informed decisions."
    }
  ];

  const stats = [
    { icon: Globe, value: "50k+", label: "Cities Covered" },
    { icon: Users, value: "100k+", label: "Happy Users" },
    { icon: Star, value: "4.9/5", label: "User Rating" },
    { icon: Award, value: "99%", label: "Success Rate" }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechCorp",
      content: "NeighborFit completely transformed our home search. The AI recommendations were incredibly accurate, and we found our dream neighborhood in just 2 weeks.",
      avatar: "SC",
      rating: 5,
      location: "San Francisco, CA"
    },
    {
      name: "Marcus Johnson",
      role: "Software Engineer", 
      company: "StartupXYZ",
      content: "The detailed community insights and safety data gave us confidence in our decision. Best investment we've ever made for our family's future.",
      avatar: "MJ",
      rating: 5,
      location: "Austin, TX"
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      company: "Growth Inc",
      content: "From school ratings to commute times, everything was perfectly analyzed. NeighborFit saved us months of research and uncertainty.",
      avatar: "ER",
      rating: 5,
      location: "Seattle, WA"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent" />
        
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp}>
              <Badge 
                variant="outline" 
                className="mb-6 sm:mb-8 px-3 sm:px-4 py-2 text-xs sm:text-sm bg-zinc-900/80 border-zinc-700 text-zinc-300"
              >
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-blue-500" />
                AI-Powered Neighborhood Discovery
              </Badge>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight"
            >
              Find Your
              <motion.span 
                className="block text-gradient"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                Perfect Home
              </motion.span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-lg sm:text-xl md:text-2xl text-zinc-400 mb-8 sm:mb-10 leading-relaxed max-w-3xl mx-auto px-4 sm:px-0"
            >
              Discover neighborhoods that match your lifestyle with AI-powered insights, 
              real-time data, and community-verified reviews from actual residents.
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 px-4 sm:px-0"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  onClick={handleGetStarted}
                  className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <Search className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Start Finding Now
                  <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/find">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 border-zinc-700 text-zinc-300 hover:bg-zinc-900 hover:text-white"
                  >
                    <MapPin className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Explore Demo
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust indicators */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-zinc-500 px-4 sm:px-0"
            >
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                <span>100% Free to Use</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500 flex-shrink-0" />
                <span>Privacy Protected</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 flex-shrink-0" />
                <span>10,000+ Happy Users</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div 
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 mx-auto mb-3 sm:mb-4" />
                  <div className="text-white mb-1 sm:mb-2">
                    <AnimatedCounter value={stat.value} />
            </div>
                  <p className="text-zinc-400 text-xs sm:text-sm">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
              </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white">
              Why Choose NeighborFit?
            </h2>
            <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed">
              Our platform combines cutting-edge AI technology with real community data 
              to help you make the most informed decision about your future home.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white">
              How It Works
            </h2>
            <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed">
              Three simple steps to find your perfect neighborhood
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-8">
            {[
              {
                step: "01",
                title: "Share Your Preferences",
                description: "Tell us about your lifestyle, budget, and priorities. Our AI analyzes your unique needs."
              },
              {
                step: "02", 
                title: "Get AI Recommendations",
                description: "Receive personalized neighborhood matches based on 1000+ data points and community insights."
              },
              {
                step: "03",
                title: "Explore & Decide",
                description: "Dive deep into each recommendation with detailed analytics, reviews, and market data."
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                className="text-center sm:text-left lg:text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto sm:mx-0 lg:mx-auto mb-4 sm:mb-6">
                  <span className="text-lg sm:text-2xl font-bold text-blue-500">{step.step}</span>
          </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-white">{step.title}</h3>
                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white">
              What Our Users Say
            </h2>
            <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed">
              Join thousands of families who found their perfect neighborhood
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900/70 transition-colors">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-1 mb-3 sm:mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-500 text-yellow-500" />
                      ))}
          </div>
                    <Quote className="h-5 w-5 sm:h-6 sm:w-6 text-zinc-600 mb-2" />
                    <CardDescription className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                      "{testimonial.content}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs sm:text-sm font-semibold text-blue-500">
                          {testimonial.avatar}
                        </span>
                  </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-white text-sm sm:text-base truncate">{testimonial.name}</p>
                        <p className="text-xs sm:text-sm text-zinc-400 truncate">
                          {testimonial.role} • {testimonial.location}
                        </p>
                  </div>
                </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white">
              Ready to Find Your Perfect Neighborhood?
            </h2>
            <p className="text-lg sm:text-xl text-zinc-400 mb-8 sm:mb-10 leading-relaxed">
              Join thousands of families who've discovered their ideal home with NeighborFit's AI-powered platform.
            </p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                size="lg" 
                onClick={handleGetStarted}
                className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Search className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Start Your Search Today
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </motion.div>
            
            <p className="text-xs sm:text-sm text-zinc-500 mt-4 sm:mt-6">
              100% free to use • No credit card required • Get results in minutes
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
