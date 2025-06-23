import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import RequirementsGenerator from "./components/requirements-generator"
import { FileText, Users, CheckSquare } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Requirements Generator</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your feature ideas into structured requirements, user stories, and acceptance criteria with AI
          </p>
        </div>

        <div className="w-full max-w-6xl mx-auto mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            <Card className="text-center">
              <CardHeader className="pb-3">
                <FileText className="h-8 w-8 sm:h-10 md:h-12 text-blue-600 mx-auto mb-2" />
                <CardTitle className="text-sm sm:text-base md:text-lg">Feature Requirements</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-xs sm:text-sm">
                  Generate detailed technical and functional requirements for your features
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader className="pb-3">
                <Users className="h-8 w-8 sm:h-10 md:h-12 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-sm sm:text-base md:text-lg">User Stories</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-xs sm:text-sm">
                  Create user-centered stories that capture the value and context of features
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader className="pb-3">
                <CheckSquare className="h-8 w-8 sm:h-10 md:h-12 text-purple-600 mx-auto mb-2" />
                <CardTitle className="text-sm sm:text-base md:text-lg">Acceptance Criteria</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-xs sm:text-sm">
                  Define clear, testable criteria that determine when features are complete
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="w-full max-w-6xl mx-auto">
          <RequirementsGenerator />
        </div>
      </div>
    </div>
  )
}
