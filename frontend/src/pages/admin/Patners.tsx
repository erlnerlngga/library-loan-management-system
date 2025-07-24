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

import { SidebarTrigger } from "@/components/ui/sidebar";
import { useGetBorrowedBookQuery } from "@/state/api";
import { LoadingSkeleton } from "@/components/loading";
import BorrowedBookTable from "@/components/BorrowedBookTable";

export default function Partners() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading } = useGetBorrowedBookQuery({
    page: currentPage,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center gap-2">
          <h1 className="text-lg font-semibold">Book Borrowed</h1>
        </div>
      </header>
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <Card>
          <CardHeader className="flex justify-between">
            <div>
              <CardTitle>All Book Borrowed</CardTitle>
              <CardDescription>
                Manage your book borrowed and their borrowed details.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="">
              {isLoading ? (
                <LoadingSkeleton variant="table" count={1} />
              ) : (
                <BorrowedBookTable borrowed_books={data?.results} />
              )}
            </div>
          </CardContent>
          <CardFooter className="justify-end gap-4">
            {data && (data.previous || data.next) ? (
              <>
                <Button
                  type="button"
                  size={"sm"}
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
                  type="button"
                  size={"sm"}
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
