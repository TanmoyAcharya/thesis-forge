export interface GeneratePayload {
  field: string;
  subdomain: string;
  interests: string;
  tools: string[];
  degreeLevel: "Bachelor's" | "Master's" | "PhD";
  paperContext?: string;
}

export interface ResearchIdea {
  id: number;
  title: string;
  problemStatement: string;
  feasibilityScore: number;
  feasibilityJustification: string;
  noveltyScore: number;
  noveltyJustification: string;
  methodology: string[];
  expectedOutcomes: string[];
  experimentDesign?: string;
  suggestedTools: string[];
  estimatedDuration: string;
}

export interface GenerateResponse {
  ideas: ResearchIdea[];
  field: string;
  generatedAt: string;
}
