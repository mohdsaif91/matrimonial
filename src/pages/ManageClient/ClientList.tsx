import { useQuery } from "@tanstack/react-query";
import ClientFilterForm from "../../component/ManageClient/ClientFilter";
import { fetchClientList } from "../../api/client";
import LoadingPage from "../Loading/Loading";
import { ColumnDef } from "@tanstack/react-table";
import Table from "../../component/Table";
import Button from "../../component/form/Button";
import { Pencil, Eye, IndianRupee, SquarePlus, List } from "lucide-react";
import { ClientData } from "../../types/client";

export default function ClientList() {
  const {
    data: clientListData,
    error: clientListError,
    isLoading: clientListLoading,
  } = useQuery({
    queryKey: ["client-list"],
    queryFn: fetchClientList,
    retry: false,
  });

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "status",
      header: "Profile Photo	",
    },
    {
      accessorKey: "name",
      header: "Name | Profile ID | Lead ID | DOB",
    },

    {
      accessorKey: "name",
      header: "Profile Sent",
    },
    {
      accessorKey: "name",
      header: "Handle By | Sex | Height",
      cell: ({ row }) => {
        const value =
          (row.original && row.original.items.profile_handled.value) || "";
        console.log(value, " <>? ", row.original);
        return (
          <div className="">
            <span>JACK- {value}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Astrologically | Caste | Gotra | Marital Status",
    },
    {
      accessorKey: "name",
      header: "Education | Occupation | Personal Income | Annual Income",
    },
    {
      accessorKey: "name",
      header: "Client Mobile | Client Email",
    },
    {
      accessorKey: "name",
      header: "Budget",
    },
    {
      accessorKey: "name",
      header: "Country | City",
      cell: ({ row }) => {
        console.log(row.original, " <>?");
        return <div className="">{/* {row.original.} */}</div>;
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button text="Search Profile" />
          <div>
            <Eye size={16} className="text-gray-600" />
            <Pencil size={16} className="text-gray-600" />
            <IndianRupee size={16} className="text-gray-600" />
            <SquarePlus size={16} className="text-gray-600" />
            <List size={16} className="text-gray-600" />
          </div>
        </div>
      ),
    },
  ];

  if (clientListLoading) {
    return <LoadingPage />;
  }

  console.log(clientListData, " <>?");

  const transformedClientList =
    Array.isArray(clientListData.data) &&
    clientListData.data.map((m: ClientData) => ({
      id: m.client_id,
      items: Object.fromEntries(
        m.modules.flatMap((mm) =>
          mm.fields.map((field) => [field.field_name, field])
        )
      ),
    }));

  console.log(transformedClientList, " <>?");

  return (
    <div className="">
      <div className="">
        <ClientFilterForm
          onSubmit={(filter) => {
            console.log(filter);
          }}
          key="Client-form-list"
        />
      </div>
      <div className="mt-2 mb-2">
        <Table columns={columns} data={transformedClientList || []} />
      </div>
    </div>
  );
}
