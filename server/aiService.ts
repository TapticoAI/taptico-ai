import { invokeLLM } from "./_core/llm";
import type { Project } from "../drizzle/schema";

/**
 * AI Service for generating marketing strategies using multi-stage prompt architecture.
 * Implements first-principles thinking, positioning theory, and customer psychology frameworks.
 */

export interface DiagnosisResult {
  diagnosis: string;
  bottleneck: string;
  opportunity: string;
  ignore: string;
}

export interface ModuleContent {
  executiveBrief: string;
  marketPositioning: string;
  growthStrategy: string;
  funnelArchitecture: string;
  contentMessaging: string;
  executionRoadmap: string;
  toolRecommendations: string;
}

/**
 * Stage 1: Generate core strategic diagnosis
 */
export async function generateDiagnosis(project: Project): Promise<DiagnosisResult> {
  const prompt = `You are a world-class Chief Marketing Officer with 20 years of experience at top consulting firms like McKinsey, BCG, and Bain, as well as high-growth startups. You have a PhD in marketing and are an expert in positioning theory, customer psychology, and growth strategy.

A user has provided the following information about their business:

Business Name: ${project.businessName}
Website: ${project.website || "Not provided"}
Industry: ${project.industry}
Target Customer: ${project.targetCustomer}
Offer and Pricing: ${project.offerPricing}
Primary Growth Goal: ${project.growthGoal}
Current Marketing Channels: ${project.currentChannels || "None specified"}
Budget Range: ${project.budget || "Not specified"}
Constraints: ${project.constraints || "None specified"}

Your task is to diagnose this business like a senior strategist. Think step-by-step and apply first-principles thinking, positioning theory, and customer psychology.

Identify:
1. The business's current market position (strengths, weaknesses, opportunities, threats)
2. The single most significant factor limiting growth (the core bottleneck)
3. The single most promising avenue for growth (the primary opportunity)
4. What the business should ignore or deprioritize at this stage

Your output must be a JSON object with the following structure:
{
  "diagnosis": "A 2-3 sentence summary of the business's current state",
  "bottleneck": "A 1-2 sentence description of the core growth bottleneck",
  "opportunity": "A 1-2 sentence description of the primary opportunity",
  "ignore": "A 1-2 sentence description of what to ignore or deprioritize"
}

Be specific and actionable. Do not use jargon or generic advice. Your diagnosis should be defensible and grounded in established marketing principles.`;

  const response = await invokeLLM({
    messages: [{ role: "user", content: prompt }],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "diagnosis",
        strict: true,
        schema: {
          type: "object",
          properties: {
            diagnosis: { type: "string" },
            bottleneck: { type: "string" },
            opportunity: { type: "string" },
            ignore: { type: "string" },
          },
          required: ["diagnosis", "bottleneck", "opportunity", "ignore"],
          additionalProperties: false,
        },
      },
    },
  });

  const content = response.choices[0]?.message?.content;
  if (!content || typeof content !== "string") {
    throw new Error("No response from AI");
  }

  return JSON.parse(content) as DiagnosisResult;
}

/**
 * Stage 2: Generate Executive CMO Brief module
 */
export async function generateExecutiveBrief(
  project: Project,
  diagnosis: DiagnosisResult
): Promise<string> {
  const prompt = `You are a world-class Chief Marketing Officer providing an executive summary.

Business Context:
- Business Name: ${project.businessName}
- Industry: ${project.industry}
- Growth Goal: ${project.growthGoal}

Strategic Diagnosis:
- Current State: ${diagnosis.diagnosis}
- Core Bottleneck: ${diagnosis.bottleneck}
- Primary Opportunity: ${diagnosis.opportunity}
- What to Ignore: ${diagnosis.ignore}

Your task is to write an Executive CMO Brief that provides a high-level summary for executives, investors, or board members. Structure your response with these four sections:

**Business Diagnosis**: A concise summary of the business's current market position, including strengths, weaknesses, and the primary challenge.

**Core Growth Bottleneck**: The single most significant factor limiting growth. Be specific about whether it's awareness, conversion, retention, or positioning.

**Primary Opportunity**: The most promising avenue for growth given current resources and market conditions. Explain why this is the highest-leverage opportunity.

**What to Ignore**: Activities or channels that are commonly pursued but are not the highest priority for this business at this stage. Help the user focus their limited resources.

Write in a confident, clear tone. Avoid jargon. Aim for 7th-grade reading level but maintain intellectual rigor. Be specific and actionable.`;

  const response = await invokeLLM({
    messages: [{ role: "user", content: prompt }],
  });

  const content = response.choices[0]?.message?.content;
  return typeof content === "string" ? content : "";
}

