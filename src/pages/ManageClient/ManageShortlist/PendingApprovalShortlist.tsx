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
import ModalPopup from "../../../component/ModalPopup";
import AttachProfile from "../AttachProfile";
import { getAuthUserPermission } from "../../../util/ClientUtils";

const initialClientData = {
  client_id: null,
  shortlist_count: null,
  form_data: null,
};
export default function PendingApprovalShortlist() {
  const [clientData, setClientData] =
    useState<ClientDetailsResponseProps>(initialClientData);
  const [actionType, setActionType] = useState(null);
  const [clientDataModal, setClientDataModal] = useState({
    flag: false,
    data: null,
  });

  const { state } = useLocation();

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
    refetch: acceptRejectRefetch,
  } = useQuery({
    queryKey: ["clients-short-list", clientData.client_id], // include page number
    queryFn: ({ queryKey }) => {
      const [, clientId] = queryKey;
      return getPendingRequestByClientId(clientId, actionType);
    },
    enabled: !!clientData.client_id,
    retry: false,
  });

  const columns: ColumnDef<ShortlistItemProps>[] = [
    {
      accessorKey: "",
      header: "#",
      cell: ({ row }) => {
        return <div>{row.index + 1}</div>;
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
          ) : actionType === "approved" ? (
            <React.Fragment>
              {getAuthUserPermission().includes(
                "manage_send_profiles.view_profile_sent"
              ) && (
                <Button
                  text="Send Profile"
                  onClick={() => {
                    const sendObjs = {
                      sendToName: clientData?.form_data?.client_name,
                      sendToMobile: clientData?.form_data?.client_mobile,
                      sendTPohoto: clientData?.client_documents.find(
                        (f) => f.type === "main_photo"
                      )?.file_path,
                      sendToEmail: clientData?.form_data?.client_email,
                      attachProfileName: row.original?.form_values.client_name,
                      attachProfileMobile:
                        row.original?.form_values.client_mobile,
                      attachProfilePhoto: row.original?.client_documents?.find(
                        (f) => f.type === "main_photo"
                      )?.file_path,
                      attachProfileEmail:
                        row.original?.form_values.client_email || "-",
                      subject: `Matrimonial Profile of ${clientData?.form_data?.client_name} for ${row.original.form_values.client_name}`,
                      from_client_id: clientData && clientData?.client_id,
                      to_client_id: row.original?.shortlisted_client_id,
                    };
                    setClientDataModal({ data: sendObjs, flag: true });
                  }}
                />
              )}
            </React.Fragment>
          ) : (
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
            // <div className="bg-red-600 p-2 rounded-[4px]">
            //   <X
            //     onClick={() => {
            //       const appObj = {
            //         shortlist_id: acceptRejecttData.data[0].id,
            //         status: "rejected",
            //       };
            //       mutation.mutate({ ...appObj });
            //     }}
            //     color="#fff"
            //   />
            // </div>
          )}
        </div>
      ),
    },
  ];

  const mutation = useMutation({
    mutationFn: approveShortlist,

    onSuccess: (data, variables) => {
      toast("Successfully updated status");
      acceptRejectRefetch();
      // 🚀 Update the existing cache WITHOUT refetching
      // queryClient.setQueryData(
      //   ["clients-short-list", clientData.client_id],
      //   (oldData: any) => {
      //     if (!oldData?.data?.[0]) return oldData;

      //     return {
      //       ...oldData,
      //       data: [
      //         {
      //           ...oldData.data[0],
      //           shortlisted_clients: oldData.data[0].shortlisted_clients.filter(
      //             (item: any) =>
      //               item.shortlisted_client_id !== variables.shortlist_id
      //           ),
      //         },
      //       ],
      //     };
      //   }
      // );
    },

    onError: (error: any) => {
      alert(error.response?.data?.message || "Failed to update status");
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
            Profiles for {clientData.form_data.client_name} (
            {clientData.client_id})
          </p>
        </div>
      )}
      <Table borderX={true} columns={columns} data={handledAcceptRejectData} />
      <ModalPopup
        data={clientDataModal.data}
        title="Client Profile Detail"
        isOpen={clientDataModal.flag}
        children={
          <AttachProfile
            data={clientDataModal.data}
            // onClose={() => setClientDataModal({ data: null, flag: false })}
          />
        }
        onClose={() => setClientDataModal({ data: null, flag: false })}
        width="520px"
      />
    </div>
  );
}
