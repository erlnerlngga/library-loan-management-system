import type React from "react";

import { useState } from "react";
import { Alert, AlertTitle } from "@/components/ui/alert";
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

import BookTable from "@/components/BookTable";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useCreateBorrowedBookMutation, useGetBookQuery } from "@/state/api";
import { toast, Toaster } from "sonner";
import { LoadingSkeleton } from "@/components/loading";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { useNavigate } from "react-router";

export default function CreateBorrowedBook() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading } = useGetBookQuery({ page: currentPage });
  const [createBookBorrowed, { isLoading: isLoadingCreate }] =
    useCreateBorrowedBookMutation();

  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    card_number: "",
    name: "",
    email: "",
    duration: "",
    book: -1,
    active_loan: true,
  });

  const handleAddBook = (id: number) => {
    setFormData((prev) => ({ ...prev, book: id }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setErr("");
      setSuccess("");
      // console.log("Form submitted:", formData);
      const result = await createBookBorrowed({
        book_borrowed: {
          book: formData.book,
          duration: formData.duration,
          active_loan: formData.active_loan,
          borrower_data: {
            card_number: formData.card_number,
            name: formData.name,
            email: formData.email,
          },
        },
      });

      if (result.error) {
        setErr(`${result.error}`);
        return;
      }

      navigate(0);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("Opps somthing went wrong", {
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
          <h1 className="text-lg font-semibold">Borrower Data Entry</h1>
        </div>
      </header>
      <div className="flex-1 space-y-6 p-4 md:p-8">
        <Card className="mx-auto max-w-4xl">
          <CardHeader>
            <CardTitle>Partner Information</CardTitle>
            <CardDescription>
              Create a new partner account with all necessary details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="card_number">Card Number *</Label>
                  <Input
                    id="card_number"
                    value={formData.card_number}
                    onChange={(e) =>
                      setFormData({ ...formData, card_number: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (due date) *</Label>
                  <Input
                    id="duration"
                    type="date"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-1">
                <div>
                  <Label>Choose book</Label>
                </div>
                <div>
                  {isLoading ? (
                    <LoadingSkeleton variant="table" count={1} />
                  ) : (
                    <BookTable
                      books={data?.results}
                      book_id={formData.book}
                      addBook={handleAddBook}
                    />
                  )}
                </div>
                <div className="flex gap-2 justify-end">
                  {data && (data.previous || data.next) ? (
                    <>
                      <Button
                        type="button"
                        size={"sm"}
                        variant={"secondary"}
                        className="cursor-pointer"
                        disabled={data.previous === null}
                        onClick={() =>
                          currentPage > 1
                            ? setCurrentPage((val) => val - 1)
                            : null
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
                </div>
              </div>

              {err !== "" && (
                <div>
                  <Alert variant="destructive">
                    <AlertCircleIcon />
                    <AlertTitle>{err}</AlertTitle>
                  </Alert>
                </div>
              )}

              {success !== "" && (
                <div>
                  <Alert>
                    <CheckCircle2Icon />
                    <AlertTitle>{success}</AlertTitle>
                  </Alert>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isLoadingCreate}
                >
                  Save
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  disabled={isLoadingCreate}
                >
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
