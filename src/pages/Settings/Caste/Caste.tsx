import Button from "../../../component/form/Button";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash } from "lucide-react";
import { ModuleProps } from "../../../types/module";
import { ColumnDef } from "@tanstack/react-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingPage from "../../Loading/Loading";
import { toast, ToastContainer } from "react-toastify";
import Table from "../../../component/table/Table";
import { deleteReligionAPI, fetchReligion } from "../../../api/religion";
import { deleteCasteAPI, fetchCasteAPI } from "../../../api/caste";

const Caste = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["caste-list"],
    queryFn: fetchCasteAPI,
    retry: false,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCasteAPI,
    onSuccess: () => {
      toast("Successfully deleted Caste");
      queryClient.invalidateQueries({ queryKey: ["caste-list"] });
    },
    onError: (error: any) => {
      console.error("❌ Error in deleting Caste:", error);
      toast(error.response?.data?.message || "Failed to delete Caste");
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
      accessorKey: "religon",
      header: "Religion",
      cell: ({ row }) => {
        return <span>{row.original?.religion?.name}</span>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => {
        const status = getValue() as string;
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
              status === "active"
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
              navigate("/editCaste", { state: { data: row.original } });
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

  return (
    <div className="p-4 bg-white">
      <ToastContainer />
      <Button text="+ Add Caste" onClick={() => navigate("/addCaste")} />
      <Button
        className="ml-3"
        text="+ Add Sub Caste"
        onClick={() => navigate("/addSubCaste")}
      />
      <div className="mt-2 mb-2">
        <Table columns={columns} data={data.data || []} />
      </div>
    </div>
  );
};

export default Caste;
