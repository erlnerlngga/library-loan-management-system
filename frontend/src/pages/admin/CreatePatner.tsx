import type React from "react";
import Cookies from "js-cookie";

import { useState, useRef, ChangeEvent } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, User } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useCreatePartnerMutation } from "@/state/api";
import { toast, Toaster } from "sonner";

export default function CreatePartner() {
  const [photo, setPhoto] = useState<{ profile: string; logo: string }>({
    profile: "",
    logo: "",
  });
  const [url, setUrl] = useState<{ profile: File | null; logo: File | null }>({
    profile: null,
    logo: null,
  });
  const [createPatner, { isLoading }] = useCreatePartnerMutation();
  const photoRef = useRef<HTMLInputElement>(null);
  const logoRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    password: "",
    paid_until: "",
    role: "",
    phone: "",
    color_brand: "#000000",
    is_active: true,
    on_trial: false,
  });

  const handlePhotoChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (!e.target.files) {
      return;
    }

    if (type === "photo") {
      const file = e.target.files[0];
      setPhoto((prev) => ({ ...prev, profile: URL.createObjectURL(file) }));
      setUrl((prev) => ({ ...prev, profile: file }));

      console.log({ profile: file });
    }

    if (type === "logo") {
      const file = e.target.files[0];
      setPhoto((prev) => ({ ...prev, logo: URL.createObjectURL(file) }));
      setUrl((prev) => ({ ...prev, logo: file }));

      console.log({ logo: file });
    }
  };

  const handlePostPhotoChange = (type: string) => {
    if (type === "photo" && photoRef.current) {
      photoRef.current.click();
    }
    if (type === "logo" && logoRef.current) {
      logoRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      console.log("Form submitted:", formData);
      const result = await createPatner({
        partner: {
          name: formData.name,
          company: formData.company,
          phone: formData.phone,
          color_brand: formData.color_brand,
          paid_until: formData.paid_until,
          on_trial: formData.on_trial,
          is_active: formData.is_active,
          user: {
            email: formData.email,
            password: formData.password,
            roles: [{ name: "partner" }],
          },
        },
      });

      console.log({ result });

      if (url.profile && result.data) {
        const formData = new FormData();
        formData.append("photo", url.profile);

        const response = await fetch(
          import.meta.env.VITE_API_BASE_URL +
            `/partner/${result.data.id}/upload-photo/`,
          {
            headers: {
              Authorization: `Token ${Cookies.get("token")}`,
            },
            body: formData,
            method: "POST",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
      }

      if (url.logo && result.data) {
        const formData = new FormData();
        formData.append("logo", url.logo);

        const response = await fetch(
          import.meta.env.VITE_API_BASE_URL +
            `/partner/${result.data.id}/upload-logo/`,
          {
            headers: {
              Authorization: `Token ${Cookies.get("token")}`,
            },
            body: formData,
            method: "POST",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
      }

      toast.success("Success", {
        description: "Partner berhasil didaftarkan",
      });

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
          <h1 className="text-lg font-semibold">Create Partner</h1>
        </div>
      </header>
      <div className="flex-1 space-y-6 p-4 md:p-8">
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle>Partner Information</CardTitle>
            <CardDescription>
              Create a new partner account with all necessary details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Photo Upload */}
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="aspect-auto object-cover h-24 w-24">
                  <AvatarImage src={photo.profile || ""} />
                  <AvatarFallback>
                    <User className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>

                <Input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePhotoChange(e, "photo")}
                  ref={photoRef}
                  className="cursor-pointer"
                />

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handlePostPhotoChange("photo")}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Photo
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
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
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role *</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) =>
                      setFormData({ ...formData, role: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="partner">Partner</SelectItem>
                      <SelectItem value="candidate">Candidate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="paid_until">Paid Until</Label>
                  <Input
                    id="paid_until"
                    type="date"
                    value={formData.paid_until}
                    onChange={(e) =>
                      setFormData({ ...formData, paid_until: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color_brand">Brand Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="color_brand"
                      type="color"
                      value={formData.color_brand}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          color_brand: e.target.value,
                        })
                      }
                      className="w-16"
                    />
                    <Input
                      value={formData.color_brand}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          color_brand: e.target.value,
                        })
                      }
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              {/* Logo Upload */}
              <div className="space-y-2">
                <Label>Company Logo</Label>
                <div className="flex items-center justify-center w-full">
                  <label
                    onClick={() => handlePostPhotoChange("logo")}
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-4 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        company logo
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG or SVG (MAX. 2MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handlePhotoChange(e, "logo")}
                      ref={logoRef}
                    />
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, is_active: checked })
                    }
                  />
                  <Label htmlFor="is_active">Active Account</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="on_trial"
                    checked={formData.on_trial}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, on_trial: checked })
                    }
                  />
                  <Label htmlFor="on_trial">On Trial</Label>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  Create Partner
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  disabled={isLoading}
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
