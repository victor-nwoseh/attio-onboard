import type { Question, UserAnswers } from '$lib/utils/types';

export const questions: Question[] = [
  // Q1: Business model (always shown)
  {
    id: 'business_model',
    text: 'What type of business are you?',
    type: 'single_select',
    answerKey: 'business_model',
    options: [
      {
        value: 'saas',
        label: 'SaaS / Software',
        description: 'You sell software on a subscription or usage basis'
      },
      {
        value: 'vc_pe',
        label: 'VC / PE / Investment',
        description: 'You invest in or manage portfolio companies'
      },
      {
        value: 'agency',
        label: 'Agency / Services',
        description: 'You deliver services or campaigns for clients'
      }
    ]
  },

  // Q2: GTM motion (always shown, dynamic text and options)
  {
    id: 'gtm_motion',
    text: (answers: Partial<UserAnswers>) => {
      return answers.business_model === 'vc_pe'
        ? 'How do you source deals?'
        : 'How do you acquire customers?';
    },
    type: 'single_select',
    answerKey: 'gtm_motion',
    options: (answers: Partial<UserAnswers>) => {
      if (answers.business_model === 'vc_pe') {
        return [
          {
            value: 'product_led',
            label: 'Inbound',
            description: 'Founders come to you through reputation, content, or referrals'
          },
          {
            value: 'sales_led',
            label: 'Outbound',
            description: 'You actively source and reach out to founders'
          },
          {
            value: 'hybrid',
            label: 'Both',
            description: 'A mix of inbound interest and proactive sourcing'
          }
        ];
      }
      return [
        {
          value: 'product_led',
          label: 'Product-led',
          description: 'Users sign up and try the product before talking to sales'
        },
        {
          value: 'sales_led',
          label: 'Sales-led',
          description: 'Your sales team drives most new business'
        },
        {
          value: 'hybrid',
          label: 'Hybrid',
          description: 'A mix of self-serve signups and sales outreach'
        }
      ];
    }
  },

  // Q3: Team size (always shown)
  {
    id: 'team_size',
    text: 'How large is your team?',
    type: 'single_select',
    answerKey: 'team_size',
    options: [
      { value: '1_5', label: '1-5 people' },
      { value: '6_20', label: '6-20 people' },
      { value: '21_50', label: '21-50 people' },
      { value: '51_plus', label: '51+ people' }
    ]
  },

  // Q4: Tracking entities (always shown, dynamic options)
  {
    id: 'tracking_entities',
    text: 'What do you currently track or want to track?',
    type: 'multi_select',
    answerKey: 'tracking_entities',
    options: (answers: Partial<UserAnswers>) => {
      if (answers.business_model === 'vc_pe') {
        return [
          { value: 'deal_flow', label: 'Deal flow' },
          { value: 'portfolio_companies', label: 'Portfolio companies' },
          { value: 'lps_investors', label: 'LPs / Investors' },
          { value: 'fund_performance', label: 'Fund performance' },
          { value: 'founder_relationships', label: 'Founder relationships' },
          { value: 'co_investors', label: 'Co-investors' }
        ];
      }
      if (answers.business_model === 'agency') {
        return [
          { value: 'clients', label: 'Clients' },
          { value: 'projects_campaigns', label: 'Projects / Campaigns' },
          { value: 'retainers', label: 'Retainers' },
          { value: 'proposals_pitches', label: 'Proposals / Pitches' },
          { value: 'deliverables', label: 'Deliverables' },
          { value: 'client_contacts', label: 'Contacts at client companies' }
        ];
      }
      // Default: SaaS
      return [
        { value: 'leads', label: 'Leads' },
        { value: 'deals_opportunities', label: 'Deals / Opportunities' },
        { value: 'customers', label: 'Customers' },
        { value: 'subscriptions_arr', label: 'Subscriptions / ARR' },
        { value: 'support_tickets', label: 'Support tickets' },
        { value: 'product_usage', label: 'Product usage' }
      ];
    }
  },

  // Q5: Current tools (always shown)
  {
    id: 'current_tools',
    text: 'What tools do you currently use?',
    type: 'multi_select',
    answerKey: 'current_tools',
    options: [
      { value: 'spreadsheets', label: 'Spreadsheets (Excel / Google Sheets)' },
      { value: 'hubspot', label: 'HubSpot' },
      { value: 'salesforce', label: 'Salesforce' },
      { value: 'pipedrive', label: 'Pipedrive' },
      { value: 'notion', label: 'Notion' },
      { value: 'airtable', label: 'Airtable' },
      { value: 'other_crm', label: 'Another CRM' },
      { value: 'nothing', label: 'Nothing yet' }
    ]
  },

  // Q6: Pain points (always shown)
  {
    id: 'pain_points',
    text: "What's your biggest pain point with your current setup?",
    type: 'text',
    answerKey: 'pain_points',
    placeholder: 'e.g., Data is scattered across tools, no visibility into pipeline, manual data entry...'
  },

  // Q7: Sales cycle (SaaS only)
  {
    id: 'sales_cycle',
    text: 'What does your typical sales cycle look like?',
    type: 'single_select',
    answerKey: 'sales_cycle',
    condition: (answers: Partial<UserAnswers>) => answers.business_model === 'saas',
    options: [
      {
        value: 'self_serve',
        label: 'Mostly self-serve',
        description: 'Customers sign up, upgrade, and manage themselves'
      },
      {
        value: 'short_cycle',
        label: 'Short sales cycle (under 30 days)',
        description: 'Quick demos and fast decisions'
      },
      {
        value: 'long_cycle',
        label: 'Long sales cycle (30+ days)',
        description: 'Multiple stakeholders, procurement, negotiations'
      }
    ]
  },

  // Q8: Fund stage (VC only)
  {
    id: 'fund_stage',
    text: 'What stage is your fund?',
    type: 'single_select',
    answerKey: 'fund_stage',
    condition: (answers: Partial<UserAnswers>) => answers.business_model === 'vc_pe',
    options: [
      {
        value: 'emerging',
        label: 'Emerging / Fund I-II',
        description: 'Building track record, smaller team'
      },
      {
        value: 'established',
        label: 'Established / Fund III+',
        description: 'Proven track record, larger portfolio'
      }
    ]
  },

  // Q9: Portfolio size (VC only)
  {
    id: 'portfolio_size',
    text: 'How many portfolio companies do you manage?',
    type: 'single_select',
    answerKey: 'portfolio_size',
    condition: (answers: Partial<UserAnswers>) => answers.business_model === 'vc_pe',
    options: [
      { value: 'small', label: 'Under 20' },
      { value: 'medium', label: '20-50' },
      { value: 'large', label: '50+' }
    ]
  },

  // Q10: Client engagement model (Agency only)
  {
    id: 'client_engagement_model',
    text: 'How do you typically engage with clients?',
    type: 'single_select',
    answerKey: 'client_engagement_model',
    condition: (answers: Partial<UserAnswers>) => answers.business_model === 'agency',
    options: [
      {
        value: 'project',
        label: 'Project-based',
        description: 'Defined scope, timeline, and deliverables per engagement'
      },
      {
        value: 'retainer',
        label: 'Retainer-based',
        description: 'Ongoing monthly relationship with recurring work'
      },
      {
        value: 'mixed',
        label: 'Mix of both'
      }
    ]
  }
];
