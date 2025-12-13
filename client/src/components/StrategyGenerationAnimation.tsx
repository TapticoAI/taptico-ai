import React from "react";
import { Check, Zap, TrendingUp, Target, Users, DollarSign, Calendar } from "lucide-react";

export function StrategyGenerationAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-50 pointer-events-none">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto px-8">
          {/* Animated Strategy Cards */}
          <div className="space-y-4">
            {/* Executive Brief */}
            <div 
              className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg p-6 border border-blue-500/30"
              style={{
                animation: "slideInFade 1s ease-out forwards",
                animationDelay: "0s",
                opacity: 0,
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/30 flex items-center justify-center">
                  <Check className="w-4 h-4 text-blue-400" />
                </div>
                <div className="h-4 bg-blue-400/40 rounded w-48 animate-shimmer" />
              </div>
              <div className="space-y-2">
                <div 
                  className="h-2 bg-white/20 rounded w-full"
                  style={{
                    animation: "typewriter 2s steps(40) forwards",
                    animationDelay: "0.5s",
                  }}
                />
                <div 
                  className="h-2 bg-white/20 rounded w-5/6"
                  style={{
                    animation: "typewriter 2s steps(40) forwards",
                    animationDelay: "0.8s",
                  }}
                />
                <div 
                  className="h-2 bg-white/20 rounded w-4/6"
                  style={{
                    animation: "typewriter 2s steps(40) forwards",
                    animationDelay: "1.1s",
                  }}
                />
              </div>
            </div>

            {/* Market Positioning */}
            <div 
              className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30"
              style={{
                animation: "slideInFade 1s ease-out forwards",
                animationDelay: "1.5s",
                opacity: 0,
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/30 flex items-center justify-center">
                  <Target className="w-4 h-4 text-purple-400" />
                </div>
                <div className="h-4 bg-purple-400/40 rounded w-56 animate-shimmer" />
              </div>
              <div className="space-y-2">
                <div 
                  className="h-2 bg-white/20 rounded w-full"
                  style={{
                    animation: "typewriter 2s steps(40) forwards",
                    animationDelay: "2s",
                  }}
                />
                <div 
                  className="h-2 bg-white/20 rounded w-3/4"
                  style={{
                    animation: "typewriter 2s steps(40) forwards",
                    animationDelay: "2.3s",
                  }}
                />
              </div>
            </div>

            {/* Growth Strategy */}
            <div 
              className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-lg p-6 border border-green-500/30"
              style={{
                animation: "slideInFade 1s ease-out forwards",
                animationDelay: "3s",
                opacity: 0,
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/30 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
                <div className="h-4 bg-green-400/40 rounded w-44 animate-shimmer" />
              </div>
              <div className="space-y-2">
                <div 
                  className="h-2 bg-white/20 rounded w-full"
                  style={{
                    animation: "typewriter 2s steps(40) forwards",
                    animationDelay: "3.5s",
                  }}
                />
                <div 
                  className="h-2 bg-white/20 rounded w-4/5"
                  style={{
                    animation: "typewriter 2s steps(40) forwards",
                    animationDelay: "3.8s",
                  }}
                />
              </div>
            </div>

            {/* Progress Indicator */}
            <div 
              className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-white/10"
              style={{
                animation: "slideInFade 1s ease-out forwards",
                animationDelay: "4.5s",
                opacity: 0,
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-400 animate-pulse" />
                  <span className="text-xs text-blue-400 font-medium">Generating Strategy...</span>
                </div>
                <span className="text-xs text-gray-400">85%</span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  style={{
                    animation: "progressBar 3s ease-out forwards",
                    animationDelay: "5s",
                    width: "0%",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Floating Icons */}
          <div className="absolute inset-0">
            <Users 
              className="absolute w-6 h-6 text-blue-400/40"
              style={{
                top: "10%",
                left: "10%",
                animation: "floatIcon 4s ease-in-out infinite",
                animationDelay: "0s",
              }}
            />
            <DollarSign 
              className="absolute w-6 h-6 text-green-400/40"
              style={{
                top: "20%",
                right: "15%",
                animation: "floatIcon 4s ease-in-out infinite",
                animationDelay: "1s",
              }}
            />
            <Calendar 
              className="absolute w-6 h-6 text-purple-400/40"
              style={{
                bottom: "15%",
                left: "20%",
                animation: "floatIcon 4s ease-in-out infinite",
                animationDelay: "2s",
              }}
            />
            <Target 
              className="absolute w-6 h-6 text-pink-400/40"
              style={{
                bottom: "25%",
                right: "10%",
                animation: "floatIcon 4s ease-in-out infinite",
                animationDelay: "1.5s",
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInFade {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes typewriter {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes progressBar {
          from {
            width: 0%;
          }
          to {
            width: 85%;
          }
        }

        @keyframes floatIcon {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
            opacity: 0.6;
          }
        }

        /* Loop the entire animation */
        @keyframes loopAnimation {
          0% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
