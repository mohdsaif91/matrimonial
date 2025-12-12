import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../Loading/Loading";
import AttendenceReportFilter from "./component/AttendenceReportFilter";
import { getAttendenceReport } from "../../service/attendencReport";
import moment from "moment";
import Table from "../../component/table/Table";
import { ColumnDef } from "@tanstack/react-table";

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
      return getAttendenceReport(day || moment(new Date()).format("yyyy"));
    },
  });

  const reportColumns: ColumnDef<any>[] = [
    {
      accessorKey: "",
      header: "#",
      cell: ({ row }) => {
        return <div>{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "January",
      header: "Jan",
      cell: ({ getValue }) => {
        return <div>{getValue()?.total_hours}</div>;
      },
    },
    {
      accessorKey: "February",
      header: "Feb",
      cell: ({ getValue }) => {
        return <div>{getValue()?.total_hours}</div>;
      },
    },
    {
      accessorKey: "March",
      header: "Mar",
      cell: ({ getValue }) => {
        return <div>{getValue()?.total_hours}</div>;
      },
    },
    {
      accessorKey: "April",
      header: "Apr",
      cell: ({ getValue }) => {
        return <div>{getValue()?.total_hours}</div>;
      },
    },
    {
      accessorKey: "May",
      header: "May",
      cell: ({ getValue }) => {
        return <div>{getValue()?.total_hours}</div>;
      },
    },
    {
      accessorKey: "June",
      header: "Jun",
      cell: ({ getValue }) => {
        return <div>{getValue()?.total_hours}</div>;
      },
    },
    {
      accessorKey: "July",
      header: "Jul",
      cell: ({ getValue }) => {
        return <div>{getValue()?.total_hours}</div>;
      },
    },
    {
      accessorKey: "August",
      header: "Aug",
      cell: ({ getValue }) => {
        return <div>{getValue()?.total_hours}</div>;
      },
    },
    {
      accessorKey: "Septmber",
      header: "Sep",
      cell: ({ getValue }) => {
        return <div>{getValue()?.total_hours}</div>;
      },
    },
    {
      accessorKey: "Ocutber",
      header: "Oct",
      cell: ({ getValue }) => {
        return <div>{getValue()?.total_hours}</div>;
      },
    },
    {
      accessorKey: "November",
      header: "Nov",
      cell: ({ getValue }) => {
        return <div>{getValue()?.total_hours}</div>;
      },
    },
    {
      accessorKey: "December",
      header: "Dec",
      cell: ({ getValue }) => {
        return <div>{getValue()?.total_hours}</div>;
      },
    },
  ];

  if (isLoading) {
    return <LoadingPage />;
  }

  const handledAttendenceData = data
    ? data.data.map((m) => {
        const { months, ...restProps } = m;
        let monthObj = {};
        months.map((m) => {
          monthObj[m.month] = m;
        });
        return {
          ...restProps,
          ...monthObj,
        };
      })
    : [];

  return (
    <div className="p-4 bg-white">
      <ToastContainer />
      <div className="flex justify-between">
        <AttendenceReportFilter
          fetchAttendenceReport={(f) => {
            setFIlter(f);
          }}
        />
      </div>
      <div className="mt-2 mb-2">
        <Table borderX columns={reportColumns} data={handledAttendenceData} />
      </div>
    </div>
  );
};

export default AttendenceReport;
