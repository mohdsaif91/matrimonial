import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Check, X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

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
import Button from "../../../component/form/Button";

const initialClientData = {
  client_id: null,
  shortlist_count: null,
  form_data: null,
};
export default function PendingApprovalShortlist() {
  const [clientData, setClientData] =
    useState<ClientDetailsResponseProps>(initialClientData);
  const [actionType, setActionType] = useState(null);

  const { state } = useLocation();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (state && state.shortlistData) {
      setClientData({ ...state.shortlistData });
      setActionType(state.shortListType);
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
          {!actionType ? (
            <React.Fragment>
              <div className="bg-green-600 p-2 rounded-[4px]">
                <Check
                  onClick={() => {
                    const appObj = {
                      shortlist_id: acceptRejecttData.data[0].id,
                      status: "approved",
                    };
                    mutation.mutate({ ...appObj });
                  }}
                  color="#fff"
                />
              </div>
              <div className="bg-red-600 p-2 rounded-[4px]">
                <X
                  onClick={() => {
                    const appObj = {
                      shortlist_id: acceptRejecttData.data[0].id,
                      status: "rejected",
                    };
                    mutation.mutate({ ...appObj });
                  }}
                  color="#fff"
                />
              </div>
            </React.Fragment>
          ) : actionType === "approve" ? (
            <React.Fragment>
              <div className="bg-red-600 p-2 rounded-[4px]">
                <X
                  onClick={() => {
                    // const appObj = {
                    //   shortlist_id: acceptRejecttData.data[0].id,
                    //   status: "rejected",
                    // };
                    // mutation.mutate({ ...appObj });
                  }}
                  color="#fff"
                />
              </div>
              <Button text="Send Profile" />
            </React.Fragment>
          ) : (
            <div className="bg-red-600 p-2 rounded-[4px]">
              <X
                // onClick={() => {
                //   const appObj = {
                //     shortlist_id: acceptRejecttData.data[0].id,
                //     status: "rejected",
                //   };
                //   mutation.mutate({ ...appObj });
                // }}
                color="#fff"
              />
            </div>
          )}
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
    ? Array.isArray(acceptRejecttData.data)
      ? acceptRejecttData.data[0].shortlisted_clients
      : []
    : [];

  return (
    <div>
      <ToastContainer />
      {clientData.form_data && (
        <div className="p-2">
          <p className="font-bold">
            {actionType === "approve"
              ? "Approved"
              : actionType === "reject"
              ? "Rejected"
              : ""}{" "}
            Profiles for
            {clientData.form_data.client_name} ({clientData.client_id})
          </p>
        </div>
      )}
      <Table borderX={true} columns={columns} data={handledAcceptRejectData} />
    </div>
  );
}
