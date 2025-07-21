import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router";
import { useGetPartnerByIdQuery } from "@/state/api";
import FormEditPartner from "@/components/admin/form-edit-partner";

export default function EditPartner() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useGetPartnerByIdQuery({ id: id! });

  if (!id) {
    navigate("partners");
    return;
  }

  if (!data) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1>Theres no Data</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate(`/hazard/${id}`)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Edit Approval Status</h1>
        <p className="text-muted-foreground">
          Update the approval status for hazard ID: {id}
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <FormEditPartner id={id} data={data} />
      </div>
    </div>
  );
}
