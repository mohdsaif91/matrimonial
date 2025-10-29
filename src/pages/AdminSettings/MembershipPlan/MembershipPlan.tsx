import Button from "../../../component/form/Button";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash } from "lucide-react";
import { ModuleProps } from "../../../types/module";
import { ColumnDef } from "@tanstack/react-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingPage from "../../Loading/Loading";
import { toast, ToastContainer } from "react-toastify";
import Table from "../../../component/table/Table";
import {
  deleteMembershipPlan,
  fetchMembershipPlan,
} from "../../../api/membershipPlan";

export default function MembershipPlan() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["membership-plan-list"],
    queryFn: fetchMembershipPlan,
    retry: false,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMembershipPlan,
    onSuccess: () => {
      toast("Successfully deleted Membership Plan");
      queryClient.invalidateQueries({ queryKey: ["membership-plan-list"] });
    },
    onError: (error: any) => {
      console.error("❌ Error in deleting Membership Plan:", error);
      toast(
        error.response?.data?.message || "Failed to delete Membership Plan"
      );
    },
  });

  const columns: ColumnDef<ModuleProps>[] = [
    {
      accessorKey: "id",
      header: "#",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => {
        const status = getValue() as string;
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
              status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              navigate("/editMembershipPlan", {
                state: { data: row.original },
              });
            }}
            className="p-2 rounded hover:bg-gray-200 cursor-pointer"
          >
            <Pencil size={16} className="text-gray-600" />
          </button>
          <button
            onClick={() =>
              row.original.id && deleteMutation.mutate(row.original.id)
            }
            className="p-2 rounded hover:bg-gray-200 cursor-pointer"
          >
            <Trash size={16} className="text-red-500" />
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="p-4 bg-white">
      <ToastContainer />
      <Button
        text="+ Add Membership Plan"
        onClick={() => navigate("/addMembershipPlan")}
      />
      <div className="mt-2 mb-2">
        <Table columns={columns} data={data.data || []} />
      </div>
    </div>
  );
}
