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

import { Plus } from "lucide-react";
import { Link } from "react-router";
import { useGetProjectQuery } from "@/state/api";
import ProjectTable from "@/components/project/ProjectTable";
import { LoadingSkeleton } from "@/components/loading";

// Mock data
// const projects = [
//   {
//     id: 1,
//     project_name: "Q1 2024 Recruitment",
//     number_of_candidates: 25,
//     start_date: "2024-01-15",
//     end_date: "2024-03-15",
//     status_project: "active",
//     level: "Intermediate Evaluation",
//     candidates_completed: 18,
//   },
//   {
//     id: 2,
//     project_name: "Leadership Assessment 2024",
//     number_of_candidates: 12,
//     start_date: "2024-02-01",
//     end_date: "2024-04-01",
//     status_project: "planning",
//     level: "Executive Assessment",
//     candidates_completed: 0,
//   },
//   {
//     id: 3,
//     project_name: "Graduate Trainee Program",
//     number_of_candidates: 50,
//     start_date: "2024-01-01",
//     end_date: "2024-02-28",
//     status_project: "completed",
//     level: "Beginner Assessment",
//     candidates_completed: 50,
//   },
// ];

export default function Projects() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading } = useGetProjectQuery({ currentPage });

  // const [searchTerm, setSearchTerm] = useState("");
  // const filteredProjects = projects.filter((project) =>
  //   project.project_name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center gap-2">
          <h1 className="text-lg font-semibold">Projects</h1>
        </div>
        <Button asChild>
          <Link to="/projects/create">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
      </header>
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>All Projects</CardTitle>
            <CardDescription>
              Manage your assessment projects and track candidate progress.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div> */}
            {isLoading ? (
              <LoadingSkeleton variant="table" count={1} />
            ) : (
              <ProjectTable projects={data?.results} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
