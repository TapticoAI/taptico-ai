import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { PricingCalculator } from "@/components/PricingCalculator";

export default function Pricing() {
  const { isAuthenticated } = useAuth();

  const tiers = [
    {
      name: "Starter",
      price: 79,
      description: "Perfect for solopreneurs and early-stage startups",
      popular: false,
      features: [
        { text: "2 strategy projects per month", included: true },
        { text: "All 7 strategic modules", included: true },
        { text: "PDF export", included: true },
        { text: "Email support", included: true },
        { text: "30-day strategy history", included: true },
        { text: "Unlimited regenerations", included: false },
        { text: "PowerPoint export", included: false },
        { text: "Shareable links", included: false },
        { text: "Go Deeper explanations", included: false },
        { text: "Priority support", included: false },
      ],
      cta: "Start with Starter",
      href: isAuthenticated ? "/new-project" : getLoginUrl(),
    },
    {
      name: "Professional",
      price: 199,
      description: "Best for growing businesses and marketing managers",
      popular: true,
      features: [
        { text: "10 strategy projects per month", included: true },
        { text: "All 7 strategic modules", included: true },
        { text: "PDF & PowerPoint export", included: true },
        { text: "Shareable strategy links", included: true },
        { text: "Unlimited regenerations", included: true },
        { text: "Go Deeper explanations", included: true },
        { text: "Priority email support", included: true },
        { text: "1-year strategy history", included: true },
        { text: "Version comparison", included: true },
        { text: "White-label exports", included: false },
      ],
      cta: "Go Professional",
      href: isAuthenticated ? "/new-project" : getLoginUrl(),
    },
    {
      name: "Enterprise",
      price: 499,
      description: "For established companies and marketing teams",
      popular: false,
      features: [
        { text: "Unlimited strategy projects", included: true },
        { text: "All Professional features", included: true },
        { text: "White-label export options", included: true },
        { text: "API access", included: true },
        { text: "Dedicated account manager", included: true },
        { text: "Custom integrations", included: true },
        { text: "Team collaboration (5+ users)", included: true },
        { text: "Strategy templates library", included: true },
        { text: "Custom training sessions", included: true },
        { text: "SLA guarantee", included: true },
      ],
      cta: "Contact Sales",
      href: "mailto:nick@nickwtapp.com?subject=Taptico AI Enterprise Inquiry",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img src="/taptico-logo.png" alt="Taptico" className="h-8" />
            </a>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/">
              <a className="text-sm font-medium hover:text-blue-600 transition-colors">Home</a>
            </Link>
            <Link href="/pricing">
              <a className="text-sm font-medium text-blue-600">Pricing</a>
            </Link>
            {isAuthenticated ? (
              <Link href="/">
                <Button size="sm">Dashboard</Button>
              </Link>
            ) : (
              <a href={getLoginUrl()}>
                <Button size="sm">Sign In</Button>
              </a>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Get CMO-level strategic thinking for a fraction of the cost. One successful strategy pays for itself.
            </p>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-6 py-3 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Replace $250K/year CMO salary or $25K consultant projects
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {tiers.map((tier) => (
                <Card
                  key={tier.name}
                  className={`relative flex flex-col ${
                    tier.popular
                      ? "border-blue-500 border-2 shadow-xl scale-105"
                      : "border-gray-200"
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{tier.name}</CardTitle>
                    <CardDescription className="text-sm">{tier.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">${tier.price}</span>
                      <span className="text-gray-600">/month</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Billed monthly • Cancel anytime</p>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-3">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          {feature.included ? (
                            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                          )}
                          <span className={feature.included ? "text-gray-700" : "text-gray-400"}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    {tier.name === "Enterprise" ? (
                      <a href={tier.href} className="w-full">
                        <Button
                          className="w-full"
                          variant={tier.popular ? "default" : "outline"}
                          size="lg"
                        >
                          {tier.cta}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </a>
                    ) : (
                      <a href={tier.href} className="w-full">
                        <Button
                          className="w-full"
                          variant={tier.popular ? "default" : "outline"}
                          size="lg"
                        >
                          {tier.cta}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </a>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Calculator */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-2xl">
            <PricingCalculator />
          </div>
        </section>

        {/* Pay-Per-Strategy Option */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
              <CardHeader>
                <CardTitle className="text-2xl">Pay-Per-Strategy</CardTitle>
                <CardDescription>No subscription needed • Perfect for occasional use</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <div className="text-4xl font-bold text-purple-600 mb-2">$49</div>
                    <p className="text-gray-600">per strategy generation</p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-sm">All 7 modules included</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-sm">3 regenerations included</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-sm">PDF export</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-sm">90-day access to strategy</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <a href={isAuthenticated ? "/new-project" : getLoginUrl()}>
                      <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                        Buy Single Strategy
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4">Compare Plans in Detail</h2>
              <p className="text-center text-gray-600 mb-12">See exactly what's included in each tier</p>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-4 px-4 font-semibold text-gray-700 w-1/3">Feature</th>
                      <th className="text-center py-4 px-4 font-semibold text-gray-700 w-1/6">
                        <div className="text-lg">Starter</div>
                        <div className="text-2xl font-bold text-blue-600 mt-1">$79</div>
                        <div className="text-xs text-gray-500">per month</div>
                      </th>
                      <th className="text-center py-4 px-4 font-semibold text-gray-700 w-1/6 bg-blue-50 relative">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Most Popular
                        </div>
                        <div className="text-lg mt-2">Professional</div>
                        <div className="text-2xl font-bold text-blue-600 mt-1">$199</div>
                        <div className="text-xs text-gray-500">per month</div>
                      </th>
                      <th className="text-center py-4 px-4 font-semibold text-gray-700 w-1/6">
                        <div className="text-lg">Enterprise</div>
                        <div className="text-2xl font-bold text-blue-600 mt-1">$499</div>
                        <div className="text-xs text-gray-500">per month</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Core Features */}
                    <tr className="bg-gray-50">
                      <td colSpan={4} className="py-3 px-4 font-semibold text-sm text-gray-700 uppercase tracking-wide">
                        Core Features
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-4 text-gray-700">Strategy projects per month</td>
                      <td className="py-4 px-4 text-center font-medium">2</td>
                      <td className="py-4 px-4 text-center font-medium bg-blue-50">10</td>
                      <td className="py-4 px-4 text-center font-medium">Unlimited</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-4 text-gray-700">All 7 strategic modules</td>
                      <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                      <td className="py-4 px-4 text-center bg-blue-50"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                      <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-4 text-gray-700">Strategy regenerations</td>
                      <td className="py-4 px-4 text-center font-medium">3 per project</td>
                      <td className="py-4 px-4 text-center font-medium bg-blue-50">Unlimited</td>
                      <td className="py-4 px-4 text-center font-medium">Unlimited</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-4 text-gray-700">"Go Deeper" AI explanations</td>
                      <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                      <td className="py-4 px-4 text-center bg-blue-50"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                      <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-4 text-gray-700">Strategy history retention</td>
                      <td className="py-4 px-4 text-center font-medium">30 days</td>
                      <td className="py-4 px-4 text-center font-medium bg-blue-50">1 year</td>
                      <td className="py-4 px-4 text-center font-medium">Unlimited</td>
                    </tr>

                    {/* Export & Sharing */}
                    <tr className="bg-gray-50">
                      <td colSpan={4} className="py-3 px-4 font-semibold text-sm text-gray-700 uppercase tracking-wide">
                        Export & Sharing
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-4 text-gray-700">PDF export</td>
                      <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                      <td className="py-4 px-4 text-center bg-blue-50"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                      <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-4 text-gray-700">PowerPoint export</td>
                      <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                      <td className="py-4 px-4 text-center bg-blue-50"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                      <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-4 text-gray-700">Shareable strategy links</td>
                      <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                      <td className="py-4 px-4 text-center bg-blue-50"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                      <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-4 text-gray-700">White-label exports</td>
                      <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                      <td className="py-4 px-4 text-center bg-blue-50"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                      <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    </tr>

                    {/* Collaboration & Team */}
                    <tr className="bg-gray-50">
                      <td colSpan={4} className="py-3 px-4 font-semibold text-sm text-gray-700 uppercase tracking-wide">
                        Collaboration & Team
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-4 text-gray-700">Team members</td>
                      <td className="py-4 px-4 text-center font-medium">1 user</td>
                      <td className="py-4 px-4 text-center font-medium bg-blue-50">1 user</td>
                      <td className="py-4 px-4 text-center font-medium">5+ users</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-4 text-gray-700">Strategy version comparison</td>
                      <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                      <td className="py-4 px-4 text-center bg-blue-50"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                      <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-4 text-gray-700">Dedicated account manager</td>
                      <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                      <td className="py-4 px-4 text-center bg-blue-50"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                      <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    </tr>

                    {/* Support & Advanced */}
                    <tr className="bg-gray-50">
                      <td colSpan={4} className="py-3 px-4 font-semibold text-sm text-gray-700 uppercase tracking-wide">
                        Support & Advanced Features
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-4 text-gray-700">Support level</td>
                      <td className="py-4 px-4 text-center font-medium">Email</td>
                      <td className="py-4 px-4 text-center font-medium bg-blue-50">Priority email</td>
                      <td className="py-4 px-4 text-center font-medium">Dedicated + SLA</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-4 text-gray-700">API access</td>
                      <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                      <td className="py-4 px-4 text-center bg-blue-50"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                      <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-4 text-gray-700">Custom integrations</td>
                      <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                      <td className="py-4 px-4 text-center bg-blue-50"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                      <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-4 text-gray-700">Strategy templates library</td>
                      <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                      <td className="py-4 px-4 text-center bg-blue-50"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                      <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-4 text-gray-700">Custom training sessions</td>
                      <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                      <td className="py-4 px-4 text-center bg-blue-50"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                      <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-gray-300">
                      <td className="py-6 px-4"></td>
                      <td className="py-6 px-4 text-center">
                        <a href={isAuthenticated ? "/new-project" : getLoginUrl()}>
                          <Button variant="outline" className="w-full">Start with Starter</Button>
                        </a>
                      </td>
                      <td className="py-6 px-4 text-center bg-blue-50">
                        <a href={isAuthenticated ? "/new-project" : getLoginUrl()}>
                          <Button className="w-full">Go Professional</Button>
                        </a>
                      </td>
                      <td className="py-6 px-4 text-center">
                        <a href="mailto:nick@nickwtapp.com?subject=Taptico AI Enterprise Inquiry">
                          <Button variant="outline" className="w-full">Contact Sales</Button>
                        </a>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Value Comparison */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold text-center mb-12">Compare the Value</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-600">Marketing Consultant</CardTitle>
                  <div className="text-3xl font-bold text-gray-400 mt-4">$25,000</div>
                  <p className="text-sm text-gray-500 mt-2">per strategy project</p>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>4-6 weeks delivery</li>
                    <li>Limited revisions</li>
                    <li>One-time deliverable</li>
                    <li>No ongoing support</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="text-center border-2 border-blue-500 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-600">Taptico AI Professional</CardTitle>
                  <div className="text-3xl font-bold text-blue-600 mt-4">$199</div>
                  <p className="text-sm text-gray-500 mt-2">per month</p>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-700 space-y-2 font-medium">
                    <li>✓ Instant delivery</li>
                    <li>✓ Unlimited revisions</li>
                    <li>✓ 10 strategies/month</li>
                    <li>✓ Ongoing refinement</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-600">Full-Time CMO</CardTitle>
                  <div className="text-3xl font-bold text-gray-400 mt-4">$250,000</div>
                  <p className="text-sm text-gray-500 mt-2">per year</p>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>$20,833/month cost</li>
                    <li>Benefits & overhead</li>
                    <li>Hiring time: 2-3 months</li>
                    <li>Single perspective</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I change plans later?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the difference.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What happens to my strategies if I cancel?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    You'll have 30 days to export all your strategies after cancellation. We recommend downloading them before your subscription ends.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Do you offer annual billing?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Yes! Annual billing saves you 2 months (16% discount). Contact us at nick@nickwtapp.com for annual pricing.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What's included in a "strategy project"?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Each project includes all 7 strategic modules: Executive Brief, Market Positioning, Growth Strategy, Funnel Architecture, Content & Messaging, Execution Roadmap, and Tool Stack Recommendations.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Is there a free trial?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We offer a 7-day money-back guarantee on all plans. If you're not satisfied, we'll refund your first month—no questions asked.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Marketing Strategy?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Join hundreds of businesses using Taptico AI to generate CMO-level strategies in minutes, not months.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href={isAuthenticated ? "/new-project" : getLoginUrl()}>
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <a href="mailto:nick@nickwtapp.com?subject=Taptico AI Demo Request">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Schedule Demo
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <img src="/taptico-logo.png" alt="Taptico" className="h-6 opacity-80" />
              <span className="text-sm">© 2025 Taptico Solutions, LLC. All rights reserved.</span>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="mailto:nick@nickwtapp.com" className="hover:text-white transition-colors">
                Contact
              </a>
              <a href="tel:770-363-2160" className="hover:text-white transition-colors">
                770-363-2160
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
