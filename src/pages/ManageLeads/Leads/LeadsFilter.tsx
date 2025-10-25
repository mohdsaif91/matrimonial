import React from "react";
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

const LeadFilterForm: React.FC<LeadFilterFormProps> = ({
  filters,
  onChange,
  onSearch,
  onReset,
  country = [],
  state = [],
  city = [],
}) => {
  return (
    <form className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-white p-4 rounded-2xl shadow">
      <TextField
        placeholder="Lead Id"
        name="id"
        value={filters.id || ""}
        onChange={onChange}
      />
      <TextField
        placeholder="Lead Name"
        name="lead_name"
        value={filters.lead_name || ""}
        onChange={onChange}
      />
      <TextField
        placeholder="Contact Person Name"
        name="contact_person_name"
        value={filters.contact_person_name || ""}
        onChange={onChange}
      />
      <TextField
        placeholder="Phone"
        name="phone"
        value={filters.phone || ""}
        onChange={onChange}
      />
      <TextField
        placeholder="Email"
        name="email"
        value={filters.email || ""}
        onChange={onChange}
      />

      <DropDown
        placeholder="Country"
        name="country_id"
        options={country}
        value={filters.country_id || ""}
        onChange={onChange}
      />
      <DropDown
        placeholder="State"
        name="state_id"
        options={state}
        value={filters.state_id || ""}
        onChange={onChange}
      />
      <DropDown
        placeholder="City"
        name="city_id"
        options={city}
        value={filters.city_id || ""}
        onChange={onChange}
      />
      <TextField
        placeholder="Address"
        name="address"
        value={filters.address || ""}
        onChange={onChange}
      />
      <DropDown
        placeholder="Looking For"
        name="looking_for"
        options={lookingForOptions}
        value={filters.looking_for || ""}
        onChange={onChange}
      />

      <DropDown
        placeholder="Budget From"
        name="budget_from"
        options={personalIncomeOptions || ""}
        // value={filters.}
        onChange={onChange}
      />
      <DropDown
        placeholder="Budget To"
        name="budget_to"
        options={personalIncomeOptions || ""}
        // value={filters.}
        onChange={onChange}
      />

      <DropDown
        placeholder="Assign To"
        name="assign_to"
        options={[]}
        value={filters.assign_to || ""}
        onChange={onChange}
      />
      <DateTimePicker
        placeholder="Created From"
        name="created_from"
        value={filters.created_from || ""}
        onChange={onChange}
      />
      <DateTimePicker
        placeholder="Created To"
        name="created_to"
        value={filters.created_to || ""}
        onChange={onChange}
      />

      <DateTimePicker
        placeholder="Follow Up From"
        name="follow_up_from"
        value={filters.follow_up_from || ""}
        onChange={onChange}
      />
      <DateTimePicker
        placeholder="Follow Up To"
        name="follow_up_to"
        value={filters.follow_up_to || ""}
        onChange={onChange}
      />
      <DropDown
        placeholder="Followup Required"
        name="followup_required"
        options={[]}
        value={filters.followup_required || ""}
        onChange={onChange}
      />

      <DropDown
        placeholder="Lead Sourced"
        name="lead_source_id"
        options={[]}
        value={filters.lead_source_id || ""}
        onChange={onChange}
      />
      <DropDown
        placeholder="Status"
        name="status"
        options={leadStatus}
        value={filters.status || ""}
        onChange={onChange}
      />
      <div className="flex justify-end gap-3 mt-2 col-span-5">
        <Button
          text="Search"
          type="submit"
          onClick={onSearch}
          //   className="bg-blue-900 hover:bg-blue-800 text-white "
        ></Button>
        <Button
          text="Reset"
          type="reset"
          onClick={onReset}
          //   className="bg-red-700 hover:bg-red-600 text-white"
        ></Button>
      </div>
    </form>
  );
};

export default LeadFilterForm;
