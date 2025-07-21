import { useState, useEffect } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, Plus, Mail } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router";
import {
  useGetProjectByIdQuery,
  useGetCandidateQuery,
  useCreateCandidateMutation,
} from "@/state/api";
import { LoadingSkeleton } from "@/components/loading";
import CandidateTable from "@/components/project/CandidateTable";
import { toast, Toaster } from "sonner";

// Mock data
// const project = {
//   id: 1,
//   project_name: "Q1 2024 Recruitment",
//   number_of_candidates: 25,
//   start_date: "2024-01-15",
//   end_date: "2024-03-15",
//   status_project: "active",
//   level: "Intermediate Evaluation",
//   description:
//     "Comprehensive assessment for new hires in the technology department.",
// };

// const candidates = [
//   {
//     id: 1,
//     name: "Alice Johnson",
//     email: "alice@example.com",
//     status: "completed",
//     tests_completed: 5,
//     total_tests: 5,
//     last_activity: "2024-06-15",
//   },
//   {
//     id: 2,
//     name: "Bob Smith",
//     email: "bob@example.com",
//     status: "in_progress",
//     tests_completed: 3,
//     total_tests: 5,
//     last_activity: "2024-06-20",
//   },
//   {
//     id: 3,
//     name: "Carol Davis",
//     email: "carol@example.com",
//     status: "not_started",
//     tests_completed: 0,
//     total_tests: 5,
//     last_activity: null,
//   },
// ];

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [createCandidate, { isLoading: isLoadingRegister }] =
    useCreateCandidateMutation();
  const { data: project, isLoading: isLoadingProject } = useGetProjectByIdQuery(
    { id: id! }
  );
  const { data: candidates, isLoading: isLoadingCandidate } =
    useGetCandidateQuery({
      currentPage,
      project_id: id!,
    });
  const [isCreateCandidateOpen, setIsCreateCandidateOpen] = useState(false);
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  if (!id) {
    navigate("all-patner");
    return;
  }

  if (!project) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1>Theres no Data</h1>
      </div>
    );
  }

  const generatePassword = () => {
    return Math.random().toString(36).slice(-8);
  };

  const handleCreateCandidate = async () => {
    try {
      const password = generatePassword();
      console.log("Creating candidate:", { email: candidateEmail, password });
      // Handle candidate creation here
      await createCandidate({
        candidate: {
          name: candidateName,
          project: [
            {
              partner: project.partner,
              project_name: project.project_name,
              description: project.description,
              number_of_candidates: project.number_of_candidates,
              candidates_completed: project.candidates_completed,
              start_date: project.start_date,
              end_date: project.end_date,
              status_project: project.status_project,
              level: project.level.id,
            },
          ],
          user: {
            email: candidateEmail,
            password: "password",
            roles: [{ name: "candidate" }],
          },
        },
      });

      /**
       * TASK
       * 1. send email to candidate with the password
       * 2. create
       */

      toast.success("Success", {
        description: "Candidate berhasil didaftarkan",
      });

      setIsCreateCandidateOpen(false);
      setCandidateEmail("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log({ errCreateCandidate: error });
      toast.error("Opps something went wrong", {
        description: error,
      });
    }
  };

  return (
    <div className="flex flex-col">
      <Toaster position="bottom-right" richColors closeButton />
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center gap-2">
          <h1 className="text-lg font-semibold">{project.project_name}</h1>
          <Badge
            variant={
              project.status_project === "active" ? "default" : "outline"
            }
          >
            {project.status_project}
          </Badge>
        </div>
        <Button asChild>
          <Link to={`/projects/${id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Project
          </Link>
        </Button>
      </header>
      <div className="flex-1 space-y-6 p-4 md:p-8">
        <div className="grid gap-6 md:grid-cols-4">
          {isLoadingProject ? (
            <LoadingSkeleton variant="card" count={4} />
          ) : (
            <>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Candidates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {project.number_of_candidates}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Completed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18</div>
                  <p className="text-xs text-muted-foreground">
                    72% completion rate
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    In Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">
                    20% of candidates
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Not Started
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">8% remaining</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="candidates">Candidates</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {isLoadingProject ? (
              <LoadingSkeleton variant="card" count={1} />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Project Information</CardTitle>
                  <CardDescription>
                    Overview of project details and timeline.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label className="text-sm font-medium">
                        Project Name
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {project.project_name}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">
                        Assessment Level
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {project.level.name}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Start Date</Label>
                      <p className="text-sm text-muted-foreground">
                        {project.start_date}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">End Date</Label>
                      <p className="text-sm text-muted-foreground">
                        {project.end_date}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Description</Label>
                    <p className="text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="candidates" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Project Candidates</CardTitle>
                    <CardDescription>
                      Manage candidates assigned to this project.
                    </CardDescription>
                  </div>
                  <Dialog
                    open={isCreateCandidateOpen}
                    onOpenChange={setIsCreateCandidateOpen}
                  >
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Candidate
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Candidate</DialogTitle>
                        <DialogDescription>
                          Add a new candidate to this project. A random password
                          will be generated.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Name</Label>
                          <Input
                            id="name"
                            value={candidateName}
                            onChange={(e) => setCandidateName(e.target.value)}
                            placeholder="candidate"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={candidateEmail}
                            onChange={(e) => setCandidateEmail(e.target.value)}
                            placeholder="candidate@example.com"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={handleCreateCandidate}
                            className="flex-1"
                            disabled={isLoadingRegister}
                          >
                            <Mail className="mr-2 h-4 w-4" />
                            Create & Send Invite
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setIsCreateCandidateOpen(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {isLoadingCandidate ? (
                  <LoadingSkeleton variant="table" count={1} />
                ) : (
                  <CandidateTable candidates={candidates?.results} />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Settings</CardTitle>
                <CardDescription>
                  Configure project parameters and access controls.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Project settings will be available here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
