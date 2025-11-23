import { Edit2 } from "lucide-react";
import Button from "../../../../component/form/Button";
import Table from "../../../../component/table/Table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addPayment,
  fetchPaymentByClientId,
} from "../../../../service/payments";
import LoadingPage from "../../../Loading/Loading";
import { DropDown } from "../../../../component/form/SearchableDropdown";
import { paymentType } from "../../../../data/payments";
import { useState } from "react";
import {
  PaymentPopupResponseProps,
  PaymentProps,
} from "../../../../types/payment";
import { TextField } from "../../../../component/form/TextField";
import { DateTimePicker } from "../../../../component/form/DateField";
import { toast } from "react-toastify";
import TextArea from "../../../../component/form/TextArea";

const initialData = {
  brief: "",
  PaymentProps: "",
  client_id: "",
  expected_amount: "",
  followup_date: new Date(),
  payment_date: new Date(),
  payment_mode: "",
  payment_type: "",
  received_amount: "",
};

export default function Payment({
  client_id,
  tableArr,
}: PaymentPopupResponseProps) {
  const [formData, setFormData] = useState<PaymentProps>({ ...initialData });

  const queryClient = useQueryClient();
  const { data: clientPaymentData, isLoading: clientPaymentLoading } = useQuery(
    {
      queryKey: ["client-payment-list", client_id],
      queryFn: ({ queryKey }) => {
        const [, clientId] = queryKey;
        fetchPaymentByClientId(clientId);
      },
      retry: false,
    }
  );

  const paymentColumns = [
    {
      header: "Name (Profile Id)",
      accessorKey: "name_profile_id",
      Cell: ({ row }) => {
        const { name, profile_id } = row.original;
        return (
          <div>
            {name} <br />
            <span className="text-gray-600 text-sm">({profile_id})</span>
          </div>
        );
      },
    },
    {
      header: "Added By",
      accessorKey: "added_by",
    },
    {
      header: "Payment Type",
      accessorKey: "payment_type",
    },
    {
      header: "Payment Mode",
      accessorKey: "payment_mode",
    },
    {
      header: "Expected Amount",
      accessorKey: "expected_amount",
    },
    {
      header: "Received Payment",
      accessorKey: "received_payment",
    },
    {
      header: "Payment Due",
      accessorKey: "payment_due",
    },
    {
      header: "Payment Date",
      accessorKey: "payment_date",
      Cell: ({ value }) => (
        <span>{value ? new Date(value).toLocaleDateString() : "-"}</span>
      ),
    },
    {
      header: "Payment Followup Date",
      accessorKey: "payment_followup_date",
      Cell: ({ value }) => (
        <span>{value ? new Date(value).toLocaleDateString() : "-"}</span>
      ),
    },
    {
      header: "Brief",
      accessorKey: "brief",
    },
  ];
  const paymentColumnswithActions = [
    {
      header: "Name (Profile Id)",
      accessorKey: "name_profile_id",
      Cell: ({ row }) => {
        const { name, profile_id } = row.original;
        return (
          <div>
            {name} <br />
            <span className="text-gray-600 text-sm">({profile_id})</span>
          </div>
        );
      },
    },
    {
      header: "Added By",
      accessorKey: "added_by",
    },
    {
      header: "Payment Type",
      accessorKey: "payment_type",
    },
    {
      header: "Payment Mode",
      accessorKey: "payment_mode",
    },
    {
      header: "Expected Amount",
      accessorKey: "expected_amount",
    },
    {
      header: "Received Payment",
      accessorKey: "received_payment",
    },
    {
      header: "Payment Due",
      accessorKey: "payment_due",
    },
    {
      header: "Payment Date",
      accessorKey: "payment_date",
      Cell: ({ value }) => (
        <span>{value ? new Date(value).toLocaleDateString() : "-"}</span>
      ),
    },
    {
      header: "Payment Followup Date",
      accessorKey: "payment_followup_date",
      Cell: ({ value }) => (
        <span>{value ? new Date(value).toLocaleDateString() : "-"}</span>
      ),
    },
    {
      header: "Brief",
      accessorKey: "brief",
    },
    {
      header: "Action",
      accessorKey: "action",
      Cell: ({ row }) => (
        <button
          className="p-1 rounded hover:bg-gray-200"
          onClick={() => console.log("Edit: ", row.original)}
        >
          <Edit2 size={18} />
        </button>
      ),
    },
  ];

  const mutation = useMutation({
    mutationFn: addPayment,
    onSuccess: (data) => {
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["client-payment-list"] });
      toast("Successfully added Client Payment");
      setFormData({ ...initialData });
      // alert(`Successfully added form item! ${data}`);
    },
    onError: (error: any) => {
      console.error("❌ Error adding Client Payment:", error);
      toast(error.response?.data?.message || "Failed to add Client Payment");
    },
  });

  if (clientPaymentLoading) {
    return <LoadingPage />;
  }

  const handledPaymentsData = clientPaymentData
    ? [clientPaymentData?.data]
    : [];

  return (
    <div className="overflow-y-auto">
      <div className="bg-white p-6 rounded shadow-md mb-6">
        <div className="grid grid-cols-5 gap-4">
          <DropDown
            options={paymentType}
            label="Payment Type"
            value={formData.payment_type}
            name="paymentType"
            onChange={(val) =>
              setFormData({ ...formData, payment_type: val as string })
            }
          />
          <TextField
            name="paymentMode"
            onChange={(e) =>
              setFormData({ ...formData, payment_mode: e.target.value })
            }
            value={formData.payment_mode}
            label="Payment Mode"
          />
          <TextField
            name="expectedAmount"
            onChange={(e) =>
              setFormData({ ...formData, expected_amount: e.target.value })
            }
            value={formData.expected_amount}
            label="Expected Amount"
          />
          <TextField
            name="receivedAmount"
            onChange={(e) =>
              setFormData({ ...formData, received_amount: e.target.value })
            }
            value={formData.received_amount}
            label="Received Amount"
          />

          <DateTimePicker
            label="Payment Date"
            onChange={(date) =>
              setFormData({ ...formData, payment_date: date })
            }
            value={formData.payment_date}
            required={false}
          />
          <DateTimePicker
            label="Payment Followup Date"
            onChange={(date) => {
              setFormData({ ...formData, followup_date: date });
            }}
            value={formData.followup_date}
            required={false}
          />
          <div className="col-span-5">
            <TextArea
              name="Brief"
              onChange={(e) => setFormData({ ...formData, brief: e })}
              value={formData.brief}
              label="Brief"
            />
          </div>
        </div>
        <div className="text-right mt-4">
          <Button
            loading={mutation.isPending}
            text="Submit"
            onClick={() => {
              mutation.mutate({ ...formData, client_id });
            }}
          />
        </div>
      </div>
      <div className="">Additinal Payment Details</div>
      <Table
        borderX
        columns={paymentColumnswithActions}
        data={[...handledPaymentsData]}
      />
      <div className="mt-4">Payment Registration Details</div>
      <Table borderX columns={paymentColumns} data={tableArr} />
    </div>
  );
}
