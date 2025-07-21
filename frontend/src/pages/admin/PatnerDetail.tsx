"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Edit,
  Mail,
  Phone,
  Building,
  Calendar,
  Palette,
  Shield,
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router";
import { useGetPartnerByIdQuery } from "@/state/api";
import { LoadingSkeleton } from "@/components/loading";

// Mock data - in real app, this would come from API based on params.id
// const partner = {
//   id: 1,
//   name: "John Doe",
//   email: "john@company.com",
//   company: "Tech Corp",
//   role: "partner",
//   is_active: true,
//   on_trial: false,
//   paid_until: "2024-12-31",
//   phone: "+1234567890",
//   color_brand: "#3b82f6",
//   created_at: "2024-01-15",
//   last_login: "2024-06-10",
// };

export default function PartnerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: partner, isLoading } = useGetPartnerByIdQuery({ id: id! });

  if (!id) {
    navigate("all-patner");
    return;
  }

  if (!partner) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1>Theres no Data</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center gap-2">
          <h1 className="text-lg font-semibold">Partner Details</h1>
        </div>
        <Button asChild>
          <Link to={`/admin/partners/${id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Partner
          </Link>
        </Button>
      </header>
      <div className="flex-1 space-y-6 p-4 md:p-8">
        <div className="grid gap-6 md:grid-cols-3">
          {isLoading ? (
            <LoadingSkeleton variant="card" count={1} />
          ) : (
            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="text-lg">
                      {partner.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">{partner.name}</CardTitle>
                    <CardDescription className="text-base">
                      {partner.company}
                    </CardDescription>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge
                        variant={partner.is_active ? "default" : "destructive"}
                      >
                        {partner.is_active ? "Active" : "Inactive"}
                      </Badge>
                      {partner.on_trial && (
                        <Badge variant="outline">Trial</Badge>
                      )}
                      <Badge
                        variant={
                          partner.user.roles[0].name === "admin"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {partner.user.roles[0].name}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">
                        {partner.user.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">
                        {partner.phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Company</p>
                      <p className="text-sm text-muted-foreground">
                        {partner.company}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Role</p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {partner.user.roles[0].name}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Paid Until</p>
                      <p className="text-sm text-muted-foreground">
                        {partner.paid_until}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Palette className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Brand Color</p>
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: partner.color_brand }}
                        />
                        <p className="text-sm text-muted-foreground">
                          {partner.color_brand}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-6">
            {isLoading ? (
              <LoadingSkeleton variant="card" count={1} />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Account Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Status</span>
                    <Badge
                      variant={partner.is_active ? "default" : "destructive"}
                    >
                      {partner.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Trial</span>
                    <Badge variant={partner.on_trial ? "default" : "outline"}>
                      {partner.on_trial ? "Yes" : "No"}
                    </Badge>
                  </div>
                  {/* <Separator />
                  <div>
                    <p className="text-sm font-medium">Member Since</p>
                    <p className="text-sm text-muted-foreground">
                      {partner.created_at}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Last Login</p>
                    <p className="text-sm text-muted-foreground">
                      {partner.last_login}
                    </p>
                  </div> */}
                </CardContent>
              </Card>
            )}

            {isLoading ? (
              <LoadingSkeleton variant="card" count={1} />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Company Logo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg bg-muted">
                    <div className="text-center">
                      <Building className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mt-2">
                        No logo uploaded
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
