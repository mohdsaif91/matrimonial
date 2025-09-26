import { useState } from "react";
import Button from "../../../component/form/Button";
import { useNavigate } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { ClientFormItem, staticClientFormTab } from "../../../types/form";
import Table from "../../../component/Table";
import { Pencil, Trash } from "lucide-react";
import { fetchFormItemById } from "../../../api/clientForm";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../../Loading/Loading";
import { staticClientTab } from "../../StaticData/ClientForm";
import { fetchModuleById } from "../../../api/module";

const ClientForm = () => {
  const [activeTab, setActiveTab] = useState<number>(2);
  const navigate = useNavigate();

  const { data: moduleByIdData, isLoading: moduleByIdLoading } = useQuery({
    queryKey: ["form-item-list", activeTab],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey;
      return fetchModuleById(id);
    },
    retry: false,
    enabled: !!activeTab,
    refetchOnWindowFocus: false,
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
      cell: ({ row }) => {
        return <span>{""}</span>;
      },
    },
    {
      accessorKey: "validation",
      header: "Validation",
    },
    {
      accessorKey: "required",
      header: "Required",
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
            onClick={() => alert(`Edit ${row.original.id}`)}
            className="p-2 rounded hover:bg-gray-200"
          >
            <Pencil size={16} className="text-gray-600" />
          </button>
          <button
            onClick={() => alert(`Delete ${row.original.id}`)}
            className="p-2 rounded hover:bg-gray-200"
          >
            <Trash size={16} className="text-red-500" />
          </button>
        </div>
      ),
    },
  ];

  if (moduleByIdLoading) {
    return <LoadingPage />;
  }

  console.log(moduleByIdData.client_forms);

  return (
    <div>
      <div className="flex">
        <Button
          text="+ Add Cleint Form"
          onClick={() => navigate("/addClientFormItem")}
        />
      </div>
      <div className="flex flex-row mt-3">
        {staticClientTab.map((m: staticClientFormTab) => (
          <Button
            onClick={() => {
              console.log(m);
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
        <Table columns={columns} data={moduleByIdData.client_forms || []} />
      </div>
    </div>
  );
};

export default ClientForm;
