import React from "react";
import { DropDown } from "../../../component/form/SearchableDropdown";
import { lastDaysOptions } from "../../../data/clientResponse";
import Button from "../../../component/form/Button";
import { DateTimePicker } from "../../../component/form/DateField";
import moment from "moment";

export default function PaymentReportFilter({
  callAPI,
  filterData,
  setFilter,
  onReset,
}) {
  return (
    <div className="flex w-full gap-2 bg-[#fff] p-4 rounded-[8px]">
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
          className="mt-4 mr-4"
          text="Search"
          onClick={() => {
            callAPI(filterData);
          }}
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
    </div>
  );
}
