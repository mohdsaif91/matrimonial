import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { fetchTaskCategory } from "../../../service/taskCategory";
import LoadingPage from "../../Loading/Loading";
import { TaskFilterProps } from "../../../types/task";
import { getLabelValue } from "../../../util/ClientUtils";
import { DropDown } from "../../../component/form/SearchableDropdown";
import { taskPriorityOptions } from "../../../data/task";
import { fetchManageUserAPI } from "../../../service/manageUser";
import { DateTimePicker } from "../../../component/form/DateField";
import Button from "../../../component/form/Button";
import { useNavigate } from "react-router-dom";

export default function TaskFilter({
  onSubmit,
  data,
  showAddTaskBtn = false,
  setData,
}: TaskFilterProps) {
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

  if (taskCategoryLoading || manageUserLoading) {
    return <LoadingPage />;
  }
  const handledTaskCategoryData = taskCategoryData
    ? getLabelValue(taskCategoryData.data)
    : [];

  const handledmanageUserData = manageUserData
    ? getLabelValue(manageUserData.data)
    : [];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="grid grid-cols-5 gap-4"
    >
      <DropDown
        showLabel={false}
        label="Task Category"
        options={handledTaskCategoryData}
        onChange={(val) => {
          setData({ ...data, category_id: val });
        }}
        name="taskCategory"
        value={data.category_id}
      />
      <DropDown
        showLabel={false}
        label="Task Priority"
        options={taskPriorityOptions}
        onChange={(val) => {
          setData({ ...data, task_priority: val });
        }}
        name="taskCategory"
        value={data.task_priority}
      />
      <DropDown
        showLabel={false}
        label="Assign to"
        options={handledmanageUserData}
        onChange={(val) => {
          setData({ ...data, assign_to: val });
        }}
        name="assigneTo"
        value={data.assign_to}
      />
      <DateTimePicker
        label="Schedule Date From"
        onChange={(d) => setData({ ...data, scheduled_date_from: d })}
        showLabel={false}
        required={true}
        value={data.scheduled_date_from}
      />
      <DateTimePicker
        label="Schedule Date To"
        onChange={(d) => setData({ ...data, scheduled_date_to: d })}
        showLabel={false}
        required={true}
        value={data.scheduled_date_to}
      />
      <div className="col-span-2">
        <Button
          className="mr-4"
          type="submit"
          text="Search"
          onClick={() => onSubmit(data)}
        />
        <Button
          className="mr-4"
          type="reset"
          text="Reset"
          onClick={() => setData({ ...initialData })}
        />
        {showAddTaskBtn && (
          <Button text="+ Add Task" onClick={() => navigate("/task-add")} />
        )}
      </div>
    </form>
  );
}
