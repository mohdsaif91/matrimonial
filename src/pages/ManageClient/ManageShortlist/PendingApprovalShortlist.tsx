import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  ClientDetailsResponseProps,
  ShortlistItemProps,
} from "../../../types/clientResponse";
import Table from "../../../component/table/Table";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getPendingRequestByClientId } from "../../../api/shortList";
import { ColumnDef } from "@tanstack/react-table";
import { Check, X } from "lucide-react";
import LoadingPage from "../../Loading/Loading";
import moment from "moment";
import Button from "../../../component/form/Button";

const initialClientData = {
  client_id: null,
  shortlist_count: null,
  form_data: null,
};
export default function PendingApprovalShortlist() {
  const [clientData, setClientData] =
    useState<ClientDetailsResponseProps>(initialClientData);

  const { state } = useLocation();

  useEffect(() => {
    if (state && state.shortlistData) {
      setClientData({ ...state.shortlistData });
    }
  }, [state]);
  console.log(clientData);

  const {
    data: acceptRejecttData,
    error: acceptRejecttError,
    isLoading: acceptRejecttLoading,
  } = useQuery({
    queryKey: ["clients-short-list", clientData.client_id], // include page number
    queryFn: ({ queryKey }) => {
      const [, clientId] = queryKey;
      return getPendingRequestByClientId(clientId);
    },
    enabled: !!clientData.client_id,
    retry: false,
  });

  const columns: ColumnDef<ShortlistItemProps>[] = [
    {
      accessorKey: "",
      header: "#",
      cell: ({ row }) => {
        return <div>{row.original.client_id}</div>;
      },
    },
    {
      accessorKey: "status",
      header: "Client Name",
      //   cell: ({ row }) => {
      //     console.log(row.original);
      //     return <div>{row.original.client_id}</div>;
      //   },
    },
    {
      accessorKey: "name",
      header: "Profile",
      cell: ({ row }) => {
        const { form_values } = row.original;
        console.log(form_values);
        return <div>{form_values.client_name}</div>;
      },
    },
    {
      header: "	D.O.B",
      cell: ({ row }) => {
        const { form_values } = row.original;
        return (
          <div>{moment(form_values.date_of_birth).format("DD/MM/YYYY")}</div>
        );
      },
    },
    {
      accessorKey: "shortlist_count",
      header: "Height",
      cell: ({ row }) => {
        const { form_values } = row.original;
        return <div className="ml-3">{form_values.height}</div>;
      },
    },
    {
      accessorKey: "shortlist_count",
      header: "Handle By",
      cell: ({ row }) => {
        const { form_values } = row.original;
        return <div className="ml-3">{form_values.profile_handled}</div>;
      },
    },
    {
      accessorKey: "shortlist_count",
      header: "Preferences",
      cell: ({ row }) => {
        const { form_values } = row.original;
        return <div className="ml-3">{form_values.partner_preferences}</div>;
      },
    },
    {
      accessorKey: "shortlist_count",
      header: "Residence",
      cell: ({ row }) => {
        const { form_values } = row.original;
        return (
          <div className="ml-3">{form_values.complete_residence_address}</div>
        );
      },
    },
    {
      accessorKey: "shortlist_count",
      header: "Shortlisted by",
      cell: ({ row }) => {
        const { form_values } = row.original;
        return <div className="ml-3">{form_values.profile_handled}</div>;
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex flex-row gap-2 cursor-pointer">
          <div>
            <Check onClick={() => {}} />
          </div>
          <div>
            <X onClick={() => {}} />
          </div>
        </div>
      ),
    },
  ];

  const mutation = useMutation({
    mutationFn: addShortList,
    onSuccess: (data) => {
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["clients-short-list"] });
      toast(`Successfully Short listed client`);
    },
    onError: (error: any) => {
      console.error("❌ Error adding Short list client:", error);
      alert(error.response?.data?.message || "Failed to add Short list client");
    },
  });

  if (acceptRejecttLoading) {
    return <LoadingPage />;
  }

  const handledAcceptRejectData = acceptRejecttData
    ? acceptRejecttData.data[0].shortlisted_clients
    : [];
  console.log(handledAcceptRejectData, " <>?");

  return (
    <div>
      {clientData.form_data && (
        <div className="p-2">
          <p>
            Profiles for ({clientData.form_data.client_name} (
            {clientData.client_id}))
          </p>
        </div>
      )}
      <Table columns={columns} data={handledAcceptRejectData} />
    </div>
  );
}
