import type React from "react";

import { useState } from "react";
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

import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, User } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Partner } from "@/types/patner/patner";
import { useEditPartnerMutation } from "@/state/api";

interface EditPartnerProps {
  id: string;
  data: Omit<Partner, "id" | "user">;
}

export default function FormEditPartner({ id, data }: EditPartnerProps) {
  const [editPatner, { isLoading }] = useEditPartnerMutation();
  const [formData, setFormData] = useState(data);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    await editPatner({
      id,
      patner: {
        name: formData.name,
        company: formData.company,
        phone: formData.phone,
        color_brand: formData.color_brand,
        paid_until: formData.paid_until,
        on_trial: formData.on_trial,
        is_active: formData.is_active,
      },
    });
    // Handle form submission here
  };

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center gap-2">
          <h1 className="text-lg font-semibold">Edit Partner</h1>
        </div>
      </header>
      <div className="flex-1 space-y-6 p-4 md:p-8">
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle>Update Partner Information</CardTitle>
            <CardDescription>
              Modify partner account details and settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Photo Upload */}
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>
                    <User className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  <Upload className="mr-2 h-4 w-4" />
                  Change Photo
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
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-4 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        new logo
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG or SVG (MAX. 2MB)
                      </p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" />
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
                  Update Partner
                </Button>
                <Button type="button" variant="outline" className="flex-1">
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
