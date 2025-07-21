import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Toaster } from "sonner";
import {
  FileText,
  Download,
  User,
  Calendar,
  GraduationCap,
  Briefcase,
  Star,
  TrendingUp,
  Brain,
  Users,
  Target,
  Lightbulb,
} from "lucide-react";
import { useParams } from "react-router";

const Reports = () => {
  const { id } = useParams();
  console.log({ id });
  const reportRef = useRef<HTMLDivElement>(null);

  // Sample data
  const candidateInfo = {
    name: "FAJAR ARI NUGRAHA",
    age: "23 tahun 5 bulan",
    birthDate: "13 Januari 1998",
    education: "S1 Psikologi",
    testDate: "20 Januari 2024",
    level: "Pengawas & Staff",
    testType: "Staff HR",
  };

  const psychologicalAspects = [
    {
      category: "KEMAMPUAN INTELEKTUAL",
      icon: Brain,
      color: "from-purple-500 to-purple-600",
      items: [
        {
          no: 1,
          aspect: "Kecerdasan Umum",
          description: "Taraf kecerdasan (Score IQ)",
          scores: [false, true, false, false, false],
        },
        {
          no: 2,
          aspect: "Sistematika Berpikir",
          description:
            "Kemampuan untuk berpikir mencari, dan memecahkan masalah",
          scores: [true, false, false, false, false],
        },
        {
          no: 3,
          aspect: "Ketajaman Diferensial",
          description:
            "Kemampuan untuk mengamati hal-hal yang detail secara tajam dan berpikir dengan teliti serta mengidentifikasi perbedaan",
          scores: [false, true, false, false, false],
        },
        {
          no: 4,
          aspect: "Abstraksi",
          description:
            "Kemampuan analisa abstrak untuk menghubungkan hal atau objek permasalahan yang serupa",
          scores: [true, false, false, false, false],
        },
        {
          no: 5,
          aspect: "Pemahaman Konsep",
          description:
            "Kemampuan untuk memahami konsep dan menganalisa situasi yang berbeda",
          scores: [true, false, false, false, false],
        },
      ],
    },
    {
      category: "SIKAP KERJA",
      icon: Target,
      color: "from-blue-500 to-blue-600",
      items: [
        {
          no: 1,
          aspect: "Motivasi Kerja",
          description:
            "Dorongan dalam diri untuk bekerja dan berprestasi tinggi",
          scores: [false, true, false, false, false],
        },
        {
          no: 2,
          aspect: "Ketekunan Kerja",
          description:
            "Kemampuan bekerja dengan tekun dan tidak mudah menyerah",
          scores: [false, false, true, false, false],
        },
        {
          no: 3,
          aspect: "Ketelitian",
          description:
            "Kemampuan untuk melakukan sesuatu secara benar tanpa melakukan kesalahan",
          scores: [false, false, true, false, false],
        },
        {
          no: 4,
          aspect: "Kecepatan Kerja",
          description:
            "Kemampuan untuk bekerja dengan cepat namun tetap bertanggung jawab",
          scores: [false, true, false, false, false],
        },
        {
          no: 5,
          aspect: "Analisa Kerja",
          description: "Kemampuan berpikir dengan menganalisa yang baik",
          scores: [false, false, false, true, false],
        },
        {
          no: 6,
          aspect: "Daya Konsentrasi",
          description:
            "Kemampuan untuk memusatkan perhatian dan tidak mudah terganggu",
          scores: [false, true, false, false, false],
        },
        {
          no: 7,
          aspect: "Kecepatan Kerja",
          description:
            "Kemampuan untuk bekerja dengan cepat dan melakukan pekerjaan",
          scores: [false, false, true, false, false],
        },
        {
          no: 8,
          aspect: "Loyalitas",
          description:
            "Kesetiaan terhadap organisasi tempat bekerja kepercayaan terhadap",
          scores: [false, true, false, false, false],
        },
        {
          no: 9,
          aspect: "Kerjasama",
          description:
            "Kemampuan untuk bekerja sama dengan orang lain dalam kelompok Kerja",
          scores: [false, true, false, false, false],
        },
      ],
    },
    {
      category: "KEPRIBADIAN",
      icon: Users,
      color: "from-emerald-500 to-emerald-600",
      items: [
        {
          no: 1,
          aspect: "Stabilitas Emosi",
          description:
            "Kemampuan untuk mengendalikan emosi sehingga dapat mengatasi",
          scores: [false, true, false, false, false],
        },
        {
          no: 2,
          aspect: "Kepercayaan Diri",
          description:
            "Keyakinan individu akan kemampuan dirinya dalam berbagai situasi",
          scores: [false, false, true, false, false],
        },
        {
          no: 3,
          aspect: "Penyesuaian Diri",
          description:
            "Kemampuan untuk menyesuaikan diri serta berinteraksi sosial agar",
          scores: [false, false, true, false, false],
        },
        {
          no: 4,
          aspect: "Hubungan Sosial",
          description:
            "Kemampuan untuk berinteraksi dan berkomunikasi dengan orang lain",
          scores: [false, false, false, true, false],
        },
        {
          no: 5,
          aspect: "Tanggung Jawab",
          description:
            "Perilaku untuk melaksanakan sesuatu dengan sungguh-sungguh dan",
          scores: [false, false, false, true, false],
        },
      ],
    },
    {
      category: "KEPEMIMPINAN",
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600",
      items: [
        {
          no: 1,
          aspect: "Kepemimpinan",
          description: "Kemampuan untuk menjadi seorang pemimpin",
          scores: [false, false, true, false, false],
        },
        {
          no: 2,
          aspect: "Strategi Perencanaan",
          description: "Kemampuan merencanakan strategi untuk mencapai tujuan",
          scores: [false, true, false, false, false],
        },
        {
          no: 3,
          aspect: "Pengambilan Keputusan",
          description:
            "Kemampuan mengambil tindakan dalam situasi tertentu dengan",
          scores: [false, false, true, false, false],
        },
      ],
    },
  ];

  const jobMatch = 53.89;

  //   const getScoreLabel = (index: number) => {
  //     const labels = ["SK", "K", "C", "B", "SB"];
  //     return labels[index];
  //   };

  const getScoreColor = (index: number) => {
    const colors = [
      "bg-red-100 text-red-700",
      "bg-orange-100 text-orange-700",
      "bg-yellow-100 text-yellow-700",
      "bg-blue-100 text-blue-700",
      "bg-green-100 text-green-700",
    ];
    return colors[index];
  };

  const exportToPDF = async () => {
    if (!reportRef.current) return;

    try {
      // Show loading toast
      const loadingToast = toast.loading(
        "Generating high-quality PDF report...",
        {
          description: "Please wait while we prepare your document",
        }
      );

      // Dynamic imports
      const [html2canvas, jsPDF] = await Promise.all([
        import("html2canvas").then((module) => module.default),
        import("jspdf").then((module) => module.jsPDF),
      ]);

      // Create PDF with A4 dimensions
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Professional margins
      const margin = {
        top: 20,
        right: 15,
        bottom: 25,
        left: 15,
      };

      const contentWidth = pdfWidth - margin.left - margin.right;
      const contentHeight = pdfHeight - margin.top - margin.bottom;

      // Get all major sections
      const sections = Array.from(
        reportRef.current.querySelectorAll(".pdf-section")
      );

      let currentPage = 1;
      let currentY = margin.top;

      // Add professional header to first page
      pdf.setFontSize(20);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(51, 51, 51);
      pdf.text("PSYCHOLOGICAL ASSESSMENT REPORT", margin.left, currentY);

      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(102, 102, 102);
      pdf.text(
        `Generated: ${new Date().toLocaleDateString("id-ID")}`,
        margin.left,
        currentY + 8
      );
      pdf.text(`Candidate: ${candidateInfo.name}`, margin.left, currentY + 14);

      // Add separator line
      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(0.5);
      pdf.line(
        margin.left,
        currentY + 18,
        pdfWidth - margin.right,
        currentY + 18
      );

      currentY += 30;

      // Process each section with high quality
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i] as HTMLElement;

        // Create high-quality canvas for this section
        const canvas = await html2canvas(section, {
          scale: 4, // Very high resolution
          useCORS: true,
          allowTaint: false,
          backgroundColor: "#ffffff",
          logging: false,
          width: section.scrollWidth,
          height: section.scrollHeight,
          windowWidth: 1400, // Fixed width for consistency
          windowHeight: section.scrollHeight,
          scrollX: 0,
          scrollY: 0,
          imageTimeout: 15000,
          removeContainer: true,
        });

        const imgData = canvas.toDataURL("image/jpeg", 0.95); // High quality JPEG

        // Calculate optimal dimensions
        const imgWidth = contentWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Check if we need a new page
        if (
          currentY + imgHeight > pdfHeight - margin.bottom &&
          currentPage > 1
        ) {
          pdf.addPage();
          currentPage++;
          currentY = margin.top;
        }

        // Handle sections that are too tall for one page
        if (imgHeight > contentHeight) {
          let remainingHeight = imgHeight;
          let sourceY = 0;
          const sourceHeight = canvas.height;

          while (remainingHeight > 0) {
            const availableHeight = pdfHeight - currentY - margin.bottom;
            const heightToAdd = Math.min(remainingHeight, availableHeight);

            // Calculate the portion of the source image
            const sourcePortionHeight =
              (heightToAdd / imgHeight) * sourceHeight;

            // Create a cropped canvas for this portion
            const croppedCanvas = document.createElement("canvas");
            const croppedCtx = croppedCanvas.getContext("2d");

            if (croppedCtx) {
              croppedCanvas.width = canvas.width;
              croppedCanvas.height = sourcePortionHeight;

              // Fill with white background
              croppedCtx.fillStyle = "#ffffff";
              croppedCtx.fillRect(
                0,
                0,
                croppedCanvas.width,
                croppedCanvas.height
              );

              // Draw the portion of the original image
              croppedCtx.drawImage(
                canvas,
                0,
                sourceY,
                canvas.width,
                sourcePortionHeight,
                0,
                0,
                croppedCanvas.width,
                sourcePortionHeight
              );

              const croppedImgData = croppedCanvas.toDataURL(
                "image/jpeg",
                0.95
              );
              pdf.addImage(
                croppedImgData,
                "JPEG",
                margin.left,
                currentY,
                imgWidth,
                heightToAdd,
                undefined,
                "FAST"
              );
            }

            sourceY += sourcePortionHeight;
            remainingHeight -= heightToAdd;

            if (remainingHeight > 0) {
              pdf.addPage();
              currentPage++;
              currentY = margin.top;
            } else {
              currentY += heightToAdd + 5; // Small spacing
            }
          }
        } else {
          // Section fits on current page
          pdf.addImage(
            imgData,
            "JPEG",
            margin.left,
            currentY,
            imgWidth,
            imgHeight,
            undefined,
            "FAST"
          );
          currentY += imgHeight + 8; // Spacing between sections
        }

        // Add page break for better organization if needed
        if (i < sections.length - 1) {
          const remainingSpace = pdfHeight - currentY - margin.bottom;
          if (remainingSpace < 50) {
            // If less than 50mm remaining, start new page
            pdf.addPage();
            currentPage++;
            currentY = margin.top;
          }
        }
      }

      // Add professional footer to all pages
      const totalPages = pdf.getNumberOfPages();
      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        pdf.setPage(pageNum);

        // Footer line
        pdf.setDrawColor(200, 200, 200);
        pdf.setLineWidth(0.3);
        pdf.line(
          margin.left,
          pdfHeight - margin.bottom + 5,
          pdfWidth - margin.right,
          pdfHeight - margin.bottom + 5
        );

        // Footer text
        pdf.setFontSize(8);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(102, 102, 102);

        // Left side - confidential
        pdf.text(
          "CONFIDENTIAL DOCUMENT",
          margin.left,
          pdfHeight - margin.bottom + 12
        );

        // Center - company/system name
        const centerText = "AI Assessment System";
        const centerTextWidth = pdf.getTextWidth(centerText);
        pdf.text(
          centerText,
          (pdfWidth - centerTextWidth) / 2,
          pdfHeight - margin.bottom + 12
        );

        // Right side - page numbers
        const pageText = `Page ${pageNum} of ${totalPages}`;
        const pageTextWidth = pdf.getTextWidth(pageText);
        pdf.text(
          pageText,
          pdfWidth - margin.right - pageTextWidth,
          pdfHeight - margin.bottom + 12
        );
      }

      // Generate professional filename
      const timestamp = new Date().toISOString().slice(0, 10);
      const cleanName = candidateInfo.name.replace(/[^a-zA-Z0-9]/g, "_");
      const filename = `Psychological_Assessment_${cleanName}_${timestamp}.pdf`;

      // Save the PDF
      pdf.save(filename);

      // Success notification
      toast.dismiss(loadingToast);
      toast.success("High-quality PDF exported successfully!", {
        description: `Professional report saved as ${filename}`,
        duration: 5000,
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to export PDF", {
        description:
          "Please try again. If the issue persists, try refreshing the page.",
        duration: 5000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <Toaster position="bottom-right" richColors closeButton />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center">
                <Star className="h-3 w-3 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Psychological Assessment
              </h1>
              <p className="text-lg text-gray-600 mt-1">
                Comprehensive evaluation report
              </p>
            </div>
          </div>
          <Button
            onClick={exportToPDF}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 rounded-xl px-6 py-3 flex items-center gap-3 transition-all duration-200 hover:scale-105"
          >
            <Download className="h-5 w-5" />
            Export PDF
          </Button>
        </div>

        {/* Report Content - This will be captured for PDF */}
        <div ref={reportRef} className="space-y-12 pdf-content">
          {/* Candidate Info Card */}
          <div className="pdf-section">
            <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Candidate Profile
                    </h2>
                    <p className="text-indigo-100">
                      Personal information & test details
                    </p>
                  </div>
                </div>
              </div>
              <CardContent className="p-8">
                <div className="flex gap-8">
                  <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        {
                          icon: User,
                          label: "Full Name",
                          value: candidateInfo.name,
                        },
                        {
                          icon: Calendar,
                          label: "Age",
                          value: candidateInfo.age,
                        },
                        {
                          icon: Calendar,
                          label: "Birth Date",
                          value: candidateInfo.birthDate,
                        },
                        {
                          icon: GraduationCap,
                          label: "Education",
                          value: candidateInfo.education,
                        },
                        {
                          icon: Calendar,
                          label: "Test Date",
                          value: candidateInfo.testDate,
                        },
                        {
                          icon: Briefcase,
                          label: "Position Level",
                          value: candidateInfo.level,
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="group p-4 rounded-2xl hover:bg-slate-50 transition-all duration-200"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                              <item.icon className="h-5 w-5 text-slate-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                                {item.label}
                              </p>
                              <p className="text-lg font-semibold text-slate-900 mt-1">
                                {item.value}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                      <Avatar className="relative w-40 h-48 rounded-3xl border-4 border-white shadow-2xl">
                        <AvatarImage
                          src="/placeholder.svg?height=192&width=160"
                          alt="Candidate photo"
                        />
                        <AvatarFallback className="w-40 h-48 rounded-3xl bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 text-2xl font-bold">
                          {candidateInfo.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Job Match Score */}
          <div className="pdf-section">
            <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                      <TrendingUp className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">
                        Job Match Score
                      </h3>
                      <p className="text-slate-600">
                        Overall compatibility assessment
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      {jobMatch}%
                    </div>
                    <Badge className="mt-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border-emerald-200 px-4 py-1 rounded-full">
                      Moderate Match
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Scoring System Legend */}
          <div className="pdf-section">
            <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      Scoring System
                    </h3>
                    <p className="text-slate-600">
                      Assessment scale explanation
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[
                    {
                      label: "SK",
                      desc: "Sangat Kurang",
                      color: "from-red-500 to-red-600",
                      score: "1",
                    },
                    {
                      label: "K",
                      desc: "Kurang",
                      color: "from-orange-500 to-orange-600",
                      score: "2",
                    },
                    {
                      label: "C",
                      desc: "Cukup",
                      color: "from-yellow-500 to-yellow-600",
                      score: "3",
                    },
                    {
                      label: "B",
                      desc: "Baik",
                      color: "from-blue-500 to-blue-600",
                      score: "4",
                    },
                    {
                      label: "SB",
                      desc: "Sangat Baik",
                      color: "from-green-500 to-green-600",
                      score: "5",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="text-center p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors duration-200"
                    >
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center text-white font-bold text-lg mx-auto mb-3 shadow-lg`}
                      >
                        {item.score}
                      </div>
                      <p className="font-semibold text-slate-900 text-sm">
                        {item.label}
                      </p>
                      <p className="text-xs text-slate-600 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Psychological Aspects */}
          {psychologicalAspects.map((category, categoryIndex) => (
            <div key={categoryIndex} className="pdf-section">
              <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden">
                <div className={`bg-gradient-to-r ${category.color} p-6`}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {category.category}
                      </h3>
                      <p className="text-white/80">
                        {category.items.length} assessment criteria
                      </p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-0">
                  {/* Table Header */}
                  <div className="bg-slate-100 p-4 border-b border-slate-200">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-1 text-center">
                        <span className="text-sm font-bold text-slate-700">
                          No
                        </span>
                      </div>
                      <div className="col-span-3">
                        <span className="text-sm font-bold text-slate-700">
                          Aspek
                        </span>
                      </div>
                      <div className="col-span-3">
                        <span className="text-sm font-bold text-slate-700">
                          Deskripsi
                        </span>
                      </div>
                      <div className="col-span-5">
                        <div className="grid grid-cols-5 gap-2">
                          {["SK", "K", "C", "B", "SB"].map((label, index) => (
                            <div key={index} className="text-center">
                              <span className="text-sm font-bold text-slate-700">
                                {label}
                              </span>
                              <div className="text-xs text-slate-500 mt-1">
                                {index + 1}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Table Content */}
                  <div className="overflow-hidden">
                    {category.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className={`p-4 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-all duration-200 ${
                          itemIndex % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                        }`}
                      >
                        <div className="grid grid-cols-12 gap-4 items-start">
                          <div className="col-span-1 flex justify-center">
                            <div className="w-8 h-8 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center">
                              <span className="text-sm font-bold text-slate-700">
                                {item.no}
                              </span>
                            </div>
                          </div>
                          <div className="col-span-3">
                            <h4 className="text-base font-semibold text-slate-900 leading-tight">
                              {item.aspect}
                            </h4>
                          </div>
                          <div className="col-span-3">
                            <p className="text-slate-600 text-sm leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                          <div className="col-span-5">
                            <div className="grid grid-cols-5 gap-2">
                              {item.scores.map((score, scoreIndex) => (
                                <div
                                  key={scoreIndex}
                                  className="flex justify-center"
                                >
                                  <div
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                                      score
                                        ? `${getScoreColor(
                                            scoreIndex
                                          )} shadow-lg scale-110 font-bold`
                                        : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                                    }`}
                                  >
                                    {score ? "✓" : ""}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}

          {/* Bottom Section */}
          <div className="pdf-section">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Personality Type */}
              <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden">
                <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <Lightbulb className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        Personality Type
                      </h3>
                      <p className="text-white/80">MBTI Assessment Result</p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-gradient-to-r from-violet-600 to-purple-600 text-white text-2xl px-6 py-3 rounded-2xl shadow-lg">
                        ESTP
                      </Badge>
                      <div>
                        <p className="text-lg font-semibold text-slate-900">
                          The Entrepreneur
                        </p>
                        <p className="text-slate-600">Energetic & Adaptable</p>
                      </div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl border border-violet-100">
                      <p className="text-slate-700 leading-relaxed">
                        Seseorang dengan tipe kepribadian ESTP cenderung praktis
                        & realistis. Tipe ekstrovert, aktif, fleksibel,
                        menyenangi jenis olahat dan berinteraksi &
                        bersosialisasi dengan orang lain.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <Star className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        Recommendations
                      </h3>
                      <p className="text-white/80">Hiring decision guidance</p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-8">
                  <div className="space-y-4">
                    {[
                      {
                        label: "Highly Recommended",
                        color: "from-green-500 to-emerald-500",
                        icon: "🌟",
                      },
                      {
                        label: "Recommended",
                        color: "from-blue-500 to-cyan-500",
                        icon: "👍",
                      },
                      {
                        label: "Consider with Caution",
                        color: "from-yellow-500 to-orange-500",
                        icon: "⚠️",
                      },
                      {
                        label: "Not Recommended",
                        color: "from-red-500 to-pink-500",
                        icon: "❌",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors duration-200"
                      >
                        <div
                          className={`w-10 h-10 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center text-white shadow-lg`}
                        >
                          <span className="text-lg">{item.icon}</span>
                        </div>
                        <span className="text-slate-700 font-medium">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Footer */}
          <div className="pdf-section">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-100 to-slate-200 rounded-full">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <p className="text-sm text-slate-600 font-medium italic">
                  Generated by AI Assessment System
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
