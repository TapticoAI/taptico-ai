import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Target, Users, TrendingUp, DollarSign, Calendar, CheckCircle, ArrowRight, Download, Lightbulb, Clock } from "lucide-react";
import { toast } from "sonner";

interface StrategySampleModalProps {
  trigger?: React.ReactNode;
}

export function StrategySampleModal({ trigger }: StrategySampleModalProps) {
  const handleExport = (platform: string) => {
    toast.success(`Exporting to ${platform}...`, {
      description: "Your strategy tasks will be added to your calendar/workspace.",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="gap-2">
            <FileText className="w-4 h-4" />
            See Example Strategy
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-white text-gray-900">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Your Marketing Strategy</DialogTitle>
          <p className="text-sm text-gray-600">TechFlow SaaS - Project Management for Developers</p>
        </DialogHeader>

        {/* Export Buttons */}
        <div className="flex flex-wrap gap-2 py-4 border-y border-gray-200">
          <p className="text-sm font-semibold text-gray-700 w-full mb-2">Export your action plan to:</p>
          <Button 
            size="sm" 
            variant="outline" 
            className="gap-2"
            onClick={() => handleExport("Notion")}
          >
            <Download className="w-4 h-4" />
            Notion
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="gap-2"
            onClick={() => handleExport("Asana")}
          >
            <Download className="w-4 h-4" />
            Asana
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="gap-2"
            onClick={() => handleExport("Google Calendar")}
          >
            <Download className="w-4 h-4" />
            Google Calendar
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="gap-2"
            onClick={() => handleExport("Apple Calendar")}
          >
            <Download className="w-4 h-4" />
            Apple Calendar
          </Button>
        </div>

        <div className="space-y-8 py-6">
          {/* Executive Summary */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b-2 border-blue-500">
              <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">What You're Building</h3>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-base text-gray-800 leading-relaxed mb-3">
                <strong>Your Business:</strong> TechFlow helps software teams manage their projects better. You're selling to tech companies with 50-200 employees.
              </p>
              <p className="text-base text-gray-800 leading-relaxed mb-3">
                <strong>Your Goal:</strong> Get 150 people to request a demo every month (that's about 5 per day). You want each new customer to cost less than $800 to acquire.
              </p>
              <p className="text-base text-gray-800 leading-relaxed">
                <strong>Your Big Challenge:</strong> You're competing against huge companies like Asana and Monday.com that everyone already knows about.
              </p>
            </div>
            
            {/* Why This Works */}
            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Why This Strategy Works:</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Instead of trying to compete with everyone, we're focusing on one specific group: software developers. They hate using tools that aren't built for them. By becoming the "developer's choice," you'll stand out and attract customers who are willing to pay more and stay longer.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Who You're Targeting */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b-2 border-purple-500">
              <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Who You're Talking To</h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="font-semibold text-gray-900 mb-2">Engineering Managers</p>
                <p className="text-sm text-gray-700">They lead teams of 10-50 developers and need tools that their team will actually use.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="font-semibold text-gray-900 mb-2">CTOs</p>
                <p className="text-sm text-gray-700">They want tools that connect with their existing systems (like GitHub and Slack).</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="font-semibold text-gray-900 mb-2">Product Teams</p>
                <p className="text-sm text-gray-700">They're tired of tools that feel like they were made for marketing teams, not technical teams.</p>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <p className="font-semibold text-gray-900 mb-2">What Makes You Different:</p>
              <p className="text-base text-gray-800 italic">
                "The only project management tool built by developers, for developers. Works with GitHub, has a command line tool, and an API for everything."
              </p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Why This Works:</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Developers are a tight-knit community. When one developer finds a tool they love, they tell their friends. By focusing on this specific group, you'll get word-of-mouth growth that's way cheaper than advertising.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Where You'll Find Customers */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b-2 border-green-500">
              <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Where You'll Find Customers</h3>
            </div>

            <div className="space-y-4">
              {/* Channel 1 */}
              <div className="bg-white p-5 rounded-lg border-2 border-green-200">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-lg text-gray-900">1. Developer Communities (Top Priority)</p>
                    <p className="text-sm text-gray-600">Where developers hang out online</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Cost</p>
                    <p className="font-bold text-green-600">$3,000/month</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Developers spend time on specific websites and listen to certain podcasts. We'll show up where they already are.
                </p>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-xs font-semibold text-gray-700 mb-2">What you'll do:</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Sponsor 2 developer podcasts ($1,500/month each)</li>
                    <li>• Post helpful content on Dev.to and Hacker News (free, just takes time)</li>
                    <li>• Host monthly webinars teaching developers how to improve their workflow (free)</li>
                  </ul>
                </div>
                <div className="mt-3 bg-green-50 p-3 rounded border border-green-200">
                  <p className="text-xs font-semibold text-green-800">Expected Result:</p>
                  <p className="text-xs text-green-700">40-50 demo requests per month • ROI: 15x (every $1 spent brings $15 in revenue)</p>
                </div>
              </div>

              {/* Channel 2 */}
              <div className="bg-white p-5 rounded-lg border-2 border-blue-200">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-lg text-gray-900">2. Educational Content</p>
                    <p className="text-sm text-gray-600">Teaching developers useful things</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Cost</p>
                    <p className="font-bold text-blue-600">$4,500/month</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Write blog posts and guides that help developers solve real problems. When they find your content helpful, they'll check out your product.
                </p>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-xs font-semibold text-gray-700 mb-2">What you'll do:</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Hire a technical writer ($3,000/month for 8 blog posts)</li>
                    <li>• Use SEO tools to find what developers are searching for ($150/month for Ahrefs)</li>
                    <li>• Create free tools developers can use ($1,350/month for developer time)</li>
                  </ul>
                </div>
                <div className="mt-3 bg-blue-50 p-3 rounded border border-blue-200">
                  <p className="text-xs font-semibold text-blue-800">Expected Result:</p>
                  <p className="text-xs text-blue-700">50-60 demo requests per month • ROI: 12x</p>
                </div>
              </div>

              {/* Channel 3 */}
              <div className="bg-white p-5 rounded-lg border-2 border-purple-200">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-lg text-gray-900">3. Paid Advertising</p>
                    <p className="text-sm text-gray-600">Showing ads to the right people</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Cost</p>
                    <p className="font-bold text-purple-600">$5,250/month</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Run ads on Google and LinkedIn targeting people who are actively looking for project management tools.
                </p>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-xs font-semibold text-gray-700 mb-2">What you'll do:</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Google Ads targeting "developer project management" ($3,000/month)</li>
                    <li>• LinkedIn ads for engineering managers ($2,000/month)</li>
                    <li>• Retargeting people who visited your site ($250/month)</li>
                  </ul>
                </div>
                <div className="mt-3 bg-purple-50 p-3 rounded border border-purple-200">
                  <p className="text-xs font-semibold text-purple-800">Expected Result:</p>
                  <p className="text-xs text-purple-700">35-45 demo requests per month • ROI: 8x</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Why This Mix Works:</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    We're combining three approaches: going where developers already are (communities), helping them for free (content), and reaching people actively looking for solutions (ads). This gives you multiple ways to reach your goal, so if one slows down, the others keep working.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Monthly Action Plan */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b-2 border-orange-500">
              <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Your 90-Day Action Plan</h3>
            </div>

            {/* Month 1 */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">1</div>
                <h4 className="text-lg font-bold text-gray-900">Month 1: Set Up Your Foundation</h4>
              </div>
              
              <div className="space-y-3">
                {/* Week 1 */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Week 1: Get Your Tools Ready
                  </p>
                  <div className="space-y-2 ml-6">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Set up Google Analytics on your website</p>
                        <p className="text-xs text-gray-600">Cost: Free • Time: 2 hours • Why: You need to see where your visitors come from</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Sign up for Ahrefs (SEO tool)</p>
                        <p className="text-xs text-gray-600">Cost: $150/month • Why: Find out what developers are searching for on Google</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Create accounts on Dev.to and Hacker News</p>
                        <p className="text-xs text-gray-600">Cost: Free • Time: 30 minutes • Why: These are where developers hang out</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Research and contact 5 developer podcasts</p>
                        <p className="text-xs text-gray-600">Cost: Free • Time: 4 hours • Why: Find out their sponsorship prices and audience size</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Week 2 */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Week 2: Start Creating Content
                  </p>
                  <div className="space-y-2 ml-6">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Hire a technical writer on Upwork</p>
                        <p className="text-xs text-gray-600">Cost: $3,000/month • Why: You need someone who understands developers to write for them</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Write your first blog post: "10 GitHub Workflows Every Team Should Use"</p>
                        <p className="text-xs text-gray-600">Cost: Included in writer cost • Why: This topic gets 5,000 searches per month</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Post an introduction on Dev.to</p>
                        <p className="text-xs text-gray-600">Cost: Free • Time: 1 hour • Why: Start building your presence in the community</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Week 3 */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Week 3: Launch Your Ads
                  </p>
                  <div className="space-y-2 ml-6">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Set up Google Ads account and create 3 ad campaigns</p>
                        <p className="text-xs text-gray-600">Cost: $3,000/month • Why: Reach people searching for "developer project management"</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Set up LinkedIn ads targeting engineering managers</p>
                        <p className="text-xs text-gray-600">Cost: $2,000/month • Why: Reach decision-makers at tech companies</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Publish second blog post and share on social media</p>
                        <p className="text-xs text-gray-600">Cost: Included • Time: 1 hour • Why: Build momentum and start getting organic traffic</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Week 4 */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Week 4: Analyze and Adjust
                  </p>
                  <div className="space-y-2 ml-6">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Review your Google Ads performance</p>
                        <p className="text-xs text-gray-600">Cost: Free • Time: 2 hours • Why: See which ads are working and pause the ones that aren't</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Sign sponsorship deal with your first podcast</p>
                        <p className="text-xs text-gray-600">Cost: $1,500/month • Why: Get in front of 10,000+ developers who trust the host</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Plan your first webinar for next month</p>
                        <p className="text-xs text-gray-600">Cost: $99/month for Zoom • Why: Webinars convert 3x better than regular content</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-green-50 p-3 rounded border border-green-200">
                <p className="text-sm font-semibold text-green-800">Month 1 Total Cost: $12,749</p>
                <p className="text-xs text-green-700">Expected Demo Requests: 30-40 • Cost per Demo: $318-$425</p>
              </div>
            </div>

            {/* Month 2 */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">2</div>
                <h4 className="text-lg font-bold text-gray-900">Month 2: Build Momentum</h4>
              </div>
              
              <div className="space-y-3">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">Key Activities:</p>
                  <div className="space-y-2 ml-6">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Double your content output to 8 blog posts</p>
                        <p className="text-xs text-gray-600">Why: Your first posts are starting to rank on Google, now capitalize on it</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Host your first webinar: "5 Ways to Speed Up Your Development Workflow"</p>
                        <p className="text-xs text-gray-600">Cost: $99/month Zoom • Expected: 50-100 attendees, 10-15 demos</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Add second podcast sponsorship</p>
                        <p className="text-xs text-gray-600">Cost: $1,500/month • Now reaching 20,000+ developers monthly</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Optimize your ads based on Month 1 data</p>
                        <p className="text-xs text-gray-600">Why: Cut ads that aren't working, spend more on ads that are</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Release your first free tool: "GitHub Sprint Planner"</p>
                        <p className="text-xs text-gray-600">Cost: $1,350 developer time • Why: Free tools get shared and bring traffic</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-green-50 p-3 rounded border border-green-200">
                <p className="text-sm font-semibold text-green-800">Month 2 Total Cost: $14,099</p>
                <p className="text-xs text-green-700">Expected Demo Requests: 70-90 • Cost per Demo: $156-$201</p>
              </div>
            </div>

            {/* Month 3 */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">3</div>
                <h4 className="text-lg font-bold text-gray-900">Month 3: Scale What Works</h4>
              </div>
              
              <div className="space-y-3">
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">Key Activities:</p>
                  <div className="space-y-2 ml-6">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Increase ad spend on your best-performing campaigns</p>
                        <p className="text-xs text-gray-600">Cost: +$2,000/month • Why: If something's working, do more of it</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Host second webinar with Q&A session</p>
                        <p className="text-xs text-gray-600">Expected: 100-150 attendees (your audience is growing!)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Start partnership talks with GitHub and GitLab</p>
                        <p className="text-xs text-gray-600">Cost: Free • Why: Get featured in their marketplaces for free exposure</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Your blog now has 20+ posts and ranks for 50+ keywords</p>
                        <p className="text-xs text-gray-600">Result: Organic traffic brings 30-40 demos without any ad spend</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Release second free tool and promote on Product Hunt</p>
                        <p className="text-xs text-gray-600">Cost: $1,350 • Expected: 500+ upvotes, 2,000+ visitors, 20-30 demos</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-green-50 p-3 rounded border border-green-200">
                <p className="text-sm font-semibold text-green-800">Month 3 Total Cost: $16,099</p>
                <p className="text-xs text-green-700">Expected Demo Requests: 120-150 • Cost per Demo: $107-$134</p>
              </div>
            </div>
          </section>

          {/* Success Metrics */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b-2 border-indigo-500">
              <div className="w-10 h-10 rounded-lg bg-indigo-500 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">How You'll Know It's Working</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-lg border-2 border-blue-200">
                <p className="text-sm font-semibold text-gray-700 mb-1">Demo Requests</p>
                <p className="text-3xl font-bold text-blue-600 mb-1">150/month</p>
                <p className="text-xs text-gray-600">Your goal by end of Month 3</p>
                <div className="mt-3 pt-3 border-t border-blue-200">
                  <p className="text-xs text-gray-700"><strong>How to track:</strong> Count form submissions on your "Request Demo" page</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-lg border-2 border-purple-200">
                <p className="text-sm font-semibold text-gray-700 mb-1">Cost Per Customer</p>
                <p className="text-3xl font-bold text-purple-600 mb-1">$750</p>
                <p className="text-xs text-gray-600">Under your $800 target</p>
                <div className="mt-3 pt-3 border-t border-purple-200">
                  <p className="text-xs text-gray-700"><strong>How to calculate:</strong> Total marketing spend ÷ number of new customers</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-lg border-2 border-green-200">
                <p className="text-sm font-semibold text-gray-700 mb-1">Demo to Customer Rate</p>
                <p className="text-3xl font-bold text-green-600 mb-1">12%</p>
                <p className="text-xs text-gray-600">12 out of 100 demos buy</p>
                <div className="mt-3 pt-3 border-t border-green-200">
                  <p className="text-xs text-gray-700"><strong>How to track:</strong> Number of customers ÷ number of demos given</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 mb-1">What These Numbers Mean:</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    If you hit these targets, you'll be getting 150 demos per month. With a 12% conversion rate, that's 18 new customers monthly. If each customer pays $200/month and stays for 24 months on average, that's $86,400 in new monthly revenue from a $15,000 marketing investment. That's a 5.7x return!
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Tools You'll Need */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b-2 border-pink-500">
              <div className="w-10 h-10 rounded-lg bg-pink-500 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Tools You'll Need (Total: $15,099/month)</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="font-semibold text-gray-900 mb-2">Content & SEO</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Technical Writer (Upwork)</span>
                    <span className="font-semibold">$3,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Ahrefs (SEO research)</span>
                    <span className="font-semibold">$150</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Developer Time (free tools)</span>
                    <span className="font-semibold">$1,350</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="text-gray-900 font-semibold">Subtotal</span>
                    <span className="font-bold text-blue-600">$4,500</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="font-semibold text-gray-900 mb-2">Advertising</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Google Ads</span>
                    <span className="font-semibold">$3,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">LinkedIn Ads</span>
                    <span className="font-semibold">$2,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Retargeting Ads</span>
                    <span className="font-semibold">$250</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="text-gray-900 font-semibold">Subtotal</span>
                    <span className="font-bold text-purple-600">$5,250</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="font-semibold text-gray-900 mb-2">Community & Sponsorships</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Podcast Sponsorships (2)</span>
                    <span className="font-semibold">$3,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Dev.to & Hacker News</span>
                    <span className="font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="text-gray-900 font-semibold">Subtotal</span>
                    <span className="font-bold text-green-600">$3,000</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="font-semibold text-gray-900 mb-2">Software & Tools</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Google Analytics</span>
                    <span className="font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Zoom (webinars)</span>
                    <span className="font-semibold">$99</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Email Marketing (Mailchimp)</span>
                    <span className="font-semibold">$250</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="text-gray-900 font-semibold">Subtotal</span>
                    <span className="font-bold text-orange-600">$349</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-5 rounded-lg border-2 border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-gray-900">Total Monthly Investment</p>
                  <p className="text-sm text-gray-600">Everything you need to execute this strategy</p>
                </div>
                <p className="text-4xl font-bold text-green-600">$15,099</p>
              </div>
              <div className="mt-4 pt-4 border-t border-green-200">
                <p className="text-sm text-gray-700">
                  <strong>Expected Return:</strong> 150 demos/month → 18 new customers → $86,400 in new monthly recurring revenue by Month 3
                </p>
              </div>
            </div>
          </section>

          {/* Footer CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-xl text-center text-white">
            <h3 className="text-2xl font-bold mb-3">Ready to Get Your Custom Strategy?</h3>
            <p className="text-lg mb-2 text-blue-100">
              This is just an example. Your strategy will be personalized for YOUR business.
            </p>
            <p className="text-sm mb-6 text-blue-100">
              Answer 8 simple questions and get your complete marketing plan in 5 minutes.
            </p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
              Create My Strategy Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
