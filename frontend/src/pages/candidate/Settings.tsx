import type React from "react";
import Cookies from "js-cookie";

import { toast, Toaster } from "sonner";
import { useState, useEffect, useRef, ChangeEvent } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
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
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useParams, useNavigate } from "react-router";
import { ArrowLeft, Upload, User } from "lucide-react";
import {
  useGetCandidateByIdQuery,
  useEditCandidateMutation,
} from "@/state/api";

// Mock existing candidate data - in real app, this would come from API based on params.id
// const existingCandidate = {
//   id: 1,
//   name: "Alice Johnson",
//   email: "alice@example.com",
//   photo: "/placeholder.svg",
//   cv: "alice_johnson_cv.pdf",
//   company: "Tech Solutions Inc",
//   phone: "+1234567890",
//   birth_of_place: "New York, NY",
//   birth_of_date: "1995-03-15",
//   gender: "Female",
//   marital_status: "Single",
//   current_job: "Software Developer",
//   position: "Senior Developer",
//   education: "Bachelor of Computer Science",
//   major: "Computer Science",
//   address: "123 Main St, New York, NY 10001",
// };

export default function SettingsCandidate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<{ profile: string; cv: string }>({
    profile: "",
    cv: "",
  });
  const [url, setUrl] = useState<{ profile: File | null; cv: File | null }>({
    profile: null,
    cv: null,
  });
  const photoRef = useRef<HTMLInputElement>(null);
  const cvRef = useRef<HTMLInputElement>(null);

  const { data: candidate } = useGetCandidateByIdQuery({ id: id! });
  const [editCandidate, { isLoading }] = useEditCandidateMutation();

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    photo: "",
    cv: "",
    birth_of_place: "",
    birth_of_date: "",
    gender: "",
    marital_status: "",
    current_job: "",
    position: "",
    education: "",
    major: "",
    address: "",
    have_done: false,
    project: [{}],
    user: { id: "", email: "", roles: [{}] },
  });

  useEffect(() => {
    if (candidate) {
      setFormData({
        name: candidate.name,
        company: candidate.company,
        phone: candidate.phone,
        photo: candidate.photo,
        cv: candidate.cv,
        birth_of_place: candidate.birth_of_place,
        birth_of_date: candidate.birth_of_date,
        gender: candidate.gender,
        marital_status: candidate.marital_status,
        current_job: candidate.current_job,
        position: candidate.position,
        education: candidate.education,
        major: candidate.major,
        address: candidate.address,
        have_done: candidate.have_done,
        project: candidate.project,
        user: candidate.user,
      });

      setPhoto((prev) => ({
        ...prev,
        profile: candidate.photo,
        cv: candidate.cv,
      }));

      console.log({ candidate });
    }
  }, [candidate]);

  if (!id) {
    navigate("all-project", { replace: true });
    return;
  }

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

    if (type === "cv") {
      const file = e.target.files[0];
      setPhoto((prev) => ({ ...prev, cv: URL.createObjectURL(file) }));
      setUrl((prev) => ({ ...prev, cv: file }));

      console.log({ cv: file });
    }
  };

  const handlePostPhotoChange = (type: string) => {
    if (type === "photo" && photoRef.current) {
      photoRef.current.click();
    }
    if (type === "cv" && cvRef.current) {
      cvRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      console.log("Form submitted:", formData);
      // Handle form submission here

      await editCandidate({
        id,
        candidate: {
          name: formData.name,
          company: formData.company,
          phone: formData.phone,
          birth_of_place: formData.birth_of_place,
          birth_of_date: formData.birth_of_date,
          gender: formData.gender,
          marital_status: formData.marital_status,
          current_job: formData.current_job,
          position: formData.position,
          education: formData.education,
          major: formData.major,
          address: formData.address,
          have_done: formData.have_done,
        },
      });

      if (url.profile) {
        const formData = new FormData();
        formData.append("photo", url.profile);

        const response = await fetch(
          import.meta.env.VITE_API_BASE_URL + `/candidate/${id}/upload-photo/`,
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

      if (url.cv) {
        const formData = new FormData();
        formData.append("cv", url.cv);

        const response = await fetch(
          import.meta.env.VITE_API_BASE_URL + `/candidate/${id}/upload-cv/`,
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
        description: "Candidate berhasil diedit",
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log({ error });
      toast.error("Opps something went wrong", {
        description: error,
      });
    }
  };

  return (
    <div className="flex flex-col">
      <Toaster position="bottom-right" richColors closeButton />
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link to={`/candidates/${id}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Profile
          </Link>
        </Button>
        <div className="flex flex-1 items-center gap-2">
          <h1 className="text-lg font-semibold">Edit Candidate Profile</h1>
        </div>
      </header>
      <div className="flex-1 space-y-6 p-4 md:p-8">
        <Card className="mx-auto max-w-4xl">
          <CardHeader>
            <CardTitle>Update Candidate Information</CardTitle>
            <CardDescription>
              Modify candidate profile details and personal information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Photo Upload Section */}
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={photo.profile || "/placeholder.svg"} />
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
                  Change Photo
                </Button>
              </div>

              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Basic Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
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
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.user.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          user: { ...formData.user, email: e.target.value },
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+1234567890"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={formData.company || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Personal Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="birth_of_date">Date of Birth</Label>
                    <Input
                      id="birth_of_date"
                      type="date"
                      value={formData.birth_of_date || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          birth_of_date: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birth_of_place">Place of Birth</Label>
                    <Input
                      id="birth_of_place"
                      value={formData.birth_of_place || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          birth_of_place: e.target.value,
                        })
                      }
                      placeholder="City, State/Country"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={formData.gender || ""}
                      onValueChange={(value) =>
                        setFormData({ ...formData, gender: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                        <SelectItem value="Prefer not to say">
                          Prefer not to say
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="marital_status">Marital Status</Label>
                    <Select
                      value={formData.marital_status || ""}
                      onValueChange={(value) =>
                        setFormData({ ...formData, marital_status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select marital status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Single">Single</SelectItem>
                        <SelectItem value="Married">Married</SelectItem>
                        <SelectItem value="Divorced">Divorced</SelectItem>
                        <SelectItem value="Widowed">Widowed</SelectItem>
                        <SelectItem value="Prefer not to say">
                          Prefer not to say
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  Professional Information
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="current_job">Current Job Title</Label>
                    <Input
                      id="current_job"
                      value={formData.current_job || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          current_job: e.target.value,
                        })
                      }
                      placeholder="e.g., Software Developer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position Level</Label>
                    <Select
                      value={formData.position || ""}
                      onValueChange={(value) =>
                        setFormData({ ...formData, position: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select position level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Intern">Intern</SelectItem>
                        <SelectItem value="Junior">Junior</SelectItem>
                        <SelectItem value="Mid-level">Mid-level</SelectItem>
                        <SelectItem value="Senior">Senior</SelectItem>
                        <SelectItem value="Lead">Lead</SelectItem>
                        <SelectItem value="Manager">Manager</SelectItem>
                        <SelectItem value="Director">Director</SelectItem>
                        <SelectItem value="Executive">Executive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Education Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Education Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="education">Education Level</Label>
                    <Select
                      value={formData.education || ""}
                      onValueChange={(value) =>
                        setFormData({ ...formData, education: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High School">High School</SelectItem>
                        <SelectItem value="Associate Degree">
                          Associate Degree
                        </SelectItem>
                        <SelectItem value="Bachelor Degree">
                          Bachelor Degree
                        </SelectItem>
                        <SelectItem value="Master Degree">
                          Master Degree
                        </SelectItem>
                        <SelectItem value="Doctoral Degree">
                          Doctoral Degree
                        </SelectItem>
                        <SelectItem value="Professional Certification">
                          Professional Certification
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="major">Major/Field of Study</Label>
                    <Input
                      id="major"
                      value={formData.major || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, major: e.target.value })
                      }
                      placeholder="e.g., Computer Science"
                    />
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Address Information</h3>
                <div className="space-y-2">
                  <Label htmlFor="address">Full Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="Street address, City, State/Province, Postal Code, Country"
                    rows={3}
                  />
                </div>
              </div>

              {/* CV Upload Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Documents</h3>
                <div className="space-y-2">
                  <Label>CV/Resume</Label>
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-muted">
                    <div>
                      <Button
                        variant={"link"}
                        className="text-sm font-medium"
                        disabled={photo.cv === ""}
                      >
                        <a href={photo.cv} target="_blank">
                          Current CV
                        </a>
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        Upload a new file to replace
                      </p>
                    </div>
                    <Input
                      hidden
                      type="file"
                      accept="*"
                      onChange={(e) => handlePhotoChange(e, "cv")}
                      ref={cvRef}
                      className="cursor-pointer"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handlePostPhotoChange("cv")}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload New CV
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  Update Profile
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  asChild
                >
                  <Link to={`/candidates/${id}`}>Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