/**
 * Stage 2: Generate Market Positioning module
 */
export async function generateMarketPositioning(
  project: Project,
  diagnosis: DiagnosisResult
): Promise<string> {
  const prompt = `You are a world-class Chief Marketing Officer with deep expertise in positioning theory, brand strategy, and customer psychology.

Business Context:
- Business Name: ${project.businessName}
- Industry: ${project.industry}
- Target Customer: ${project.targetCustomer}
- Offer: ${project.offerPricing}

Strategic Insights:
- Diagnosis: ${diagnosis.diagnosis}
- Core Bottleneck: ${diagnosis.bottleneck}
- Primary Opportunity: ${diagnosis.opportunity}

Your task is to define the market positioning for this business. Structure your response with these four sections:

**Ideal Customer Profile (ICP)**: A detailed description of the target customer, including demographics, psychographics, pain points, and buying behavior. Go beyond a simple persona to provide actionable insights about what motivates them and how they make decisions.

**Category and Sub-Category**: The specific market category the business operates in, and the more granular sub-category that allows for differentiation. Explain why this categorization is strategic and how it helps the business stand out.

**Differentiation Statement**: A clear, one-sentence statement that articulates what makes the business unique and why a customer should choose it over competitors. This statement must be defensible and based on a real competitive advantage.

**Brand Narrative**: The overarching story the business tells about itself, its mission, and its value to customers. This narrative should be emotionally resonant and align with the ICP's values. Write 2-3 paragraphs that capture the essence of the brand.

Your output must be clear, specific, and grounded in positioning theory. Avoid jargon and generic statements. The positioning should be differentiated and defensible.`;

  const response = await invokeLLM({
    messages: [{ role: "user", content: prompt }],
  });

  const content = response.choices[0]?.message?.content;
  return typeof content === "string" ? content : "";
}

/**
 * Stage 2: Generate Growth Strategy module
 */
export async function generateGrowthStrategy(
  project: Project,
  diagnosis: DiagnosisResult
): Promise<string> {
  const prompt = `You are a world-class Chief Marketing Officer with expertise in growth strategy and channel prioritization.

Business Context:
- Business Name: ${project.businessName}
- Industry: ${project.industry}
- Growth Goal: ${project.growthGoal}
- Budget: ${project.budget || "Not specified"}
- Current Channels: ${project.currentChannels || "None"}

Strategic Insights:
- Primary Opportunity: ${diagnosis.opportunity}
- Core Bottleneck: ${diagnosis.bottleneck}

Your task is to outline the high-level growth strategy. Structure your response with these four sections:

**Primary Growth Lever**: The single most important mechanism for driving growth. This could be a specific channel (content marketing, paid ads), a product feature (viral referral loop), or a strategic partnership. Explain why this is the highest-impact lever and how it addresses the core bottleneck.

**Secondary Levers**: 2-3 additional mechanisms that support the primary lever and provide diversification. Explain how these work together with the primary lever.

**Channel Prioritization**: A ranked list of marketing channels with a clear rationale for each. Explain why certain channels are prioritized and why others are deprioritized. Consider the budget, team size, and time constraints.

**90-Day Focus**: A clear, specific statement of what the business should focus on in the next 90 days to achieve the greatest impact. Provide a concrete starting point for execution.

Be specific about tactics and timelines. Avoid generic advice. Ground your recommendations in the business's specific constraints and opportunities.`;

  const response = await invokeLLM({
    messages: [{ role: "user", content: prompt }],
  });

  const content = response.choices[0]?.message?.content;
  return typeof content === "string" ? content : "";
}

/**
 * Stage 2: Generate Funnel Architecture module
 */
