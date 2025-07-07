import { SignUp } from '@clerk/nextjs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, Brain, Star, Globe, Trophy, Rocket, Zap } from 'lucide-react';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-20 sm:pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[calc(100vh-6rem)] sm:min-h-[calc(100vh-7rem)]">
          {/* Left Side - Features */}
          <div className="hidden lg:flex lg:w-1/2 flex-col justify-center pr-8 xl:pr-12">
            <div className="max-w-lg">
              <div className="mb-8">
                <h1 className="text-4xl xl:text-5xl font-bold leading-tight mb-6">
                  Start your journey to the
                  <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                    {" "}perfect neighborhood
                  </span>
                </h1>
                <p className="text-lg text-gray-300">
                  Join thousands of happy residents who found their ideal home using our AI-powered matching platform.
                </p>
              </div>

              {/* Achievement badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                  <Trophy className="w-3 h-3 mr-1" />
                  #1 Neighborhood App
                </Badge>
                <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                  <Rocket className="w-3 h-3 mr-1" />
                  Featured by TechCrunch
                </Badge>
              </div>

              {/* Feature highlights */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-500/10 rounded-lg flex-shrink-0">
                    <Brain className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">AI-Powered Matching</h3>
                    <p className="text-sm text-gray-400">Advanced algorithms find neighborhoods that match your lifestyle perfectly</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-500/10 rounded-lg flex-shrink-0">
                    <Users className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Community Insights</h3>
                    <p className="text-sm text-gray-400">Real reviews and ratings from verified local residents</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-500/10 rounded-lg flex-shrink-0">
                    <Shield className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Privacy First</h3>
                    <p className="text-sm text-gray-400">Your data is protected with enterprise-grade security</p>
                  </div>
                </div>
              </div>

              {/* Success metrics */}
              <div className="mt-8 pt-6 border-t border-gray-800">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">10K+</div>
                    <div className="text-xs text-gray-400">Happy Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">98%</div>
                    <div className="text-xs text-gray-400">Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1 justify-center">
                      <span className="text-2xl font-bold text-white">4.9</span>
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    </div>
                    <div className="text-xs text-gray-400">App Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Sign Up Form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center py-8 lg:py-12">
            <div className="w-full max-w-md">
              {/* Mobile header info - visible on small screens only */}
              <div className="lg:hidden text-center mb-8">
                <h1 className="text-3xl font-bold mb-4">
                  Join 
                  <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                    {" "}NeighborFit
                  </span>
                </h1>
                <p className="text-gray-400 mb-6">
                  Start your journey to the perfect neighborhood
                </p>
                <div className="flex justify-center gap-4 mb-6">
                  <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                    <Trophy className="w-3 h-3 mr-1" />
                    #1 App
                  </Badge>
                  <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                    <Zap className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                </div>
              </div>

              <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 p-6 sm:p-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
                  <p className="text-gray-400">Join the NeighborFit community</p>
                </div>

                <SignUp 
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "bg-transparent shadow-none border-0",
                      headerTitle: "hidden",
                      headerSubtitle: "hidden",
                      formButtonPrimary: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 rounded-lg h-10 font-medium",
                      formFieldInput: "bg-zinc-800 border-zinc-700 text-white rounded-lg h-10 focus:border-blue-500 focus:ring-blue-500/20",
                      formFieldLabel: "text-gray-300 font-medium",
                      identityPreviewText: "text-gray-300",
                      formResendCodeLink: "text-blue-400 hover:text-blue-300",
                      footerActionLink: "text-blue-400 hover:text-blue-300",
                      otpCodeFieldInput: "bg-zinc-800 border-zinc-700 text-white focus:border-blue-500",
                      formFieldInputShowPasswordButton: "text-gray-400 hover:text-gray-300",
                      alert: "bg-red-900/50 border-red-800 text-red-200",
                      alertText: "text-red-200",
                      socialButtonsBlockButton: "bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700 transition-colors",
                      socialButtonsBlockButtonText: "text-white",
                      dividerLine: "bg-zinc-700",
                      dividerText: "text-gray-400",
                    }
                  }}
                />

                {/* Mobile features - visible on small screens */}
                <div className="lg:hidden mt-8 pt-6 border-t border-gray-800">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-white">10K+</div>
                      <div className="text-xs text-gray-400">Users</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">98%</div>
                      <div className="text-xs text-gray-400">Success</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-lg font-bold text-white">4.9</span>
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      </div>
                      <div className="text-xs text-gray-400">Rating</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Additional CTAs */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400 mb-4">
                  Already have an account?{' '}
                  <a href="/sign-in" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                    Sign in
                  </a>
                </p>
                
                <div className="text-xs text-gray-500 leading-relaxed">
                  By creating an account, you agree to our{' '}
                  <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Terms of Service</a>{' '}
                  and{' '}
                  <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Privacy Policy</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
