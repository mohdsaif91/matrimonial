import React from "react";
import { DropDown } from "../../component/form/SearchableDropdown";
import { lastDaysOptions } from "../../data/clientResponse";
import { DateTimePicker } from "../../component/form/DateField";
import moment from "moment";
import Button from "../../component/form/Button";

export default function AttendanceFilter({
  filterData,
  setFilter,
  callAPI,
  onReset,
  userData,
}) {
  return (
    <div className="grid grid-cols-4 align-middle items-center gap-2 bg-white p-4 rounded-[8px]">
      <DropDown
        options={userData}
        searchable={false}
        onChange={(val) => {
          setFilter({ ...filterData, filter: val });
        }}
        label=""
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
                start_date: moment(d).format("YYYY-MM-DD"),
              })
            }
            value={filterData.start_date}
            required={filterData.filter === "custom"}
          />
          <DateTimePicker
            label="From Date"
            onChange={(d) =>
              setFilter({
                ...filterData,
                end_date: moment(d).format("YYYY-MM-DD"),
              })
            }
            value={filterData.end_date}
            required={filterData.filter === "custom"}
          />
        </React.Fragment>
      )}
      <div className="flex flex-row ml-4">
        <Button
          className="mr-4"
          text="Search"
          onClick={() => {
            callAPI(filterData);
          }}
        />
        <Button
          className=""
          type="reset"
          text="Reset"
          onClick={() => {
            onReset();
          }}
        />
      </div>
    </div>
  );
}
