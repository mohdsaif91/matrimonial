import React, { useState } from "react";
import { DropDown } from "../../../component/form/SearchableDropdown";
import { lastDaysOptions } from "../../../data/clientResponse";
import Button from "../../../component/form/Button";
import { TextField } from "../../../component/form/TextField";

const initialData = { profileId: "", lastDay: "" };

export default function ClientReportFilters({
  fetchCientReport,
}: {
  fetchCientReport: (fil: any) => void;
}) {
  const [filter, setFIlter] = useState({ ...initialData });
  return (
    <form
      onSubmit={() => fetchCientReport(filter)}
      className="grid grid-cols-3 gap-3 bg-[#fff] p-4 rounded-[8px] "
    >
      <TextField
        required
        name="profileID"
        onChange={(e) => {
          setFIlter({ ...filter, profileId: e.target.value });
        }}
        value={filter.profileId}
        label="Profile ID"
      />
      <DropDown
        options={lastDaysOptions}
        searchable={false}
        onChange={(val) => {
          setFIlter({ ...filter, lastDay: val });
        }}
        label="Last Days"
        name="last_day"
        value={filter.lastDay}
        placeholder="Select Days"
      />
      <div className="flex flex-row ml-4">
        <Button className="mt-4 mr-4" type="submit" text="Search" />
        <Button
          className="mt-4"
          type="reset"
          text="Reset"
          onClick={() => {
            setFIlter({ ...initialData });
          }}
        />
      </div>
    </form>
  );
}
