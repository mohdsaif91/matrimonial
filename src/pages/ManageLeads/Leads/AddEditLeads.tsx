import React from "react";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { updateTask } from "../../../service/task";
import { DropDown } from "../../../component/form/SearchableDropdown";
import Button from "../../../component/form/Button";
import { BackNavigationButton } from "../../../component/BackNavigationButton";
import { getLabelValue } from "../../../util/ClientUtils";
import { fetchManageUserAPI } from "../../../service/manageUser";
import { LeadsProps } from "../../../types/leads";
import { TextField } from "../../../component/form/TextField";
import { fetchCountry } from "../../../service/country";
import { fetchState } from "../../../service/state";
import { fetchCity } from "../../../service/city";
import {
  leadStatus,
  lookingForOptions,
  personalIncomeOptions,
} from "../../../data/ClientForm";
import { addLead } from "../../../service/leads";
import { fetchProfileSource } from "../../../service/profileSource";

const initialLeadData = {
  lead_name: "",
  contact_person_name: "",
  relation_with_lead: "",
  phone: "",
  alternate_phone: "",
  email: "",
  country_id: 0,
  state_id: 0,
  city_id: 0,
  address: "",
  looking_for: "",
  budget_from: "",
  budget_to: "",
  other_details: "",
  profile_source_id: 0,
  assign_to: 0,
  status: "",
};

