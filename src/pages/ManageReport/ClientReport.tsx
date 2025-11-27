import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import ClientReportFilters from "./component/ClientReportFilters";
import { useQuery } from "@tanstack/react-query";
import { getClientReportById } from "../../service/clientReport";
import LoadingPage from "../Loading/Loading";

const ClientReport = () => {
  const [filter, setFIlter] = useState({ profileId: null, lastDay: null });
  const { data, isLoading } = useQuery({
    queryKey: ["client-report-list", filter.profileId, filter.lastDay],
    queryFn: ({ queryKey }) => {
      const [, profileId, day] = queryKey;
      return getClientReportById(profileId, day);
    },
    enabled: !!(filter.lastDay || filter.profileId),
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  console.log(data);

  return (
    <div className="p-4 bg-white">
      <ToastContainer />
      <div className="flex justify-between">
        <ClientReportFilters
          fetchCientReport={(f) => {
            setFIlter({ ...f });
          }}
        />
      </div>
      <div className="mt-2 mb-2"></div>
    </div>
  );
};

export default ClientReport;
