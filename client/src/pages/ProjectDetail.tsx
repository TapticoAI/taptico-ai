import { useState } from "react";
import { useLocation, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { Loader2, ArrowLeft, Sparkles, Edit, RefreshCw, Info, Trash2, ChevronDown, ChevronUp, Download, Share2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Streamdown } from "streamdown";

const MODULE_NAMES = {
  executiveBrief: "Executive CMO Brief",
  marketPositioning: "Market Positioning",
  growthStrategy: "Growth Strategy",
  funnelArchitecture: "Funnel Architecture",
  contentMessaging: "Content & Messaging",
  executionRoadmap: "Execution Roadmap",
  toolRecommendations: "Tool & AI Stack Recommendations",
};

type ModuleName = keyof typeof MODULE_NAMES;

export default function ProjectDetail() {
  const [, params] = useRoute("/projects/:id");
  const [, setLocation] = useLocation();
  const projectId = params?.id ? parseInt(params.id) : 0;

  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [editingModule, setEditingModule] = useState<ModuleName | null>(null);
  const [editContent, setEditContent] = useState("");
  const [regenerateModule, setRegenerateModule] = useState<ModuleName | null>(null);
  const [regenerateFeedback, setRegenerateFeedback] = useState("");
  const [deeperModule, setDeeperModule] = useState<ModuleName | null>(null);
  const [deeperExplanation, setDeeperExplanation] = useState("");
  const [showExportDialog, setShowExportDialog] = useState(false);

  const { data: project, isLoading: projectLoading } = trpc.projects.get.useQuery({ id: projectId });
  const { data: strategies, isLoading: strategiesLoading, refetch: refetchStrategies } = trpc.strategies.list.useQuery(
    { projectId },
    { enabled: !!project }
  );

  const latestStrategy = strategies?.[0];

  const generateStrategy = trpc.strategies.generate.useMutation({
    onSuccess: () => {
      toast.success("Strategy generated successfully!");
      refetchStrategies();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to generate strategy");
    },
  });

  const updateModule = trpc.strategies.updateModule.useMutation({
    onSuccess: () => {
      toast.success("Module updated successfully!");
      refetchStrategies();
      setEditingModule(null);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update module");
    },
  });

  const regenerateMutation = trpc.strategies.regenerate.useMutation({
    onSuccess: () => {
      toast.success("Module regenerated successfully!");
      refetchStrategies();
      setRegenerateModule(null);
      setRegenerateFeedback("");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to regenerate module");
    },
  });

  const goDeeperMutation = trpc.strategies.goDeeper.useMutation({
    onSuccess: (data) => {
      setDeeperExplanation(data.explanation);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to get deeper explanation");
    },
  });

  const deleteProject = trpc.projects.delete.useMutation({
    onSuccess: () => {
      toast.success("Project deleted successfully!");
      setLocation("/");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete project");
    },
  });

  const createExport = trpc.exports.create.useMutation({
    onSuccess: (data) => {
      if (data.format === "pdf" && data.fileUrl) {
        window.open(data.fileUrl, "_blank");
        toast.success("PDF exported successfully!");
      } else if (data.format === "link" && data.shareToken) {
        const shareUrl = `${window.location.origin}/share/${data.shareToken}`;
        navigator.clipboard.writeText(shareUrl);
        toast.success("Share link copied to clipboard!");
      }
      setShowExportDialog(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to export strategy");
    },
  });

  const toggleModule = (moduleName: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleName)) {
      newExpanded.delete(moduleName);
    } else {
      newExpanded.add(moduleName);
    }
    setExpandedModules(newExpanded);
  };

  const handleEdit = (moduleName: ModuleName, content: string) => {
    setEditingModule(moduleName);
    setEditContent(content);
  };

  const handleSaveEdit = () => {
    if (!latestStrategy || !editingModule) return;
    updateModule.mutate({
      strategyId: latestStrategy.id,
      moduleName: editingModule,
      content: editContent,
    });
  };

  const handleRegenerate = () => {
    if (!latestStrategy || !regenerateModule) return;
    const currentContent = latestStrategy[regenerateModule] || "";
    regenerateMutation.mutate({
      strategyId: latestStrategy.id,
      moduleName: regenerateModule,
      currentContent,
      feedback: regenerateFeedback,
    });
  };

  const handleGoDeeper = (moduleName: ModuleName, content: string) => {
    if (!latestStrategy) return;
    setDeeperModule(moduleName);
    setDeeperExplanation("");
    goDeeperMutation.mutate({
      strategyId: latestStrategy.id,
      moduleName: MODULE_NAMES[moduleName],
      currentContent: content,
    });
  };

  if (projectLoading || strategiesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Project not found</h2>
          <Button onClick={() => setLocation("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => setLocation("/")} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-bold">{project.businessName}</h1>
                <p className="text-sm text-muted-foreground">{project.industry}</p>
              </div>
            </div>
              <div className="flex items-center gap-2">
                {latestStrategy && latestStrategy.isComplete && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => setShowExportDialog(true)}
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                )}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this project?")) {
                      deleteProject.mutate({ id: projectId });
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Generate Strategy Section */}
          {!latestStrategy && (
            <Card className="card-shadow-lg border-primary/20">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Ready to Generate Your Strategy</CardTitle>
                <CardDescription className="text-base">
                  Our AI will analyze your business and create a comprehensive, PhD-level marketing strategy in minutes.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center pb-8">
                <Button
                  size="lg"
                  onClick={() => generateStrategy.mutate({ projectId })}
                  disabled={generateStrategy.isPending}
                  className="gap-2"
                >
                  {generateStrategy.isPending ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Generating Strategy...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      Generate Strategy
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Strategy Modules */}
          {latestStrategy && latestStrategy.isComplete && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Your Marketing Strategy</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => generateStrategy.mutate({ projectId })}
                  disabled={generateStrategy.isPending}
                  className="gap-2"
                >
                  {generateStrategy.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4" />
                      New Version
                    </>
                  )}
                </Button>
              </div>

              {(Object.keys(MODULE_NAMES) as ModuleName[]).map((moduleName) => {
                const content = latestStrategy[moduleName];
                if (!content) return null;

                const isExpanded = expandedModules.has(moduleName);

                return (
                  <Card key={moduleName} className="card-shadow">
                    <CardHeader className="cursor-pointer" onClick={() => toggleModule(moduleName)}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="flex items-center gap-2">
                            {MODULE_NAMES[moduleName]}
                            {isExpanded ? (
                              <ChevronUp className="h-5 w-5 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-muted-foreground" />
                            )}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>

                    {isExpanded && (
                      <CardContent className="space-y-4">
                        <div className="prose prose-sm max-w-none">
                          <Streamdown>{content}</Streamdown>
                        </div>

                        <div className="flex items-center gap-2 pt-4 border-t">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(moduleName, content)}
                            className="gap-2"
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setRegenerateModule(moduleName);
                              setRegenerateFeedback("");
                            }}
                            className="gap-2"
                          >
                            <RefreshCw className="h-4 w-4" />
                            Regenerate
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleGoDeeper(moduleName, content)}
                            className="gap-2"
                          >
                            <Info className="h-4 w-4" />
                            Go Deeper
                          </Button>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          )}

          {/* Loading State */}
          {latestStrategy && !latestStrategy.isComplete && (
            <Card className="card-shadow">
              <CardContent className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Generating Your Strategy</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  Our AI is analyzing your business and applying first-principles thinking to create a comprehensive marketing strategy. This may take a few minutes.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Edit Module Dialog */}
      <Dialog open={!!editingModule} onOpenChange={() => setEditingModule(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit {editingModule && MODULE_NAMES[editingModule]}</DialogTitle>
            <DialogDescription>Make changes to this module content</DialogDescription>
          </DialogHeader>
          <Textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            rows={15}
            className="font-mono text-sm"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingModule(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} disabled={updateModule.isPending}>
              {updateModule.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Regenerate Module Dialog */}
      <Dialog open={!!regenerateModule} onOpenChange={() => setRegenerateModule(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Regenerate {regenerateModule && MODULE_NAMES[regenerateModule]}</DialogTitle>
            <DialogDescription>
              Provide feedback to guide the AI in regenerating this module
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="e.g., Focus more on organic social media, or provide more specific tactics for B2B audiences..."
            value={regenerateFeedback}
            onChange={(e) => setRegenerateFeedback(e.target.value)}
            rows={4}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setRegenerateModule(null)}>
              Cancel
            </Button>
            <Button onClick={handleRegenerate} disabled={regenerateMutation.isPending}>
              {regenerateMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Regenerating...
                </>
              ) : (
                "Regenerate"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Go Deeper Dialog */}
      <Dialog open={!!deeperModule} onOpenChange={() => setDeeperModule(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Deeper Insights: {deeperModule && MODULE_NAMES[deeperModule]}</DialogTitle>
            <DialogDescription>Advanced explanation and strategic context</DialogDescription>
          </DialogHeader>
          {goDeeperMutation.isPending ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : deeperExplanation ? (
            <div className="prose prose-sm max-w-none">
              <Streamdown>{deeperExplanation}</Streamdown>
            </div>
          ) : null}
          <DialogFooter>
            <Button onClick={() => setDeeperModule(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Strategy</DialogTitle>
            <DialogDescription>
              Choose how you'd like to export your marketing strategy
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-auto py-4"
              onClick={() => latestStrategy && createExport.mutate({ strategyId: latestStrategy.id, format: "pdf" })}
              disabled={createExport.isPending}
            >
              <Download className="h-5 w-5" />
              <div className="text-left">
                <div className="font-semibold">Export as PDF</div>
                <div className="text-sm text-muted-foreground">Download a formatted PDF document</div>
              </div>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-auto py-4"
              onClick={() => latestStrategy && createExport.mutate({ strategyId: latestStrategy.id, format: "link" })}
              disabled={createExport.isPending}
            >
              <Share2 className="h-5 w-5" />
              <div className="text-left">
                <div className="font-semibold">Create Shareable Link</div>
                <div className="text-sm text-muted-foreground">Generate a read-only link to share</div>
              </div>
            </Button>
          </div>
          {createExport.isPending && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
