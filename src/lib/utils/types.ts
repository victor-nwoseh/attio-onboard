// Business model options
export type BusinessModel = 'saas' | 'vc_pe' | 'agency';

// GTM motion options
export type GTMMotion = 'product_led' | 'sales_led' | 'hybrid';

// Team size ranges
export type TeamSize = '1_5' | '6_20' | '21_50' | '51_plus';

// Question types
export type QuestionType = 'single_select' | 'multi_select' | 'text';

// A single question definition
export interface Question {
  id: string;
  text: string | ((answers: Partial<UserAnswers>) => string);
  subtext?: string;
  type: QuestionType;
  options?: QuestionOption[] | ((answers: Partial<UserAnswers>) => QuestionOption[]);
  placeholder?: string;
  condition?: (answers: Partial<UserAnswers>) => boolean;
  answerKey: keyof UserAnswers;
}

// An option within a select question
export interface QuestionOption {
  value: string;
  label: string;
  description?: string;
}

// All user answers collected during the flow.
// All fields are optional because answers are collected incrementally.
// By the time the form is submitted, business_model, gtm_motion, team_size,
// tracking_entities, current_tools, and pain_points will always be populated.
// The remaining fields depend on the business model.
export interface UserAnswers {
  business_model?: BusinessModel;
  gtm_motion?: GTMMotion;
  team_size?: TeamSize;
  tracking_entities?: string[];
  current_tools?: string[];
  pain_points?: string;
  // Business-model-specific fields (conditional)
  fund_stage?: string;
  portfolio_size?: string;
  sales_cycle?: string;
  client_engagement_model?: string;
}

// The generated configuration output
export interface AttioConfiguration {
  summary: string;
  objects: ObjectRecommendation[];
  pipelines: PipelineRecommendation[];
  automations: AutomationRecommendation[];
  lists_and_views: ListViewRecommendation[];
  integrations: IntegrationRecommendation[];
  next_steps: string[];
}

export interface ObjectRecommendation {
  name: string;
  type: 'standard' | 'custom';
  reasoning: string;
  attributes: AttributeRecommendation[];
  setup_steps: string[];
}

export interface AttributeRecommendation {
  name: string;
  type: string;
  purpose: string;
}

export interface PipelineRecommendation {
  name: string;
  object: string;
  stages: StageRecommendation[];
  reasoning: string;
  setup_steps: string[];
}

export interface StageRecommendation {
  name: string;
  purpose: string;
}

export interface AutomationRecommendation {
  name: string;
  trigger: string;
  actions: string[];
  reasoning: string;
  setup_steps: string[];
}

export interface ListViewRecommendation {
  name: string;
  type: 'list' | 'table_view' | 'kanban_view';
  object: string;
  purpose: string;
  setup_steps: string[];
}

export interface IntegrationRecommendation {
  name: string;
  category: string;
  reasoning: string;
  setup_steps: string[];
}
