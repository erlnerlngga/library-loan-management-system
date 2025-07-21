import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  Target,
  Award,
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

// Mock analytics data
const analyticsData = {
  overview: {
    totalCandidates: 156,
    completedTests: 342,
    averageScore: 78,
    completionRate: 89,
  },
  projectMetrics: [
    {
      name: "Q1 2024 Recruitment",
      candidates: 25,
      completion: 72,
      avgScore: 85,
    },
    {
      name: "Leadership Assessment",
      candidates: 12,
      completion: 100,
      avgScore: 92,
    },
    { name: "Graduate Trainee", candidates: 50, completion: 96, avgScore: 76 },
  ],
  testPerformance: [
    { test: "Personality Assessment", avgScore: 82, completionRate: 95 },
    { test: "Cognitive Ability", avgScore: 88, completionRate: 91 },
    { test: "Emotional Intelligence", avgScore: 75, completionRate: 87 },
    { test: "Leadership Style", avgScore: 79, completionRate: 89 },
  ],
  timeMetrics: {
    avgTestDuration: "1h 25m",
    peakTestingHours: "10:00 AM - 2:00 PM",
    fastestCompletion: "45 minutes",
    slowestCompletion: "3h 15m",
  },
};

export default function Home() {
  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center gap-2">
          <h1 className="text-lg font-semibold">Analytics Dashboard</h1>
        </div>
      </header>
      <div className="flex-1 space-y-6 p-4 md:p-8">
        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Candidates
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analyticsData.overview.totalCandidates}
              </div>
              <p className="text-xs text-muted-foreground">
                +12 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tests Completed
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analyticsData.overview.completedTests}
              </div>
              <p className="text-xs text-muted-foreground">+23 this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Score
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analyticsData.overview.averageScore}%
              </div>
              <p className="text-xs text-muted-foreground">
                +2% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completion Rate
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analyticsData.overview.completionRate}%
              </div>
              <p className="text-xs text-muted-foreground">+5% improvement</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="projects" className="space-y-4">
          <TabsList>
            <TabsTrigger value="projects">Project Performance</TabsTrigger>
            <TabsTrigger value="tests">Test Analytics</TabsTrigger>
            <TabsTrigger value="timing">Time Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Performance Metrics</CardTitle>
                <CardDescription>
                  Analyze performance across different assessment projects.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {analyticsData.projectMetrics.map((project, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{project.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {project.candidates} candidates
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {project.avgScore}% avg score
                          </div>
                          <Badge variant="outline">
                            {project.completion}% completion
                          </Badge>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Completion Rate</span>
                          <span>{project.completion}%</span>
                        </div>
                        <Progress value={project.completion} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Test Performance Analysis</CardTitle>
                <CardDescription>
                  Detailed breakdown of individual test performance metrics.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {analyticsData.testPerformance.map((test, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{test.test}</h4>
                          <p className="text-sm text-muted-foreground">
                            Average Score: {test.avgScore}%
                          </p>
                        </div>
                        <Badge
                          variant={
                            test.completionRate >= 90 ? "default" : "secondary"
                          }
                        >
                          {test.completionRate}% completion
                        </Badge>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Average Score</span>
                            <span>{test.avgScore}%</span>
                          </div>
                          <Progress value={test.avgScore} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Completion Rate</span>
                            <span>{test.completionRate}%</span>
                          </div>
                          <Progress
                            value={test.completionRate}
                            className="h-2"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Time & Usage Metrics</CardTitle>
                <CardDescription>
                  Insights into test timing patterns and usage statistics.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Average Test Duration</p>
                        <p className="text-2xl font-bold">
                          {analyticsData.timeMetrics.avgTestDuration}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Peak Testing Hours</p>
                        <p className="text-lg font-semibold">
                          {analyticsData.timeMetrics.peakTestingHours}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Award className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">Fastest Completion</p>
                        <p className="text-lg font-semibold text-green-600">
                          {analyticsData.timeMetrics.fastestCompletion}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-orange-600" />
                      <div>
                        <p className="font-medium">Slowest Completion</p>
                        <p className="text-lg font-semibold text-orange-600">
                          {analyticsData.timeMetrics.slowestCompletion}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
