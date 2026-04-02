export const attioKnowledge = {
  standardObjects: {
    people: {
      description: 'Represents human beings. Available in all workspaces.',
      defaultAttributes: [
        'Name', 'Email addresses', 'Phone numbers', 'Job title',
        'Description', 'Primary location', 'Company (relationship)',
        'LinkedIn', 'Twitter', 'Facebook', 'Instagram', 'AngelList'
      ],
      behaviors: [
        'Auto-created when emails are synced based on email domain',
        'Automatically enriched from Attio\'s data sources',
        'Email addresses are unique identifiers'
      ]
    },
    companies: {
      description: 'Represents businesses: customers, partners, suppliers. Available in all workspaces.',
      defaultAttributes: [
        'Name', 'Description', 'Domains', 'Primary location',
        'Categories', 'Team (relationship to People)',
        'LinkedIn', 'Twitter', 'Facebook', 'Instagram', 'AngelList'
      ],
      behaviors: [
        'Auto-created when people are added based on email domain matching',
        'Automatically enriched from Attio\'s data sources',
        'Domains are unique identifiers'
      ]
    },
    deals: {
      description: 'Represents transactions involving people and companies. Optional, admin-enabled.',
      defaultAttributes: [
        'Name (text, required)',
        'Stage (status: Lead, In Progress, Won, Lost - customizable)',
        'Owner (actor reference)',
        'Value (currency, defaults to USD)',
        'Associated People (record reference)',
        'Associated Company (record reference)'
      ],
      behaviors: [
        'Must be enabled by admin in Workspace Settings > Objects',
        'Pipeline stages are customizable per workspace',
        'No unique attribute by default'
      ]
    },
    users: {
      description: 'Represents users of your product. Optional, designed for PLG companies.',
      enablement: 'Admin-enabled in Workspace Settings > Objects',
      purpose: 'Track product usage data and auto-generate leads from PLG flywheel'
    },
    workspaces: {
      description: 'Groups users of your product. Optional, designed for PLG companies.',
      enablement: 'Admin-enabled in Workspace Settings > Objects',
      purpose: 'Organize and display data about how users interact with workspaces they\'ve created'
    }
  },

  customObjects: {
    description: 'Custom objects let you model any entity your business tracks that isn\'t covered by standard objects.',
    examples: ['LPs', 'Managed Funds', 'Investor Commitments', 'Partners', 'Invoices', 'Products', 'Projects'],
    creation: 'Workspace Settings > Objects > Create new object. Admin-only.',
    planLimits: { free: 3, plus: 5, pro: 12, enterprise: 'unlimited' },
    relationships: 'Use Relationship attributes to link custom objects to other objects. Supports one-to-many and one-to-one.'
  },

  attributeTypes: [
    'Text', 'Number', 'Currency', 'Date', 'Timestamp', 'Checkbox',
    'Select', 'Status', 'Rating', 'Email address', 'Phone number',
    'Domain', 'Location', 'Personal name', 'Record reference',
    'Actor reference', 'Interaction'
  ],

  lists: {
    description: 'Customizable groupings of records. Used to model business processes.',
    features: [
      'Lists can have their own list-specific attributes separate from object attributes',
      'Records can appear in multiple lists',
      'Entries are instances of records within a list'
    ],
    creation: 'Sidebar > Create new list. Choose which object the list is based on.'
  },

  views: {
    table: 'Spreadsheet-style layout. Filter, sort, edit directly. Customize columns.',
    kanban: 'Visual board. Cards move between stages of a Status attribute. Drag and drop.',
    creation: 'Within any object or list, click Views > Create new view. Choose Table or Kanban.'
  },

  automations: {
    description: 'Visual drag-and-drop workflow builder.',
    triggerCategories: ['Records', 'Lists', 'Data', 'Tasks', 'Utilities', 'Integrations'],
    actionCategories: ['Records', 'Lists', 'Tasks', 'Calculations', 'Conditions', 'Delays', 'AI', 'Workspace', 'Utilities', 'Integrations'],
    verifiedTriggers: [
      'When a record is created',
      'When a record attribute is updated (e.g., Deal stage changes)',
      'When a record is added to a list',
      'On a recurring schedule',
      'When a webhook is received (e.g., Typeform submission)'
    ],
    verifiedActions: [
      'Create a record',
      'Update a record',
      'Add a record to a list',
      'Send a Slack message',
      'Add contact to Outreach sequence',
      'Add contact to Mixmax sequence',
      'Add subscriber to Mailchimp',
      'Summarize record (AI)',
      'AI completion (generate text using AI)',
      'If/Else conditional branching',
      'Switch (multi-path branching)',
      'Filter (continue only if conditions met)',
      'Delay (wait a set time)',
      'Delay Until (wait until a specific date)'
    ],
    templates: [
      'Won deal summary (AI-generated)',
      'Deal handoff to Customer Success',
      'Churn outreach reminder',
      'Renewal date tracking',
      'Closed-won Slack notification'
    ],
    creation: 'Sidebar > Automations > Create workflow. Add trigger, then chain action blocks.'
  },

  reporting: {
    types: [
      'Insight reports (analyze current data, e.g., customer geographic distribution)',
      'Historical values (track changes over time)',
      'Funnel reports (pipeline conversion rates, supports Deal value)',
      'Time in stage reports (avg/min/max time in pipeline stages)',
      'Stage changed reports (record movement between stages)'
    ],
    dashboards: 'Combine multiple reports into a single dashboard. Real-time data.',
    creation: 'Sidebar > Reports > Create report. Choose type and configure data source.'
  },

  integrations: {
    native: {
      communication: ['Gmail', 'Outlook', 'Slack'],
      calling: ['Aircall', 'Google Meet', 'Microsoft Teams', 'Zoom', 'Fireflies.ai', 'Circleback'],
      emailSequencing: ['Outreach', 'Mixmax', 'Mailchimp', 'Customer.io'],
      dataEnrichment: ['Census', 'Hightouch', 'Polytomic', 'Specter'],
      formsSurveys: ['Typeform', 'Fillout'],
      analytics: ['June', 'Segment'],
      storage: ['Google Drive', 'Dropbox', 'Box', 'Microsoft OneDrive'],
      customerSupport: ['Pylon'],
      billing: ['Maple Billing', 'Sequence'],
      productManagement: ['Miro Insights']
    },
    middleware: ['Zapier', 'Pipedream', 'n8n'],
    importFrom: ['Salesforce', 'HubSpot', 'Pipedrive', 'Zoho', 'Excel', 'CSV'],
    emailCalendarSync: 'Gmail and Outlook sync email and calendar in real-time. Auto-populates People and Companies from inbox.'
  }
};
