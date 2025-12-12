import { useState } from "react";
import { Pencil } from "lucide-react";
import Table from "../../../../component/table/Table";
import { DropDown } from "../../../../component/form/SearchableDropdown";
import { interactionType } from "../../../../data/interaction";
import { yesNoOptions } from "../../../../data/ClientForm";
import TextArea from "../../../../component/form/TextArea";
import Button from "../../../../component/form/Button";
import { InteractionProps } from "../../../../types/interaction";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addInteraction,
  fetchInteraction,
  updateInteraction,
} from "../../../../service/interaction";
import LoadingPage from "../../../Loading/Loading";
import { toast } from "react-toastify";
import moment from "moment";

const initialData = {
  interactable_type: "",
  interaction_with_client: "",
  remarks: "",
  interactable_id: "",
  interaction_type: "",
};
export default function Interaction({
  data,
  type,
}: {
  data: any;
  type: string;
}) {
  const [formData, setFormData] = useState<InteractionProps>({
    ...initialData,
  });
  const [isUpdate, setIsUpdate] = useState(false);

  const queryClient = useQueryClient();

  const {
    data: interactionData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["interaction-list"],
    queryFn: fetchInteraction,
  });

  const columns = [
    {
      header: "#",
      accessorKey: "serial",
      cell: ({ row }) => row.index + 1,
    },
    {
      header: "Remark",
      accessorKey: "remarks",
    },
    {
      header: "Interaction",
      accessorKey: "interaction_type",
    },
    {
      header: "Interaction With Client",
      accessorKey: "interaction_with_client",
    },
    {
      header: "Added By",
      accessorKey: "added_by",
    },
    {
      header: "Created At",
      accessorKey: "created_at",
      cell: ({ value }) => <span>{moment(value).format("yyyy-MM-DD")}</span>,
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: ({ row }) => (
        <Pencil
          onClick={() => {
            setFormData({ ...row.original });
            setIsUpdate(true);
          }}
          className="cursor-pointer"
          size={18}
        />
      ),
    },
  ];

  const mutation = useMutation({
    mutationFn: addInteraction,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["interaction-list"] });
      toast("Successfully added Interaction");
      setFormData({ ...initialData });
    },
    onError: (error: any) => {
      console.error("❌ Error adding Interaction:", error);
      toast(error.response?.data?.message || "Failed to add Interaction");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateInteraction,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["interaction-list"] });
      toast("Successfully Updated Interaction");
      setFormData({ ...initialData });
      refetch();
      setIsUpdate(false);
    },
    onError: (error: any) => {
      console.error("❌ Error updating Interaction:", error);
      toast(error.response?.data?.message || "Failed to Update Interaction");
    },
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  const transformedInteractionData = interactionData
    ? interactionData.data
    : [];

  return (
    <div className="bg-gray-50">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          isUpdate
            ? updateMutation.mutate({
                ...formData,
                // created_at: moment(formData.created_at).format("yyyy-MM-DD"),
              })
            : mutation.mutate({
                ...formData,
                interactable_type: type,
                interactable_id: data?.id,
              });
        }}
        className="bg-white p-6 rounded shadow-md mb-6"
      >
        <div className="mt-6 grid grid-cols-4 gap-4">
          <DropDown
            label="Select Type"
            name="selectType"
            options={interactionType}
            value={formData.interaction_type as string}
            onChange={(val) => {
              setFormData({ ...formData, interaction_type: val });
            }}
          />
          <DropDown
            label="Interaction With Client"
            name="interactionWitClient"
            options={yesNoOptions}
            value={formData.interaction_with_client}
            onChange={(val) => {
              setFormData({
                ...formData,
                interaction_with_client: val as string,
              });
            }}
          />
          <div className="col-span-2">
            <TextArea
              label="Remark"
              name="remark"
              value={formData.remarks}
              onChange={(e) => setFormData({ ...formData, remarks: e })}
            />
          </div>
        </div>
        <Button
          loading={mutation.isPending || updateMutation.isPending}
          type="submit"
          text={`${isUpdate ? "Update" : "Save"} All`}
        />
      </form>
      <div className="bg-white p-6 shadow rounded">
        <h3 className="text-lg font-semibold mb-3">Service Interactions</h3>
        <Table borderX columns={columns} data={transformedInteractionData} />
      </div>
    </div>
  );
}
