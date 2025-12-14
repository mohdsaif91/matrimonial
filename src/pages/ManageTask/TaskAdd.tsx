import React from "react";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { TaskProps } from "../../types/task";
import { addTask, updateTask } from "../../service/task";
import TextArea from "../../component/form/TextArea";
import LoadingPage from "../Loading/Loading";
import { fetchTaskCategory } from "../../service/taskCategory";
import { DropDown } from "../../component/form/SearchableDropdown";
import { DateTimePicker } from "../../component/form/DateField";
import { taskPriorityOptions } from "../../data/task";
import Button from "../../component/form/Button";
import { BackNavigationButton } from "../../component/BackNavigationButton";
import { getLabelValue } from "../../util/ClientUtils";
import { fetchManageUserAPI } from "../../service/manageUser";
import moment from "moment";

const initialTaskFormData = {
  title: "",
  task_category_id: 0,
  assigned_to: 0,
  scheduled_on: new Date(),
  priority: "",
};

function TaskAdd({ client_id }: { client_id?: string }) {
  const [formData, setFormData] = useState<TaskProps>(initialTaskFormData);
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();
  const { state } = useLocation();
  const navigate = useNavigate();

  const { data: taskCategoryData, isLoading: taskCategoryLoading } = useQuery({
    queryKey: ["task-category-list"],
    queryFn: fetchTaskCategory,
    retry: false,
  });

  const { data: manageUserData, isLoading: manageUserLoading } = useQuery({
    queryKey: ["manage-user-list"],
    queryFn: fetchManageUserAPI,
    retry: false,
  });

  useEffect(() => {
    if (state && state.data) {
      const { assigned_to, category } = state.data;

      setFormData({
        ...state.data,
        assigned_to: assigned_to.id,
        task_category_id: category.id,
      });
    }
  }, []);

  const handleChange = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const mutation = useMutation({
    mutationFn: addTask,
    onSuccess: (data) => {
      setIsLoading(false);
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["task-list"] });
      toast("Successfully added Task");
    },
    onError: (error: any) => {
      setIsLoading(false);
      console.error("❌ Error adding Task", error);
      toast(error.response?.data?.message || "Failed to add Task");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: (data) => {
      setIsLoading(false);
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["task-list"] });
      toast("Successfully Updated Task");
      setFormData({ ...initialTaskFormData });
      navigate("/task-list");
    },
    onError: (error: any) => {
      setIsLoading(false);
      console.error("❌ Error updating Task:", error);
      toast(error.response?.data?.message || "Failed to Update Task");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (state && state.data) {
      updateMutation.mutate(formData);
    } else {
      mutation.mutate(formData);
    }
  };

  if (taskCategoryLoading || manageUserLoading) {
    return <LoadingPage />;
  }

  const handledTaskCategory = taskCategoryData ? taskCategoryData.data : [];
  const handledManageUsers = manageUserData ? manageUserData.data : [];

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white p-6 rounded-xl shadow-md"
    >
      {!client_id && (
        <h2 className="text-xl font-semibold mb-4">
          {state && state.data ? "Edit" : "ADD"} Task
        </h2>
      )}
      <div className="grid grid-cols-3 md:grid-cols-3 gap-3 gap-y-5">
        <div className="col-span-4">
          <TextArea
            required
            label="Task title"
            name="taskTitle"
            onChange={(val) => handleChange("title", val)}
            value={formData.title}
          />
        </div>
        <DropDown
          label="Task category"
          name="task-category"
          onChange={(val) => handleChange("task_category_id", val)}
          options={getLabelValue(handledTaskCategory)}
          searchable={false}
          value={formData.task_category_id}
        />
        <DropDown
          label="Assigned To"
          name="task-category"
          onChange={(val) => handleChange("assigned_to", val)}
          options={getLabelValue(handledManageUsers)}
          searchable={false}
          value={formData.assigned_to}
          required
        />
        <DateTimePicker
          dateFormat="yyyy-MM-dd"
          label="Task Scheduled On"
          required
          onChange={(value) => {
            handleChange("scheduled_on", moment(value).format("YYYY-MM-DD"));
          }}
          value={formData.scheduled_on}
        />
        <DropDown
          searchable={false}
          label="Task Priority"
          name="taskPriority"
          options={taskPriorityOptions}
          value={formData.priority}
          onChange={(val) => handleChange("priority", val)}
        />
      </div>
      <div className="flex">
        <Button
          text={`${state && state.data ? "Update" : "Save"} Task`}
          type="submit"
          loading={isLoading}
          className="mt-6 px-6 py-2 bg-[#465dff] text-white rounded-xl hover:bg-blue-600 flex align-middle"
        />
        <BackNavigationButton className="ml-2 mt-6 px-6 py-2  text-white rounded-xl hover:bg-blue-600 flex align-middle" />
      </div>
    </form>
  );
}

export default TaskAdd;
