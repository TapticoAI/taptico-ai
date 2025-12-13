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
