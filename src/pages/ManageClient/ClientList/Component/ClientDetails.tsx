import { ClientDetailsprops } from "../../../../types/client";
import { safeDate, safeValue } from "../../../../util/ClientUtils";
import { SharedProfileCard } from "./SharedProfileCard";

export default function ClientDetails({ data, onClose }: ClientDetailsprops) {
  const profileImage = Array.isArray(data.client_documents)
    ? data.client_documents
    : [];

  const clientData = data.items;
  const sharedProfiles = data.shared_profiles ?? [];

  return (
    <div className="bg-white w-auto max-w-7xl rounded-lg shadow-xl max-h-[90vh] overflow-y p-5">
      <div className="flex flex-row flex-wrap w-full mb-3">
        {profileImage.map((imgItem) => (
          <img
            className="w-[200px] h-[120px] mr-5"
            src={imgItem.file_path}
            alt={imgItem.file_type}
          />
        ))}
      </div>
      <h2 className="text-red-600 font-semibold text-lg mb-3">
        Basic Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <InfoBox label="Profile Id" value={safeValue(clientData?.profileId)} />
        <InfoBox
          label="Name of the Contact Person"
          value={safeValue(clientData?.name_of_the_contact_person?.value)}
        />
        <InfoBox
          label="Relation with Member"
          value={safeValue(clientData?.relation_with_member?.value)}
        />
        <InfoBox
          label="Contact Person Address"
          value={safeValue(clientData?.complete_residence_address?.value)}
        />

        <InfoBox
          label="Whatsapp Number"
          value={safeValue(clientData?.whatsapp_number?.value)}
        />
        <InfoBox
          label="Mobile Number"
          value={safeValue(clientData?.mobile_number?.value)}
        />
        <InfoBox
          label="Contact Person Email"
          value={safeValue(clientData?.contact_person_email?.value)}
        />
        <InfoBox
          label="Client Name"
          value={safeValue(clientData?.client_name?.value)}
        />

        <InfoBox
          label="Client Mobile"
          value={safeValue(clientData?.client_mobile?.value)}
        />
        <InfoBox
          label="Client Email"
          value={safeValue(clientData?.client_email?.value)}
        />
        <InfoBox label="Profile Comment" value="-" />
      </div>

      {/* SECTION: Registration Information */}
      <h2 className="text-red-600 font-semibold text-lg my-4">
        Registration Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <InfoBox
          label="Member Status"
          value={safeValue(clientData?.member_status?.value)}
        />
        <InfoBox
          label="Registration Date"
          value={safeDate(clientData?.registration_date?.value, "DD-MM-YYYY")}
        />
        <InfoBox label="Created Date" value="NEED TO GET" />
        <InfoBox
          label="Expiry Date"
          value={safeDate(clientData?.expiry_date?.value, "DD-MM-YYYY")}
        />

        <InfoBox
          label="Package Type"
          value={safeValue(clientData?.package_type?.value)}
        />
        <InfoBox
          label="Membership Profile Status"
          value={safeValue(clientData?.member_status?.value)}
        />
        <InfoBox label="Member Status Change Comment" value="-" />
      </div>

      {/* SECTION: Profile Information */}
      <h2 className="text-red-600 font-semibold text-lg my-4">
        Profile Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <InfoBox
          label="Sourced From"
          value={safeValue(clientData?.sourced_from?.value)}
        />
        <InfoBox
          label="Profile Handled"
          value={safeValue(clientData?.profile_handled?.value)}
        />
        <InfoBox
          label="Profile Created"
          value={safeValue(clientData?.profile_created?.value)}
        />
        <InfoBox
          label="Profile Handled By"
          value={safeValue(clientData?.profile_handled?.value)}
        />
        <InfoBox
          label="Profile Visited"
          value={safeValue(clientData?.profile_visited?.value)}
        />
      </div>
      {/* SECTION: Personal Information */}
      <h2 className="text-red-600 font-semibold text-lg my-4">
        Personal Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <InfoBox
          label="Marital Status"
          value={safeValue(clientData?.marital_status?.value)}
        />
        <InfoBox
          label="Details"
          value={safeValue(clientData?.marital_status?.value)}
        />

        <InfoBox label="Gender" value={safeValue(clientData?.gender?.value)} />

        <InfoBox
          label="Date of Birth"
          value={safeDate(clientData?.date_of_birth?.value, "DD-MM-YYYY")}
        />

        <InfoBox
          label="Time of Birth"
          value={safeDate(clientData?.time_of_birth?.value, "HH:mm")}
        />

        <InfoBox
          label="Birth of Place"
          value={safeValue(clientData?.birth_of_place?.value)}
        />

        <InfoBox label="Height" value={safeValue(clientData?.height?.value)} />

        <InfoBox label="Weight" value={safeValue(clientData?.weight?.value)} />

        <InfoBox
          label="Religion"
          value={safeValue(clientData?.religion?.value)}
        />

        <InfoBox label="Caste" value={safeValue(clientData?.caste?.value)} />

        <InfoBox
          label="Sub Caste"
          value={safeValue(clientData?.sub_caste?.value)}
        />

        <InfoBox
          label="Native Town"
          value={safeValue(clientData?.native_town?.value)}
        />

        <InfoBox
          label="Astrologically"
          value={safeValue(clientData?.astrologically?.value)}
        />

        <InfoBox label="Gotra" value={safeValue(clientData?.gotra?.value)} />

        <InfoBox
          label="Complexion"
          value={safeValue(clientData?.complexion?.value)}
        />

        <InfoBox
          label="Personality"
          value={safeValue(clientData?.personality?.value)}
        />

        <InfoBox
          label="Eye Sight"
          value={safeValue(clientData?.eye_sight?.value)}
        />

        <InfoBox
          label="Drinking Habits"
          value={safeValue(clientData?.drinking_habits?.value)}
        />

        <InfoBox
          label="Eating Habits"
          value={safeValue(clientData?.eating_habits?.value)}
        />

        <InfoBox
          label="Smoking Habits"
          value={safeValue(clientData?.smoking_habits?.value)}
        />

        <InfoBox
          label="Open for other caste"
          value={safeValue(clientData?.open_for_other_caste?.value)}
        />

        <InfoBox
          label="Caste Details"
          value={safeValue(clientData?.caste?.value)}
        />

        <InfoBox
          label="Open for other state"
          value={safeValue(clientData?.open_for_other_state?.value)}
        />

        <InfoBox
          label="State Details"
          value={safeValue(clientData?.native_state?.value)}
        />

        <InfoBox
          label="Health screening Consent"
          value={safeValue(clientData?.health_screening_consent?.value)}
        />
        <InfoBox
          label="Believes in Patri"
          value={safeValue(clientData?.believes_in_patri?.value)}
        />
        <InfoBox
          label="Partner Preferences"
          value={safeValue(clientData?.partner_preferences?.value)}
        />
        <InfoBox
          label="Open for divorcee"
          value={safeValue(clientData?.open_for_divorcee?.value)}
        />

        <InfoBox
          label="Native State"
          value={safeValue(clientData?.native_state?.value)}
        />
        <InfoBox
          label="Willing to go Abroad"
          value={safeValue(clientData?.willing_to_go_abroad?.value)}
        />
        <InfoBox
          label="Hobbies"
          value={safeValue(clientData?.hobbies?.value)}
        />
        <InfoBox
          label="NRI Status"
          value={safeValue(clientData?.nri_status?.value)}
        />

        <InfoBox label="Visa" value={safeValue(clientData?.visa?.value)} />
        <InfoBox
          label="Disability Description"
          value={safeValue(clientData?.disability?.value)}
        />
        <InfoBox
          label="Client Notes"
          value={safeValue(clientData?.client_notes?.value)}
        />
        <InfoBox
          label="Client Verification"
          value={safeValue(clientData?.client_verification?.value)}
        />
      </div>
      <h2 className="text-red-600 font-semibold text-lg my-4">
        Education & Qualification
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <InfoBox
          label="Schooling And Additional Qualification"
          value={safeValue(
            clientData?.schooling_and_additional_qualification?.value
          )}
        />
        <InfoBox
          label="Premium College"
          value={safeValue(clientData?.premium_college?.value)}
        />
        <InfoBox
          label="Highest Qualification"
          value={safeValue(clientData?.highest_qualification?.value)}
        />
        <InfoBox
          label="Residence"
          value={safeValue(clientData?.residence?.value)}
        />
      </div>
      <h2 className="text-red-600 font-semibold text-lg my-4">
        Work & Financial Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <InfoBox
          label="Complete Residence Address"
          value={safeValue(clientData?.complete_residence_address?.value)}
        />
        <InfoBox
          label="Earn In Currency"
          value={safeValue(clientData?.earn_in_currency?.value)}
        />
        <InfoBox
          label="Personal Income"
          value={safeValue(clientData?.personal_income?.value)}
        />
        <InfoBox
          label="Occupation"
          value={safeValue(clientData?.occupation?.value)}
        />

        <InfoBox
          label="Occupation Details"
          value={safeValue(clientData?.occupation_details?.value)}
        />
        <InfoBox
          label="Occupation Address"
          value={safeValue(clientData?.ocupation_address?.value)}
        />
      </div>
      <h2 className="text-red-600 font-semibold text-lg my-4">
        Family Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <InfoBox
          label="Father Name"
          value={safeValue(clientData?.father_name?.value)}
        />
        <InfoBox
          label="Father's Qualification"
          value={safeValue(clientData?.fathers_qualification?.value)}
        />
        <InfoBox
          label="Father's Occupation"
          value={safeValue(clientData?.fathers_occupation?.value)}
        />
        <InfoBox
          label="Father Occupation Details"
          value={safeValue(clientData?.father_occupation_details?.value)}
        />
        <InfoBox
          label="Father and Mother Anniversary date"
          value={safeDate(
            clientData?.father_and_mother_anniversary_date?.value,
            "DD-MM-YYYY"
          )}
        />
        <InfoBox
          label="Mother's Name"
          value={safeValue(clientData?.mothers_name?.value)}
        />
        <InfoBox
          label="Mother's Qualification"
          value={safeValue(clientData?.mothers_qualification?.value)}
        />
        <InfoBox
          label="Mother's Occupation"
          value={safeValue(clientData?.value)}
        />

        <InfoBox
          label="Mother Occupation Details"
          value={safeValue(clientData?.mothers_occupation?.value)}
        />
        <InfoBox
          label="Family Type"
          value={safeValue(clientData?.family_type?.value)}
        />
        <InfoBox
          label="Vehicle Details"
          value={safeValue(clientData?.vehicle_details?.value)}
        />
        <InfoBox
          label="Annual Family Income"
          value={safeValue(clientData?.annual_family_income?.value)}
        />

        <InfoBox
          label="From Marriage Budget"
          value={safeValue(clientData?.from_marriage_budget?.value)}
        />
        <InfoBox
          label="To Marriage Budget"
          value={safeValue(clientData?.to_marriage_budget?.value)}
        />
        <InfoBox
          label="Extended Family Details"
          value={safeValue(clientData?.extended_family_details?.value)}
        />
      </div>
      <h2 className="text-red-600 font-semibold text-lg my-4">
        Siblings Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <InfoBox label="Sibling Name" value={safeValue(clientData?.value)} />
        <InfoBox label="Sibling Age" value={safeValue(clientData?.value)} />
        <InfoBox
          label="Sibling Relation"
          value={safeValue(clientData?.value)}
        />
        <InfoBox
          label="Sibling Marital Status"
          value={safeValue(clientData?.value)}
        />

        <InfoBox
          label="Sibling Profession"
          value={safeValue(clientData?.value)}
        />
        <InfoBox
          label="Sibling Qualification"
          value={safeValue(clientData?.value)}
        />
        <InfoBox label="Sibling Details" value={safeValue(clientData?.value)} />
        <InfoBox label="-" value={safeValue(clientData?.value)} />
      </div>
      <h2 className="text-red-600 font-semibold text-lg my-4">
        Contact Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <InfoBox
          label="House Status"
          value={safeValue(clientData?.house_status?.value)}
        />
        <InfoBox
          label="Residing Country"
          value={safeValue(clientData?.residential_country?.value)}
        />
        <InfoBox
          label="Residential State"
          value={safeValue(clientData?.residential_state?.value)}
        />
        <InfoBox
          label="Residential City"
          value={safeValue(clientData?.residential_city?.value)}
        />

        <InfoBox
          label="Mother's Mobile Number"
          value={safeValue(clientData?.mothers_mobile_number?.value)}
        />
      </div>
      <h2 className="text-red-600 font-semibold text-lg my-4">
        Client's profiles sent to
      </h2>
      <div className="mb-5 flex flex-wrap">
        {sharedProfiles.map((sharedProfilesItems) => (
          <SharedProfileCard data={sharedProfilesItems} />
        ))}
      </div>
    </div>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-100 border border-gray-300 rounded-lg p-3">
      <p className="text-gray-500 text-sm">{label} :</p>
      <p className="text-gray-800 font-medium">{value}</p>
    </div>
  );
}
