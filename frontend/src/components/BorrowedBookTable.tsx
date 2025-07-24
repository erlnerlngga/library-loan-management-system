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
import { MoreHorizontal, Edit } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useEditBookBorrowedMutation, useEditBookMutation } from "@/state/api";

interface BorrowedBookProps {
  borrowed_books:
    | {
        id: number;
        borrower: {
          id: number;
          card_number: string;
          name: string;
          email: string;
          created_at: string;
        };
        book: {
          id: number;
          title: string;
          isbn: string;
          stock: number;
        };
        duration: string;
        active_loan: boolean;
        created_at: string;
      }[]
    | undefined;
}

export default function BorrowedBookTable({
  borrowed_books,
}: BorrowedBookProps) {
  const navigate = useNavigate();

  const [editBook] = useEditBookMutation();
  const [editBorrowebBook] = useEditBookBorrowedMutation();

  const handleReturnBook = async (data: {
    id: number;
    borrower: {
      id: number;
      card_number: string;
      name: string;
      email: string;
      created_at: string;
    };
    book: {
      id: number;
      title: string;
      isbn: string;
      stock: number;
    };
    duration: string;
    active_loan: boolean;
    created_at: string;
  }) => {
    const updateBook = editBook({
      id: data.book.id,
      book: {
        title: data.book.title,
        isbn: data.book.isbn,
        stock: data.book.stock + 1,
      },
    });

    const updateBorrowedBook = editBorrowebBook({
      id: data.id,
      book_borrowed: {
        book: data.book.id,
        duration: data.duration,
        active_loan: false,
        borrower_data: {
          card_number: data.borrower.card_number,
          name: data.borrower.name,
          email: data.borrower.email,
        },
      },
    });

    await Promise.all([updateBook, updateBorrowedBook]);

    navigate(0);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Card Number</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Book Title</TableHead>
            <TableHead>Active Loan</TableHead>
            <TableHead>Duration (due date)</TableHead>
            <TableHead className="w-[70px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        {borrowed_books && borrowed_books.length !== 0 ? (
          <TableBody>
            {borrowed_books.map((borrowed) => (
              <TableRow key={borrowed.id}>
                <TableCell>
                  {borrowed.borrower?.card_number || "no data"}
                </TableCell>
                <TableCell>{borrowed.borrower?.name || "no data"}</TableCell>
                <TableCell>{borrowed.borrower?.email || "no data"}</TableCell>
                <TableCell>{borrowed.book.title}</TableCell>
                <TableCell>
                  <div className="flex gap-1 items-center justify-start">
                    <Badge
                      variant={borrowed.active_loan ? "destructive" : "outline"}
                    >
                      {borrowed.active_loan ? `Active` : "Not Active"}
                    </Badge>

                    {borrowed.active_loan &&
                      new Date() > new Date(borrowed.duration) && (
                        <Badge variant={"destructive"}>Late</Badge>
                      )}
                  </div>
                </TableCell>
                <TableCell>{borrowed.duration}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Button
                          onClick={() => handleReturnBook(borrowed)}
                          variant={"ghost"}
                          className="w-full"
                          disabled={!borrowed.active_loan}
                        >
                          Book return
                        </Button>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to={`/`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
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
