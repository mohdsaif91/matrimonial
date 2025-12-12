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
import { exportToExcel } from "../../component/ExportToExcel";

const initialFilterData = {
  added_by: "",
  brief: "",
  client_id: "",
  expected_amount: "",
  followup_date: "",
  payment_date: "",
  payment_due: "",
  payment_mode: "",
  payment_type: "",
  received_amount: "",
  created_at: "",
  id: "",
  updated_at: "",
};

export default function PaymentReport() {
  const [filter, setFilter] = useState({ name: "" });
  const { data: paymentReportData, isLoading: paymentReportLoading } = useQuery(
    {
      queryKey: ["client-payment-report-list", filter],
      queryFn: () => fetchPaymentReport(filter),
    }
  );

  const columns: ColumnDef<PaymentProps>[] = [
    {
      accessorKey: "id",
      header: "#",
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "total_expected_amount",
      header: "Total Expected Amount",
    },
    {
      accessorKey: "total_received_amount",
      header: "Total Recevied Amount",
    },
    {
      accessorKey: "total_due_amount",
      header: "Total Due Amount",
      cell: ({ row }) => {},
    },
    {
      accessorKey: "last_payment_date",
      header: "Last Payment Date",
    },
    {
      accessorKey: "city_id",
      header: "Last Followup Date	",
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => {}}
            className="p-2 rounded hover:bg-gray-200 cursor-pointer"
          >
            <History size={16} className="text-gray-600" />
          </button>
        </div>
      ),
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
      <div className="flex justify-between">
        <PaymentReportFilter
          callAPI={(f) => {
            setFilter(f);
          }}
        />
        <Button
          className="h-[48px]"
          text="Export as sheet"
          onClick={() =>
            exportToExcel(handledPaymentReportData, "PaymentReport.xlsx")
          }
        />
      </div>
      <div className="mt-2 mb-2">
        <Table borderX columns={columns} data={handledPaymentReportData} />
      </div>
    </div>
  );
}
