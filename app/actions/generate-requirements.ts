"use server"

import { generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"

const RequirementsSchema = z.object({
  requirements: z.array(z.string()).describe("Detailed functional and technical requirements"),
  userStories: z
    .array(z.string())
    .describe("User stories in the format: As a [user type], I want [goal] so that [benefit]"),
  acceptanceCriteria: z
    .array(z.string())
    .describe("Specific, testable acceptance criteria using Given-When-Then format where appropriate"),
})

interface GenerateRequirementsInput {
  featureDescription: string
  projectContext?: string
  targetAudience?: string
}

export async function generateRequirements(input: GenerateRequirementsInput) {
  try {
    const { featureDescription, projectContext, targetAudience } = input

    const prompt = `
You are an expert product manager. Generate comprehensive feature requirements, user stories, and acceptance criteria for the following feature:

Feature Description: ${featureDescription}
${projectContext ? `Project Context: ${projectContext}` : ""}
${targetAudience ? `Target Audience: ${targetAudience}` : ""}

Please generate:

1. REQUIREMENTS: 5-8 detailed functional and technical requirements that cover:
   - Core functionality
   - User interface considerations
   - Performance requirements
   - Security considerations
   - Integration requirements (if applicable)

2. USER STORIES: 4-6 user stories following the format "As a [user type], I want [goal] so that [benefit]"
   - Cover different user personas and use cases
   - Focus on user value and outcomes

3. ACCEPTANCE CRITERIA: 6-10 specific, testable acceptance criteria that:
   - Use Given-When-Then format where appropriate
   - Cover happy path and edge cases
   - Include validation rules
   - Specify expected behaviors

Make sure all generated content is:
- Specific and actionable
- Testable and measurable
- Aligned with the feature description
- Professional and clear
`

    const result = await generateObject({
      model: openai("gpt-4o"),
      schema: RequirementsSchema,
      prompt,
    })

    return {
      success: true,
      data: result.object,
    }
  } catch (error) {
    console.error("Error generating requirements:", error)
    return {
      success: false,
      error: "Failed to generate requirements. Please try again.",
    }
  }
}
