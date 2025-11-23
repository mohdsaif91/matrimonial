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

const initialData = {
  taskCategory: "",
  taskPriority: "",
  assigneTo: "",
  scheduleDateFrom: new Date(),
  scheduleDateTo: new Date(),
};

export default function TaskFilter({ onSubmit }: TaskFilterProps) {
  const [filterData, setFilterData] = useState({ ...initialData });

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
  console.log(taskCategoryData.data);
  const handledTaskCategoryData = taskCategoryData
    ? getLabelValue(taskCategoryData.data)
    : [];

  const handledmanageUserData = manageUserData
    ? getLabelValue(manageUserData.data)
    : [];

  return (
    <form
      onSubmit={() => onSubmit(filterData)}
      className="grid grid-cols-5 gap-4"
    >
      <DropDown
        showLabel={false}
        label="Task Category"
        options={handledTaskCategoryData}
        onChange={(val) => {
          setFilterData({ ...filterData, taskCategory: val });
        }}
        name="taskCategory"
        value={filterData.taskCategory}
      />
      <DropDown
        showLabel={false}
        label="Task Priority"
        options={taskPriorityOptions}
        onChange={(val) => {
          setFilterData({ ...filterData, taskPriority: val });
        }}
        name="taskCategory"
        value={filterData.taskPriority}
      />
      <DropDown
        showLabel={false}
        label="Assign to"
        options={handledmanageUserData}
        onChange={(val) => {
          setFilterData({ ...filterData, assigneTo: val });
        }}
        name="assigneTo"
        value={filterData.assigneTo}
      />
      <DateTimePicker
        label="Schedule Date From"
        onChange={(d) => setFilterData({ ...filterData, scheduleDateFrom: d })}
        showLabel={false}
        required={true}
        value={filterData.scheduleDateFrom}
      />
      <DateTimePicker
        label="Schedule Date To"
        onChange={(d) => setFilterData({ ...filterData, scheduleDateTo: d })}
        showLabel={false}
        required={true}
        value={filterData.scheduleDateTo}
      />
      <div className="flex justify-around">
        <Button
          type="submit"
          text="Search"
          onClick={() => onSubmit(filterData)}
        />
        <Button
          type="reset"
          text="Reset"
          onClick={() => setFilterData({ ...initialData })}
        />
      </div>
    </form>
  );
}
