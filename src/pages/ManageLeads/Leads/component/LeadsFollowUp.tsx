import { useState } from "react";
import { Pencil, Trash } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import moment from "moment";
import { ColumnDef } from "@tanstack/react-table";
import { LeadProps } from "../../../../types/leads";
import {
  addLeadsFollowUp,
  deleteLeadsFollowUp,
  fetchLeadsFollowUp,
  updateLeadsFollowUp,
} from "../../../../service/leads";
import { fetchManageUserAPI } from "../../../../service/manageUser";
import LoadingPage from "../../../Loading/Loading";
import TextArea from "../../../../component/form/TextArea";
import { DateTimePicker } from "../../../../component/form/DateField";
import { DropDown } from "../../../../component/form/SearchableDropdown";
import {
  leadStatus,
  yesNoOptions,
  yesNoOptionsSmall,
} from "../../../../data/ClientForm";
import Button from "../../../../component/form/Button";
import Table from "../../../../component/table/Table";

const initialLeadData = {
  lead_id: "",
  comment: "",
  followup_required: "",
  planned_followup_date: "",
  created_date: "",
  lead_status: "",
};

export default function LeadsFollowUp({ taskId }: { taskId: string }) {
  const [formData, setFormData] = useState<LeadProps>({
    ...initialLeadData,
  });

  const [isUpdate, setIsUpdate] = useState(false);

  const queryClient = useQueryClient();

  const { data: leadsFollowupData, isLoading: leadsFollowupLoading } = useQuery(
    {
      queryKey: ["lead-followup-list"],
      queryFn: fetchLeadsFollowUp,
    }
  );

  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ["manage-user-list"],
    queryFn: fetchManageUserAPI,
    retry: false,
  });

  const columns: ColumnDef<any>[] = [
    {
      header: "#",
      accessorKey: "serial",
      cell: ({ row }) => row.index + 1,
    },
    {
      header: "Lead Name",
      accessorKey: "lead_name",
    },
    {
      header: "Lead Source",
      accessorKey: "",
    },
    {
      header: "Comment",
      accessorKey: "comment",
    },
    {
      header: "Phone/Email",
      accessorKey: "comment",
    },
    {
      header: "Added By",
      accessorKey: "",
      cell: ({ row }) => {
        const addedByUser = row.original?.added_user?.name || "";
        return <div className="capitalize">{addedByUser}</div>;
      },
    },
    {
      header: "Planned Follow up Date",
      accessorKey: "planned_followup_date",
      //   cell: ({ value }) => <span>{value}</span>,
    },
    {
      header: "Created Date",
      accessorKey: "created_at",
      cell: ({ value }) => <span>{moment(value).format("yyyy-MM-DD")}</span>,
    },
    {
      header: "Status",
      accessorKey: "lead_status",
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: ({ row }) => (
        <div className="flex ">
          <Pencil
            onClick={() => {
              setFormData({ ...row.original });
              setIsUpdate(true);
            }}
            className="cursor-pointer"
            size={18}
          />
          <Trash
            onClick={() => {
              deleteMutation.mutate(row.original?.id);
            }}
            className="cursor-pointer ml-2"
            size={18}
          />
        </div>
      ),
    },
  ];

  const mutationLeads = useMutation({
    mutationFn: addLeadsFollowUp,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["lead-followup-list"] });
      toast("Successfully added Leads Follow Up");
      setFormData({ ...initialLeadData });
    },
    onError: (error: any) => {
      console.error("❌ Error adding Leads Follow Up:", error);
      toast(error.response?.data?.message || "Failed to add Leads Follow Up");
    },
  });

  const updateMutationLeads = useMutation({
    mutationFn: updateLeadsFollowUp,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["lead-followup-list"] });
      toast("Successfully Updated Leads Follow Up");
      setFormData({ ...initialLeadData });
      setIsUpdate(false);
    },
    onError: (error: any) => {
      console.error("❌ Error updating Leads Follow Up:", error);
      toast(
        error.response?.data?.message || "Failed to Update Leads Follow Up"
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteLeadsFollowUp,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["lead-followup-list"] });
      toast("Successfully Deleted Lead Follow Up");
      setFormData({ ...initialLeadData });
      setIsUpdate(false);
    },
    onError: (error: any) => {
      console.error("❌ Error Deleted Lead Follow Up:", error);
      toast(
        error.response?.data?.message || "Failed to Deleted Lead Follow Up"
      );
    },
  });

  if (userLoading || leadsFollowupLoading) {
    return <LoadingPage />;
  }

  const transformedInteractionData = leadsFollowupData
    ? leadsFollowupData.data
    : [];

  const handledAssigneToData = userData ? userData.data : [];

  return (
    <div className="bg-gray-50">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          isUpdate
            ? updateMutationLeads.mutate({
                ...formData,
                lead_id: taskId,
              })
            : mutationLeads.mutate({
                ...formData,
                lead_id: taskId,
              });
        }}
        className="bg-white p-6 rounded shadow-md mb-6"
      >
        <div className="mt-6 grid grid-cols-5 gap-4">
          <div className="col-span-12">
            <TextArea
              name="comment"
              onChange={(e) => {
                setFormData({ ...formData, comment: e });
              }}
              value={formData.comment}
              label="Comment"
              required
            />
          </div>
          <DateTimePicker
            label="Planned Follow up"
            onChange={(d) =>
              setFormData({
                ...formData,
                planned_followup_date: moment(d).format("yyyy-MM-DD"),
              })
            }
            required
            value={formData.planned_followup_date}
          />
          <DateTimePicker
            label="Created Date"
            onChange={(d) =>
              setFormData({
                ...formData,
                created_date: moment(d).format("yyyy-MM-DD"),
              })
            }
            required
            value={formData.created_date}
          />
          <DropDown
            label="Followup Required"
            name="followUpRequired"
            options={yesNoOptions}
            value={formData.followup_required as string}
            onChange={(val) => {
              setFormData({ ...formData, followup_required: val });
            }}
          />
          <DropDown
            label="Lead Status"
            name="leadStatus"
            options={leadStatus}
            value={formData.lead_status as string}
            onChange={(val) => {
              setFormData({ ...formData, lead_status: val });
            }}
          />
        </div>
        <Button
          className="mt-3"
          loading={mutationLeads.isPending || updateMutationLeads.isPending}
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