export async function generateFunnelArchitecture(
  project: Project,
  diagnosis: DiagnosisResult
): Promise<string> {
  const prompt = `You are a world-class Chief Marketing Officer with expertise in funnel design and conversion optimization.

Business Context:
- Business Name: ${project.businessName}
- Industry: ${project.industry}
- Offer: ${project.offerPricing}
- Target Customer: ${project.targetCustomer}

Strategic Insights:
- Primary Opportunity: ${diagnosis.opportunity}
- Core Bottleneck: ${diagnosis.bottleneck}

Your task is to map out the customer journey from awareness to conversion, retention, and expansion. Structure your response with these four sections:

**Awareness Strategy**: How the business will generate initial awareness among its target audience. Include specific tactics, channels, and key messages. Be concrete about what content or campaigns will be used.

**Conversion Paths**: The specific steps a prospect takes to become a customer. Map out landing pages, lead magnets, sales calls, trials, or other touchpoints. Explain the logic behind each step.

**Offers**: The specific offers or incentives that will drive conversion at each stage. This could include free trials, discounts, content upgrades, consultations, or guarantees. Explain why each offer is strategically chosen.

**Retention and Expansion**: Strategies for keeping customers engaged and increasing their lifetime value. Include onboarding, customer success, upsells, cross-sells, and community building. Focus on the first 90 days of the customer relationship.

Provide a clear blueprint for how prospects move through each stage. Be specific about tactics and touchpoints.`;

  const response = await invokeLLM({
    messages: [{ role: "user", content: prompt }],
  });

  const content = response.choices[0]?.message?.content;
  return typeof content === "string" ? content : "";
}

/**
 * Stage 2: Generate Content and Messaging module
 */
export async function generateContentMessaging(
  project: Project,
  diagnosis: DiagnosisResult
): Promise<string> {
  const prompt = `You are a world-class Chief Marketing Officer with expertise in messaging, copywriting, and content strategy.

Business Context:
- Business Name: ${project.businessName}
- Industry: ${project.industry}
- Target Customer: ${project.targetCustomer}
- Offer: ${project.offerPricing}

Strategic Insights:
- Primary Opportunity: ${diagnosis.opportunity}
- Diagnosis: ${diagnosis.diagnosis}

Your task is to define the core messages and content themes. Structure your response with these four sections:

**Core Message**: The single most important message the business wants to communicate to its target audience. This is the foundation for all other messaging. Make it clear, compelling, and focused on customer value.

**Hooks**: 5-7 attention-grabbing headlines, subject lines, or opening statements that will be used to capture the audience's interest. These should be specific to the business and its value proposition, not generic templates.

**Content Themes**: 3-5 overarching topics and narratives that will be explored in the business's content marketing efforts. These themes should align with the ICP's interests, pain points, and the strategic opportunity. Explain why each theme is strategically important.

**Sales Talking Points**: 5-7 key points that sales teams or customer-facing employees should emphasize when speaking with prospects or customers. These should address common objections, highlight unique benefits, and reinforce the differentiation statement.

Ensure consistency and clarity in all communication. The messaging should be emotionally resonant while remaining grounded in the business's actual capabilities.`;

  const response = await invokeLLM({
    messages: [{ role: "user", content: prompt }],
  });

  const content = response.choices[0]?.message?.content;
  return typeof content === "string" ? content : "";
}

/**
 * Stage 2: Generate Execution Roadmap module
 */
export async function generateExecutionRoadmap(
  project: Project,
  diagnosis: DiagnosisResult
): Promise<string> {
  const prompt = `You are a world-class Chief Marketing Officer with expertise in execution planning and project management.

Business Context:
- Business Name: ${project.businessName}
- Industry: ${project.industry}
- Growth Goal: ${project.growthGoal}
- Budget: ${project.budget || "Not specified"}
- Constraints: ${project.constraints || "None specified"}

Strategic Insights:
- Primary Opportunity: ${diagnosis.opportunity}
- Core Bottleneck: ${diagnosis.bottleneck}

Your task is to break down the strategy into a concrete, time-bound action plan. Structure your response with these three sections:

**30-60-90 Day Plan**: A detailed plan that outlines specific tasks and milestones for the first 30, 60, and 90 days. For each period, list 3-5 key tasks with estimated time commitments and priority levels (High/Medium/Low). Be specific about deliverables.

**Weekly Priorities**: A breakdown of the most important tasks to complete each week within the first 30 days. This provides a concrete starting point for immediate action.

**KPI Tracking**: The specific key performance indicators that should be tracked to measure success. For each KPI, provide a target value and explain why it's important. Include both leading indicators (activities) and lagging indicators (results).

Make the roadmap actionable and realistic given the business's constraints. Prioritize ruthlessly and focus on high-impact activities.`;

  const response = await invokeLLM({
    messages: [{ role: "user", content: prompt }],
  });

  const content = response.choices[0]?.message?.content;
  return typeof content === "string" ? content : "";
}

