"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Edit,
  Eye,
  Monitor,
  Chrome,
  ComputerIcon as Windows,
} from "lucide-react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
import {
  useGetPsychotestHistoryQuery,
  useGetPsychotestObservationQuery,
} from "@/state/api";

// Mock data
// const candidate = {
//   id: 1,
//   name: "Alice Johnson",
//   email: "alice@example.com",
//   photo: "/placeholder.svg",
//   cv: "alice_johnson_cv.pdf",
//   company: "Tech Solutions Inc",
//   phone: "+1234567890",
//   birth_of_place: "New York, NY",
//   birth_of_date: "1995-03-15",
//   gender: "Female",
//   marital_status: "Single",
//   current_job: "Software Developer",
//   position: "Senior Developer",
//   education: "Bachelor of Computer Science",
//   major: "Computer Science",
//   address: "123 Main St, New York, NY 10001",
// };

// const testHistory = [
//   {
//     id: 1,
//     psychotest_name: "Personality Assessment",
//     start_test: "2024-06-15 09:00:00",
//     finish_test: "2024-06-15 10:30:00",
//     duration: "1h 30m",
//     status: "completed",
//     score: 85,
//   },
//   {
//     id: 2,
//     psychotest_name: "Cognitive Ability Test",
//     start_test: "2024-06-16 14:00:00",
//     finish_test: "2024-06-16 15:45:00",
//     duration: "1h 45m",
//     status: "completed",
//     score: 92,
//   },
//   {
//     id: 3,
//     psychotest_name: "Emotional Intelligence",
//     start_test: "2024-06-17 10:00:00",
//     finish_test: null,
//     duration: null,
//     status: "in_progress",
//     score: null,
//   },
// ];

// const observations = [
//   {
//     id: 1,
//     test_name: "Personality Assessment",
//     browser: "Chrome 125.0",
//     os: "Windows 11",
//     platform: "Desktop",
//     photos: ["test1_photo1.jpg", "test1_photo2.jpg"],
//     timestamp: "2024-06-15 09:00:00",
//   },
//   {
//     id: 2,
//     test_name: "Cognitive Ability Test",
//     browser: "Safari 17.0",
//     os: "macOS 14.0",
//     platform: "Desktop",
//     photos: ["test2_photo1.jpg"],
//     timestamp: "2024-06-16 14:00:00",
//   },
// ];

export default function CandidateDetail() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data: history } = useGetPsychotestHistoryQuery({
    candidate_id: id!,
    project_id: searchParams.get("project_id")!,
  });
  const { data: observations } = useGetPsychotestObservationQuery({
    candidate_id: id!,
    project_id: searchParams.get("project_id")!,
  });

  if (!id || !searchParams.get("project_id")) {
    navigate("all-patner");
    return;
  }

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center gap-2">
          <h1 className="text-lg font-semibold">History</h1>
        </div>
        <Button asChild>
          <Link to={`/candidates/${id}`}>
            <Edit className="mr-2 h-4 w-4" />
            back
          </Link>
        </Button>
      </header>
      <div className="flex-1 space-y-6 p-4 md:p-8">
        <Tabs defaultValue="history" className="space-y-4">
          <TabsList>
            <TabsTrigger value="history">Test History</TabsTrigger>
            <TabsTrigger value="observations">Observations</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Test History</CardTitle>
                <CardDescription>
                  Complete history of all psychotest sessions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Test Name</TableHead>
                        <TableHead>Start Time</TableHead>
                        <TableHead>End Time</TableHead>
                        <TableHead>Duration</TableHead>
                      </TableRow>
                    </TableHeader>
                    {history && history.length ? (
                      <TableBody>
                        {history.map((test) => (
                          <TableRow key={test.id}>
                            <TableCell className="font-medium">
                              {test.psychotest_name}
                            </TableCell>
                            <TableCell>{test.start_test}</TableCell>
                            <TableCell>
                              {test.finish_test || "In Progress"}
                            </TableCell>
                            <TableCell>{test.duration || "-"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    ) : null}
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="observations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Test Observations</CardTitle>
                <CardDescription>
                  Technical details and monitoring data from test sessions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {observations && observations.length > 0 ? (
                  <div className="space-y-4">
                    {observations.map((obs) => (
                      <div key={obs.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">{obs.psychotest_name}</h4>
                        </div>
                        <div className="grid gap-4 md:grid-cols-3 mb-4">
                          <div className="flex items-center space-x-2">
                            <Chrome className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Browser</p>
                              <p className="text-xs text-muted-foreground">
                                {obs.browser}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Windows className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">OS</p>
                              <p className="text-xs text-muted-foreground">
                                {obs.os}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Monitor className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Platform</p>
                              <p className="text-xs text-muted-foreground">
                                {obs.platform}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-2">
                            Captured Photos ({obs.photos.length})
                          </p>
                          <div className="flex space-x-2">
                            {obs.photos.map((photo, index) => (
                              <Button key={index} variant="outline" size="sm">
                                <Eye className="mr-2 h-4 w-4" />
                                Photo {index + 1}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
