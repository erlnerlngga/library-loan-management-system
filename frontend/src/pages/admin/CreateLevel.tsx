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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  useCreateLevelMutation,
  useGetPsychotestQuery,
  useGetPartnerQuery,
} from "@/state/api";
import { toast, Toaster } from "sonner";

// Mock data for partners and psychotest tools
// const partners = [
//   { id: 1, name: "Tech Corp", company: "Tech Corp" },
//   { id: 2, name: "Startup Inc", company: "Startup Inc" },
//   { id: 3, name: "Enterprise Ltd", company: "Enterprise Ltd" },
// ];

// const psychotestTools = [
//   { id: 1, name: "MBTI", slug: "mbti" },
//   { id: 2, name: "MSDT", slug: "msdt" },
//   { id: 3, name: "CFIT", slug: "cfit" },
//   { id: 4, name: "IST", slug: "ist" },
//   { id: 5, name: "Papi Kostik", slug: "papi-kostik" },
//   { id: 6, name: "DISC", slug: "disc" },
//   { id: 7, name: "KRAPAL", slug: "krapal" },
// ];

export default function CreateLevel() {
  const { data: dataPsychotest } = useGetPsychotestQuery();
  const { data: dataPartner } = useGetPartnerQuery();
  const [createLevel, { isLoading }] = useCreateLevelMutation();

  const [formData, setFormData] = useState({
    name: "",
    partner_id: "",
  });

  const [selectedTools, setSelectedTools] = useState<
    { id: string; name: string; slug: string }[]
  >([]);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      console.log("Form submitted:", {
        ...formData,
        selected_tools: selectedTools,
      });

      if (!formData.partner_id || formData.partner_id === "") {
        throw new Error("Theres no partner");
      }

      if (selectedTools.length === 0) {
        throw new Error("Choose tools psychotest");
      }

      // Handle form submission here
      const result = await createLevel({
        level: {
          name: formData.name,
          partner: formData.partner_id,
          psychotests: selectedTools.map((val) => ({
            name: val.name,
            slug: val.slug,
          })),
        },
      });

      console.log({ result });

      toast.success("Success", {
        description: "Level berhasil didaftarkan",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("Opps something went wrong", {
        description: error,
      });
    }
  };

  const handleToolToggle = (tool: {
    id: string;
    name: string;
    slug: string;
  }) => {
    setSelectedTools((prev) =>
      prev.find((val) => val.id === tool.id)
        ? prev.filter((val) => val.id !== tool.id)
        : [...prev, tool]
    );
  };

  return (
    <div className="flex flex-col">
      <Toaster position="bottom-right" richColors closeButton />
      <div className="flex-1 space-y-6 p-4 md:p-8">
        <Card className="mx-auto max-w-4xl">
          <CardHeader>
            <CardTitle>New Psychotest Level</CardTitle>
            <CardDescription>
              Create a new psychotest level and assign tools for specific
              partners.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Level Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g., Beginner Level, Advanced Assessment"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="partner_id">Assign to Partner *</Label>
                  <Select
                    value={formData.partner_id}
                    onValueChange={(value) =>
                      setFormData({ ...formData, partner_id: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select partner" />
                    </SelectTrigger>
                    <SelectContent>
                      {dataPartner &&
                        dataPartner.results.length > 0 &&
                        dataPartner.results.map((partner) => (
                          <SelectItem key={partner.id} value={partner.user.id}>
                            {partner.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">
                    Select Psychotest Tools
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Choose the tools that will be included in this level.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {dataPsychotest && dataPsychotest.results.length > 0
                    ? dataPsychotest.results.map((tool) => (
                        <div
                          key={tool.id}
                          className="flex items-center space-x-2 p-3 border rounded-lg"
                        >
                          <Checkbox
                            id={`tool-${tool.id}`}
                            checked={
                              selectedTools.find((val) => val.id === tool.id)
                                ? true
                                : false
                            }
                            onCheckedChange={() => handleToolToggle(tool)}
                          />
                          <div className="flex-1">
                            <Label
                              htmlFor={`tool-${tool.id}`}
                              className="text-sm font-medium cursor-pointer"
                            >
                              {tool.name}
                            </Label>
                          </div>
                        </div>
                      ))
                    : null}
                </div>

                {dataPsychotest &&
                  dataPsychotest.results.length > 0 &&
                  selectedTools.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Selected Tools:
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {selectedTools.map((tool) => {
                          const tol = dataPsychotest.results.find(
                            (t) => t.id === tool.id
                          );
                          return tol ? (
                            <Badge key={tol.id} variant="secondary">
                              {tol.name}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
              </div>

              <Separator />

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  Create Psychotest Level
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
