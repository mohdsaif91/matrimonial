import { Edit2, Pencil, Trash } from "lucide-react";
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
import { useRef, useState } from "react";
import {
  PaymentPopupResponseProps,
  PaymentProps,
} from "../../../../types/payment";
import { TextField } from "../../../../component/form/TextField";
import { DateTimePicker } from "../../../../component/form/DateField";
import { toast, ToastContainer } from "react-toastify";
import TextArea from "../../../../component/form/TextArea";
import moment from "moment";
import { getAuthUserPermission } from "../../../../util/ClientUtils";

const initialData = {
  brief: "",
  client_id: "",
  expected_amount: 0,
  followup_date: new Date(),
  payment_date: new Date(),
  payment_mode: "",
  payment_type: "",
  received_amount: 0,
};

export default function Payment({
  client_id,
  tableArr,
}: PaymentPopupResponseProps) {
  const [formData, setFormData] = useState<PaymentProps>({ ...initialData });
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    data: clientPaymentData,
    isLoading: clientPaymentLoading,
    refetch: refetchClientPaymentData,
  } = useQuery({
    queryKey: ["client-payment-list", client_id || "1"],
    queryFn: ({ queryKey }) => {
      const [, clientId] = queryKey;
      return fetchPaymentByClientId(clientId);
    },
    retry: false,
    enabled: !!client_id,
  });

  const paymentColumns = [
    {
      header: "Name (Profile Id)",
      accessorKey: "name_profile_id",
      Cell: ({ row }) => {
        const { client_name } = row.original;
        return (
          <div>
            {client_name} <br />
            {/* <span className="text-gray-600 text-sm">({profile_id})</span> */}
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
      accessorKey: "client_name",
      cell: ({ row }) => {
        const { client_name } = row.original;
        return (
          <div>
            {client_name} <br />
            {/* <span className="text-gray-600 text-sm">({profile_id})</span> */}
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
      accessorKey: "received_amount",
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
      cell: ({ row }) => {
        return (
          <div className="flex justify-around">
            {getAuthUserPermission().includes("manage_payment.edit") && (
              <Pencil
                onClick={() => {
                  setIsUpdate(true);
                  scrollRef.current &&
                    scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
                  setFormData({ ...row.original });
                }}
                size={16}
                className="text-gray-600 cursor-pointer"
              />
            )}
            {getAuthUserPermission().includes("manage_payment.delete") && (
              <Trash size={16} className="text-red-500 cursor-pointer" />
            )}
          </div>
        );
      },
    },
  ];

  const mutation = useMutation({
    mutationFn: addPayment,
    onSuccess: (data) => {
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["client-payment-list"] });
      toast("Successfully added Client Payment");
      setFormData({ ...initialData });
      refetchClientPaymentData();
      // alert(`Successfully added form item! ${data}`);
    },
    onError: (error: any) => {
      console.error("❌ Error adding Client Payment:", error);
      toast(error.response?.data?.message || "Failed to add Client Payment");
    },
  });

  const updateMutation = useMutation({
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
    ? clientPaymentData?.data?.payments
    : [];

  return (
    <div className="overflow-y-auto" ref={scrollRef}>
      <ToastContainer />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          isUpdate
            ? updateMutation.mutate({
                ...formData,
                client_id,
                followup_date: moment(formData.followup_date).format(
                  "yyyy/MM/DD"
                ),
                payment_date: moment(formData.payment_date).format(
                  "yyyy/MM/DD"
                ),
              })
            : mutation.mutate({
                ...formData,
                client_id,
                followup_date: moment(formData.followup_date).format(
                  "yyyy/MM/DD"
                ),
                payment_date: moment(formData.payment_date).format(
                  "yyyy/MM/DD"
                ),
              });
        }}
        className="bg-white p-6 rounded shadow-md mb-6"
      >
        <div className="grid grid-cols-5 gap-4">
          <DropDown
            required={true}
            options={paymentType}
            label="Payment Type"
            value={formData.payment_type}
            name="paymentType"
            onChange={(val) =>
              setFormData({ ...formData, payment_type: val as string })
            }
          />
          <TextField
            required={true}
            name="paymentMode"
            onChange={(e) =>
              setFormData({ ...formData, payment_mode: e.target.value })
            }
            value={formData.payment_mode}
            label="Payment Mode"
          />
          <TextField
            required={true}
            type="number"
            name="expectedAmount"
            onChange={(e) =>
              setFormData({
                ...formData,
                expected_amount: parseInt(e.target.value),
              })
            }
            value={formData.expected_amount}
            label="Expected Amount"
          />
          <TextField
            type="number"
            name="receivedAmount"
            onChange={(e) =>
              setFormData({
                ...formData,
                received_amount: parseInt(e.target.value),
              })
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
          <div className="col-span-4">
            <TextArea
              name="Brief"
              onChange={(e) => setFormData({ ...formData, brief: e })}
              value={formData.brief}
              label="Brief"
            />
          </div>
        </div>
        <div className="text-right mt-4">
          {getAuthUserPermission().includes("manage_payment.view") && (
            <Button
              type="submit"
              loading={isUpdate ? updateMutation.isPending : mutation.isPending}
              text={isUpdate ? "Update" : "Submit"}
              onClick={() => {}}
            />
          )}
        </div>
      </form>
      <div className="">Additinal Payment Details</div>
      <Table
        borderX
        columns={paymentColumnswithActions}
        data={handledPaymentsData}
      />
      <div className="mt-4">Payment Registration Details</div>
      <Table borderX columns={paymentColumns} data={tableArr} />
    </div>
  );
}
