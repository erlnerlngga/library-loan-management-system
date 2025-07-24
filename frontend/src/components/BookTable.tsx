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

// const books = [
//   {
//     title: "Adventures in Code: Volume 1",
//     isbn: "978-1-2345-6789-0",
//     stock: 15,
//   },
//   {
//     title: "The Quantum Realm Explained",
//     isbn: "978-1-2345-6789-1",
//     stock: 8,
//   },
//   {
//     title: "Gardening for Beginners: A Green Guide",
//     isbn: "978-1-2345-6789-2",
//     stock: 22,
//   },
//   {
//     title: "Culinary Delights: World Cuisine",
//     isbn: "978-1-2345-6789-3",
//     stock: 5,
//   },
//   {
//     title: "Space Explorers: Beyond the Stars",
//     isbn: "978-1-2345-6789-4",
//     stock: 12,
//   },
//   {
//     title: "Mindfulness & Meditation Techniques",
//     isbn: "978-1-2345-6789-5",
//     stock: 18,
//   },
//   {
//     title: "Ancient Civilizations: Untold Stories",
//     isbn: "978-1-2345-6789-6",
//     stock: 3,
//   },
//   {
//     title: "The Art of Digital Photography",
//     isbn: "978-1-2345-6789-7",
//     stock: 9,
//   },
//   {
//     title: "Building Modern Web Apps with React",
//     isbn: "978-1-2345-6789-8",
//     stock: 25,
//   },
//   {
//     title: "Personal Finance: Save & Invest",
//     isbn: "978-1-2345-6789-9",
//     stock: 7,
//   },
//   {
//     title: "Introduction to Artificial Intelligence",
//     isbn: "978-1-2345-6790-0",
//     stock: 10,
//   },
//   {
//     title: "The Secret Life of Trees",
//     isbn: "978-1-2345-6790-1",
//     stock: 14,
//   },
//   {
//     title: "Fitness Fundamentals: A Healthy Life",
//     isbn: "978-1-2345-6790-2",
//     stock: 6,
//   },
//   {
//     title: "History of World Wars: Vol 1",
//     isbn: "978-1-2345-6790-3",
//     stock: 2,
//   },
//   {
//     title: "Understanding Climate Change",
//     isbn: "978-1-2345-6790-4",
//     stock: 11,
//   },
//   {
//     title: "Effective Public Speaking",
//     isbn: "978-1-2345-6790-5",
//     stock: 20,
//   },
//   {
//     title: "Learn Python Programming Fast",
//     isbn: "978-1-2345-6790-6",
//     stock: 19,
//   },
//   {
//     title: "The Universe: A Visual Guide",
//     isbn: "978-1-2345-6790-7",
//     stock: 4,
//   },
//   {
//     title: "Basic Home Repairs for Everyone",
//     isbn: "978-1-2345-6790-8",
//     stock: 23,
//   },
//   {
//     title: "Exploring Ocean Depths",
//     isbn: "978-1-2345-6790-9",
//     stock: 1,
//   },
//   {
//     title: "Global Economics in 21st Century",
//     isbn: "978-1-2345-6791-0",
//     stock: 16,
//   },
//   {
//     title: "Psychology of Everyday Life",
//     isbn: "978-1-2345-6791-1",
//     stock: 13,
//   },
//   {
//     title: "Intro to Data Science with R",
//     isbn: "978-1-2345-6791-2",
//     stock: 7,
//   },
//   {
//     title: "The Art of Storytelling",
//     isbn: "978-1-2345-6791-3",
//     stock: 21,
//   },
//   {
//     title: "Surviving in the Wild: A Handbook",
//     isbn: "978-1-2345-6791-4",
//     stock: 0,
//   },
//   {
//     title: "Robotics: Design and Principles",
//     isbn: "978-1-2345-6791-5",
//     stock: 10,
//   },
//   {
//     title: "Beginner's Guide to Chess",
//     isbn: "978-1-2345-6791-6",
//     stock: 17,
//   },
//   {
//     title: "World Mythology: Gods and Heroes",
//     isbn: "978-1-2345-6791-7",
//     stock: 9,
//   },
//   {
//     title: "The Power of Positive Thinking",
//     isbn: "978-1-2345-6791-8",
//     stock: 24,
//   },
//   {
//     title: "Quantum Computing Basics",
//     isbn: "978-1-2345-6791-9",
//     stock: 8,
//   },
//   {
//     title: "Sustainable Living Practices",
//     isbn: "978-1-2345-6792-0",
//     stock: 14,
//   },
//   {
//     title: "Exploring Ancient Egypt",
//     isbn: "978-1-2345-6792-1",
//     stock: 6,
//   },
//   {
//     title: "Modern Art Movements",
//     isbn: "978-1-2345-6792-2",
//     stock: 12,
//   },
//   {
//     title: "Introduction to Blockchain Technology",
//     isbn: "978-1-2345-6792-3",
//     stock: 2,
//   },
//   {
//     title: "The Wonders of the Animal Kingdom",
//     isbn: "978-1-2345-6792-4",
//     stock: 18,
//   },
//   {
//     title: "Effective Communication Strategies",
//     isbn: "978-1-2345-6792-5",
//     stock: 11,
//   },
//   {
//     title: "Building a Home Smart System",
//     isbn: "978-1-2345-6792-6",
//     stock: 5,
//   },
//   {
//     title: "The Human Brain: How It Works",
//     isbn: "978-1-2345-6792-7",
//     stock: 20,
//   },
//   {
//     title: "Creative Writing Workshop",
//     isbn: "978-1-2345-6792-8",
//     stock: 9,
//   },
//   {
//     title: "Travel Guide: Europe's Hidden Gems",
//     isbn: "978-1-2345-6792-9",
//     stock: 13,
//   },
//   {
//     title: "Cybersecurity Fundamentals",
//     isbn: "978-1-2345-6793-0",
//     stock: 7,
//   },
//   {
//     title: "Astronomy: Stars and Galaxies",
//     isbn: "978-1-2345-6793-1",
//     stock: 25,
//   },
//   {
//     title: "DIY Electronics Projects",
//     isbn: "978-1-2345-6793-2",
//     stock: 1,
//   },
//   {
//     title: "Financial Markets Demystified",
//     isbn: "978-1-2345-6793-3",
//     stock: 16,
//   },
//   {
//     title: "The History of Music",
//     isbn: "978-1-2345-6793-4",
//     stock: 10,
//   },
//   {
//     title: "Digital Marketing Essentials",
//     isbn: "978-1-2345-6793-5",
//     stock: 19,
//   },
//   {
//     title: "World Geography: A Comprehensive Guide",
//     isbn: "978-1-2345-6793-6",
//     stock: 4,
//   },
//   {
//     title: "Parenting Tips for New Parents",
//     isbn: "978-1-2345-6793-7",
//     stock: 22,
//   },
//   {
//     title: "Basic Car Maintenance",
//     isbn: "978-1-2345-6793-8",
//     stock: 3,
//   },
//   {
//     title: "Introduction to Philosophy",
//     isbn: "978-1-2345-6793-9",
//     stock: 15,
//   },
// ];

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
