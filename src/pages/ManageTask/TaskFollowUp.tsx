import { useState } from "react";
import { Pencil, Trash } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import moment from "moment";
import { TaskFollowUpProps } from "../../types/taskFollowUp";
import TextArea from "../../component/form/TextArea";
import { DropDown } from "../../component/form/SearchableDropdown";
import { yesNoOptionsSmall } from "../../data/ClientForm";
import { fetchManageUserAPI } from "../../service/manageUser";
import LoadingPage from "../Loading/Loading";
import { getLabelValue } from "../../util/ClientUtils";
import { DateTimePicker } from "../../component/form/DateField";
import { taskPriorityOptions } from "../../data/task";
import Button from "../../component/form/Button";
import Table from "../../component/table/Table";
import {
  addTaskFollowUp,
  deleteTaskFollowUp,
  fetchTaskFollowUp,
  updateTaskFollowUp,
} from "../../service/taskFollowUp";
import { ColumnDef } from "@tanstack/react-table";
import {
  addLeadsFollowUp,
  fetchLeadsFollowUp,
  updateLeadsFollowUp,
} from "../../service/leads";

const initialData = {
  task_id: "",
  comment: "",
  followup_required: "",
  task_followup_date: "",
  planned_followup_date: "",
  assigned_to: "",
  task_priority: "",
};

export default function TaskFollowUp({
  taskId,
  type = "taskList",
  taskName = "",
}: {
  taskId: string;
  type: string;
  taskName: string;
}) {
  const [formData, setFormData] = useState<TaskFollowUpProps>({
    ...initialData,
  });

  const [isUpdate, setIsUpdate] = useState(false);

  const queryClient = useQueryClient();

  const { data: interactionData, isLoading } = useQuery({
    queryKey: ["task-followup-list"],
    queryFn: fetchTaskFollowUp,
    enabled: type === "taskList",
  });

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
      header: "Task Name",
      accessorKey: "",
      cell: () => {
        return <div>{taskName}</div>;
      },
    },
    {
      header: "Comment",
      accessorKey: "comment",
    },
    {
      header: "Added By",
      accessorKey: "",
      cell: ({ row }) => {
        const addedByUser = row.original?.created_user?.role;
        return <div className="capitalize">{addedByUser}</div>;
      },
    },
    {
      header: "Assigned To",
      accessorKey: "added_by",
      cell: ({ row }) => {
        const assignedData = row.original?.assigned_user?.role;
        return <div>{assignedData}</div>;
      },
    },
    {
      header: "Follow up Date",
      accessorKey: "task_followup_date",
      //   cell: ({ value }) => <span>{value}</span>,
    },
    {
      header: "Created Date",
      accessorKey: "created_at",
      cell: ({ value }) => <span>{moment(value).format("yyyy-MM-DD")}</span>,
    },
    {
      header: "Status",
      accessorKey: "task_priority",
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
      setFormData({ ...initialData });
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
      setFormData({ ...initialData });
      setIsUpdate(false);
    },
    onError: (error: any) => {
      console.error("❌ Error updating Leads Follow Up:", error);
      toast(
        error.response?.data?.message || "Failed to Update Leads Follow Up"
      );
    },
  });

  const mutation = useMutation({
    mutationFn: addTaskFollowUp,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["task-followup-list"] });
      toast("Successfully added Task Follow Up");
      setFormData({ ...initialData });
    },
    onError: (error: any) => {
      console.error("❌ Error adding Task Follow Up:", error);
      toast(error.response?.data?.message || "Failed to add Task Follow Up");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTaskFollowUp,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["task-followup-list"] });
      toast("Successfully Updated Task Follow Up");
      setFormData({ ...initialData });
      setIsUpdate(false);
    },
    onError: (error: any) => {
      console.error("❌ Error updating Task Follow Up:", error);
      toast(error.response?.data?.message || "Failed to Update Task Follow Up");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTaskFollowUp,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["task-followup-list"] });
      toast("Successfully Deleted Task Follow Up");
      setFormData({ ...initialData });
      setIsUpdate(false);
    },
    onError: (error: any) => {
      console.error("❌ Error Deleted Task Follow Up:", error);
      toast(
        error.response?.data?.message || "Failed to Deleted Task Follow Up"
      );
    },
  });

  if (isLoading || userLoading) {
    return <LoadingPage />;
  }

  const transformedInteractionData = interactionData
    ? interactionData.data
    : [];

  const handledAssigneToData = userData ? userData.data : [];

  return (
    <div className="bg-gray-50">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          type === "taskList"
            ? isUpdate
              ? updateMutation.mutate({
                  ...formData,
                  task_id: taskId,
                })
              : mutation.mutate({
                  ...formData,
                  task_id: taskId,
                })
            : isUpdate
            ? updateMutationLeads.mutate({
                ...formData,
                task_id: taskId as string,
              })
            : mutationLeads.mutate({
                ...formData,
                task_id: taskId,
              });
        }}
        className="bg-white p-6 rounded shadow-md mb-6"
      >
        <div className="mt-6 grid grid-cols-4 gap-4">
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
          <DropDown
            label="Followup Required"
            name="followUpRequired"
            options={yesNoOptionsSmall}
            value={formData.followup_required as string}
            onChange={(val) => {
              setFormData({ ...formData, followup_required: val });
            }}
          />
          <DateTimePicker
            label="Task Follow up"
            onChange={(d) =>
              setFormData({
                ...formData,
                task_followup_date: moment(d).format("yyyy-MM-DD"),
              })
            }
            required
            value={formData.task_followup_date}
          />
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
          <DropDown
            label="Interaction With Client"
            name="interactionWitClient"
            options={getLabelValue(handledAssigneToData)}
            value={formData.assigned_to}
            onChange={(val) => {
              setFormData({
                ...formData,
                assigned_to: val as string,
              });
            }}
          />
          <DropDown
            label="Task Priority"
            name="taskPriority"
            options={taskPriorityOptions}
            value={formData.task_priority}
            onChange={(val) => {
              setFormData({
                ...formData,
                task_priority: val as string,
              });
            }}
          />
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
