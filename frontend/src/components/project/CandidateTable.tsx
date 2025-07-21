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
import { MoreHorizontal, Eye, Key } from "lucide-react";
import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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

interface CandidateProps {
  candidates:
    | {
        id: string;
        name: string;
        company: string;
        phone: string;
        birth_of_place: string;
        birth_of_date: string;
        gender: string;
        marital_status: string;
        current_job: string;
        position: string;
        education: string;
        major: string;
        address: string;
        have_done: boolean;
        project: {
          id: string;
          partner: string;
          project_name: string;
          description: string;
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
        }[];
        user: { email: string; password: string; roles: { name: string }[] };
      }[]
    | undefined;
}

export default function CandidateTable({ candidates }: CandidateProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Candidate</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[70px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        {candidates && candidates.length !== 0 ? (
          <TableBody>
            {candidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>
                        {candidate.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{candidate.name}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={candidate.have_done ? "secondary" : "default"}
                  >
                    {candidate.have_done ? "completed" : "process"}
                  </Badge>
                </TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={`/candidates/${candidate.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Key className="mr-2 h-4 w-4" />
                        Reset Password
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
