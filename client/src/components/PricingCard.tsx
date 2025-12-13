import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowRight } from "lucide-react";

interface Feature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  name: string;
  price: number;
  description: string;
  popular: boolean;
  features: Feature[];
  cta: string;
  href: string;
  billingCycle: "monthly" | "annual";
  annualPrice: number;
  monthlyPrice: number;
  index: number;
}

export function PricingCard({
  name,
  price,
  description,
  popular,
  features,
  cta,
  href,
  billingCycle,
  annualPrice,
  monthlyPrice,
  index,
}: PricingCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
      style={{
        animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
        animationDelay: `${index * 0.2}s`,
      }}
    >
      {/* Cursor-following glow effect */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
          }}
        />
      )}

      <Card
        className={`relative flex flex-col transition-all duration-500 overflow-hidden ${
          popular
            ? "border-blue-500 border-2 shadow-xl shadow-blue-500/20 scale-105 bg-gray-900 hover:shadow-2xl hover:shadow-blue-500/30"
            : "border-white/10 bg-gray-900 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
        } group-hover:scale-110 group-hover:-translate-y-2`}
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        {popular && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold animate-pulse">
            Most Popular
          </div>
        )}

        <CardHeader className="relative z-10">
          <CardTitle className="text-2xl text-blue-500 transition-all duration-300 group-hover:text-blue-400">
            {name}
          </CardTitle>
          <CardDescription className="text-sm text-white">{description}</CardDescription>
          <div className="mt-4">
            <span className="text-4xl font-bold text-blue-500 transition-all duration-300 group-hover:scale-110 inline-block">
              ${billingCycle === "monthly" ? monthlyPrice : Math.round(annualPrice / 12)}
            </span>
            <span className="text-gray-400">/month</span>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            {billingCycle === "monthly"
              ? "Billed monthly • Cancel anytime"
              : `Billed annually at $${annualPrice}/year • Save $${Math.round(monthlyPrice * 12 - annualPrice)}`}
          </p>
        </CardHeader>

        <CardContent className="flex-1 relative z-10">
          <ul className="space-y-3">
            {features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 transition-all duration-300 hover:translate-x-1"
                style={{
                  animation: `fadeInUp 0.5s ease-out forwards`,
                  animationDelay: `${idx * 0.1}s`,
                  opacity: 0,
                }}
              >
                {feature.included ? (
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                )}
                <span className={feature.included ? "text-white" : "text-gray-500"}>
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="relative z-10">
          <a href={href} className="w-full">
            <Button
              className={`w-full transition-all duration-300 ${
                !popular
                  ? "text-white hover:bg-white/10 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50"
                  : "hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50"
              }`}
              variant={popular ? "default" : "outline"}
              size="lg"
            >
              {cta}
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </a>
        </CardFooter>
      </Card>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
