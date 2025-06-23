import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import RequirementsGenerator from "./components/requirements-generator"
import { FileText, Users, CheckSquare } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">PM Requirements Generator</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your feature ideas into structured requirements, user stories, and acceptance criteria with AI
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center">
            <CardHeader>
              <FileText className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <CardTitle>Feature Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Generate detailed technical and functional requirements for your features
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 text-green-600 mx-auto mb-2" />
              <CardTitle>User Stories</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Create user-centered stories that capture the value and context of features
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CheckSquare className="h-12 w-12 text-purple-600 mx-auto mb-2" />
              <CardTitle>Acceptance Criteria</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Define clear, testable criteria that determine when features are complete
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <RequirementsGenerator />
      </div>
    </div>
  )
}
