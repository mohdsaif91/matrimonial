import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Check, X } from "lucide-react";
import { toast } from "react-toastify";

import Table from "../../../component/table/Table";
import {
  approveShortlist,
  getPendingRequestByClientId,
} from "../../../service/shortList";
import LoadingPage from "../../Loading/Loading";
import {
  ClientDetailsResponseProps,
  ShortlistItemProps,
} from "../../../types/clientResponse";

const initialClientData = {
  client_id: null,
  shortlist_count: null,
  form_data: null,
};
export default function PendingApprovalShortlist() {
  const [clientData, setClientData] =
    useState<ClientDetailsResponseProps>(initialClientData);

  const { state } = useLocation();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (state && state.shortlistData) {
      setClientData({ ...state.shortlistData });
    }
  }, [state]);

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
      header: "Client Name",
      cell: ({ row }) => {
        const { form_values } = row.original;
        console.log(row.original, " <>?");

        return (
          <div>
            {form_values.client_name} ({row.original.shortlisted_client_id})
          </div>
        );
      },
    },
    {
      header: "Profile",
      cell: ({ row }) => {
        const { client_documents } = row.original;
        const mainProfilePhoto = client_documents.find(
          (f) => f.type === "main_photo"
        );
        // console.log(form_values);
        return (
          <img
            className="h-[120px] w-[150px]"
            src={mainProfilePhoto.file_path}
            alt="profile-photo"
          />
        );
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
      header: "Height",
      cell: ({ row }) => {
        const { form_values } = row.original;
        return <div className="ml-3">{form_values.height}</div>;
      },
    },
    {
      header: "Handle By",
      cell: ({ row }) => {
        const { form_values } = row.original;
        return <div className="ml-3">{form_values.profile_handled}</div>;
      },
    },
    {
      header: "Preferences",
      cell: ({ row }) => {
        const { form_values } = row.original;
        return <div className="ml-3">{form_values.partner_preferences}</div>;
      },
    },
    {
      header: "Residence",
      cell: ({ row }) => {
        const { form_values } = row.original;
        return (
          <div className="ml-3">{form_values.complete_residence_address}</div>
        );
      },
    },
    {
      header: "Shortlisted by",
      cell: ({ row }) => {
        console.log(acceptRejecttData[0], " <>?");

        return (
          <div className="ml-3 capitalize">
            {acceptRejecttData &&
              Array.isArray(acceptRejecttData.data) &&
              acceptRejecttData.data[0].shortlisted_by_user_name}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex flex-row gap-2 cursor-pointer">
          <div className="bg-green-600 p-2 rounded-[4px]">
            <Check
              onClick={() => {
                const appObj = {
                  shortlist_id: row.original?.shortlisted_client_id,
                  status: "approved",
                };
                mutation.mutate({ ...appObj });
                console.log(appObj, " <>?");
              }}
              color="#fff"
            />
          </div>
          <div className="bg-red-600 p-2 rounded-[4px]">
            <X onClick={() => {}} color="#fff" />
          </div>
        </div>
      ),
    },
  ];

  const mutation = useMutation({
    mutationFn: approveShortlist,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["clients-approve-reject-list"],
      });
      toast(`Successfully updated status`);
    },
    onError: (error: any) => {
      console.error("❌ Error adding updated status:", error);
      alert(error.response?.data?.message || "Failed to add updated status");
    },
  });

  if (acceptRejecttLoading) {
    return <LoadingPage />;
  }

  const handledAcceptRejectData = acceptRejecttData
    ? acceptRejecttData.data[0].shortlisted_clients
    : [];

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
