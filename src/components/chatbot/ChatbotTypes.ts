export interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  content: string;
  options?: ChatOption[];
  timestamp: Date;
}

export interface ChatOption {
  id: string;
  icon: string;
  label: string;
  action: string;
}

export type ChatFlowState = 
  | 'greeting'
  | 'main-menu'
  | 'logistics-menu'
  | 'product-flow'
  | 'consultation-start'
  | 'consultation-medication'
  | 'consultation-pregnant'
  | 'consultation-allergies'
  | 'consultation-goal'
  | 'consultation-expert'
  | 'location'
  | 'returns'
  | 'payment'
  | 'tracking'
  | 'shipping'
  | 'promotions';
