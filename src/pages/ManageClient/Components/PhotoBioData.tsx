import { ColumnDef } from "@tanstack/react-table";
import { ModuleProps } from "../../../types/module";
import Table from "../../../component/table/Table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deletePhotoAndBio,
  fetchPhotoAndBio,
} from "../../../service/photoAndBio";
import { Trash } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import Button from "../../../component/form/Button";

const PhotoBioData = ({ client_id }: { client_id: string }) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["client-image-doc-list", client_id], // unique cache key
    queryFn: () =>
      fetchPhotoAndBio(sessionStorage.getItem("id_forPhoto") || client_id),
    retry: false,
  });

  const queryClient = useQueryClient();

  // deletePhotoAndBio
  const deleteMutation = useMutation({
    mutationFn: deletePhotoAndBio,
    onSuccess: () => {
      toast("Successfully deleted Client Image/Document");
      queryClient.invalidateQueries({ queryKey: ["client-image-doc-list"] });
    },
    onError: (error: any) => {
      console.error("❌ Error in deleting Profile Source:", error);
      toast(error.response?.data?.message || "Failed to delete Profile Source");
    },
  });

  const columns: ColumnDef<ModuleProps>[] = [
    {
      accessorKey: "file_path",
      header: "Profile Photo",
      cell: ({ getValue }) => {
        return (
          <img
            alt="profile Image"
            src={getValue() as string}
            className="h-[200px] w-[240px]"
          />
        );
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ getValue }) => {
        const status = getValue() as string;
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize`}
          >
            {status.split("_").join(" ")}
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
            type="button"
            onClick={() => {
              deleteMutation.mutate(row.original.id);
            }}
            className="p-2 rounded hover:bg-gray-200 cursor-pointer"
          >
            <Trash size={16} className="text-red-500" />
          </button>
        </div>
      ),
    },
  ];

  const handlePhotoData = data ? data : [];
  return (
    <div className="mt-2 mb-2">
      <ToastContainer />
      <div className="flex justify-end">
        <Button type="button" text="Fetch Images" onClick={() => refetch()} />
      </div>
      <Table columns={columns} data={handlePhotoData} />
    </div>
  );
};

export default PhotoBioData;
