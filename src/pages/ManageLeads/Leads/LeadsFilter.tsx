import React, { useState } from "react";
import { TextField } from "../../../component/form/TextField";
import { DropDown } from "../../../component/form/SearchableDropdown";
import Button from "../../../component/form/Button";
import { LeadFilterFormProps } from "../../../types/leads";
import {
  leadStatus,
  lookingForOptions,
  personalIncomeOptions,
} from "../../../data/ClientForm";
import { DateTimePicker } from "../../../component/form/DateField";
import moment from "moment";
import { yesNoArr } from "../../../util/ClientUtils";

const LeadFilterForm: React.FC<LeadFilterFormProps> = ({
  onSearch,
  filterData,
  setFilterData,
  city,
  country,
  state,
  assigneTo,
}) => {
  return (
    <form className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-white p-4 rounded-2xl shadow">
      <TextField
        placeholder="Lead Id"
        name="id"
        value={filterData.lead_id || ""}
        onChange={(e) =>
          setFilterData({ ...filterData, lead_id: e.target.value })
        }
      />
      <TextField
        placeholder="Lead Name"
        name="lead_name"
        value={filterData.lead_name || ""}
        onChange={(e) =>
          setFilterData({ ...filterData, lead_name: e.target.value })
        }
      />
      <TextField
        placeholder="Contact Person Name"
        name="contact_person_name"
        value={filterData.contact_person_name || ""}
        onChange={(e) =>
          setFilterData({ ...filterData, contact_person_name: e.target.value })
        }
      />
      <TextField
        placeholder="Phone"
        name="phone"
        value={filterData.phone || ""}
        onChange={(e) =>
          setFilterData({ ...filterData, phone: e.target.value })
        }
      />
      <TextField
        placeholder="Email"
        name="email"
        value={filterData.email || ""}
        onChange={(e) =>
          setFilterData({ ...filterData, email: e.target.value })
        }
      />
      <DropDown
        showLabel={false}
        label="Country"
        placeholder="Country"
        name="country_id"
        options={country}
        value={filterData.country_id || ""}
        onChange={(e) => setFilterData({ ...filterData, country_id: e })}
      />
      <DropDown
        label="State"
        showLabel={false}
        placeholder="State"
        name="state_id"
        options={state}
        value={filterData.state_id || ""}
        onChange={(e) => setFilterData({ ...filterData, state_id: e })}
      />
      <DropDown
        showLabel={false}
        label="City"
        placeholder="City"
        name="city_id"
        options={city}
        value={filterData.city_id || ""}
        onChange={(e) => setFilterData({ ...filterData, city_id: e })}
      />
      <TextField
        placeholder="Address"
        name="address"
        value={filterData.address || ""}
        onChange={(e) =>
          setFilterData({ ...filterData, address: e.target.value })
        }
      />
      <DropDown
        label="Looking For"
        showLabel={false}
        placeholder="Looking For"
        name="looking_for"
        options={lookingForOptions}
        value={filterData.looking_for || ""}
        onChange={(e) => setFilterData({ ...filterData, looking_for: e })}
      />

      <DropDown
        showLabel={false}
        label="Budget From"
        placeholder="Budget From"
        name="budget_from"
        options={personalIncomeOptions || ""}
        value={filterData.budget_from}
        onChange={(e) => setFilterData({ ...filterData, budget_from: e })}
      />
      <DropDown
        showLabel={false}
        label="Budget To"
        placeholder="Budget To"
        name="budget_to"
        options={personalIncomeOptions || ""}
        value={filterData.budget_to}
        onChange={(e) => setFilterData({ ...filterData, budget_to: e })}
      />

      <DropDown
        label="Assign To"
        showLabel={false}
        placeholder="Assign To"
        name="assign_to"
        options={assigneTo || []}
        value={filterData.assign_to || ""}
        onChange={(e) => setFilterData({ ...filterData, assign_to: e })}
      />
      <DateTimePicker
        required={false}
        label="Created From"
        showLabel={false}
        value={filterData.created_from || ""}
        onChange={(e) =>
          setFilterData({
            ...filterData,
            created_from: moment(e).format("YYYY-MM-DD"),
          })
        }
      />
      <DateTimePicker
        required={false}
        showLabel={false}
        label="Created To"
        value={filterData.created_to || ""}
        onChange={(e) =>
          setFilterData({
            ...filterData,
            created_to: moment(e).format("YYYY-MM-DD"),
          })
        }
      />

      <DateTimePicker
        showLabel={false}
        label="Follow Up From"
        required={false}
        value={filterData.followup_from || ""}
        onChange={(e) =>
          setFilterData({
            ...filterData,
            followup_from: moment(e).format("YYYY-MM-DD"),
          })
        }
      />
      <DateTimePicker
        showLabel={false}
        label="Follow Up To"
        required={false}
        value={filterData.followup_to || ""}
        onChange={(e) =>
          setFilterData({
            ...filterData,
            followup_to: moment(e).format("YYYY-MM-DD"),
          })
        }
      />
      <DropDown
        showLabel={false}
        label="Followup Required"
        name="followup_required"
        options={yesNoArr}
        value={filterData.followup_required || ""}
        onChange={(e) => setFilterData({ ...filterData, followup_required: e })}
      />

      <DropDown
        showLabel={false}
        label="Lead Sourced"
        name="lead_source_id"
        options={assigneTo}
        value={filterData.lead_source_id || ""}
        onChange={(e) => setFilterData({ ...filterData, lead_source_id: e })}
      />
      <DropDown
        showLabel={false}
        label="Status"
        name="status"
        options={leadStatus}
        value={filterData.status || ""}
        onChange={(e) => setFilterData({ ...filterData, status: e })}
      />
      <div className="flex justify-end gap-3 mt-2 col-span-5">
        <Button
          text="Search"
          type="submit"
          onClick={() => filterData && onSearch(filterData)}
        ></Button>
        <Button
          text="Reset"
          type="reset"
          onClick={() => setFilterData({ ...initialData })}
        ></Button>
      </div>
    </form>
  );
};

export default LeadFilterForm;
