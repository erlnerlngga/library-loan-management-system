import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Search, Plus } from "lucide-react";
import { Link } from "react-router";
import { SidebarTrigger } from "@/components/ui/sidebar";
import PartnerTable from "@/components/admin/PartnerTable";
import { useGetPartnerQuery } from "@/state/api";
import { LoadingSkeleton } from "@/components/loading";

export default function Partners() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading } = useGetPartnerQuery();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center gap-2">
          <h1 className="text-lg font-semibold">Partners</h1>
        </div>
        <Button asChild>
          <Link to="/admin/partners/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Partner
          </Link>
        </Button>
      </header>
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <Card>
          <CardHeader className="flex justify-between">
            <div>
              <CardTitle>All Partners</CardTitle>
              <CardDescription>
                Manage your partners and their account details.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="">
              <div className="relative flex-1 max-w-sm mb-4">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search partners..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>

              {isLoading ? (
                <LoadingSkeleton variant="table" count={1} />
              ) : (
                <PartnerTable partners={data?.results} />
              )}
            </div>
          </CardContent>
          <CardFooter className="justify-end gap-4">
            {data && currentPage > 1 ? (
              <>
                <Button
                  variant={"secondary"}
                  className="cursor-pointer"
                  disabled={data.previous === null}
                  onClick={() =>
                    currentPage > 1 ? setCurrentPage((val) => val - 1) : null
                  }
                >
                  Previous
                </Button>
                <Button
                  variant={"secondary"}
                  className="cursor-pointer"
                  onClick={() => setCurrentPage((val) => val + 1)}
                  disabled={data.next === null}
                >
                  Next
                </Button>
              </>
            ) : null}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
