import React from "react";
import Button from "../../../component/form/Button";
import { useNavigate } from "react-router-dom";
import ModuleTable from "./ModuleTable";
import { Pencil, Trash } from "lucide-react";
import { ModuleProps } from "../../../types/module";
import { ColumnDef } from "@tanstack/react-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteModuleAPI, fetchModule } from "../../../api/module";
import LoadingPage from "../../Loading/Loading";
import { toast, ToastContainer } from "react-toastify";

const TaskCategory = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["module-list"],
    // queryFn: fetchTask,
    retry: false,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteModuleAPI,
    onSuccess: () => {
      toast("Successfully deleted module");
      queryClient.invalidateQueries({ queryKey: ["addModule"] });
    },
    onError: (error: any) => {
      console.error("❌ Error adding client:", error);
      alert(error.response?.data?.message || "Failed to add client");
    },
  });

  const columns: ColumnDef<ModuleProps>[] = [
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
      accessorKey: "slug",
      header: "Key",
    },
    {
      accessorKey: "permission",
      header: "Value",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => {
        const status = getValue() as string;
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              navigate("/editModule", { state: { data: row.original } });
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

  console.log(data);

  return (
    <div className="p-4 bg-white">
      <ToastContainer />
      <Button text="+ Add Module" onClick={() => navigate("/addModule")} />
      <div className="mt-2 mb-2">
        <ModuleTable
          columns={columns}
          data={(Array.isArray(data.data) && data.data) || []}
        />
      </div>
    </div>
  );
};

export default TaskCategory;
