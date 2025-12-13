import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Target, Users, TrendingUp, DollarSign, Calendar, CheckCircle, ArrowRight } from "lucide-react";

interface StrategySampleModalProps {
  trigger?: React.ReactNode;
}

export function StrategySampleModal({ trigger }: StrategySampleModalProps) {
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white text-gray-900">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Sample Marketing Strategy</DialogTitle>
          <p className="text-sm text-gray-600">TechFlow SaaS - Project Management Software</p>
        </DialogHeader>

        <div className="space-y-8 py-6">
          {/* Executive Brief */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 pb-2 border-b-2 border-blue-500">
              <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">1. Executive Brief</h3>
            </div>
            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
              <p>
                <strong>Business Overview:</strong> TechFlow is a project management SaaS platform targeting mid-sized tech companies (50-200 employees) looking to streamline team collaboration and project tracking.
              </p>
              <p>
                <strong>Primary Goal:</strong> Increase qualified demo requests by 150% within 6 months while maintaining a customer acquisition cost under $800.
              </p>
              <p>
                <strong>Key Challenge:</strong> Standing out in a crowded market dominated by established players like Asana and Monday.com.
              </p>
              <p>
                <strong>Strategic Approach:</strong> Position TechFlow as the "developer-first" project management tool with superior API integrations and technical workflows, targeting engineering teams specifically.
              </p>
            </div>
          </section>

          {/* Market Positioning */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 pb-2 border-b-2 border-purple-500">
              <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">2. Market Positioning</h3>
            </div>
            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <p className="font-semibold text-gray-900 mb-1">Target Audience:</p>
                <ul className="space-y-1 ml-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Engineering managers at tech companies with 10-50 person teams</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>CTOs looking for developer-friendly tools with robust APIs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Product teams frustrated with non-technical PM tools</span>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Unique Value Proposition:</p>
                <p className="italic bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                  "The only project management tool built by developers, for developers. Native Git integration, CLI support, and API-first architecture."
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Competitive Differentiation:</p>
                <p>Focus on technical teams' specific needs: code review workflows, sprint automation, and deep integration with developer tools (GitHub, GitLab, Jira).</p>
              </div>
            </div>
          </section>

          {/* Growth Channels */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 pb-2 border-b-2 border-green-500">
              <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">3. Growth Channels</h3>
            </div>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="font-semibold text-gray-900 mb-2">Primary Channel: Developer Communities</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Sponsor dev podcasts (Syntax, ShopTalk)</li>
                    <li>• Active presence on Dev.to and Hacker News</li>
                    <li>• Host technical webinars on API integration</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="font-semibold text-gray-900 mb-2">Secondary: Content Marketing</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Technical blog posts (2x/week)</li>
                    <li>• Open-source tool releases</li>
                    <li>• Engineering leadership guides</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="font-semibold text-gray-900 mb-2">Tertiary: Paid Search</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Google Ads targeting "developer project management"</li>
                    <li>• LinkedIn ads for engineering managers</li>
                    <li>• Retargeting campaigns</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="font-semibold text-gray-900 mb-2">Support: Partnerships</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Integration partnerships with GitHub, GitLab</li>
                    <li>• Co-marketing with complementary tools</li>
                    <li>• Developer bootcamp sponsorships</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Budget Allocation */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 pb-2 border-b-2 border-yellow-500">
              <div className="w-10 h-10 rounded-lg bg-yellow-500 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">4. Budget Allocation</h3>
            </div>
            <div className="space-y-3 text-sm text-gray-700">
              <p><strong>Total Monthly Budget:</strong> $15,000</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between bg-blue-50 p-2 rounded">
                  <span>Content Creation & SEO</span>
                  <span className="font-semibold">$4,500 (30%)</span>
                </div>
                <div className="flex items-center justify-between bg-purple-50 p-2 rounded">
                  <span>Paid Advertising (Google, LinkedIn)</span>
                  <span className="font-semibold">$5,250 (35%)</span>
                </div>
                <div className="flex items-center justify-between bg-green-50 p-2 rounded">
                  <span>Community & Sponsorships</span>
                  <span className="font-semibold">$3,000 (20%)</span>
                </div>
                <div className="flex items-center justify-between bg-yellow-50 p-2 rounded">
                  <span>Tools & Software</span>
                  <span className="font-semibold">$1,500 (10%)</span>
                </div>
                <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span>Testing & Optimization</span>
                  <span className="font-semibold">$750 (5%)</span>
                </div>
              </div>
            </div>
          </section>

          {/* Timeline & Milestones */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 pb-2 border-b-2 border-pink-500">
              <div className="w-10 h-10 rounded-lg bg-pink-500 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">5. Timeline & Milestones</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex gap-4 items-start">
                <div className="font-semibold text-blue-600 min-w-[80px]">Month 1-2:</div>
                <div>Foundation - Launch technical blog, set up paid campaigns, establish community presence</div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="font-semibold text-purple-600 min-w-[80px]">Month 3-4:</div>
                <div>Growth - Publish 2 open-source tools, sponsor 3 podcasts, optimize ad performance</div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="font-semibold text-green-600 min-w-[80px]">Month 5-6:</div>
                <div>Scale - Launch partnership program, double content output, expand to new channels</div>
              </div>
            </div>
          </section>

          {/* KPIs & Metrics */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 pb-2 border-b-2 border-indigo-500">
              <div className="w-10 h-10 rounded-lg bg-indigo-500 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">6. KPIs & Metrics</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-3 text-sm">
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <p className="font-semibold text-gray-900">Demo Requests</p>
                <p className="text-2xl font-bold text-blue-600">150/month</p>
                <p className="text-xs text-gray-600">Target by Month 6</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                <p className="font-semibold text-gray-900">CAC</p>
                <p className="text-2xl font-bold text-purple-600">$750</p>
                <p className="text-xs text-gray-600">Under $800 target</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <p className="font-semibold text-gray-900">Conversion Rate</p>
                <p className="text-2xl font-bold text-green-600">12%</p>
                <p className="text-xs text-gray-600">Demo to paid</p>
              </div>
            </div>
          </section>

          {/* Action Plan */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 pb-2 border-b-2 border-red-500">
              <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">7. Next Steps</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Week 1:</p>
                  <p className="text-xs">Set up Google Analytics, create content calendar, launch first blog post</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Week 2:</p>
                  <p className="text-xs">Launch Google Ads campaigns, reach out to podcast sponsors, publish on Dev.to</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Week 3-4:</p>
                  <p className="text-xs">Release first open-source tool, optimize ad performance, schedule webinar</p>
                </div>
              </div>
            </div>
          </section>

          {/* Footer CTA */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-blue-200 text-center">
            <p className="text-lg font-bold text-gray-900 mb-2">Ready to get your custom strategy?</p>
            <p className="text-sm text-gray-600 mb-4">Answer a few questions and receive your personalized 15-page marketing strategy in minutes.</p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Start Free <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
