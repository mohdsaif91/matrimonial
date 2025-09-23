import React, { use, useState } from "react";
import { defaultClientData, Field, formSchema } from "../../data/ClientForm";
import { TextField } from "../../component/form/TextField";
import { DateOfBirthField } from "../../component/form/DateField";
import { TimeField } from "../../component/form/TImeField";
import Button from "../../component/form/Button";
import { DropDown } from "../../component/form/SearchableDropdown";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddClientApi, fetchSourcedFrom } from "../../axiosApi/client";
import LoadingPage from "../Loading/Loading";
import { getLabelValue, yesNoArr } from "../../util/ClientUtils";

const AddClient = () => {
  const [clientData, setClientData] = useState(defaultClientData);

  const queryClient = useQueryClient();
  const {
    data: sourcedData,
    error: sourcedError,
    isLoading: sourcedLoading,
    refetch: sourcedFromRefetch,
  } = useQuery({
    queryKey: ["sourced_from"], // unique cache key
    queryFn: fetchSourcedFrom,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const {
    data: profileHandledData,
    error: profileHandledError,
    isLoading: profileHandledLoading,
    refetch: profileHandledRefetch,
  } = useQuery({
    queryKey: ["profileHandled"], // unique cache key
    queryFn: fetchSourcedFrom,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const {
    data: profileCreatedData,
    error: profileCreatedError,
    isLoading: profileCreatedLoading,
    refetch: ProfileCreatedRefetch,
  } = useQuery({
    queryKey: ["profileCreated"], // unique cache key
    queryFn: fetchSourcedFrom,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const {
    data: profileVisitedData,
    error: profileVisitedError,
    isLoading: profileVisitedLoading,
    refetch: profileVisitedRefetch,
  } = useQuery({
    queryKey: ["profileVisited"], // unique cache key
    queryFn: fetchSourcedFrom,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const {
    data: clientTypeData,
    error: clientTypeError,
    isLoading: clientTypeLoading,
    refetch: clientTypeRefetch,
  } = useQuery({
    queryKey: ["clientType"], // unique cache key
    queryFn: fetchSourcedFrom,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const {
    data: clientVerificationData,
    error: clientVerificationError,
    isLoading: clientVerificationLoading,
    refetch: clientVerificationRefetch,
  } = useQuery({
    queryKey: ["clientVerification"], // unique cache key
    queryFn: fetchSourcedFrom,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const {
    data: casteData,
    error: casteError,
    isLoading: casteLoading,
    refetch: casteRefetch,
  } = useQuery({
    queryKey: ["caste"], // unique cache key
    queryFn: fetchSourcedFrom,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const {
    data: subCasteData,
    error: subCasteError,
    isLoading: subCasteLoading,
    refetch: subCasteRefetch,
  } = useQuery({
    queryKey: ["subCaste"], // unique cache key
    queryFn: fetchSourcedFrom,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const {
    data: complexionData,
    error: complexionError,
    isLoading: complexionLoading,
    refetch: complexionRefetch,
  } = useQuery({
    queryKey: ["complexion"], // unique cache key
    queryFn: fetchSourcedFrom,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const {
    data: personalityData,
    error: personalityError,
    isLoading: personalityLoading,
    refetch: personalityRefetch,
  } = useQuery({
    queryKey: ["personality"], // unique cache key
    queryFn: fetchSourcedFrom,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const mutation = useMutation({
    mutationFn: AddClientApi,
    onSuccess: (data) => {
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["clients"] });

      alert("Client added successfully!");
    },
    onError: (error: any) => {
      console.error("❌ Error adding client:", error);
      alert(error.response?.data?.message || "Failed to add client");
    },
  });

  const getOptions = (fieldName: string) => {
    let arr: { label: string; value: string | number }[] = [];
    switch (fieldName) {
      case "sourcedFrom":
        arr = getLabelValue(sourcedData);
        break;
      case "profileHandled":
        arr = getLabelValue(profileHandledData);
        break;
      case "profileCreated":
        arr = getLabelValue(profileCreatedData);
        break;
      case "profileVisited":
        arr = getLabelValue(profileVisitedData);
        break;
      case "clientType":
        arr = getLabelValue(clientTypeData);
        break;
      case "clientVerification":
        arr = getLabelValue(clientVerificationData);
        break;
      case "caste":
        arr = getLabelValue(casteData);
        break;
      case "subCaste":
        arr = getLabelValue(subCasteData);
        break;
      case "complexion":
        arr = getLabelValue(complexionData);
        break;
      case "personality":
        arr = getLabelValue(personalityData);
        break;
      default:
        arr = [];
    }

    return arr;
  };

  // if (
  //   sourcedLoading ||
  //   personalityLoading ||
  //   clientTypeLoading ||
  //   complexionLoading ||
  //   subCasteLoading ||
  //   casteLoading ||
  //   clientVerificationLoading ||
  //   profileVisitedLoading ||
  //   profileCreatedLoading ||
  //   profileHandledLoading
  // ) {
  //   return <LoadingPage />;
  // }

  const handleChange = (name: string, value: any) => {
    console.log();

    setClientData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(clientData);
  };

  return (
    <div className="bg-white rounded-xl shadow-md m-1">
      <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-3 p-6">
        {/* Lead Id */}
        <TextField
          label={formSchema.leadId.label}
          name={formSchema.leadId.name}
          value={clientData.lead_id || ""}
          onChange={(e) => handleChange("lead_id", e.target.value)}
        />

        {/* Sourced From */}
        <DropDown
          onClick={() => {
            if (!sourcedData) {
              sourcedFromRefetch();
            }
          }}
          loading={sourcedLoading}
          searchable
          label={formSchema.sourcedFrom.label}
          name={formSchema.sourcedFrom.name}
          required={formSchema.sourcedFrom.required}
          options={getOptions("sourcedFrom")}
          value={clientData.sourced_from_id}
          onChange={(val) => handleChange("sourced_from_id", val)}
        />

        {/* Profile Handled */}
        <DropDown
          onClick={() => {
            if (!profileHandledData) {
              profileHandledRefetch();
            }
          }}
          searchable
          loading={profileHandledLoading}
          label={formSchema.profileHandled.label}
          name={formSchema.profileHandled.name}
          required={formSchema.profileHandled.required}
          options={getOptions("profileHandled")}
          value={clientData.profile_handled_by || ""}
          onChange={(val) => handleChange("profile_handled_by", val)}
        />

        {/* Profile Created */}
        <DropDown
          onClick={() => {
            if (!profileCreatedData) {
              ProfileCreatedRefetch();
            }
          }}
          loading={profileCreatedLoading}
          searchable
          label={formSchema.profileCreated.label}
          name={formSchema.profileCreated.name}
          required={formSchema.profileCreated.required}
          options={getOptions("profileCreated")}
          value={clientData.profile_created_by || ""}
          onChange={(val) => handleChange("profile_created_by", val)}
        />

        {/* Profile Visited */}
        <DropDown
          onClick={() => {
            if (!profileVisitedData) {
              profileVisitedRefetch();
            }
          }}
          loading={profileVisitedLoading}
          searchable
          label={formSchema.profileVisited.label}
          name={formSchema.profileVisited.name}
          options={getOptions("profileVisited")}
          value={clientData.profile_visited || ""}
          onChange={(val) => handleChange("profile_visited", val)}
        />

        {/* Client Type */}
        <DropDown
          onClick={() => {
            if (!clientTypeData) {
              clientTypeRefetch();
            }
          }}
          loading={clientTypeLoading}
          searchable
          label={formSchema.clientType.label}
          name={formSchema.clientType.name}
          options={getOptions("clientType")}
          value={clientData.client_type || ""}
          onChange={(val) => handleChange("client_type", val)}
        />

        {/* Client Verification */}
        <DropDown
          onClick={() => {
            if (!clientVerificationData) {
              clientVerificationRefetch();
            }
          }}
          searchable
          loading={clientVerificationLoading}
          label={formSchema.clientVerification.label}
          name={formSchema.clientVerification.name}
          options={getOptions("clientVerification")}
          value={clientData.client_verification || ""}
          onChange={(val) => handleChange("client_verification", val)}
        />

        {/* Contact Person Name */}
        <TextField
          label={formSchema.contactPersonName.label}
          name={formSchema.contactPersonName.name}
          value={clientData.contact_person_name || ""}
          onChange={(e) => handleChange("contact_person_name", e.target.value)}
        />

        {/* Relation with Member */}
        <TextField
          key="relationWithMember"
          label="Relation with Member"
          name="relationWithMember"
          required={false}
          value={String(clientData.relationship_with_member ?? "")}
          onChange={(e) =>
            handleChange("relationship_with_member", e.target.value)
          }
        />

        {/* Contact Person Address */}
        <TextField
          label={formSchema.contactPersonAddress.label}
          name={formSchema.contactPersonAddress.name}
          value={clientData.contact_person_address || ""}
          onChange={(e) =>
            handleChange("contact_person_address", e.target.value)
          }
        />

        {/* Whatsapp Number */}
        <TextField
          label={formSchema.whatsappNumber.label}
          name={formSchema.whatsappNumber.name}
          value={clientData.whatsapp_number || ""}
          onChange={(e) => handleChange("whatsapp_number", e.target.value)}
        />

        {/* Mobile Number */}
        <TextField
          label={formSchema.mobileNumber.label}
          name={formSchema.mobileNumber.name}
          value={clientData.mobile || ""}
          onChange={(e) => handleChange("mobile", e.target.value)}
        />

        {/* Contact Person Email */}
        <TextField
          label={formSchema.contactPersonEmail.label}
          name={formSchema.contactPersonEmail.name}
          value={clientData.contact_person_email || ""}
          onChange={(e) => handleChange("contact_person_email", e.target.value)}
        />

        {/* Client Name */}
        <TextField
          label={formSchema.clientName.label}
          name={formSchema.clientName.name}
          required={formSchema.clientName.required}
          value={clientData.client_name || ""}
          onChange={(e) => handleChange("client_name", e.target.value)}
        />

        {/* Client Mobile */}
        <TextField
          label={formSchema.clientMobile.label}
          name={formSchema.clientMobile.name}
          required={formSchema.clientMobile.required}
          value={clientData.client_mobile || ""}
          onChange={(e) => handleChange("client_mobile", e.target.value)}
        />

        {/* Client Email */}
        <TextField
          label={formSchema.clientEmail.label}
          name={formSchema.clientEmail.name}
          required={formSchema.clientEmail.required}
          value={clientData.client_email || ""}
          onChange={(e) => handleChange("client_email", e.target.value)}
        />

        {/* Profile Comment */}
        <TextField
          label={formSchema.profileComment.label}
          name={formSchema.profileComment.name}
          value={clientData.profile_comment || ""}
          onChange={(e) => handleChange("profile_comment", e.target.value)}
        />

        {/* Gender */}
        <DropDown
          searchable={false}
          label={formSchema.gender.label}
          name={formSchema.gender.name}
          required={formSchema.gender.required}
          options={formSchema.gender.options || []}
          value={clientData.gender || ""}
          onChange={(val) => handleChange("gender", val)}
        />

        {/* Marital Status */}
        <DropDown
          searchable={false}
          label={formSchema.maritalStatus.label}
          name={formSchema.maritalStatus.name}
          required={formSchema.maritalStatus.required}
          options={formSchema.maritalStatus.options || []}
          value={clientData.marital_status || ""}
          onChange={(val) => handleChange("marital_status", val)}
        />

        {/* Religion */}
        <DropDown
          searchable
          label={formSchema.religion.label}
          name={formSchema.religion.name}
          required={formSchema.religion.required}
          options={formSchema.religion.options || []}
          value={clientData.religion_id || ""}
          onChange={(val) => handleChange("religion_id", val)}
        />

        {/* Caste */}
        <DropDown
          key="caste"
          label="Caste"
          name="caste"
          required
          onClick={() => {
            if (!casteData) {
              casteRefetch();
            }
          }}
          loading={casteLoading}
          options={getOptions("caste")}
          value={String(clientData.cast_id ?? "")}
          onChange={(val: string) => handleChange("cast_id", val)}
        />

        {/* SubCaste */}
        <DropDown
          key="subCaste"
          label="Sub Caste"
          onClick={() => {
            if (!subCasteData) {
              subCasteRefetch();
            }
          }}
          loading={subCasteLoading}
          name="subCaste"
          options={getOptions("subCaste")}
          value={String(clientData.sub_caste_id ?? "")}
          onChange={(val: string) => handleChange("sub_caste_id", val)}
        />

        {/* Date of Birth */}
        <DateOfBirthField
          key="dateOfBirth"
          label="Date of Birth"
          value={clientData.date_of_birth}
          onChange={(val: { year: string; month: string; day: string }) =>
            handleChange("date_of_birth", val)
          }
        />

        {/* Time of Birth */}
        <TimeField
          key="timeOfBirth"
          label="Time of Birth"
          value={String(clientData.time_of_birth ?? "")}
          onChange={(val: string) => handleChange("time_of_birth", val)}
        />

        {/* Birth Place */}
        <TextField
          key="birthPlace"
          label="Birth Place"
          name="birthPlace"
          value={String(clientData.birth_place ?? "")}
          onChange={(e) => handleChange("birth_place", e.target.value)}
        />

        {/* Astrologically */}
        <DropDown
          key="astrologically"
          label="Astrologically"
          name="astrologically"
          required={true}
          options={[
            { label: "Manglik", value: "Manglik" },
            { label: "Not Manglik", value: "Not Manglik" },
            { label: "Partially Manglik", value: "Partially Manglik" },
            { label: "Don't Know", value: "Don't Know" },
          ]}
          value={String(clientData.astrologically ?? "")}
          onChange={(val: string) => handleChange("astrologically", val)}
        />

        {/* Gotra */}
        <TextField
          key="gotra"
          label="Gotra"
          name="gotra"
          value={String(clientData.gotra ?? "")}
          onChange={(e) => handleChange("gotra", e.target.value)}
        />

        {/* Height */}
        <DropDown
          key="height"
          label="Height"
          name="height"
          required={true}
          options={[
            { label: "4.5 ft", value: "4.5" },
            { label: "5.0 ft", value: "5.0" },
            { label: "5.5 ft", value: "5.5" },
            { label: "6.0 ft", value: "6.0" },
            { label: "6.5 ft", value: "6.5" },
          ]}
          value={String(clientData.height ?? "")}
          onChange={(val: string) => handleChange("height", val)}
        />

        {/* Weight */}
        <TextField
          key="weight"
          label="Weight"
          name="weight"
          value={String(clientData.weight ?? "")}
          onChange={(e) => handleChange("weight", e.target.value)}
        />

        {/* Complexion */}
        <DropDown
          searchable={true}
          key="complexion"
          label="Complexion"
          name="complexion"
          required={false}
          onClick={() => {
            if (!complexionData) {
              complexionRefetch();
            }
          }}
          loading={complexionLoading}
          options={getOptions("complexion")}
          value={String(clientData.complexion ?? "")}
          onChange={(val: string) => handleChange("complexion", val)}
        />

        {/* Personality */}
        <DropDown
          key="personality"
          label="Personality"
          name="personality"
          onClick={() => {
            if (!personalityData) {
              personalityRefetch();
            }
          }}
          loading={personalityLoading}
          required={false}
          options={getOptions("personality")}
          value={String(clientData.personality ?? "")}
          onChange={(val: string) => handleChange("personality", val)}
        />

        {/* Drinking Habits */}
        <DropDown
          key="drinkingHabits"
          label="Drinking Habits"
          name="drinkingHabits"
          required={false}
          options={[
            { label: "Never", value: "never" },
            { label: "Regularly", value: "regularly" },
            { label: "Seldom", value: "seldom" },
            { label: "Occasionally/Rarely", value: "occasionally/rarely" },
          ]}
          value={String(clientData.drinking_habits ?? "")}
          onChange={(val: string) => handleChange("drinking_habits", val)}
        />

        {/* Eating Habits */}
        <DropDown
          key="eatingHabits"
          label="Eating Habits"
          name="eatingHabits"
          required={false}
          options={[
            { label: "Non-Vegetarian", value: "non-vegetarian" },
            { label: "Vegetarian", value: "vegetarian" },
            { label: "Both", value: "both" },
            { label: "Occasionally Non-Veg", value: "occasionally non-veg" },
            { label: "Eggetarian", value: "eggetarian" },
          ]}
          value={String(clientData.eating_habits ?? "")}
          onChange={(val: string) => handleChange("eating_habits", val)}
        />

        {/* Smoking Habits */}
        <DropDown
          key="smokingHabits"
          label="Smoking Habits"
          name="smokingHabits"
          required={false}
          options={[
            { label: "Never", value: "never" },
            { label: "Regularly", value: "regularly" },
            { label: "Seldom", value: "seldom" },
            { label: "Occasionally/Rarely", value: "occasionally/rarely" },
          ]}
          value={String(clientData.smoking_habits ?? "")}
          onChange={(val: string) => handleChange("smoking_habits", val)}
        />

        {/* Partner Preferences */}
        <TextField
          required={true}
          key="partnerPreferences"
          label="Partner Preferences"
          name="partnerPreferences"
          value={String(clientData.partner_preferences ?? "")}
          onChange={(e) => handleChange("partner_preferences", e.target.value)}
        />

        {/* Open for Other Caste */}
        <DropDown
          searchable={false}
          name="openForOtherCaste"
          key="openForOtherCaste"
          label="Open for other caste"
          value={clientData.open_for_other_caste}
          options={yesNoArr}
          onChange={(val) => handleChange("open_for_other_caste", val)}
        />

        {/* Open for Divorcee */}
        <DropDown
          searchable={false}
          name="openForDivorce"
          key="openForDivorce"
          label="Open for divorcee"
          value={clientData.open_for_divorce}
          options={yesNoArr}
          onChange={(val) => handleChange("open_for_divorce", val)}
        />

        {/* Open for Other State */}
        <DropDown
          searchable={false}
          name="openForOtherState"
          key="openForOtherState"
          label="Open for other state"
          value={clientData.open_for_other_state}
          options={yesNoArr}
          onChange={(val) => handleChange("open_for_other_state", val)}
        />

        {/* Health Screening Consent */}
        <DropDown
          searchable={false}
          name="healthScreeningConsent"
          key="healthScreeningConsent"
          label="Health screening Consent"
          value={clientData.health_screening_consent}
          options={yesNoArr}
          onChange={(val) => handleChange("health_screening_consent", val)}
        />

        {/* Eye Sight */}
        <DropDown
          searchable={false}
          name="eyeSight"
          key="eyeSight"
          label="Eye Sight"
          value={clientData.eye_sight}
          options={formSchema.eyeSight.options}
          onChange={(val) => handleChange("eye_sight", val)}
        />

        {/* Believes in Patri */}
        <DropDown
          searchable={false}
          name="believesInPatri"
          key="believesInPatri"
          label="Believes in Patri"
          value={clientData.believes_in_patri}
          options={yesNoArr}
          onChange={(val) => handleChange("believes_in_patri", val)}
        />

        {/* Native Town */}
        <TextField
          required={true}
          key="nativeTown"
          label="Native Town"
          name="nativeTown"
          value={String(clientData.native_town ?? "")}
          onChange={(e) => handleChange("native_town", e.target.value)}
        />

        {/* Native State */}
        <TextField
          required={true}
          key="nativeState"
          label="Native State"
          name="nativeState"
          value={String(clientData.native_state ?? "")}
          onChange={(e) => handleChange("native_state", e.target.value)}
        />

        {/* Willing to go Abroad */}
        <DropDown
          searchable={false}
          name="willingToGoAbroad"
          key="willingToGoAbroad"
          label="Willing to go Abroad"
          value={clientData.willing_to_go_abroad}
          options={yesNoArr}
          onChange={(val) => handleChange("willing_to_go_abroad", val)}
        />

        {/* Hobbies */}
        <TextField
          required={true}
          key="hobbies"
          label="Hobbies"
          name="hobbies"
          value={String(clientData.hobbies ?? "")}
          onChange={(e) => handleChange("hobbies", e.target.value)}
        />

        {/* Disability */}
        <DropDown
          searchable={false}
          name="disability"
          key="disability"
          label="Disability"
          value={clientData.disability}
          options={yesNoArr}
          onChange={(val) => handleChange("disability", val)}
        />

        {/* NRI Status */}
        <DropDown
          key="nriStatus"
          label="NRI Status"
          name="nriStatus"
          required={false}
          options={yesNoArr}
          value={String(clientData.nri_status ?? "")}
          onChange={(val: string) => handleChange("nri_status", val)}
        />

        {/* Visa */}
        <DropDown
          key="visa"
          label="Visa"
          name="visa"
          required={false}
          options={[
            { label: "H1B", value: "h1b" },
            { label: "Green Card", value: "greenCard" },
          ]}
          value={String(clientData.visa ?? "")}
          onChange={(val: string) => handleChange("visa", val)}
        />

        {/* Details */}
        <div key="details" className="flex flex-col gap-1 col-span-2">
          <label className="text-sm font-medium text-gray-700">Details</label>
          <textarea
            name="details"
            value={String(clientData.details ?? "")}
            onChange={(e) => handleChange("details", e.target.value)}
            className="rounded-xl w-full px-3 py-2 outline-[#465dff] bg-[#F0F3F8] text-[#333] placeholder:text-[#9ba6b7]"
            rows={3}
          />
        </div>

        {/* Client Notes */}
        <div key="clientNotes" className="flex flex-col gap-1 col-span-2">
          <label className="text-sm font-medium text-gray-700">
            Client Notes
          </label>
          <textarea
            name="clientNotes"
            value={String(clientData.client_notes ?? "")}
            onChange={(e) => handleChange("client_notes", e.target.value)}
            className="rounded-xl w-full px-3 py-2 outline-[#465dff] bg-[#F0F3F8] text-[#333] placeholder:text-[#9ba6b7]"
            rows={3}
          />
        </div>
        <div className="flex flex-12 mt-4 cursor-pointer">
          <Button
            onClick={() => {}}
            type="submit"
            className=""
            text="Save All"
          />
        </div>
      </form>
    </div>
  );
};
export default AddClient;