export default function AddEditLeads() {
  const [formData, setFormData] = useState<LeadsProps>(initialLeadData);
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();
  const { state } = useLocation();
  const navigate = useNavigate();

  const {
    data: countryData,
    error: countryError,
    isLoading: countryLoading,
    refetch: countryRefetch,
  } = useQuery({
    queryKey: ["country-list"],
    queryFn: fetchCountry,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    // refetchOnWindowFocus: false,
    // enabled: false,
  });

  const {
    data: stateData,
    error: stateError,
    isLoading: stateLoading,
    refetch: stateRefetch,
  } = useQuery({
    queryKey: ["state-list"], // unique cache key
    queryFn: fetchState,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    // refetchOnWindowFocus: false,
    // enabled: false,
  });

  const {
    data: CityData,
    error: CityError,
    isLoading: CityLoading,
    refetch: CityRefetch,
  } = useQuery({
    queryKey: ["City-list"], // unique cache key
    queryFn: fetchCity,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    // refetchOnWindowFocus: false,
    // enabled: false,
  });

  const {
    data: profileHandledData,
    error: profileHandledError,
    isLoading: profileHandledLoading,
    // refetch: profileHandledRefetch,
  } = useQuery({
    queryKey: ["manage-user-list"], // unique cache key
    queryFn: fetchManageUserAPI,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    // refetchOnWindowFocus: false,
    // enabled: false,
  });

  const {
    data: leadData,
    isLoading: leadLoading,
    refetch: leadRefetch,
  } = useQuery({
    queryKey: ["profile-source-list"],
    queryFn: fetchProfileSource,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const handledLeadData = leadData
    ? leadData.data.filter((m) => m.type === "Lead")
    : [];

  useEffect(() => {
    if (state && state.data) {
      setFormData({
        ...state.data,
      });
    }
  }, []);

  const handleChange = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const mutation = useMutation({
    mutationFn: addLead,
    onSuccess: (data) => {
      setIsLoading(false);
      queryClient.invalidateQueries({ queryKey: ["leads-list"] });
      toast("Successfully added Lead");
      setFormData({ ...initialLeadData });
    },
    onError: (error: any) => {
      setIsLoading(false);
      console.error("❌ Error adding Lead", error);
      toast(error.response?.data?.message || "Failed to add Lead");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: (data) => {
      setIsLoading(false);
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["leads-list"] });
      toast("Successfully Updated Lead");
      setFormData({ ...initialTaskFormData });
      navigate("/task-list");
    },
    onError: (error: any) => {
      setIsLoading(false);
      console.error("❌ Error updating Task:", error);
      toast(error.response?.data?.message || "Failed to Update Task");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (state && state.data) {
      updateMutation.mutate(formData);
    } else {
      mutation.mutate(formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white p-6 rounded-xl shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4">
        {state && state.data ? "Edit" : "ADD"} Leads
      </h2>
      <div className="grid grid-cols-3 md:grid-cols-3 gap-3 gap-y-5">
        <TextField
          label="Lead Name"
          name="lead_name"
          required
          value={formData.lead_name}
          onChange={(e) => handleChange("lead_name", e.target.value)}
        />

        <TextField
          label="Contact Person Name"
          name="contact_person_name"
          value={formData.contact_person_name}
          onChange={(e) => handleChange("contact_person_name", e.target.value)}
        />

        <TextField
          label="Relation With Lead"
          name="relation_with_lead"
          value={formData.relation_with_lead}
          onChange={(e) => handleChange("relation_with_lead", e.target.value)}
        />

        {/* Row 2 */}
        <TextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />

        <TextField
          label="Alternate Phone"
          name="alternate_phone"
          value={formData.alternate_phone}
          onChange={(e) => handleChange("alternate_phone", e.target.value)}
        />

        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />

        {/* Row 3 */}
        <DropDown
          searchable={true}
          loading={countryLoading}
          label="Country"
          name="country_id"
          // onClick={() => countryRefetch()}
          onChange={(val) => handleChange("country_id", val)}
          options={getLabelValue(countryData ? countryData.data : [])}
          value={formData.country_id}
        />

        <DropDown
          searchable={true}
          label="State"
          name="state_id"
          loading={stateLoading}
          // onClick={() => stateRefetch()}
          onChange={(val) => handleChange("state_id", val)}
          options={getLabelValue(stateData ? stateData.data : [])}
          value={formData.state_id}
        />

        <DropDown
          searchable={true}
          label="City"
          loading={CityLoading}
          name="city_id"
          // onClick={() => CityRefetch()}
          onChange={(val) => handleChange("city_id", val)}
          options={getLabelValue(CityData ? CityData.data : [])}
          value={formData.city_id}
        />

        {/* Row 4 */}
        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={(e) => handleChange("address", e.target.value)}
        />

        <DropDown
          label="Looking For"
          name="looking_for"
          value={formData.looking_for}
          searchable={false}
          options={lookingForOptions}
          onChange={(val) => handleChange("looking_for", val)}
        />

        <DropDown
          label="Budget From"
          name="budget_from"
          value={formData.budget_from}
          options={personalIncomeOptions}
          searchable={true}
          onChange={(val) => handleChange("budget_from", val)}
        />

        {/* Row 5 */}
        <DropDown
          label="Budget To"
          name="budget_to"
          value={formData.budget_to}
          searchable={true}
          options={personalIncomeOptions}
          onChange={(val) => handleChange("budget_to", val)}
        />

        <TextField
          label="Other Details"
          name="other_details"
          value={formData.other_details}
          onChange={(e) => handleChange("other_details", e.target.value)}
        />

        <DropDown
          searchable={true}
          label="Assign To"
          name="assign_to"
          loading={profileHandledLoading}
          // onClick={() => profileHandledRefetch()}
          onChange={(val) => handleChange("assign_to", val)}
          options={getLabelValue(
            profileHandledData ? profileHandledData.data : []
          )}
          value={formData.assign_to}
        />
        <DropDown
          onClick={() => leadRefetch()}
          loading={leadLoading}
          searchable={true}
          label="Lead Sourced"
          name="profile_source_id"
          onChange={(val) => handleChange("profile_source_id", val)}
          options={getLabelValue(handledLeadData)}
          value={formData.profile_source_id}
        />
        <DropDown
          searchable={true}
          label="Status"
          name="status"
          onChange={(val) => handleChange("status", val)}
          options={leadStatus}
          value={formData.status}
        />
      </div>
      <div className="flex">
        <Button
          text={`${state && state.data ? "Update" : "Save"} Lead`}
          type="submit"
          loading={isLoading}
          className="mt-6 px-6 py-2 bg-[#465dff] text-white rounded-xl hover:bg-blue-600 flex align-middle"
        />
        <BackNavigationButton className="ml-2 mt-6 px-6 py-2  text-white rounded-xl hover:bg-blue-600 flex align-middle" />
      </div>
    </form>
  );
}
