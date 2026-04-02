import { attioKnowledge } from '$lib/data/attio-knowledge';
import type { UserAnswers } from '$lib/utils/types';

export function buildSystemPrompt(): string {
  return `You are an Attio CRM configuration expert. Your job is to generate a tailored Attio workspace configuration based on a user's business model, team structure, go-to-market motion, and current pain points.

You have deep knowledge of Attio's product capabilities. Here is the complete, verified Attio product data you must use as your source of truth:

${JSON.stringify(attioKnowledge, null, 2)}

INSTRUCTIONS:

1. Return ONLY the raw JSON object. Do not wrap it in markdown code fences. Do not include any text before or after the JSON. The response must begin with { and end with }.

2. The JSON must match this exact structure:
{
  "summary": "2-3 sentence overview of the recommended configuration",
  "objects": [
    {
      "name": "string",
      "type": "standard | custom",
      "reasoning": "string",
      "attributes": [{ "name": "string", "type": "string (one of Attio's 17 attribute types)", "purpose": "string" }],
      "setup_steps": ["string"]
    }
  ],
  "pipelines": [
    {
      "name": "string",
      "object": "string",
      "stages": [{ "name": "string", "purpose": "string" }],
      "reasoning": "string",
      "setup_steps": ["string"]
    }
  ],
  "automations": [
    {
      "name": "string",
      "trigger": "string",
      "actions": ["string"],
      "reasoning": "string",
      "setup_steps": ["string"]
    }
  ],
  "lists_and_views": [
    {
      "name": "string",
      "type": "list | table_view | kanban_view",
      "object": "string",
      "purpose": "string",
      "setup_steps": ["string"]
    }
  ],
  "integrations": [
    {
      "name": "string",
      "category": "string",
      "reasoning": "string",
      "setup_steps": ["string"]
    }
  ],
  "next_steps": ["string"]
}

3. For every recommendation:
   - Provide reasoning tied to the user's specific answers (their business model, team size, GTM motion, pain points, current tools)
   - Include actionable setup steps that reference real Attio UI paths (e.g., "Go to Workspace Settings > Objects > ...")
   - Only recommend automations using verified triggers and actions from the knowledge base
   - Only recommend integrations that exist in the knowledge base

4. Never use em dashes (the long dash character) in any text. Use commas, periods, semicolons, or parentheses instead.

5. Business-model-specific guidance:

SaaS guidance:
- Enable Deals object. Customize pipeline stages based on sales cycle (self-serve: Trial > Active > Churned; short cycle: Lead > Demo > Proposal > Won/Lost; long cycle: Lead > Discovery > Demo > Proposal > Negotiation > Won/Lost).
- If PLG/hybrid GTM: Enable Users and Workspaces objects to track product usage.
- Track ARR/MRR with Currency attributes on Deals or Companies.
- Recommend Slack integration for deal notifications, email sequencing (Outreach/Mixmax) for sales-led motions.
- Suggest lists: "Active Pipeline", "Churned Customers", "Expansion Opportunities".

VC/PE guidance:
- Enable Deals object, rename pipeline to "Deal Flow" with stages: Sourced > Screening > Due Diligence > IC Review > Term Sheet > Closed/Passed.
- Create custom objects: "Funds" (track fund status, target raise, committed capital), "LP Commitments" (track individual LP commitments, commitment status, capital committed).
- Use relationship attributes to link Companies (portfolio) to Funds and to People (founders).
- Recommend lists: "Active Deal Flow", "Portfolio Companies", "LP Relations".
- Kanban view for deal flow pipeline. Table view for portfolio monitoring.

Agency guidance:
- Enable Deals object for new business pipeline: Lead > Pitch > Proposal > Negotiation > Won/Lost.
- Create custom objects: "Projects" (track deliverables, timelines, status per client engagement) or "Campaigns" depending on agency type.
- Use relationship attributes to link Projects/Campaigns to Companies (clients) and People (client contacts).
- If retainer model: add "Retainers" list with renewal date, monthly value, status attributes.
- Recommend lists: "Active Projects", "New Business Pipeline", "Client Health".`;
}

export function buildUserMessage(answers: UserAnswers): string {
  const lines: string[] = [
    'Generate a tailored Attio CRM configuration based on the following user profile:',
    '',
    `Business model: ${formatBusinessModel(answers.business_model)}`,
    `Go-to-market motion: ${formatGTMMotion(answers.gtm_motion)}`,
    `Team size: ${formatTeamSize(answers.team_size)}`,
    `Currently tracking or wants to track: ${answers.tracking_entities?.join(', ') || 'Not specified'}`,
    `Current tools: ${answers.current_tools?.join(', ') || 'Not specified'}`,
    `Biggest pain point: ${answers.pain_points || 'Not specified'}`
  ];

  if (answers.sales_cycle) {
    lines.push(`Sales cycle: ${formatSalesCycle(answers.sales_cycle)}`);
  }
  if (answers.fund_stage) {
    lines.push(`Fund stage: ${formatFundStage(answers.fund_stage)}`);
  }
  if (answers.portfolio_size) {
    lines.push(`Portfolio size: ${formatPortfolioSize(answers.portfolio_size)}`);
  }
  if (answers.client_engagement_model) {
    lines.push(`Client engagement model: ${formatEngagementModel(answers.client_engagement_model)}`);
  }

  return lines.join('\n');
}

function formatBusinessModel(value?: string): string {
  const map: Record<string, string> = {
    saas: 'SaaS / Software',
    vc_pe: 'VC / PE / Investment',
    agency: 'Agency / Services'
  };
  return map[value || ''] || value || 'Not specified';
}

function formatGTMMotion(value?: string): string {
  const map: Record<string, string> = {
    product_led: 'Product-led',
    sales_led: 'Sales-led',
    hybrid: 'Hybrid'
  };
  return map[value || ''] || value || 'Not specified';
}

function formatTeamSize(value?: string): string {
  const map: Record<string, string> = {
    '1_5': '1-5 people',
    '6_20': '6-20 people',
    '21_50': '21-50 people',
    '51_plus': '51+ people'
  };
  return map[value || ''] || value || 'Not specified';
}

function formatSalesCycle(value: string): string {
  const map: Record<string, string> = {
    self_serve: 'Mostly self-serve',
    short_cycle: 'Short sales cycle (under 30 days)',
    long_cycle: 'Long sales cycle (30+ days)'
  };
  return map[value] || value;
}

function formatFundStage(value: string): string {
  const map: Record<string, string> = {
    emerging: 'Emerging / Fund I-II',
    established: 'Established / Fund III+'
  };
  return map[value] || value;
}

function formatPortfolioSize(value: string): string {
  const map: Record<string, string> = {
    small: 'Under 20',
    medium: '20-50',
    large: '50+'
  };
  return map[value] || value;
}

function formatEngagementModel(value: string): string {
  const map: Record<string, string> = {
    project: 'Project-based',
    retainer: 'Retainer-based',
    mixed: 'Mix of both'
  };
  return map[value] || value;
}
