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
          <p className="text-sm text-gray-600">Ralph's Roofing - Atlanta, Georgia</p>
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
                <strong>Your Business:</strong> Ralph's Roofing provides roof repair, replacement, and inspection services to homeowners in Atlanta and surrounding areas. You've been in business for 8 years with a team of 6 roofers.
              </p>
              <p className="text-base text-gray-800 leading-relaxed mb-3">
                <strong>Your Goal:</strong> Get 40 qualified leads per month (about 10 per week) for roof replacements and major repairs. You want each new customer to cost less than $200 to acquire.
              </p>
              <p className="text-base text-gray-800 leading-relaxed">
                <strong>Your Big Challenge:</strong> Most people only think about roofing when they have a leak or storm damage. You need to be the first company they find when that happens.
              </p>
            </div>
            
            {/* Why This Works */}
            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Why This Strategy Works:</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    When someone needs a roofer, they usually search Google or ask neighbors. We'll make sure you show up first in Google searches, get recommended in local Facebook groups, and have great reviews everywhere people look. This way, you're the obvious choice when someone needs roofing work.
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
                <p className="font-semibold text-gray-900 mb-2">Homeowners 45-65</p>
                <p className="text-sm text-gray-700">Own homes built 15-30 years ago that need roof replacement. Have $8,000-$15,000 to spend.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="font-semibold text-gray-900 mb-2">Storm Damage Victims</p>
                <p className="text-sm text-gray-700">Just experienced hail or wind damage. Need fast response and help with insurance claims.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="font-semibold text-gray-900 mb-2">New Home Buyers</p>
                <p className="text-sm text-gray-700">Bought a home with an old roof. Want to replace it before problems start.</p>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <p className="font-semibold text-gray-900 mb-2">What Makes You Different:</p>
              <p className="text-base text-gray-800 italic">
                "Family-owned roofing company with 8 years serving Atlanta. We handle your insurance claim, offer 10-year workmanship warranty, and finish most jobs in 1-2 days."
              </p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Why This Works:</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    People want a roofer they can trust with their biggest investment (their home). By focusing on homeowners in your area who need work done now, and showing you're local, experienced, and reliable, you'll win more jobs than competitors who just compete on price.
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
                    <p className="font-bold text-lg text-gray-900">1. Google Local Search (Top Priority)</p>
                    <p className="text-sm text-gray-600">When people search "roofer near me"</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Cost</p>
                    <p className="font-bold text-green-600">$4,200/month</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Most people who need a roofer start by searching Google. We'll make sure you show up at the top of search results for "roofing Atlanta", "roof repair near me", and "emergency roofer".
                </p>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-xs font-semibold text-gray-700 mb-2">What you'll do:</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Google Local Service Ads ($2,500/month) - Show up first with Google Guaranteed badge</li>
                    <li>• Google Search Ads ($1,500/month) - Appear when people search roofing terms</li>
                    <li>• Optimize your Google Business Profile ($200/month for photos/posts)</li>
                  </ul>
                </div>
                <div className="mt-3 bg-green-50 p-3 rounded border border-green-200">
                  <p className="text-xs font-semibold text-green-800">Expected Result:</p>
                  <p className="text-xs text-green-700">20-25 leads per month • ROI: 12x (every $1 spent brings $12 in revenue)</p>
                </div>
              </div>

              {/* Channel 2 */}
              <div className="bg-white p-5 rounded-lg border-2 border-blue-200">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-lg text-gray-900">2. Local Facebook & Nextdoor</p>
                    <p className="text-sm text-gray-600">Where neighbors recommend businesses</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Cost</p>
                    <p className="font-bold text-blue-600">$2,800/month</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  People trust recommendations from their neighbors. We'll get you active in local Facebook groups and Nextdoor where homeowners ask for roofing recommendations.
                </p>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-xs font-semibold text-gray-700 mb-2">What you'll do:</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Facebook Ads targeting homeowners in your service area ($2,000/month)</li>
                    <li>• Nextdoor Neighborhood Sponsor ($300/month)</li>
                    <li>• Post helpful roofing tips weekly in local groups (free, takes 30 min/week)</li>
                    <li>• Run "Roof Inspection Special" ads before storm season ($500/month)</li>
                  </ul>
                </div>
                <div className="mt-3 bg-blue-50 p-3 rounded border border-blue-200">
                  <p className="text-xs font-semibold text-blue-800">Expected Result:</p>
                  <p className="text-xs text-blue-700">12-15 leads per month • ROI: 10x</p>
                </div>
              </div>

              {/* Channel 3 */}
              <div className="bg-white p-5 rounded-lg border-2 border-purple-200">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-lg text-gray-900">3. Review Sites & Referrals</p>
                    <p className="text-sm text-gray-600">Building trust through reputation</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Cost</p>
                    <p className="font-bold text-purple-600">$1,500/month</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Before hiring a roofer, people check reviews on Google, Yelp, and Angi. We'll build up your reviews and make it easy for happy customers to refer you.
                </p>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-xs font-semibold text-gray-700 mb-2">What you'll do:</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Angi (formerly Angie's List) membership ($800/month for leads)</li>
                    <li>• Automated review request system ($200/month for software)</li>
                    <li>• Referral rewards program ($500/month - $100 per referral)</li>
                  </ul>
                </div>
                <div className="mt-3 bg-purple-50 p-3 rounded border border-purple-200">
                  <p className="text-xs font-semibold text-purple-800">Expected Result:</p>
                  <p className="text-xs text-purple-700">8-10 leads per month • ROI: 8x</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Why This Mix Works:</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    We're covering all three ways people find roofers: searching Google when they need help now (urgent), seeing ads and posts in their neighborhood (awareness), and checking reviews before making a decision (trust). This gives you multiple chances to reach the same customer and beat your competition.
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
                <h4 className="text-lg font-bold text-gray-900">Month 1: Get Your Foundation Ready</h4>
              </div>
              
              <div className="space-y-3">
                {/* Week 1 */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Week 1: Set Up Your Online Presence
                  </p>
                  <div className="space-y-2 ml-6">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Claim and optimize your Google Business Profile</p>
                        <p className="text-xs text-gray-600">Cost: Free • Time: 3 hours • Why: This is how you show up on Google Maps when people search</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Take 20 professional photos of your work (before/after)</p>
                        <p className="text-xs text-gray-600">Cost: $300 for photographer • Why: Photos get 3x more clicks than listings without photos</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Sign up for Google Local Service Ads</p>
                        <p className="text-xs text-gray-600">Cost: Free to set up • Time: 2 hours • Why: Get the Google Guaranteed badge and show up first</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Create accounts on Nextdoor and join local Facebook groups</p>
                        <p className="text-xs text-gray-600">Cost: Free • Time: 1 hour • Why: These are where neighbors recommend businesses</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Week 2 */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Week 2: Start Getting Reviews
                  </p>
                  <div className="space-y-2 ml-6">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Sign up for review management software (Podium or Birdeye)</p>
                        <p className="text-xs text-gray-600">Cost: $200/month • Why: Automatically text customers asking for reviews after each job</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Call your 10 happiest past customers and ask for Google reviews</p>
                        <p className="text-xs text-gray-600">Cost: Free • Time: 3 hours • Why: You need at least 10 reviews before people trust you</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Join Angi (Angie's List) as a service provider</p>
                        <p className="text-xs text-gray-600">Cost: $800/month • Why: Homeowners search here specifically for contractors</p>
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
                        <p className="text-gray-800 font-medium">Start Google Local Service Ads with $2,500/month budget</p>
                        <p className="text-xs text-gray-600">Cost: $2,500/month • Why: Only pay when someone calls you, guaranteed to show up first</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Launch Google Search Ads targeting "roof repair Atlanta"</p>
                        <p className="text-xs text-gray-600">Cost: $1,500/month • Why: Catch people actively searching for roofing help</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Create Facebook ad: "Free Roof Inspection - $0 if No Issues Found"</p>
                        <p className="text-xs text-gray-600">Cost: $2,000/month • Why: Low-risk offer gets people to raise their hand</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Week 4 */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Week 4: Build Community Presence
                  </p>
                  <div className="space-y-2 ml-6">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Become a Nextdoor Neighborhood Sponsor</p>
                        <p className="text-xs text-gray-600">Cost: $300/month • Why: Your business shows up when neighbors ask for roofer recommendations</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Post helpful tip in 5 local Facebook groups: "5 Signs Your Roof Needs Attention"</p>
                        <p className="text-xs text-gray-600">Cost: Free • Time: 1 hour • Why: Helpful content builds trust and gets shared</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Review your ad performance and adjust budgets</p>
                        <p className="text-xs text-gray-600">Cost: Free • Time: 2 hours • Why: Stop spending on ads that don't work, spend more on ones that do</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-green-50 p-3 rounded border border-green-200">
                <p className="text-sm font-semibold text-green-800">Month 1 Total Cost: $8,800</p>
                <p className="text-xs text-green-700">Expected Leads: 15-20 • Cost per Lead: $440-$587 • Close Rate: 30% = 5-6 new customers</p>
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
                        <p className="text-gray-800 font-medium">You now have 15-20 Google reviews (from happy customers)</p>
                        <p className="text-xs text-gray-600">Why: More reviews = higher ranking in Google search results</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Launch referral program: $100 gift card for every referral</p>
                        <p className="text-xs text-gray-600">Cost: $500/month (5 referrals) • Why: Happy customers are your best salespeople</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Run storm season Facebook ad: "Hail Damage? Free Inspection + Insurance Help"</p>
                        <p className="text-xs text-gray-600">Cost: Additional $500/month • Expected: 8-10 extra leads from storm damage</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Post weekly roofing tips on Facebook and Nextdoor</p>
                        <p className="text-xs text-gray-600">Cost: Free • Time: 30 min/week • Why: Stay top-of-mind in your community</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Optimize Google Ads based on Month 1 data</p>
                        <p className="text-xs text-gray-600">Why: Double down on keywords that brought you customers</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-green-50 p-3 rounded border border-green-200">
                <p className="text-sm font-semibold text-green-800">Month 2 Total Cost: $9,000</p>
                <p className="text-xs text-green-700">Expected Leads: 30-35 • Cost per Lead: $257-$300 • Close Rate: 30% = 9-11 new customers</p>
              </div>
            </div>

            {/* Month 3 */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">3</div>
                <h4 className="text-lg font-bold text-gray-900">Month 3: Hit Your Goal</h4>
              </div>
              
              <div className="space-y-3">
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">Key Activities:</p>
                  <div className="space-y-2 ml-6">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">You're now #1 in Google Local Pack for "roofer Atlanta"</p>
                        <p className="text-xs text-gray-600">Result: Getting 5-8 organic calls per week without paying for ads</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">You have 30+ five-star Google reviews</p>
                        <p className="text-xs text-gray-600">Result: 60% of people who see your profile call you (vs 20% before)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Your Facebook ads are dialed in - only running the best performers</p>
                        <p className="text-xs text-gray-600">Result: Cost per lead dropped from $100 to $65</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">Referrals are coming in regularly (2-3 per week)</p>
                        <p className="text-xs text-gray-600">Result: 8-12 leads per month from happy customer referrals</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">You're the go-to roofer in 3 Nextdoor neighborhoods</p>
                        <p className="text-xs text-gray-600">Result: Getting tagged in 5-10 recommendation threads per month</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-green-50 p-3 rounded border border-green-200">
                <p className="text-sm font-semibold text-green-800">Month 3 Total Cost: $8,500</p>
                <p className="text-xs text-green-700">Expected Leads: 40-50 • Cost per Lead: $170-$213 • Close Rate: 30% = 12-15 new customers</p>
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
                <p className="text-sm font-semibold text-gray-700 mb-1">Monthly Leads</p>
                <p className="text-3xl font-bold text-blue-600 mb-1">40-50</p>
                <p className="text-xs text-gray-600">Your goal by end of Month 3</p>
                <div className="mt-3 pt-3 border-t border-blue-200">
                  <p className="text-xs text-gray-700"><strong>How to track:</strong> Count every phone call and form submission requesting a quote</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-lg border-2 border-purple-200">
                <p className="text-sm font-semibold text-gray-700 mb-1">Cost Per Lead</p>
                <p className="text-3xl font-bold text-purple-600 mb-1">$170</p>
                <p className="text-xs text-gray-600">Well under your $200 target</p>
                <div className="mt-3 pt-3 border-t border-purple-200">
                  <p className="text-xs text-gray-700"><strong>How to calculate:</strong> Total marketing spend ÷ number of leads</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-lg border-2 border-green-200">
                <p className="text-sm font-semibold text-gray-700 mb-1">Close Rate</p>
                <p className="text-3xl font-bold text-green-600 mb-1">30%</p>
                <p className="text-xs text-gray-600">3 out of 10 leads become customers</p>
                <div className="mt-3 pt-3 border-t border-green-200">
                  <p className="text-xs text-gray-700"><strong>How to track:</strong> Number of signed contracts ÷ number of quotes given</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 mb-1">What These Numbers Mean:</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    If you hit these targets, you'll be getting 45 leads per month. With a 30% close rate, that's 13-14 new roofing jobs monthly. If your average job is $8,500, that's $110,500 in new revenue from an $8,500 marketing investment. That's a 13x return on your money!
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
              <h3 className="text-xl font-bold text-gray-900">Tools You'll Need (Total: $8,500/month)</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="font-semibold text-gray-900 mb-2">Google Advertising</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Google Local Service Ads</span>
                    <span className="font-semibold">$2,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Google Search Ads</span>
                    <span className="font-semibold">$1,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Google Business Profile (photos/posts)</span>
                    <span className="font-semibold">$200</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="text-gray-900 font-semibold">Subtotal</span>
                    <span className="font-bold text-blue-600">$4,200</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="font-semibold text-gray-900 mb-2">Social & Community</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Facebook Ads</span>
                    <span className="font-semibold">$2,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Nextdoor Sponsor</span>
                    <span className="font-semibold">$300</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Storm Season Ads</span>
                    <span className="font-semibold">$500</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="text-gray-900 font-semibold">Subtotal</span>
                    <span className="font-bold text-purple-600">$2,800</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="font-semibold text-gray-900 mb-2">Reviews & Referrals</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Angi Membership</span>
                    <span className="font-semibold">$800</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Review Software (Podium/Birdeye)</span>
                    <span className="font-semibold">$200</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Referral Rewards (5 @ $100)</span>
                    <span className="font-semibold">$500</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="text-gray-900 font-semibold">Subtotal</span>
                    <span className="font-bold text-green-600">$1,500</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="font-semibold text-gray-900 mb-2">One-Time Setup</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Professional Photos</span>
                    <span className="font-semibold">$300</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Google Business Profile Setup</span>
                    <span className="font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="text-gray-900 font-semibold">Subtotal</span>
                    <span className="font-bold text-orange-600">$300</span>
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
                <p className="text-4xl font-bold text-green-600">$8,500</p>
              </div>
              <div className="mt-4 pt-4 border-t border-green-200">
                <p className="text-sm text-gray-700">
                  <strong>Expected Return:</strong> 45 leads/month → 13-14 new customers → $110,500 in new revenue by Month 3 (13x ROI)
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
