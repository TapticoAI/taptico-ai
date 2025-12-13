# AI CMO Project TODO

## Database & Backend Infrastructure
- [x] Design and implement database schema for projects, strategies, modules, and exports
- [x] Add subscription tier field to users table
- [x] Create AI service layer with multi-stage prompt architecture
- [x] Implement diagnosis prompt for core strategic insights
- [x] Implement module-specific prompts for all seven modules
- [x] Implement refinement prompts for "Go Deeper" and "Regenerate" features

## tRPC Procedures
- [x] Project management procedures (create, list, get, update, delete)
- [x] Strategy generation procedure with progress tracking
- [x] Module editing procedures
- [x] Module regeneration with user feedback
- [x] Module "Go Deeper" explanation procedure
- [ ] Export procedures (PDF, PPTX, shareable link)
- [x] Subscription tier checking and feature gating

## Frontend - Onboarding Flow
- [x] Multi-step onboarding form component
- [x] Business information collection (industry, name, website)
- [x] Target customer persona builder
- [x] Offer and pricing input
- [x] Goals and constraints selection
- [x] Form validation and progress indicator

## Frontend - Strategy Dashboard
- [x] Project list/dashboard view
- [x] Strategy generation initiation with progress indicators
- [x] Seven module cards with expand/collapse functionality
- [x] Inline editing for module content
- [x] "Go Deeper" button and modal for detailed explanations
- [x] "Regenerate" button with feedback input
- [x] Export button with format selection

## Export Functionality
- [x] PDF generation from strategy modules
- [ ] PowerPoint slide deck generation (HTML export available)
- [x] Shareable read-only link generation
- [x] S3 storage integration for exported files
- [x] Export history tracking

## Subscription & Feature Gating
- [ ] Subscription tier display in user profile
- [ ] Feature limits based on tier (project count, generations per month)
- [ ] Upgrade prompts for locked features
- [ ] Usage tracking for generation limits

## UI/UX Polish
- [ ] Responsive design for mobile, tablet, desktop
- [ ] Loading states and skeletons
- [ ] Error handling and user feedback
- [ ] Empty states for new users
- [ ] Confirmation dialogs for destructive actions

## Testing & Deployment
- [x] Write vitest tests for critical procedures
- [x] End-to-end testing of strategy generation flow
- [x] Test export functionality
- [x] Create initial checkpoint

## Rebranding to Taptico AI
- [x] Upload Taptico logo to project
- [x] Update application name from "AI CMO" to "Taptico AI"
- [x] Update tagline and branding text
- [x] Update logo in header/navigation
- [x] Update landing page branding
- [x] Update page titles and meta information
- [x] Update footer and copyright information

## Interactive Landing Page Walkthrough
- [x] Design walkthrough section layout
- [x] Create step-by-step process visualization
- [x] Add example strategy module previews
- [x] Implement smooth scroll animations
- [x] Add interactive hover effects
- [ ] Include social proof and testimonials section (future enhancement)

## OAuth Login Page Branding
- [ ] Update VITE_APP_TITLE to "Taptico AI"
- [ ] Update VITE_APP_LOGO with Taptico logo URL

## Bow and Arrow Icon Versions
- [x] Create black version of bow and arrow icon
- [x] Create white version of bow and arrow icon
- [x] Create multiple sizes (16x16, 32x32, 64x64, 128x128, 256x256, 512x512)
- [x] Export as PNG files

## Tutorial Video Creation
- [ ] Plan video storyboard with 5-6 key scenes
- [ ] Generate reference images for character and setting consistency
- [ ] Generate video clips for each scene
- [ ] Combine clips with transitions
- [ ] Add text overlays and branding
- [ ] Export final tutorial video

## Pricing Page Development
- [x] Research competitive pricing for AI marketing strategy tools
- [x] Define three subscription tiers with feature breakdowns
- [x] Design pricing comparison table layout
- [x] Create pricing page component
- [x] Implement dynamic pricing calculator
- [x] Add FAQ section for pricing questions
- [x] Integrate with subscription tier system
- [x] Add CTA buttons linking to signup/onboarding

## Side-by-Side Plan Comparison Table
- [x] Design comprehensive feature comparison table layout
- [x] List all features across Starter, Professional, and Enterprise tiers
- [x] Add visual indicators (checkmarks, X marks, feature limits)
- [x] Implement responsive design for mobile viewing
- [x] Add section to pricing page

## Annual Billing Toggle
- [x] Add monthly/annual toggle switch above pricing cards
- [x] Calculate and display annual prices (16% discount)
- [x] Add "Save 16%" badge to annual option
- [x] Update pricing cards dynamically based on toggle
- [x] Show monthly equivalent price for annual billing

## Landing Page Redesign
- [ ] Update color scheme to pitch black, white, and navy/royal blue
- [ ] Redesign hero section with clear 5-second value proposition
- [ ] Simplify all copy to 7th-grade reading level
- [ ] Add high-tech visual elements and animations
- [ ] Integrate Taptico logo prominently
- [ ] Create compelling CTA buttons
- [ ] Add social proof section
- [ ] Optimize for mobile responsiveness

## Landing Page Redesign
- [x] Update color scheme to pitch black, white, and navy/royal blue
- [x] Redesign hero section with clear 5-second value proposition
- [x] Simplify all copy to 7th-grade reading level
- [x] Add high-tech visual elements and animations
- [x] Integrate Taptico logo prominently
- [x] Create compelling CTA buttons
- [x] Add social proof section
- [x] Optimize for mobile responsiveness
- [x] Prepare for Taptico.AI domain connection

## Logo and Pricing Page Updates
- [x] Copy white Taptico logo to public directory
- [x] Update landing page to use white logo on dark background
- [x] Update pricing page to match landing page black aesthetic
- [x] Ensure consistent branding across all pages

## Pricing Page Text Readability
- [x] Update package level buttons to be readable (white text)
- [x] Ensure all body text is white for visibility on dark background

## Pay-Per-Strategy Section and ADA Compliance
- [x] Update Pay-Per-Strategy title to white text
- [x] Update Pay-Per-Strategy feature list to white text
- [x] Fix Most Popular badge positioning (add padding to prevent cutoff)
- [x] Review all text contrast ratios for ADA compliance (WCAG AA standard)
- [x] Ensure all interactive elements have proper focus states
- [x] Verify color contrast meets 4.5:1 ratio for normal text

## Pricing Page Dynamic Animations
- [x] Add cursor-following glow effect on pricing cards
- [x] Implement floating/levitation animations for cards
- [x] Add animated gradient backgrounds
- [x] Create hover scale and glow effects on buttons
- [x] Add particle/dot background animations
- [x] Implement staggered fade-in animations
- [x] Ensure animations respect prefers-reduced-motion for accessibility

## Landing Page Dynamic Animations
- [x] Add animated gradient background to hero section
- [x] Implement particle/dot floating effects
- [x] Add cursor-following glow on hero CTA buttons
- [x] Create floating animations for feature cards
- [x] Implement cursor-following glow effects on feature cards
- [x] Add hover scale and glow effects on all interactive elements
- [x] Create shimmer effects on key sections
- [x] Add staggered fade-in animations for content
- [x] Ensure all animations respect prefers-reduced-motion
