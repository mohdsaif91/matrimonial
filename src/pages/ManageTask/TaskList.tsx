import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, SquarePlus, Trash } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import LoadingPage from "../Loading/Loading";
import Table from "../../component/table/Table";
import { deleteTask, fetchTask, fetchTaskByClientId } from "../../service/task";
import TaskFilter from "./component/TaskFilter";
import ModalPopup from "../../component/ModalPopup";
import React, { useEffect, useState } from "react";
import TaskFollowUp from "./TaskFollowUp";
import Tooltip from "../../component/Tooltip";

const initialData = {
  category_id: "",
  task_priority: "",
  assign_to: "",
  scheduled_date_from: "",
  scheduled_date_to: "",
};

export default function TaskList() {
  const [openFolowUp, setOpenFollowUp] = useState({
    taskId: "",
    flag: false,
    taskName: "",
  });
  const [pFilter, setPFilter] = useState({ ...initialData });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { state } = useLocation();

  const {
    data: taskData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["task-list", pFilter],
    queryFn: ({ queryKey }) => {
      const [, filter] = queryKey;
      return fetchTask(filter);
    },
    retry: false,
    enabled: !state,
  });

  const { data: taskByDashboardData, isLoading: taskDashboardLoading } =
    useQuery({
      queryKey: ["task-list", pFilter],
      queryFn: ({ queryKey }) => {
        const [, filter] = queryKey;
        return fetchTask(filter);
      },
      retry: false,
      enabled: !!(state && (state.taskStartDate || state.taskPriority)),
    });

  useEffect(() => {
    if (state && (state.taskStartDate || state.taskPriority)) {
      setPFilter({
        ...pFilter,
        scheduled_date_from: state.taskStartDate,
        task_priority: state.taskPriority,
      });
    }
  }, [state]);
  // state.taskStartDate
  const { data: clientTaskData, isLoading: clientTaskLoading } = useQuery({
    queryKey: ["task-list", pFilter, state && state.clientIdForTask],
    queryFn: ({ queryKey }) => {
      const [, filter, clientId] = queryKey;
      return fetchTaskByClientId(filter, clientId);
    },
    retry: false,
    enabled: !!(state && state.clientIdForTask),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      toast("Successfully deleted Task item");
      queryClient.invalidateQueries({ queryKey: ["task-list"] });
    },
    onError: (error: any) => {
      console.error("❌ Error in deleting Task item:", error);
      toast(error.response?.data?.message || "Failed to delete Task item");
    },
  });

  const clientData = state && state.clientData;

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: "ClIent Details",
      cell: () => {
        const clientMainPhoto =
          (clientData &&
            Array.isArray(clientData.client_documents) &&
            clientData.client_documents.find(
              (f) => f.file_type === "main_photo"
            ).file_path) ||
          "";
        const clientName =
          (clientData && clientData.items.client_name.value) || "";
        return (
          <div className="flex justify-start flex-col">
            <img className=" h-[140px] w-[200px]" src={clientMainPhoto} />
            <div className="font-bold mt-2">{clientName}</div>
            <span>{}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "title",
      header: "Task Title",
    },
    {
      accessorKey: "profile_details",
      header: "Profile Details",
    },
    {
      accessorKey: "scheduled_on",
      header: "Schedule Date",
    },
    {
      accessorKey: "role_for",
      header: "Created By",
    },
    {
      accessorKey: "assigned_to",
      header: "Assigned To",
      cell: ({ getValue }) => {
        const name = getValue() ? getValue()?.name : "";
        return <div>{name}</div>;
      },
    },
    {
      accessorKey: "category",
      header: "Task Category",
      cell: ({ getValue }) => {
        const name = getValue() ? getValue()?.name : "";
        return <div>{name}</div>;
      },
    },
    {
      accessorKey: "priority",
      header: "Task Priority",
    },
    {
      accessorKey: "action",
      header: "Follow Up",
      cell: ({ row }) => {
        return (
          <div className="flex align-middle justify-center">
            <Tooltip text="View Follow Up">
              <Eye
                onClick={() =>
                  setOpenFollowUp({ flag: true, taskId: row.original.id })
                }
                size={16}
                className="text-red-500 cursor-pointer"
              />
            </Tooltip>
            <div className="ml-2">{row.original.followups.length || 0}</div>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() =>
              setOpenFollowUp({
                flag: true,
                taskId: row.original.id,
                taskName: row.original.title,
              })
            }
            className="p-2 rounded hover:bg-gray-200 cursor-pointer"
          >
            <Tooltip text="Add Task Follow Up">
              <SquarePlus size={16} className="text-gray-600" />
            </Tooltip>
          </button>
          <button
            onClick={() => {
              navigate("/task-edit", { state: { data: row.original } });
            }}
            className="p-2 rounded hover:bg-gray-200 cursor-pointer"
          >
            <Tooltip text="Edit Task">
              <Pencil size={16} className="text-gray-600" />
            </Tooltip>
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

  const handledTaskData =
    state && state.taskStartDate
      ? taskByDashboardData
        ? taskByDashboardData.data
        : []
      : state && state.clientIdForTask
      ? clientTaskData
        ? clientTaskData.data
        : []
      : taskData
      ? taskData.data
      : [];

  return (
    <div className="p-4 bg-white">
      <TaskFilter
        setData={(d) => setPFilter({ ...d })}
        showAddTaskBtn={!(state && !state.clientIdForTask)}
        data={pFilter}
        onSubmit={() => {
          refetch();
        }}
      />
      <div className="mt-2 mb-2">
        <Table borderX columns={columns} data={handledTaskData} />
      </div>
      <ModalPopup
        title="Add Task Follow UP"
        width="560px"
        data={[]}
        isOpen={openFolowUp.flag}
        onClose={() =>
          setOpenFollowUp({ flag: false, taskId: "", taskName: "" })
        }
        children={
          <TaskFollowUp
            type="taskList"
            taskId={openFolowUp.taskId}
            taskName={openFolowUp.taskName}
          />
        }
      />
    </div>
  );
}
