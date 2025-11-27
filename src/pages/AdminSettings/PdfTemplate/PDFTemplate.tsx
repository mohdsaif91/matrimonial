import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import LoadingPage from "../../Loading/Loading";
import Button from "../../../component/form/Button";
import Table from "../../../component/table/Table";
import {
  deletePDFTemplate,
  fetchPDFTemplate,
} from "../../../service/PDFTemplate";

export default function PDFTemplate() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: PDFTemplate, isLoading } = useQuery({
    queryKey: ["pdf-template-list"],
    queryFn: fetchPDFTemplate,
    retry: false,
  });

  const deleteMutation = useMutation({
    mutationFn: deletePDFTemplate,
    onSuccess: () => {
      toast("Successfully deleted PDF Template");
      queryClient.invalidateQueries({ queryKey: ["pdf-template-list"] });
    },
    onError: (error: any) => {
      console.error("❌ Error in deleting PDF Template:", error);
      toast(error.response?.data?.message || "Failed to delete PDF Template");
    },
  });

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: "#",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "slug_key",
      header: "Key",
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
              navigate("/addPDFTemplate", { state: { data: row.original } });
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

  const handledPDFTemplate = Array.isArray(PDFTemplate) ? PDFTemplate : [];

  return (
    <div className="p-4 bg-white">
      <ToastContainer />
      <Button
        text="+ Add PDF Template"
        onClick={() => navigate("/addPDFTemplate")}
      />
      <div className="mt-2 mb-2">
        <Table borderX columns={columns} data={handledPDFTemplate} />
      </div>
    </div>
  );
}
