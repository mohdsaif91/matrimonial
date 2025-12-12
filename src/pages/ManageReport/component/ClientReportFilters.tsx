import React, { useState } from "react";
import { DropDown } from "../../../component/form/SearchableDropdown";
import { lastDaysOptions } from "../../../data/clientResponse";
import Button from "../../../component/form/Button";
import { TextField } from "../../../component/form/TextField";
import { DateTimePicker } from "../../../component/form/DateField";
import moment from "moment";

export default function ClientReportFilters({
  filterData,
  onClick,
  setFilter,
  onReset,
  btnLoader = false,
}: {
  filterData: any;
  setFilter: (e: any) => void;
  onReset: () => void;
  onClick: (f: any) => void;
  btnLoader: boolean;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onClick(filterData);
        // fetchCientReport(filterData);
      }}
      className="grid grid-cols-5 gap-3 bg-white p-4 rounded-lg"
    >
      <TextField
        required
        name="profileID"
        onChange={(e) => {
          setFilter({ ...filterData, profile_id: e.target.value });
        }}
        value={filterData.profile_id}
        label="Profile ID"
      />
      <DropDown
        options={lastDaysOptions}
        searchable={false}
        onChange={(val) => {
          setFilter({ ...filterData, filter: val });
        }}
        label="Last Days"
        name="last_day"
        value={filterData.filter}
        placeholder="Select Days"
      />
      {filterData?.filter === "custom" && (
        <React.Fragment>
          <DateTimePicker
            label="From Date"
            onChange={(d) =>
              setFilter({
                ...filterData,
                from: moment(d).format("YYYY-MM-DD"),
              })
            }
            value={filterData.from}
            required={filterData.filter === "custom"}
          />
          <DateTimePicker
            label="From Date"
            onChange={(d) =>
              setFilter({
                ...filterData,
                to: moment(d).format("YYYY-MM-DD"),
              })
            }
            value={filterData.to}
            required={filterData.filter === "custom"}
          />
        </React.Fragment>
      )}
      <div className="flex flex-row ml-4">
        <Button
          loading={btnLoader}
          className="mt-4 mr-4"
          type="submit"
          text="Search"
        />
        <Button
          className="mt-4"
          type="reset"
          text="Reset"
          onClick={() => {
            onReset();
          }}
        />
      </div>
    </form>
  );
}
