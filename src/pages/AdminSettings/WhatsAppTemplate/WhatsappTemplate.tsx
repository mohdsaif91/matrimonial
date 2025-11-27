import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import LoadingPage from "../../Loading/Loading";
import Button from "../../../component/form/Button";
import Table from "../../../component/table/Table";
import { deleteWhatsAppProvider } from "../../../service/whatsAppProvider";
import { fetchWhatsAppTemplate } from "../../../service/whatsAppTemplate";

export default function WhatsappTemplate() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: whatsAppTemplateData, isLoading } = useQuery({
    queryKey: ["whatsapp-template-list"],
    queryFn: fetchWhatsAppTemplate,
    retry: false,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteWhatsAppProvider,
    onSuccess: () => {
      toast("Successfully deleted Whats App Template");
      queryClient.invalidateQueries({ queryKey: ["whatsapp-template-list"] });
    },
    onError: (error: any) => {
      console.error("❌ Error in deleting Whats App Template:", error);
      toast(
        error.response?.data?.message || "Failed to delete Whats App Template"
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
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "slug_key",
      header: "Slug Key",
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
              navigate("/editWhatsAppTemplate", {
                state: { data: row.original },
              });
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

  const handledWhatsAppTemplateData = whatsAppTemplateData
    ? whatsAppTemplateData
    : [];

  return (
    <div className="p-4 bg-white">
      <ToastContainer />
      <Button
        text="+ Add Whats App Template"
        onClick={() => navigate("/addWhatsAppTemplate")}
      />
      <div className="mt-2 mb-2">
        <Table
          borderX={true}
          columns={columns}
          data={handledWhatsAppTemplateData}
        />
      </div>
    </div>
  );
}
