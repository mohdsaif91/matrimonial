import { useState } from "react";
import Button from "../../../component/form/Button";
import { useNavigate } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { ClientFormItem, staticClientFormTab } from "../../../types/form";
import Table from "../../../component/table/Table";
import { Pencil, Trash } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingPage from "../../Loading/Loading";
import {
  fetchClientFormModule,
  fetchClientModuleById,
} from "../../../service/clientFormModule";
import { deleteFormItem } from "../../../service/clientForm";
import { toast } from "react-toastify";

const ClientForm = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: moduleByIdData, isLoading: moduleByIdLoading } = useQuery({
    queryKey: ["form-item-list", activeTab],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey;
      return fetchClientModuleById(id);
    },
    retry: false,
    enabled: !!activeTab,
    refetchOnWindowFocus: false,
  });

  const { data: clientFormModuleData, isLoading: clientFromModuleLoading } =
    useQuery({
      queryKey: ["client-form-module-list"],
      queryFn: fetchClientFormModule,
      retry: false,
    });

  const deleteMutation = useMutation({
    mutationFn: deleteFormItem,
    onSuccess: () => {
      toast("Successfully deleted Form item");
      queryClient.invalidateQueries({ queryKey: ["form-item-list"] });
    },
    onError: (error: any) => {
      console.error("❌ Error deleting Form item:", error);
      alert(error.response?.data?.message || "Failed to delete Form item");
    },
  });

  const columns: ColumnDef<ClientFormItem>[] = [
    {
      accessorKey: "id",
      header: "#",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "display_name",
      header: "Display Name",
    },
    {
      accessorKey: "field_name",
      header: "Field Name",
    },
    {
      accessorKey: "module",
      header: "Module",
      cell: () => {
        const selectedCleintModule =
          Array.isArray(handledClientFormModule) &&
          handledClientFormModule.length > 0
            ? handledClientFormModule.find((f) => f.id === activeTab)
            : { name: "" };
        return <span>{selectedCleintModule.name ?? ""}</span>;
      },
    },
    {
      accessorKey: "validation",
      header: "Validation",
    },
    {
      accessorKey: "required",
      header: "Required",
      cell: ({ row }) => {
        return <span>{row.original.required === 1 ? "Yes" : "No"}</span>;
      },
    },
    {
      accessorKey: "view_in_pdf",
      header: "View In Pdf",
      cell: ({ row }) => {
        return <span>{row.original.view_in_pdf === 1 ? "Yes" : "No"}</span>;
      },
    },
    {
      accessorKey: "div_css",
      header: "Div Css",
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
            onClick={() =>
              navigate("/editClientFormItem", { state: { data: row.original } })
            }
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

  if (moduleByIdLoading || clientFromModuleLoading) {
    return <LoadingPage />;
  }

  const handledData = moduleByIdData ? moduleByIdData.client_forms : [];
  const handledClientFormModule = clientFormModuleData
    ? clientFormModuleData.data
    : [];
  return (
    <div>
      <div className="flex">
        <Button
          text="+ Add Cleint Form"
          onClick={() => navigate("/addClientFormItem")}
        />
      </div>
      <div className="flex flex-row mt-3">
        {handledClientFormModule.map((m: staticClientFormTab) => (
          <Button
            onClick={() => {
              setActiveTab(m.id);
            }}
            type="clientFormBtn"
            className={`px-4 py-2 mr-2 text-sm font-medium text-white ${
              activeTab === m.id ? "bg-[#161D27]" : "bg-[#a71634]"
            } rounded-lg hover:bg-[#EEB15D] focus:outline-none`}
            key={m.name}
            text={m.name}
          />
        ))}
      </div>
      <div className="mt-2">
        <Table borderX columns={columns} data={handledData} />
      </div>
    </div>
  );
};

export default ClientForm;
