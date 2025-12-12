import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchActivityLogById } from "../../service/activityLogs";
import LoadingPage from "../Loading/Loading";
import moment from "moment";
import { fetchClientById } from "../../service/client";
import ModalPopup from "../../component/ModalPopup";
import ClientDetails from "../ManageClient/ClientList/Component/ClientDetails";

export default function DetailedActivityLog() {
  const [clientId, setClientId] = useState(null);
  const [open, setOpen] = useState(false);

  const { state } = useLocation();

  const { data: clientbyIdData, isLoading: clientbyIdLoading } = useQuery({
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

  const {
    data: activityLogDetailsData,
    error: activityLogDetailsError,
    isLoading: activityLogDetailsLoading,
  } = useQuery({
    queryKey: ["activity-logs-details-list", state.activityLogId], // include page number
    queryFn: ({ queryKey }) => {
      const [, activityId] = queryKey;
      return fetchActivityLogById(activityId);
    },
    retry: false,
  });

  if (activityLogDetailsLoading || clientbyIdLoading) {
    return <LoadingPage />;
  }

  const data = activityLogDetailsData;
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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow rounded-md p-6">
        <h2 className="text-2xl font-semibold mb-6">Activity Log Details</h2>

        <div className="border border-gray-200 rounded-md">
          {/* Row Component */}
          <Row label="Added By" value={data.added_by} />
          <Row
            label="Client Id"
            value={data.client_id}
            onClick={() => {
              setClientId(data.client_id);
            }}
          />
          <Row
            label="Client Name"
            value={data.client_name}
            onClick={() => {
              setClientId(data.client_id);
            }}
          />
          <Row
            label="Profile Id"
            value={data.profile_id}
            onClick={() => {
              setClientId(data.client_id);
            }}
          />
          <Row label="Module" value={data.module} />
          <Row label="Action" value={data.action} />
          <Row label="Description" value={data.description} />
          <Row label="Ip" value={data.ip} />
          <Row label="Table Name" value={data.table_name} />
          <Row label="User Agent" value={data.user_agent} />
          <Row
            label="Data After Action"
            value={data.data_after_action}
            isCode
          />
          <Row
            label="Created At"
            value={moment(data.created_at).format("DD/MM/yyyy")}
          />
        </div>
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

const Row = ({ label, value, onClick, isCode }) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 border-b border-gray-200">
      <div className="p-3 font-medium bg-gray-50">{label}</div>
      <div className="p-3 col-span-2 md:col-span-3">
        {isCode ? (
          <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded text-sm">
            {value}
          </pre>
        ) : onClick ? (
          <div
            onClick={onClick}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            {value}
          </div>
        ) : (
          value
        )}
      </div>
    </div>
  );
};
