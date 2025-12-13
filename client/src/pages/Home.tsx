import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Loader2, Plus, Briefcase, TrendingUp, ArrowRight, Check, Edit, RefreshCw, Info, Download, Share2 } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { user, loading, isAuthenticated } = useAuth();
  const { data: projects, isLoading: projectsLoading } = trpc.projects.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <div className="mb-8">
                <img src="/taptico-logo.png" alt="Taptico" className="h-16 mx-auto mb-6" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                Your AI-Powered
                <span className="block text-gradient">Marketing Strategy Platform</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Generate elite, PhD-level marketing strategies in minutes with Taptico AI. Get defensible, actionable plans that drive real growth.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" asChild className="text-lg px-8 py-6">
                <a href={getLoginUrl()}>
                  Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                View Demo
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto">
            <Card className="card-shadow">
              <CardHeader>
                <Briefcase className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Strategic Diagnosis</CardTitle>
                <CardDescription>
                  First-principles thinking applied to your business. Identify bottlenecks and opportunities with precision.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-shadow">
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-accent mb-2" />
                <CardTitle>7 Core Modules</CardTitle>
                <CardDescription>
                  Complete marketing strategy from positioning to execution roadmap. Everything you need in one place.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-shadow">
              <CardHeader>
                <Plus className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Interactive Refinement</CardTitle>
                <CardDescription>
                  Edit, regenerate, and go deeper on any module. Your strategy evolves with your feedback.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* How It Works - Interactive Walkthrough */}
          <div className="mt-32 max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">How Taptico AI Works</h2>
              <p className="text-xl text-muted-foreground">
                From business input to comprehensive strategy in minutes
              </p>
            </div>

            <div className="space-y-24">
              {/* Step 1 */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 card-shadow-lg">
                    <div className="bg-card rounded-lg p-6 space-y-4">
                      <div className="flex items-center gap-3 pb-3 border-b">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <span className="text-xs text-muted-foreground ml-2">New Project</span>
                      </div>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <div className="text-xs font-medium text-muted-foreground">Business Name</div>
                          <div className="bg-muted/50 rounded px-3 py-2 text-sm">TaskFlow</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-xs font-medium text-muted-foreground">Industry</div>
                          <div className="bg-muted/50 rounded px-3 py-2 text-sm">SaaS - Project Management</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-xs font-medium text-muted-foreground">Target Customer</div>
                          <div className="bg-muted/50 rounded px-3 py-2 text-sm text-xs leading-relaxed">
                            Remote teams (10-50 people) frustrated with complex tools...
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl">
                      1
                    </div>
                    <h3 className="text-2xl font-bold">Share Your Business Details</h3>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Answer a few simple questions about your business, target customer, offer, and goals. Our AI uses this to understand your unique situation and challenges.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl">
                      2
                    </div>
                    <h3 className="text-2xl font-bold">AI Generates Your Strategy</h3>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Our multi-stage AI applies first-principles thinking and proven marketing frameworks to create a comprehensive strategy across 7 interconnected modules.
                  </p>
                </div>
                <div>
                  <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl p-8 card-shadow-lg">
                    <div className="bg-card rounded-lg p-6 space-y-3">
                      <div className="flex items-center gap-3">
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                        <span className="font-medium">Generating your strategy...</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Strategic diagnosis complete</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Market positioning defined</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Growth strategy mapped</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin text-primary" />
                          <span>Building funnel architecture...</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground/50">
                          <div className="h-4 w-4" />
                          <span>Content & messaging</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 card-shadow-lg">
                    <div className="bg-card rounded-lg p-6 space-y-4">
                      <div className="pb-3 border-b">
                        <h4 className="font-semibold flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-primary" />
                          Market Positioning
                        </h4>
                      </div>
                      <div className="text-sm leading-relaxed text-muted-foreground">
                        <p className="mb-3">
                          <strong className="text-foreground">Core Position:</strong> The async-first project management tool for remote teams who value deep work over constant meetings.
                        </p>
                        <p>
                          <strong className="text-foreground">Key Differentiator:</strong> Built-in async communication patterns that reduce meetings by 60%...
                        </p>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" className="text-xs">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs">
                          <RefreshCw className="h-3 w-3 mr-1" />
                          Regenerate
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs">
                          <Info className="h-3 w-3 mr-1" />
                          Go Deeper
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl">
                      3
                    </div>
                    <h3 className="text-2xl font-bold">Review & Refine</h3>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Explore your complete strategy across all 7 modules. Edit any section, ask the AI to go deeper on specific points, or regenerate modules with your feedback.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl">
                      4
                    </div>
                    <h3 className="text-2xl font-bold">Export & Execute</h3>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Download your strategy as a PDF, share it with your team via a secure link, or use it as your roadmap to drive real growth.
                  </p>
                </div>
                <div>
                  <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl p-8 card-shadow-lg">
                    <div className="bg-card rounded-lg p-6 space-y-4">
                      <h4 className="font-semibold">Export Options</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent/5 transition-colors cursor-pointer">
                          <Download className="h-5 w-5 text-primary" />
                          <div>
                            <div className="font-medium text-sm">Export as PDF</div>
                            <div className="text-xs text-muted-foreground">Download formatted document</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent/5 transition-colors cursor-pointer">
                          <Share2 className="h-5 w-5 text-primary" />
                          <div>
                            <div className="font-medium text-sm">Create Shareable Link</div>
                            <div className="text-xs text-muted-foreground">Share with your team</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-20">
              <h3 className="text-3xl font-bold mb-4">Ready to build your strategy?</h3>
              <p className="text-lg text-muted-foreground mb-8">Join businesses using Taptico AI to drive growth</p>
              <Button size="lg" asChild className="text-lg px-8 py-6">
                <a href={getLoginUrl()}>
                  Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/taptico-logo.png" alt="Taptico" className="h-10" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {user?.name || user?.email}
            </span>
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">Your Projects</h2>
              <p className="text-muted-foreground mt-1">
                Create and manage marketing strategies for your businesses
              </p>
            </div>
            <Link href="/projects/new">
              <Button size="lg" className="gap-2">
                <Plus className="h-5 w-5" />
                New Project
              </Button>
            </Link>
          </div>

          {/* Projects Grid */}
          {projectsLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : projects && projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Link key={project.id} href={`/projects/${project.id}`}>
                  <Card className="card-shadow hover:card-shadow-lg transition-all cursor-pointer h-full">
                    <CardHeader>
                      <CardTitle className="flex items-start justify-between">
                        <span className="line-clamp-1">{project.businessName}</span>
                        <Briefcase className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {project.industry}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium">Goal:</span> {project.growthGoal}
                        </div>
                        <div className="text-xs">
                          Updated {new Date(project.updatedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card className="card-shadow">
              <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                <Briefcase className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Create your first project to generate a comprehensive marketing strategy powered by AI.
                </p>
                <Link href="/projects/new">
                  <Button size="lg" className="gap-2">
                    <Plus className="h-5 w-5" />
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
