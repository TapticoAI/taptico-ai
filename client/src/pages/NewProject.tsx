import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { Loader2, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";

const INDUSTRIES = [
  "SaaS",
  "E-commerce",
  "B2B Services",
  "B2C Services",
  "Healthcare",
  "Education",
  "Finance",
  "Real Estate",
  "Manufacturing",
  "Consulting",
  "Agency",
  "Other",
];

const GROWTH_GOALS = [
  "Increase Leads",
  "Boost Sales",
  "Improve Brand Awareness",
  "Increase Customer Retention",
  "Launch New Product",
  "Enter New Market",
];

const BUDGET_RANGES = [
  "Under $1,000/month",
  "$1,000 - $5,000/month",
  "$5,000 - $10,000/month",
  "$10,000 - $25,000/month",
  "$25,000+/month",
];

export default function NewProject() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    website: "",
    industry: "",
    targetCustomer: "",
    offerPricing: "",
    growthGoal: "",
    currentChannels: "",
    budget: "",
    constraints: "",
  });

  const createProject = trpc.projects.create.useMutation({
    onSuccess: (project) => {
      toast.success("Project created successfully!");
      setLocation(`/projects/${project.id}`);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create project");
    },
  });

  const handleNext = () => {
    // Validate current step
    if (step === 1 && (!formData.businessName || !formData.industry)) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (step === 2 && !formData.targetCustomer) {
      toast.error("Please describe your target customer");
      return;
    }
    if (step === 3 && (!formData.offerPricing || !formData.growthGoal)) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (step < 4) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    createProject.mutate(formData);
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/10">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => setLocation("/")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Step {step} of {totalSteps}</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Form Card */}
          <Card className="card-shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">
                {step === 1 && "Business Information"}
                {step === 2 && "Target Customer"}
                {step === 3 && "Offer & Goals"}
                {step === 4 && "Budget & Constraints"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "Tell us about your business and industry"}
                {step === 2 && "Describe your ideal customer in detail"}
                {step === 3 && "What do you offer and what are you trying to achieve?"}
                {step === 4 && "Help us understand your resources and limitations"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Step 1: Business Information */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">
                      Business Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="businessName"
                      placeholder="e.g., TaskFlow"
                      value={formData.businessName}
                      onChange={(e) => updateField("businessName", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website (Optional)</Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://www.example.com"
                      value={formData.website}
                      onChange={(e) => updateField("website", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industry">
                      Industry <span className="text-destructive">*</span>
                    </Label>
                    <Select value={formData.industry} onValueChange={(value) => updateField("industry", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {INDUSTRIES.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 2: Target Customer */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="targetCustomer">
                      Target Customer Description <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="targetCustomer"
                      placeholder="Describe your ideal customer: demographics, psychographics, pain points, and buying behavior. Be as specific as possible.

Example: Small to mid-sized remote teams (10-50 people), tech-savvy, values simplicity and speed. Frustrated with overly complex project management tools. Primary pain point: Too much time spent managing the tool instead of doing the work."
                      value={formData.targetCustomer}
                      onChange={(e) => updateField("targetCustomer", e.target.value)}
                      rows={8}
                      className="resize-none"
                    />
                    <p className="text-xs text-muted-foreground">
                      Include demographics, psychographics, pain points, and buying behavior
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3: Offer & Goals */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="offerPricing">
                      Offer & Pricing <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="offerPricing"
                      placeholder="Describe your product/service and pricing model.

Example: Web-based project management software focused on async communication. Pricing: $10/user/month, with a 14-day free trial."
                      value={formData.offerPricing}
                      onChange={(e) => updateField("offerPricing", e.target.value)}
                      rows={4}
                      className="resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="growthGoal">
                      Primary Growth Goal <span className="text-destructive">*</span>
                    </Label>
                    <Select value={formData.growthGoal} onValueChange={(value) => updateField("growthGoal", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your primary goal" />
                      </SelectTrigger>
                      <SelectContent>
                        {GROWTH_GOALS.map((goal) => (
                          <SelectItem key={goal} value={goal}>
                            {goal}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 4: Budget & Constraints */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentChannels">Current Marketing Channels (Optional)</Label>
                    <Textarea
                      id="currentChannels"
                      placeholder="List any marketing channels you're currently using.

Example: Some organic social media (Twitter, LinkedIn), a basic blog with 5-10 articles, no paid advertising."
                      value={formData.currentChannels}
                      onChange={(e) => updateField("currentChannels", e.target.value)}
                      rows={3}
                      className="resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget Range (Optional)</Label>
                    <Select value={formData.budget} onValueChange={(value) => updateField("budget", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        {BUDGET_RANGES.map((range) => (
                          <SelectItem key={range} value={range}>
                            {range}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="constraints">Constraints (Optional)</Label>
                    <Textarea
                      id="constraints"
                      placeholder="Any limitations we should know about?

Example: Small team (2 people: 1 founder, 1 developer), limited time for content creation, no in-house design resources."
                      value={formData.constraints}
                      onChange={(e) => updateField("constraints", e.target.value)}
                      rows={3}
                      className="resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={() => setStep(Math.max(1, step - 1))}
                  disabled={step === 1 || createProject.isPending}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={createProject.isPending}
                  className="gap-2"
                >
                  {createProject.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : step === totalSteps ? (
                    <>
                      <Check className="h-4 w-4" />
                      Create Project
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
