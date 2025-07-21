import type React from "react";
import { toast, Toaster } from "sonner";
import { useEffect, useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import {
  useEditProjectMutation,
  useGetLevelQuery,
  useGetProjectByIdQuery,
} from "@/state/api";
import { LoadingSkeleton } from "@/components/loading";

// Mock data for project levels
// const projectLevels = [
//   {
//     id: 1,
//     name: "Beginner Assessment",
//     description: "Basic personality and cognitive tests",
//   },
//   {
//     id: 2,
//     name: "Intermediate Evaluation",
//     description: "Comprehensive skill and behavioral assessment",
//   },
//   {
//     id: 3,
//     name: "Advanced Analysis",
//     description: "In-depth psychological and leadership evaluation",
//   },
//   {
//     id: 4,
//     name: "Executive Assessment",
//     description: "Senior leadership and strategic thinking evaluation",
//   },
// ];

// Mock existing project data - in real app, this would come from API based on params.id
// const existingProject = {
//   id: 1,
//   project_name: "Q1 2024 Recruitment",
//   number_of_candidates: 25,
//   start_date: "2024-01-15",
//   end_date: "2024-03-15",
//   status_project: "active",
//   level_id: "2",
//   description:
//     "Comprehensive assessment for new hires in the technology department.",
// };

export default function ProjectEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [editProject, { isLoading: isLoadingEditProject }] =
    useEditProjectMutation();
  const { data: levels } = useGetLevelQuery();
  const { data: project, isLoading: isLoadingProject } = useGetProjectByIdQuery(
    { id: id! }
  );

  const [formData, setFormData] = useState({
    partner: "",
    project_name: "",
    number_of_candidates: 0,
    candidates_completed: 0,
    start_date: "",
    end_date: "",
    status_project: "",
    level_id: "",
    description: "",
  });

  useEffect(() => {
    if (project) {
      setFormData({
        partner: project.partner,
        project_name: project.project_name,
        number_of_candidates: project.number_of_candidates,
        candidates_completed: project.candidates_completed,
        start_date: project.start_date,
        end_date: project.end_date,
        status_project: project.status_project,
        level_id: project.level.id,
        description: project.description,
      });

      console.log({ project });
    }
  }, [project]);

  if (!id) {
    navigate("all-project");
    return;
  }

  // console.log({ formData });

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      console.log("Form submitted:", formData);
      // Handle form submission here

      await editProject({
        id,
        project: {
          partner: formData.partner,
          project_name: formData.project_name,
          number_of_candidates: formData.number_of_candidates,
          candidates_completed: formData.candidates_completed,
          start_date: formData.start_date,
          end_date: formData.end_date,
          status_project:
            formData.status_project === "" && project && project.status_project
              ? project.status_project
              : formData.status_project,
          level: formData.level_id,
          description: formData.description,
        },
      });

      toast.success("Success", {
        description: "Project berhasil diedit",
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log({ errorEditProject: error });

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
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link to={`/projects/${id}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Project
          </Link>
        </Button>
        <div className="flex flex-1 items-center gap-2">
          <h1 className="text-lg font-semibold">Edit Project</h1>
        </div>
      </header>
      <div className="flex-1 space-y-6 p-4 md:p-8">
        {isLoadingProject ? (
          <LoadingSkeleton variant="card" count={1} />
        ) : (
          <Card className="mx-auto max-w-2xl">
            <CardHeader>
              <CardTitle>Update Project Information</CardTitle>
              <CardDescription>
                Modify project details and settings. Be careful when changing
                dates for active projects.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="project_name">Project Name *</Label>
                  <Input
                    id="project_name"
                    value={formData.project_name}
                    onChange={(e) =>
                      setFormData({ ...formData, project_name: e.target.value })
                    }
                    placeholder="e.g., Q1 2024 Recruitment Assessment"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Describe the purpose and goals of this project..."
                    rows={3}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="number_of_candidates">
                      Number of Candidates *
                    </Label>
                    <Input
                      id="number_of_candidates"
                      type="number"
                      min="1"
                      value={formData.number_of_candidates}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          number_of_candidates: Number(e.target.value),
                        })
                      }
                      placeholder="50"
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Note: Increasing this number won't affect existing
                      candidates
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="level_id">Assessment Level *</Label>
                    <Select
                      value={formData.level_id}
                      onValueChange={(value) =>
                        setFormData({ ...formData, level_id: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select assessment level" />
                      </SelectTrigger>
                      <SelectContent>
                        {levels &&
                          levels.results.length > 0 &&
                          levels.results.map((level) => (
                            <SelectItem key={level.id} value={level.id}>
                              {level.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Warning: Changing level may affect ongoing assessments
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="start_date">Start Date *</Label>
                    <Input
                      id="start_date"
                      type="date"
                      value={formData.start_date}
                      onChange={(e) =>
                        setFormData({ ...formData, start_date: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end_date">End Date *</Label>
                    <Input
                      id="end_date"
                      type="date"
                      value={formData.end_date}
                      onChange={(e) =>
                        setFormData({ ...formData, end_date: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status_project">Project Status *</Label>
                  <Select
                    value={formData.status_project}
                    onValueChange={(value) =>
                      setFormData({ ...formData, status_project: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planning">Planning</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Changing status will affect candidate access to tests
                  </p>
                </div>

                {formData.level_id && (
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">
                      Selected Assessment Level
                    </h4>
                    {levels &&
                      levels.results.length > 0 &&
                      levels.results
                        .filter(
                          (level) => level.id.toString() === formData.level_id
                        )
                        .map((level) => (
                          <div key={level.id}>
                            <p className="font-medium">{level.name}</p>
                          </div>
                        ))}
                  </div>
                )}

                {formData.status_project === "active" && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-2">
                      Active Project Warning
                    </h4>
                    <p className="text-sm text-yellow-700">
                      This project is currently active. Changes to assessment
                      level or dates may affect ongoing candidate assessments.
                      Consider pausing the project before making significant
                      changes.
                    </p>
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={isLoadingEditProject}
                  >
                    Update Project
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    asChild
                  >
                    <Link to={`/projects/${id}`}>Cancel</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
