import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, X } from "lucide-react";

interface BookProps {
  books:
    | { id: number; title: string; isbn: string; stock: number }[]
    | undefined;
  book_id: number;
  addBook: (id: number) => void;
}

export default function BookTable({ books, book_id, addBook }: BookProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="w-[70px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        {books && books.length !== 0 ? (
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.stock}</TableCell>
                <TableCell>
                  {book_id === book.id ? (
                    <Button
                      type="button"
                      size={"sm"}
                      variant={"destructive"}
                      onClick={() => addBook(-1)}
                    >
                      <X />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      size={"sm"}
                      variant={"secondary"}
                      onClick={() => addBook(book.id)}
                    >
                      <Plus />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : null}
      </Table>
    </div>
  );
}
