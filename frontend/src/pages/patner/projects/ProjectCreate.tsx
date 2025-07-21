import type React from "react";
import { toast, Toaster } from "sonner";
import { useState } from "react";
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
import { useGetLevelQuery, useCreateProjectMutation } from "@/state/api";
import { useAppSelector } from "@/state/redux";
import { Navigate } from "react-router";

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

export default function ProjectCreate() {
  const currentUser = useAppSelector((state) => state.global.user);

  const { data: levels } = useGetLevelQuery();
  const [createProject, { isLoading: isLoadingCreate }] =
    useCreateProjectMutation();

  const [formData, setFormData] = useState({
    partner: "",
    project_name: "",
    number_of_candidates: 0,
    start_date: "",
    end_date: "",
    status_project: "",
    level_id: "",
    description: "",
  });

  if (!currentUser) {
    <Navigate to="/login" replace />;
    return;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      // console.log("Form submitted:", formData);
      // const level_choose =
      //   levels &&
      //   levels.results.length > 0 &&
      //   levels.results.find((val) => val.id === formData.level_id);
      // Handle form submission here

      // if (!level_choose) {
      //   throw new Error("Level you choose not found");
      // }

      await createProject({
        project: {
          partner: currentUser.id,
          project_name: formData.project_name,
          number_of_candidates: formData.number_of_candidates,
          start_date: formData.start_date,
          candidates_completed: 0,
          end_date: formData.end_date,
          status_project: formData.status_project,
          level: formData.level_id,
          description: formData.description,
        },
      });

      toast.success("Success", {
        description: "Project berhasil didaftarkan",
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log({ error });
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
          <h1 className="text-lg font-semibold">Create New Project</h1>
        </div>
      </header>
      <div className="flex-1 space-y-6 p-4 md:p-8">
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle>Project Information</CardTitle>
            <CardDescription>
              Create a new assessment project for your candidates.
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
                          <SelectItem
                            key={level.id}
                            value={level.id.toString()}
                          >
                            {level.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
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
                <Label htmlFor="status_project">Project Status</Label>
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
              </div>

              {formData.level_id && (
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">
                    Selected Assessment Level
                  </h4>
                  {levels && levels.results.length > 0
                    ? levels.results
                        .filter(
                          (level) => level.id.toString() === formData.level_id
                        )
                        .map((level) => (
                          <div key={level.id}>
                            <p className="font-medium">{level.name}</p>
                          </div>
                        ))
                    : null}
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isLoadingCreate}
                >
                  Create Project
                </Button>
                <Button type="button" variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
