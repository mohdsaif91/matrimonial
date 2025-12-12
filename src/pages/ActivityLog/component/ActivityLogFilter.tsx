import React, { useState } from "react";
import { TextField } from "../../../component/form/TextField";
import { DropDown } from "../../../component/form/SearchableDropdown";
import { useQuery } from "@tanstack/react-query";
import { fetchManageUserAPI } from "../../../service/manageUser";
import { getLabelValue } from "../../../util/ClientUtils";
import Button from "../../../component/form/Button";

const initialData = {
  client_name: "",
  profile_id: "",
  module: "",
  added_by: "",
};

export default function ActivityLogFilter() {
  const [filter, setFilter] = useState({ ...initialData });

  const { data, isLoading } = useQuery({
    queryKey: ["manage-user-list"],
    queryFn: fetchManageUserAPI,
    retry: false,
  });

  const handleUserData = data ? data.data : [];

  return (
    <form className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-white p-4 rounded-2xl shadow">
      <TextField
        placeholder="client Name"
        showLabel={false}
        name="clientName"
        onChange={(e) => setFilter({ ...filter, client_name: e.target.value })}
        value={filter.client_name}
      />
      <TextField
        placeholder="Profile ID"
        showLabel={false}
        name="profileId"
        onChange={(e) => setFilter({ ...filter, profile_id: e.target.value })}
        value={filter.profile_id}
      />
      <TextField
        placeholder="Module"
        showLabel={false}
        name="module"
        onChange={(e) => setFilter({ ...filter, module: e.target.value })}
        value={filter.module}
      />
      <DropDown
        loading={isLoading}
        showLabel={false}
        placeholder="Added By"
        label="Added By"
        name="addedBy"
        value={filter.module}
        onChange={(val) => setFilter({ ...filter, added_by: val })}
        options={getLabelValue(handleUserData)}
      />
      <div>
        <Button type="submit" text="Submit" className="mr-3" />
        <Button type="reset" text="Reset" />
      </div>
    </form>
  );
}
