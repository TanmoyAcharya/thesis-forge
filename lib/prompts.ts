import { GeneratePayload } from "@/types";

const fieldTools: Record<string, string[]> = {
  "Electrical Engineering": ["Simulink", "MATLAB", "PSIM", "LTspice", "Multisim"],
  "Mechanical Engineering": ["SolidWorks", "ANSYS", "AutoCAD", "Abaqus", "CATIA"],
  "Metallurgy & Materials Engineering": ["Thermo-Calc", "CALPHAD", "JMatPro", "FactSage", "COMSOL"],
  "Chemical Engineering": ["Aspen Plus", "COMSOL", "HYSYS", "ProII", "gPROMS"],
  "Computer Science & Engineering": ["Python", "TensorFlow", "PyTorch", "ROS", "OpenCV"],
};

export function buildSystemPrompt(payload: GeneratePayload): string {
  const availableTools = fieldTools[payload.field] ?? payload.tools;

  return `You are an expert academic research advisor specializing in ${payload.field}.
Your role is to generate exactly 5 novel, feasible, and publication-worthy thesis research ideas for a ${payload.degreeLevel} student.

The student's engineering field is ${payload.field}. Common tools in this field include: ${availableTools.join(", ")}.

For each idea, provide:
1. A specific, academic-sounding title
2. A clear problem statement (2-3 sentences)
3. A feasibility score from 1-10 with justification (how achievable it is for the stated degree level)
4. A novelty score from 1-10 with justification (how original it is vs. existing research)
5. A step-by-step methodology (array of steps)
6. Expected outcomes (array)
7. A detailed experiment design description
8. Suggested tools from the field's toolkit
9. Estimated duration (e.g., "6 months", "1 year")

IMPORTANT: You MUST respond with valid JSON only. No markdown, no code blocks, no extra text.
The JSON must match this exact structure:
{
  "ideas": [
    {
      "id": 1,
      "title": "...",
      "problemStatement": "...",
      "feasibilityScore": 8,
      "feasibilityJustification": "...",
      "noveltyScore": 7,
      "noveltyJustification": "...",
      "methodology": ["Step 1: ...", "Step 2: ..."],
      "expectedOutcomes": ["Outcome 1", "Outcome 2"],
      "experimentDesign": "...",
      "suggestedTools": ["Tool1", "Tool2"],
      "estimatedDuration": "..."
    }
  ],
  "field": "${payload.field}",
  "generatedAt": "${new Date().toISOString()}"
}`;
}

export function buildUserPrompt(payload: GeneratePayload): string {
  const lines: string[] = [
    `Generate 5 novel thesis research ideas with the following context:`,
    `- Engineering Field: ${payload.field}`,
    `- Sub-domain / Specialization: ${payload.subdomain}`,
    `- Research Interests: ${payload.interests}`,
    `- Degree Level: ${payload.degreeLevel}`,
    `- Available Tools: ${payload.tools.length > 0 ? payload.tools.join(", ") : "Standard field tools"}`,
  ];

  if (payload.paperContext) {
    lines.push(
      `\nContext from uploaded research papers (use this to inform and differentiate the ideas):\n${payload.paperContext}`
    );
  }

  lines.push(
    `\nEnsure all ideas are specifically tailored to the tools and sub-domain provided. Each idea should be directly implementable using the listed tools.`
  );

  return lines.join("\n");
}
