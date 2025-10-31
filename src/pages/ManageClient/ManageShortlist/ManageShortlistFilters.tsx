import React, { useState } from "react";

import { TextField } from "../../../component/form/TextField";
import { DropDown } from "../../../component/form/SearchableDropdown";
import Button from "../../../component/form/Button";

const initialFilterData = {
  clientName: "",
  profileId: "",
  handledBy: "",
};

export default function ManageShortlistFilters() {
  const [filter, setFilter] = useState({ ...initialFilterData });
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-white p-4 rounded-2xl shadow">
      <TextField
        label="Client Name"
        value={filter.clientName}
        onChange={(e) => {
          setFilter({ ...filter, clientName: e.target.value });
        }}
        name="clientName"
      />
      <TextField
        label="Profile ID"
        value={filter.profileId}
        onChange={(e) => {
          setFilter({ ...filter, profileId: e.target.value });
        }}
        name="profileId"
      />
      <DropDown
        label="Handled By"
        value={filter.handledBy}
        name="handledBy"
        onChange={(value) => setFilter({ ...filter, handledBy: value })}
        options={[]}
      />
      <div className="flex mt-3">
        <Button type="button" text="Search" className="mr-2" />
        <Button type="reset" text="Reset" />
      </div>
    </div>
  );
}