/**
 * Stage 2: Generate Tool and AI Stack Recommendations module
 */
export async function generateToolRecommendations(
  project: Project,
  diagnosis: DiagnosisResult
): Promise<string> {
  const prompt = `You are a world-class Chief Marketing Officer with expertise in marketing technology and tool selection.

Business Context:
- Business Name: ${project.businessName}
- Industry: ${project.industry}
- Budget: ${project.budget || "Not specified"}
- Constraints: ${project.constraints || "None specified"}

Strategic Insights:
- Primary Opportunity: ${diagnosis.opportunity}

Your task is to recommend specific tools and technologies for executing the marketing strategy. Structure your response with these four sections:

**CRM**: Recommendations for customer relationship management software. Consider ease of use, integration capabilities, and pricing. Suggest 2-3 options with pros/cons for each.

**Automation**: Tools for marketing automation, email marketing, and workflow automation. Prioritize High Level and Make.com where appropriate, as the user has accounts with these platforms. Explain specific use cases for each tool.

**AI Usage**: Specific recommendations for how the business can leverage AI tools (ChatGPT, Jasper, Midjourney, etc.) to enhance their marketing efforts. Provide concrete examples of tasks that can be automated or augmented with AI.

**No-Code Stack Suggestions**: Recommendations for no-code or low-code tools that allow non-technical users to build landing pages, forms, and other marketing assets. Consider tools like Webflow, Carrd, Typeform, and others.

Take into account the business's budget, team size, and technical capabilities. Prioritize tools that provide the best ROI and are easy to implement.`;

  const response = await invokeLLM({
    messages: [{ role: "user", content: prompt }],
  });

  const content = response.choices[0]?.message?.content;
  return typeof content === "string" ? content : "";
}

/**
 * Stage 3: Generate deeper explanation for a module
 */
export async function generateDeeperExplanation(
  moduleName: string,
  currentContent: string,
  project: Project
): Promise<string> {
  const prompt = `You are a world-class Chief Marketing Officer providing advanced strategic guidance.

Business Context:
- Business Name: ${project.businessName}
- Industry: ${project.industry}

A user has received the following content for the ${moduleName} module of their marketing strategy:

${currentContent}

The user has requested a deeper, more advanced explanation of this content. Your task is to:

1. Provide additional context and reasoning for the recommendations
2. Explain the underlying principles and frameworks that support the strategy
3. Offer advanced tactics or considerations that were not included in the initial output
4. Anticipate potential objections or questions and address them proactively

Your output should be 3-4 paragraphs of additional insight that builds on the original content. Maintain the same confident, clear tone. Be specific and avoid generic advice.`;

  const response = await invokeLLM({
    messages: [{ role: "user", content: prompt }],
  });

  const content = response.choices[0]?.message?.content;
  return typeof content === "string" ? content : "";
}

/**
 * Stage 3: Regenerate a module with user feedback
 */
export async function regenerateModule(
  moduleName: string,
  currentContent: string,
  userFeedback: string,
  project: Project,
  diagnosis: DiagnosisResult
): Promise<string> {
  const prompt = `You are a world-class Chief Marketing Officer providing strategic guidance.

Business Context:
- Business Name: ${project.businessName}
- Industry: ${project.industry}

Strategic Insights:
- Diagnosis: ${diagnosis.diagnosis}
- Core Bottleneck: ${diagnosis.bottleneck}
- Primary Opportunity: ${diagnosis.opportunity}

A user has received the following content for the ${moduleName} module:

${currentContent}

The user has provided this feedback:

"${userFeedback}"

Your task is to regenerate the ${moduleName} module, taking the user's feedback into account. Provide an alternative approach or perspective that addresses their concerns while maintaining strategic rigor. Keep the same structure and level of detail as the original, but adjust the content based on the feedback.`;

  const response = await invokeLLM({
    messages: [{ role: "user", content: prompt }],
  });

  const content = response.choices[0]?.message?.content;
  return typeof content === "string" ? content : "";
}
