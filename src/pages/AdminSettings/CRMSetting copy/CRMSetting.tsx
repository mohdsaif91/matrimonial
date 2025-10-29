import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import LoadingPage from "../../Loading/Loading";
import Button from "../../../component/form/Button";
import Table from "../../../component/table/Table";

export default function CRMSetting() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: taskData, isLoading } = useQuery({
    queryKey: ["task-list"],
    // queryFn: fetchTask,
    retry: false,
  });

  const deleteMutation = useMutation({
    // mutationFn: deleteTask,
    onSuccess: () => {
      toast("Successfully deleted Task item");
      queryClient.invalidateQueries({ queryKey: ["task-list"] });
    },
    onError: (error: any) => {
      console.error("❌ Error in deleting Task item:", error);
      toast(error.response?.data?.message || "Failed to delete Task item");
    },
  });

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: "#",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "name",
      header: "ClIent Details",
    },
    {
      accessorKey: "title",
      header: "Task Title",
    },
    {
      accessorKey: "role_for",
      header: "Profile Details",
    },
    {
      accessorKey: "scheduled_on",
      header: "Schedule Date",
    },
    {
      accessorKey: "role_for",
      header: "Created By",
    },
    {
      accessorKey: "assigned_to",
      header: "Assigned To",
      cell: ({ getValue }) => {
        const name = getValue() ? getValue()?.name : "";
        return <div>{name}</div>;
      },
    },
    {
      accessorKey: "category",
      header: "Task Category",
      cell: ({ getValue }) => {
        const name = getValue() ? getValue()?.name : "";
        return <div>{name}</div>;
      },
    },
    {
      accessorKey: "priority",
      header: "Task Priority",
    },
    {
      accessorKey: "role_for",
      header: "Follow Up",
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              navigate("/task-edit", { state: { data: row.original } });
            }}
            className="p-2 rounded hover:bg-gray-200 cursor-pointer"
          >
            <Pencil size={16} className="text-gray-600" />
          </button>
          <button
            onClick={() =>
              row.original.id && deleteMutation.mutate(row.original.id)
            }
            className="p-2 rounded hover:bg-gray-200 cursor-pointer"
          >
            <Trash size={16} className="text-red-500" />
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <LoadingPage />;
  }

  const handledTaskData = taskData ? taskData.data : [];
  console.log(handledTaskData, " <>?");

  return (
    <div className="p-4 bg-white">
      <ToastContainer />
      <Button
        text="+ Add CRM Setting"
        onClick={() => navigate("/addCRMSetting")}
      />
      <div className="mt-2 mb-2">
        <Table columns={columns} data={handledTaskData} />
      </div>
    </div>
  );
}
