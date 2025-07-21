import { useState, useEffect } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Search } from "lucide-react";
import { useGetCandidateQuery } from "@/state/api";
import CandidateTable from "@/components/project/CandidateTable";
import { LoadingSkeleton } from "@/components/loading";
import { useAppSelector } from "@/state/redux";

// Mock data
// const candidates = [
//   {
//     id: 1,
//     name: "Alice Johnson",
//     email: "alice@example.com",
//     company: "Tech Solutions Inc",
//     project: "Q1 2024 Recruitment",
//     status: "completed",
//     tests_completed: 5,
//     total_tests: 5,
//     overall_score: 88,
//   },
//   {
//     id: 2,
//     name: "Bob Smith",
//     email: "bob@example.com",
//     company: "Innovation Labs",
//     project: "Leadership Assessment 2024",
//     status: "in_progress",
//     tests_completed: 3,
//     total_tests: 5,
//     overall_score: null,
//   },
//   {
//     id: 3,
//     name: "Carol Davis",
//     email: "carol@example.com",
//     company: "StartupXYZ",
//     project: "Graduate Trainee Program",
//     status: "not_started",
//     tests_completed: 0,
//     total_tests: 5,
//     overall_score: null,
//   },
//   {
//     id: 4,
//     name: "David Wilson",
//     email: "david@example.com",
//     company: "Enterprise Corp",
//     project: "Q1 2024 Recruitment",
//     status: "completed",
//     tests_completed: 5,
//     total_tests: 5,
//     overall_score: 92,
//   },
// ];

// const getStatusColor = (status: string) => {
//   switch (status) {
//     case "completed":
//       return "default";
//     case "in_progress":
//       return "secondary";
//     case "not_started":
//       return "outline";
//     default:
//       return "outline";
//   }
// };

export default function Candidates() {
  const currentUser = useAppSelector((state) => state.global.user);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, isLoading } = useGetCandidateQuery({
    currentPage,
    partner_id: currentUser?.id,
  });
  // const [searchTerm, setSearchTerm] = useState("");

  // const filteredCandidates = candidates.filter((candidate) =>
  //   candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center gap-2">
          <h1 className="text-lg font-semibold">All Candidates</h1>
        </div>
      </header>
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>Candidate Directory</CardTitle>
            <CardDescription>
              Search and manage all candidates across your projects.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search candidates by name..."
                  value={""}
                  onChange={() => {}}
                  className="pl-8"
                />
              </div>
            </div>
            {isLoading ? (
              <LoadingSkeleton variant="table" count={1} />
            ) : (
              <CandidateTable candidates={data?.results} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
