import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { toast, ToastContainer } from "react-toastify";
import { ActivityItemProps } from "../../types/activityLog";
import { fetchActivityLog } from "../../service/activityLogs";
import Table from "../../component/table/Table";
import LoadingPage from "../Loading/Loading";
import { getCRMObject } from "../../util/ClientUtils";
import { fetchClientById } from "../../service/client";
import { useEffect, useState } from "react";
import ActivityLogFilter from "./component/ActivityLogFilter";
import ModalPopup from "../../component/ModalPopup";
import ClientDetails from "../ManageClient/ClientList/Component/ClientDetails";

const CRMSetting = getCRMObject();

export default function ActivityLog() {
  const [clientId, setClientId] = useState(null);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: activityLogData,
    error: activityLogError,
    isLoading: activityLogLoading,
  } = useQuery({
    queryKey: ["activity-logs-list"], // include page number
    queryFn: () => fetchActivityLog(),
    retry: false,
  });

  const {
    data: clientbyIdData,
    error: clientbyIdError,
    isLoading: clientbyIdLoading,
    refetch: clientByIdRefetch,
  } = useQuery({
    queryKey: ["activity-logs-details-list", clientId], // include page number
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey;
      return fetchClientById(id || "");
    },
    retry: false,
    enabled: !!clientId,
  });

  useEffect(() => {
    if (clientbyIdData && !open) {
      setOpen(true);
    }
  }, [clientbyIdData]);

  const columns: ColumnDef<ActivityItemProps>[] = [
    {
      accessorKey: "serial",
      header: "Serial #",
      cell: ({ row }) => {
        return <div>{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "added_by",
      header: "Added By",
    },
    {
      accessorKey: "client",
      header: "Client Id",
      cell: ({ row }) => {
        const clientName = row.original.client?.name || "";
        const clientId = row.original.client?.id || "";
        return (
          <div
            className="cursor-pointer underline text-blue-500"
            onClick={() => clientId !== "" && setClientId(clientId)}
          >{`${clientName} (${CRMSetting.PREFIX_PROFILE_TEXT.value}-${clientId})`}</div>
        );
      },
    },
    {
      accessorKey: "module",
      header: "Module",
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ getValue }) => {
        return <div>{getValue()}</div>;
      },
    },
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "",
      header: "Details",
      cell: ({ row }) => (
        <div
          className="flex flex-col gap-2 cursor-pointer text-blue-400 underline"
          onClick={() => {
            navigate("/activity-log-details", {
              state: { activityLogId: row.original.id },
            });
          }}
        >
          Details
        </div>
      ),
    },
  ];
  const deleteMutation = useMutation({
    // mutationFn: deleteClientList,
    onSuccess: () => {
      toast("Successfully deleted Clients");
      queryClient.invalidateQueries({ queryKey: ["client-list"] });
    },
    onError: (error: any) => {
      console.error("❌ Error in deleting Clients:", error);
      toast(error.response?.data?.message || "Failed to delete Clients");
    },
  });

  if (activityLogLoading) {
    return <LoadingPage />;
  }

  const transformedClientList = activityLogData ? activityLogData.data : [];

  const handledClientData = clientbyIdData
    ? {
        items: Object.fromEntries(
          clientbyIdData.data.modules.flatMap((mm) =>
            mm.fields.map((field) => [field.field_name, field])
          )
        ),
        client_id: clientbyIdData.data.client_profile_id,
        shared_profiles: clientbyIdData.data.shared_profiles,
        client_documents: clientbyIdData.data.client_documents,
      }
    : null;

  // const handledPaginationData = initialPaginationData;
  return (
    <div>
      <ToastContainer />
      <div>
        <ActivityLogFilter />
      </div>
      <div className="mt-2 mb-2">
        <Table
          borderX={true}
          columns={columns}
          data={transformedClientList || []}
        />
        {/* <Pagination
          onPageChange={() => {}}
          pagination={handledPaginationData}
        /> */}
      </div>
      <ModalPopup
        title="Client Details"
        isOpen={open}
        children={
          <ClientDetails
            data={clientbyIdData && clientbyIdData.data && handledClientData}
            onClose={() => setOpen(false)}
          />
        }
        onClose={() => setOpen(false)}
        width="640px"
      />
    </div>
  );
}
