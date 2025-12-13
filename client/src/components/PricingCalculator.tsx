import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp } from "lucide-react";

export function PricingCalculator() {
  const [strategiesPerMonth, setStrategiesPerMonth] = useState(5);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  // Calculate recommended tier and pricing
  const getRecommendedTier = () => {
    if (strategiesPerMonth <= 2) {
      return {
        tier: "Starter",
        monthlyPrice: 79,
        annualPrice: 790,
        included: 2,
        additional: strategiesPerMonth - 2,
      };
    } else if (strategiesPerMonth <= 10) {
      return {
        tier: "Professional",
        monthlyPrice: 199,
        annualPrice: 1990,
        included: 10,
        additional: 0,
      };
    } else {
      return {
        tier: "Enterprise",
        monthlyPrice: 499,
        annualPrice: 4990,
        included: Infinity,
        additional: 0,
      };
    }
  };

  const recommended = getRecommendedTier();
  const basePrice = billingCycle === "monthly" ? recommended.monthlyPrice : recommended.annualPrice;
  const additionalCost = recommended.additional > 0 ? recommended.additional * 39 : 0;
  const totalMonthly = billingCycle === "monthly" 
    ? basePrice + additionalCost 
    : Math.round((basePrice + additionalCost) / 12);
  const totalAnnual = billingCycle === "monthly" 
    ? (basePrice + additionalCost) * 12 
    : basePrice + additionalCost;

  // Calculate savings vs consultant
  const consultantCost = strategiesPerMonth * 25000;
  const annualSavings = consultantCost - totalAnnual;
  const roi = Math.round((annualSavings / totalAnnual) * 100);

  return (
    <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="w-6 h-6 text-blue-600" />
          <CardTitle className="text-2xl">Pricing Calculator</CardTitle>
        </div>
        <CardDescription>
          Find the perfect plan for your needs and see how much you'll save
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Strategies Per Month Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-base font-medium">Strategies per month</Label>
            <span className="text-2xl font-bold text-blue-600">{strategiesPerMonth}</span>
          </div>
          <Slider
            value={[strategiesPerMonth]}
            onValueChange={(value) => setStrategiesPerMonth(value[0] || 1)}
            min={1}
            max={20}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>1 strategy</span>
            <span>20+ strategies</span>
          </div>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Billing cycle</Label>
          <div className="flex gap-2">
            <Button
              variant={billingCycle === "monthly" ? "default" : "outline"}
              onClick={() => setBillingCycle("monthly")}
              className="flex-1"
            >
              Monthly
            </Button>
            <Button
              variant={billingCycle === "annual" ? "default" : "outline"}
              onClick={() => setBillingCycle("annual")}
              className="flex-1"
            >
              Annual
              <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                Save 16%
              </span>
            </Button>
          </div>
        </div>

        {/* Recommended Tier */}
        <div className="bg-white rounded-lg p-6 space-y-4 border-2 border-blue-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Recommended Plan</p>
              <h3 className="text-2xl font-bold text-blue-600">{recommended.tier}</h3>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">
                {billingCycle === "monthly" ? "Monthly" : "Annual"}
              </p>
              <p className="text-3xl font-bold">
                ${billingCycle === "monthly" ? totalMonthly : totalAnnual}
              </p>
              {billingCycle === "annual" && (
                <p className="text-sm text-gray-500">${totalMonthly}/month</p>
              )}
            </div>
          </div>

          {recommended.additional > 0 && (
            <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
              <p className="font-medium">Includes:</p>
              <p>• {recommended.included} strategies (base plan)</p>
              <p>• {recommended.additional} additional strategies @ $39 each</p>
            </div>
          )}

          {/* ROI Calculation */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg space-y-2">
            <div className="flex items-center gap-2 text-green-700 font-semibold">
              <TrendingUp className="w-5 h-5" />
              <span>Your Savings</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">vs. Marketing Consultant</p>
                <p className="text-2xl font-bold text-green-600">
                  ${annualSavings.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">saved per year</p>
              </div>
              <div>
                <p className="text-gray-600">Return on Investment</p>
                <p className="text-2xl font-bold text-green-600">{roi}x</p>
                <p className="text-xs text-gray-500">ROI multiplier</p>
              </div>
            </div>
          </div>

          {/* Comparison */}
          <div className="text-xs text-gray-500 space-y-1 pt-2 border-t">
            <p className="flex justify-between">
              <span>Consultant cost ({strategiesPerMonth} strategies):</span>
              <span className="font-medium">${consultantCost.toLocaleString()}/year</span>
            </p>
            <p className="flex justify-between">
              <span>Taptico AI cost:</span>
              <span className="font-medium text-blue-600">${totalAnnual.toLocaleString()}/year</span>
            </p>
            <p className="flex justify-between text-green-600 font-bold pt-1 border-t">
              <span>You save:</span>
              <span>${annualSavings.toLocaleString()}/year</span>
            </p>
          </div>
        </div>

        {/* CTA */}
        <Button className="w-full" size="lg">
          Get Started with {recommended.tier}
        </Button>
      </CardContent>
    </Card>
  );
}
