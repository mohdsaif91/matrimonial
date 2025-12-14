import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import LoadingPage from "../../Loading/Loading";
import Button from "../../../component/form/Button";
import Table from "../../../component/table/Table";

export default function WebsiteSettings() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: taskData, isLoading } = useQuery({
    queryKey: ["website-setting-list"],
    // queryFn: fetchTask,
    retry: false,
  });

  const deleteMutation = useMutation({
    // mutationFn: deleteTask,
    onSuccess: () => {
      toast("Successfully deleted Website setting");
      queryClient.invalidateQueries({ queryKey: ["website-setting-list"] });
    },
    onError: (error: any) => {
      console.error("❌ Error in deleting Website setting:", error);
      toast(
        error.response?.data?.message || "Failed to delete Website setting"
      );
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
      header: "Name",
    },
    {
      accessorKey: "title",
      header: "Key",
    },
    {
      accessorKey: "role_for",
      header: "Value",
    },
    {
      accessorKey: "role_for",
      header: "Status",
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
  return (
    <div className="p-4 bg-white">
      <Button
        text="+ Add Website Setting"
        onClick={() => navigate("/addWebsiteSetting")}
      />
      <div className="mt-2 mb-2">
        <Table columns={columns} data={handledTaskData} />
      </div>
    </div>
  );
}
