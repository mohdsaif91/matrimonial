import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import LoadingPage from "../../Loading/Loading";
import Button from "../../../component/form/Button";
import Table from "../../../component/table/Table";
import {
  deleteWhatsAppKey,
  fetchWhatsAppKey,
} from "../../../service/whatsAppKey";

export default function WhatsappKey() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: whatsAppKey, isLoading } = useQuery({
    queryKey: ["whatsapp-key-list"],
    queryFn: fetchWhatsAppKey,
    retry: false,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteWhatsAppKey,
    onSuccess: () => {
      toast("Successfully deleted Whats App Provider");
      queryClient.invalidateQueries({ queryKey: ["whatsapp-key-list"] });
    },
    onError: (error: any) => {
      console.error("❌ Error in deleting Whats App Provider:", error);
      toast(
        error.response?.data?.message || "Failed to delete Whats App Provider"
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
      accessorKey: "whatsapp_provider",
      header: "Whatsapp Provider",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "token",
      header: "Token",
    },
    {
      accessorKey: "phone_number",
      header: "Phone Number",
    },
    {
      accessorKey: "assigned_type",
      header: "Assigned Type",
    },
    {
      accessorKey: "assigned_id",
      header: "Assigned ID",
    },
    {
      accessorKey: "config",
      header: "Config",
      cell: ({ row }) => {
        return <div>{row.original.config.setting}</div>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              navigate("/addWhatsAppKey", { state: { data: row.original } });
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

  const handledwhatsAppKey = whatsAppKey ? whatsAppKey?.data : [];

  return (
    <div className="p-4 bg-white">
      <ToastContainer />
      <Button
        text="+ Add Whats App Key"
        onClick={() => navigate("/addWhatsAppKey")}
      />
      <div className="mt-2 mb-2">
        <Table borderX={true} columns={columns} data={handledwhatsAppKey} />
      </div>
    </div>
  );
}
