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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { Partner } from "@/types/patner/patner";

// Mock data
// const partners = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "john@company.com",
//     company: "Tech Corp",
//     role: "partner",
//     is_active: true,
//     on_trial: false,
//     paid_until: "2024-12-31",
//     phone: "+1234567890",
//     color_brand: "#3b82f6",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     email: "jane@startup.com",
//     company: "Startup Inc",
//     role: "admin",
//     is_active: true,
//     on_trial: true,
//     paid_until: "2024-06-30",
//     phone: "+0987654321",
//     color_brand: "#ef4444",
//   },
//   {
//     id: 3,
//     name: "Bob Johnson",
//     email: "bob@enterprise.com",
//     company: "Enterprise Ltd",
//     role: "partner",
//     is_active: false,
//     on_trial: false,
//     paid_until: "2024-03-15",
//     phone: "+1122334455",
//     color_brand: "#10b981",
//   },
// ];

interface PartnerProps {
  partners: Partner[] | undefined;
}

export default function PartnerTable({ partners }: PartnerProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Partner</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Paid Until</TableHead>
            <TableHead className="w-[70px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        {partners && partners.length !== 0 ? (
          <TableBody>
            {partners.map((partner) => (
              <TableRow key={partner.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>
                        {partner.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{partner.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {partner.user.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: partner.color_brand }}
                    />
                    <span>{partner.company}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      partner.user.roles[0].name === "admin"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {partner.user.roles[0].name}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Badge
                      variant={partner.is_active ? "default" : "destructive"}
                    >
                      {partner.is_active ? "Active" : "Inactive"}
                    </Badge>
                    {partner.on_trial && (
                      <Badge variant="outline" className="text-xs">
                        Trial
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{partner.paid_until}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={`/admin/partners/${partner.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to={`/admin/partners/${partner.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
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
