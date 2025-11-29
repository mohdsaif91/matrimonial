import { History } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { PaymentProps } from "../../types/payment";
import { fetchPaymentReport } from "../../service/payments";
import LoadingPage from "../Loading/Loading";
import Button from "../../component/form/Button";
import Table from "../../component/table/Table";
import PaymentReportFilter from "./component/PaymentReportFilter";
import { exportToExcel } from "../../component/ExportTOExcel";
import { fetchStaffReport } from "../../service/staffReport";
import { StaffReportsProps } from "../../types/staffReports";

export default function StaffReport() {
  const [filter, setFilter] = useState({
    days: "",
    fromDate: "",
    toDate: "",
  });

  const { data: paymentReportData, isLoading: paymentReportLoading } = useQuery(
    {
      queryKey: [
        "staff-report-list",
        filter.days,
        filter.fromDate,
        filter.toDate,
      ],
      queryFn: ({ queryKey }) => {
        const [, day, fromDate, toDate] = queryKey;
        return fetchStaffReport({ day, fromDate, toDate });
      },
      retry: false,
    }
  );

  const columns: ColumnDef<StaffReportsProps>[] = [
    {
      accessorKey: "id",
      header: "#",
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      accessorKey: "name",
      header: "Name (Phone)",
      cell: ({ row }) => (
        <div>
          {row.original.name} ({row.original.phone})
        </div>
      ),
    },
    {
      accessorKey: "handle_client",
      header: "Handle Client",
    },
    {
      accessorKey: "created_client",
      header: "Created Client",
    },
    {
      accessorKey: "send_profiles",
      header: "Send Profiles",
    },
    {
      accessorKey: "created_tasks",
      header: "Created Tasks",
    },
    {
      accessorKey: "created_leads",
      header: "Created Leads",
    },
    {
      header: "Profile Shortlisting",
      accessorKey: "profile_shortlisting",
    },
  ];

  if (paymentReportLoading) {
    return <LoadingPage />;
  }

  const handledPaymentReportData = paymentReportData
    ? paymentReportData.data
    : [];

  return (
    <div className="p-4 bg-white">
      <ToastContainer />
      <div className="flex">
        <PaymentReportFilter
          callAPI={(f) => {
            setFilter(f);
          }}
        />
      </div>
      <div className="mt-2 mb-2">
        <Table borderX columns={columns} data={handledPaymentReportData} />
      </div>
    </div>
  );
}
