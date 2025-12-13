import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Loader2, Plus, Briefcase, TrendingUp, ArrowRight } from "lucide-react";
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
