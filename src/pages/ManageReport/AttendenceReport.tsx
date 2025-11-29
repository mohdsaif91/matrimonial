import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../Loading/Loading";
import AttendenceReportFilter from "./component/AttendenceReportFilter";
import { getAttendenceReport } from "../../service/attendencReport";
import moment from "moment";

const AttendenceReport = () => {
  const [filter, setFIlter] = useState("");
  const {
    data,
    isLoading,
    refetch: fetchAttendenceReport,
  } = useQuery({
    queryKey: ["client-report-list", filter],
    queryFn: ({ queryKey }) => {
      const [, day] = queryKey;
      console.log(day);

      return getAttendenceReport(day || moment(new Date()).format("yyyy"));
    },
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  console.log(data);

  return (
    <div className="p-4 bg-white">
      <ToastContainer />
      <div className="flex justify-between">
        <AttendenceReportFilter
          fetchCientReport={(f) => {
            setFIlter(f);
          }}
        />
      </div>
      <div className="mt-2 mb-2"></div>
    </div>
  );
};

export default AttendenceReport;
