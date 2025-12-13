import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Loader2, Plus, Briefcase, TrendingUp, ArrowRight, Check, Zap, Target, Rocket, DollarSign, Clock, Shield } from "lucide-react";
import { FeatureCard } from "@/components/FeatureCard";
import { StrategyGenerationAnimation } from "@/components/StrategyGenerationAnimation";
import { StrategySampleModal } from "@/components/StrategySampleModal";
import { Link } from "wouter";

export default function Home() {
  const { user, loading, isAuthenticated } = useAuth();
  const { data: projects, isLoading: projectsLoading } = trpc.projects.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Navigation */}
        <nav className="border-b border-white/10 backdrop-blur-sm bg-black/50 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/taptico-logo-white.png" alt="Taptico AI" className="h-10" />
            </div>
            <div className="flex items-center gap-6">
              <Link href="/pricing">
                <a className="text-sm hover:text-blue-400 transition-colors">Pricing</a>
              </Link>
              <Button asChild variant="outline" className="border-white/20 hover:bg-white/10">
                <a href={getLoginUrl()}>Sign In</a>
              </Button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative overflow-hidden">
          {/* Animated background grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a10_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a10_1px,transparent_1px)] bg-[size:4rem_4rem] animate-gradient" />
          
          {/* Strategy Generation Animation Background */}
          <StrategyGenerationAnimation />
          
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black" />
          
          {/* Animated gradient orbs */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${3 + Math.random() * 5}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            ))}
          </div>
          
          <div className="container relative mx-auto px-4 py-32 md:py-40">
            <div className="max-w-5xl mx-auto text-center space-y-8">
              {/* Main headline */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium hover:bg-blue-500/20 hover:scale-105 transition-all duration-300 animate-fade-in-up">
                  <Zap className="w-4 h-4 animate-pulse" />
                  Get Expert Marketing Strategy in Minutes
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 animate-gradient-text">AI Marketing</span>
                  <br />
                  Expert
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  Get the same marketing strategy a $250,000 CMO would create—for less than your monthly coffee budget.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <Button 
                  size="lg" 
                  asChild 
                  className="text-lg px-10 py-7 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 group"
                >
                  <a href={getLoginUrl()}>
                    Start Free <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Link href="/pricing">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-lg px-10 py-7 border-white/20 hover:bg-white/5 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105 rounded-xl transition-all duration-300"
                  >
                    See Pricing
                  </Button>
                </Link>
              </div>

              {/* Strategy Sample Link */}
              <div className="pt-4">
                <StrategySampleModal 
                  trigger={
                    <button className="text-blue-400 hover:text-blue-300 underline underline-offset-4 text-sm font-medium transition-colors">
                      See Example Strategy →
                    </button>
                  }
                />
              </div>

              {/* Social proof */}
              <div className="flex items-center justify-center gap-8 pt-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  No credit card needed
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  Results in 5 minutes
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  Cancel anytime
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Value Props - Simple 3-column */}
        <div className="bg-gradient-to-b from-black to-gray-950 py-24 relative overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 animate-gradient" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <FeatureCard
                icon={<DollarSign className="w-8 h-8 text-blue-400" />}
                title="Save $249,000/Year"
                description="Skip the expensive CMO hire. Get the same expert strategy for pennies on the dollar."
                index={0}
              />
              <FeatureCard
                icon={<Clock className="w-8 h-8 text-blue-400" />}
                title="Ready in 5 Minutes"
                description="No more waiting weeks for consultants. Get your complete strategy today."
                index={1}
              />
              <FeatureCard
                icon={<Target className="w-8 h-8 text-blue-400" />}
                title="Built for Your Business"
                description="Every strategy is custom-made for your specific business and goals."
                index={2}
              />
            </div>
          </div>
        </div>

        {/* How It Works - 3 Simple Steps */}
        <div className="bg-gray-950 py-24 relative overflow-hidden">
          {/* Animated gradient orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up">How It Works</h2>
              <p className="text-xl text-gray-400 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                Three simple steps to your marketing strategy
              </p>
            </div>

            <div className="max-w-5xl mx-auto space-y-16">
              {/* Step 1 */}
              <div className="grid md:grid-cols-2 gap-12 items-center group hover:scale-[1.02] transition-transform duration-500">
                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 font-bold animate-pulse-glow group-hover:scale-110 transition-transform duration-300">
                    1
                  </div>
                  <h3 className="text-3xl font-bold">Tell Us About Your Business</h3>
                  <p className="text-lg text-gray-400 leading-relaxed">
                    Answer a few simple questions about what you sell, who you sell to, and what you want to achieve. Takes less than 3 minutes.
                  </p>
                  <ul className="space-y-3 pt-4">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">What product or service do you offer?</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Who are your customers?</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">What's your main goal?</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-blue-500/10 to-transparent rounded-2xl p-8 border border-white/10 group-hover:border-blue-500/30 group-hover:shadow-xl group-hover:shadow-blue-500/10 transition-all duration-500">
                  <div className="bg-gray-900 rounded-xl p-6 space-y-4">
                    <div className="h-3 bg-gray-800 rounded w-3/4 group-hover:bg-gray-700 transition-colors"></div>
                    <div className="h-3 bg-gray-800 rounded w-1/2 group-hover:bg-gray-700 transition-colors"></div>
                    <div className="h-3 bg-blue-500/30 rounded w-2/3 group-hover:bg-blue-500/50 transition-colors"></div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="grid md:grid-cols-2 gap-12 items-center group hover:scale-[1.02] transition-transform duration-500">
                <div className="order-2 md:order-1 bg-gradient-to-br from-blue-500/10 to-transparent rounded-2xl p-8 border border-white/10 group-hover:border-blue-500/30 group-hover:shadow-xl group-hover:shadow-blue-500/10 transition-all duration-500">
                  <div className="bg-gray-900 rounded-xl p-6 space-y-3">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-blue-400 animate-pulse" />
                      <div className="h-2 bg-blue-500/50 rounded flex-1"></div>
                    </div>
                    <div className="h-2 bg-gray-800 rounded w-4/5"></div>
                    <div className="h-2 bg-gray-800 rounded w-3/5"></div>
                  </div>
                </div>
                <div className="order-1 md:order-2 space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 font-bold animate-pulse-glow group-hover:scale-110 transition-transform duration-300">
                    2
                  </div>
                  <h3 className="text-3xl font-bold">AI Creates Your Strategy</h3>
                  <p className="text-lg text-gray-400 leading-relaxed">
                    Our AI thinks like a top marketing expert. It analyzes your business and builds a complete strategy in minutes.
                  </p>
                  <ul className="space-y-3 pt-4">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">7 detailed strategy sections</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Step-by-step action plans</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Tool recommendations</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Step 3 */}
              <div className="grid md:grid-cols-2 gap-12 items-center group hover:scale-[1.02] transition-transform duration-500">
                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 font-bold animate-pulse-glow group-hover:scale-110 transition-transform duration-300">
                    3
                  </div>
                  <h3 className="text-3xl font-bold">Start Growing Your Business</h3>
                  <p className="text-lg text-gray-400 leading-relaxed">
                    Download your strategy, share it with your team, and start seeing results. Update it anytime as your business grows.
                  </p>
                  <ul className="space-y-3 pt-4">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Export as PDF or PowerPoint</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Share with your team</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Update whenever you need</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-blue-500/10 to-transparent rounded-2xl p-8 border border-white/10">
                  <div className="bg-gray-900 rounded-xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="h-3 bg-gray-800 rounded w-1/3"></div>
                      <Rocket className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="h-3 bg-gray-800 rounded w-full"></div>
                    <div className="h-3 bg-gray-800 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-b from-gray-950 to-black py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold">
                Ready to Grow Your Business?
              </h2>
              <p className="text-xl text-gray-400">
                Join hundreds of smart business owners using Taptico AI
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Button 
                  size="lg" 
                  asChild 
                  className="text-lg px-10 py-7 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/20"
                >
                  <a href={getLoginUrl()}>
                    Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                No credit card required • 7-day money-back guarantee
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-black py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <img src="/taptico-logo-white.png" alt="Taptico" className="h-8" />
              </div>
              <div className="text-sm text-gray-500">
                © 2025 Taptico Solutions, LLC. All rights reserved.
              </div>
              <div className="text-sm text-gray-500">
                Contact: <a href="tel:770-363-2160" className="hover:text-blue-400">770-363-2160</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Authenticated view (existing dashboard)
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/taptico-logo.png" alt="Taptico" className="h-10" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.name || user?.email}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                trpc.auth.logout.useMutation().mutate();
                window.location.href = "/";
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Your Projects</h1>
              <p className="text-muted-foreground">
                Create and manage marketing strategies for your businesses
              </p>
            </div>
            <Link href="/new-project">
              <Button size="lg" className="gap-2">
                <Plus className="h-5 w-5" />
                New Project
              </Button>
            </Link>
          </div>

          {projectsLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : projects && projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Link key={project.id} href={`/project/${project.id}`}>
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{project.businessName}</CardTitle>
                          <CardDescription className="text-sm">{project.industry}</CardDescription>
                        </div>
                        <Briefcase className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Target className="h-4 w-4" />
                          <span>Goal: {project.growthGoal}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Updated {new Date(project.updatedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <Briefcase className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
                <p className="text-muted-foreground mb-6">
                  Create your first marketing strategy project to get started
                </p>
                <Link href="/new-project">
                  <Button size="lg">
                    <Plus className="h-5 w-5 mr-2" />
                    Create Your First Project
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
