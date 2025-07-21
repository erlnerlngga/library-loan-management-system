import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Edit, Users } from "lucide-react";
import { Link } from "react-router";

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

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "default";
    case "completed":
      return "secondary";
    case "planning":
      return "outline";
    case "paused":
      return "destructive";
    default:
      return "outline";
  }
};

interface ProjectProps {
  projects:
    | {
        id: string;
        project_name: string;
        number_of_candidates: number;
        candidates_completed: number;
        start_date: string;
        end_date: string;
        status_project: string;
        level: {
          id: string;
          name: string;
          partner: string;
          psychotests: { id: string; name: string; slug: string }[];
        };
      }[]
    | undefined;
}

export default function ProjectTable({ projects }: ProjectProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project Name</TableHead>
            <TableHead>Assessment Level</TableHead>
            <TableHead>Candidates</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead className="w-[70px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        {projects && projects.length !== 0 ? (
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{project.project_name}</div>
                    <div className="text-sm text-muted-foreground">
                      Started {project.start_date}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{project.level.name}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{project.number_of_candidates}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col space-y-1">
                    <div className="text-sm">
                      {project.candidates_completed}/
                      {project.number_of_candidates} completed
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{
                          width: `${
                            (project.candidates_completed /
                              project.number_of_candidates) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(project.status_project)}>
                    {project.status_project}
                  </Badge>
                </TableCell>
                <TableCell>{project.end_date}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={`/projects/${project.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to={`/projects/${project.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Project
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : null}
      </Table>
    </div>
  );
}
