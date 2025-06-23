"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Loader2, Copy, Download, Sparkles } from "lucide-react"
import { generateRequirements } from "../actions/generate-requirements"
import { toast } from "sonner"

interface GeneratedContent {
  requirements: string[]
  userStories: string[]
  acceptanceCriteria: string[]
}

export default function RequirementsGenerator() {
  const [featureDescription, setFeatureDescription] = useState("")
  const [projectContext, setProjectContext] = useState("")
  const [targetAudience, setTargetAudience] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)

  const handleGenerate = async () => {
    if (!featureDescription.trim()) {
      toast.error("Please provide a feature description")
      return
    }

    setIsGenerating(true)
    try {
      const result = await generateRequirements({
        featureDescription,
        projectContext,
        targetAudience,
      })

      if (result.success && result.data) {
        setGeneratedContent(result.data)
        toast.success("Requirements generated successfully!")
      } else {
        toast.error(result.error || "Failed to generate requirements")
      }
    } catch (error) {
      toast.error("An error occurred while generating requirements")
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content)
    toast.success("Copied to clipboard!")
  }

  const exportAsMarkdown = () => {
    if (!generatedContent) return

    const markdown = `# Feature Requirements

## Feature Description
${featureDescription}

## Requirements
${generatedContent.requirements.map((req, i) => `${i + 1}. ${req}`).join("\n")}

## User Stories
${generatedContent.userStories.map((story, i) => `${i + 1}. ${story}`).join("\n")}

## Acceptance Criteria
${generatedContent.acceptanceCriteria.map((criteria, i) => `${i + 1}. ${criteria}`).join("\n")}
`

    const blob = new Blob([markdown], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "feature-requirements.md"
    a.click()
    URL.revokeObjectURL(url)
    toast.success("Exported as Markdown file!")
  }

  return (
    <div className="w-full">
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            Generate Requirements
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Describe your feature idea and provide context to generate comprehensive requirements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <Label htmlFor="feature-description" className="text-sm sm:text-base">
              Feature Description *
            </Label>
            <Textarea
              id="feature-description"
              placeholder="Describe the feature you want to build. Be as detailed as possible about what it should do and how users will interact with it..."
              value={featureDescription}
              onChange={(e) => setFeatureDescription(e.target.value)}
              rows={4}
              className="resize-none text-sm sm:text-base"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="project-context" className="text-sm sm:text-base">
                Project Context (Optional)
              </Label>
              <Input
                id="project-context"
                placeholder="e.g., E-commerce platform, SaaS dashboard, Mobile app..."
                value={projectContext}
                onChange={(e) => setProjectContext(e.target.value)}
                className="text-sm sm:text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="target-audience" className="text-sm sm:text-base">
                Target Audience (Optional)
              </Label>
              <Input
                id="target-audience"
                placeholder="e.g., Small business owners, Developers, End consumers..."
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="text-sm sm:text-base"
              />
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !featureDescription.trim()}
            className="w-full text-sm sm:text-base"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Requirements...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Requirements
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results card remains the same but ensure consistent width */}
      {generatedContent && (
        <Card className="w-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Generated Requirements</CardTitle>
                <CardDescription>AI-generated requirements, user stories, and acceptance criteria</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={exportAsMarkdown}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="requirements" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="user-stories">User Stories</TabsTrigger>
                <TabsTrigger value="acceptance-criteria">Acceptance Criteria</TabsTrigger>
              </TabsList>

              <TabsContent value="requirements" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Feature Requirements</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(generatedContent.requirements.join("\n"))}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <div className="space-y-3">
                  {generatedContent.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <Badge variant="secondary" className="mt-0.5">
                        REQ-{index + 1}
                      </Badge>
                      <p className="text-sm leading-relaxed">{requirement}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="user-stories" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">User Stories</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(generatedContent.userStories.join("\n"))}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <div className="space-y-3">
                  {generatedContent.userStories.map((story, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <Badge variant="secondary" className="mt-0.5">
                        US-{index + 1}
                      </Badge>
                      <p className="text-sm leading-relaxed">{story}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="acceptance-criteria" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Acceptance Criteria</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(generatedContent.acceptanceCriteria.join("\n"))}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <div className="space-y-3">
                  {generatedContent.acceptanceCriteria.map((criteria, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                      <Badge variant="secondary" className="mt-0.5">
                        AC-{index + 1}
                      </Badge>
                      <p className="text-sm leading-relaxed">{criteria}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
