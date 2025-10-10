import React, { useEffect, useRef, useState } from "react";
import {
  addClientFormClientType,
  astrologicalOptions,
  clientVerificationOptions,
  complexionOptions,
  drinkingHabitOptions,
  eatingHabitOptions,
  eyeSightOptions,
  genderOptions,
  heightOptions,
  maritialStatusOptions,
  personalityOptions,
  smokingHabitsOptions,
  yesNoOptions,
} from "../../data/ClientForm";
import { TextField } from "../../component/form/TextField";
import Button from "../../component/form/Button";
import { DropDown } from "../../component/form/SearchableDropdown";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddClientApi, fetchSourcedFrom } from "../../api/client";
import LoadingPage from "../Loading/Loading";
import { getLabelValue } from "../../util/ClientUtils";
import { fetchClientFormModule } from "../../api/clientFormModule";
import { staticClientFormTab } from "../../types/form";
import TextArea from "../../component/form/TextArea";
import { fetchCasteAPI } from "../../api/caste";
import { fetchSubCasteAPI } from "../../api/subCaste";
import { fetchManageUserAPI } from "../../api/manageUser";
import { DateOfBirthField } from "../../component/form/DateField";
import { fetchState } from "../../api/state";
import { fetchVisaAPI } from "../../api/visa";
import { ClientForm } from "../../types/module";
import { fetchCity } from "../../api/city";
import { fetchReligion } from "../../api/religion";
import { FormSubmitItemProps } from "../../types/client";

const MemoizedTextField = React.memo(TextField);
const MemoizedDropDown = React.memo(DropDown);
const MemoizedTextArea = React.memo(TextArea);
const MemoizedDateField = React.memo(DateOfBirthField);

const AddClient = () => {
  const [clientData, setClientData] = useState<ClientForm[]>([]);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [formValues, setFormValues] = useState<any>();

  const queryClient = useQueryClient();

  const { data: clientFormModuleData, isLoading: clientFromModuleLoading } =
    useQuery({
      queryKey: ["client-form-module-list"],
      queryFn: fetchClientFormModule,
      retry: false,
    });

  useEffect(() => {
    if (clientFormModuleData?.data?.length) {
      const forms = clientFormModuleData.data[activeTab].client_forms;
      setClientData(forms);

      // Initialize form values from API data
      const initialValues: Record<string, any> = {};
      forms.forEach((item: ClientForm) => {
        initialValues[item.field_name] = {
          value: item.value || "",
          id: item.id,
        };
      });
      setFormValues(initialValues);
    }
  }, [clientFormModuleData, activeTab]);

  const {
    data: sourcedData,
    error: sourcedError,
    isLoading: sourcedLoading,
    refetch: refetchSource,
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
    queryKey: ["manage-user-list"], // unique cache key
    queryFn: fetchManageUserAPI,
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
    queryKey: ["caste-list"], // unique cache key
    queryFn: fetchCasteAPI,
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
    queryKey: ["sub-caste-list"], // unique cache key
    queryFn: fetchSubCasteAPI,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: false,
    enabled: false,
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
    refetchOnWindowFocus: false,
    enabled: false,
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
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const {
    data: religionData,
    error: religionError,
    isLoading: religionLoading,
    refetch: religionRefetch,
  } = useQuery({
    queryKey: ["religion-list"], // unique cache key
    queryFn: fetchReligion,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const {
    data: visaData,
    error: visaError,
    isLoading: visaLoading,
    refetch: visaRefetch,
  } = useQuery({
    queryKey: ["visa-list"], // unique cache key
    queryFn: fetchVisaAPI,
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
      case "sourced_from":
        arr = getLabelValue(sourcedData ? sourcedData.data : []);
        break;
      case "profile_handled":
        arr = getLabelValue(profileHandledData ? profileHandledData.data : []);
        break;
      case "profile_created":
        arr = getLabelValue(profileHandledData ? profileHandledData.data : []);
        break;
      case "profile_visited":
        arr = getLabelValue(profileHandledData ? profileHandledData.data : []);
        break;
      case "client_type":
        arr = addClientFormClientType;
        break;
      case "client_verification":
        arr = clientVerificationOptions;
        break;
      case "caste":
        arr = getLabelValue(casteData ? casteData.data : []);
        break;
      case "sub_caste":
        arr = getLabelValue(subCasteData ? subCasteData.data : []);
        break;
      case "complexion":
        arr = complexionOptions;
        break;
      case "personality":
        arr = personalityOptions;
        break;
      case "gender":
        arr = genderOptions;
        break;
      case "marital_status":
        arr = maritialStatusOptions;
        break;
      case "astrologically":
        arr = astrologicalOptions;
        break;
      case "height":
        arr = heightOptions;
        break;
      case "drinking_habits":
        arr = drinkingHabitOptions;
        break;
      case "eating_habits":
        arr = eatingHabitOptions;
        break;
      case "smoking_habits":
        arr = smokingHabitsOptions;
        break;
      case "open_for_other_caste":
      case "open_for_divorcee":
      case "health_screening_consent":
      case "believes_in_patri":
      case "willing_to_go-abroad":
      case "open_for_other_state":
      case "nri_status":
      case "disability":
        arr = yesNoOptions;
        break;
      case "eye_sight":
        arr = eyeSightOptions;
        break;
      case "native_state":
        arr = getLabelValue(stateData ? stateData.data : []);
        break;
      case "native_town":
        arr = getLabelValue(CityData ? CityData.data : []);
        break;
      case "visa":
        arr = getLabelValue(visaData ? visaData.data : []);
        break;
      case "religion":
        arr = getLabelValue(religionData ? religionData.data : []);
        break;
      default:
        arr = [];
    }
    return arr;
  };

  const getLoading = (fieldName: string) => {
    switch (fieldName) {
      case "sourced_from":
        return sourcedLoading;
      case "profile_handled":
        return profileHandledLoading;
      case "profile_created":
        return profileHandledLoading;
      case "profile_visited":
        return profileHandledLoading;
      case "caste":
        return casteLoading;
      case "sub_caste":
        return subCasteLoading;
      case "native_state":
        return stateLoading;
      case "visa":
        return visaLoading;
      case "native_town":
        return CityLoading;
      case "religion":
        return religionLoading;
      default:
        return false;
    }
  };

  const fetchData = (fieldName: string) => {
    switch (fieldName) {
      case "sourced_from":
        refetchSource();
        break;
      case "profile_handled":
        profileHandledRefetch();
        break;
      case "profile_created":
        refetchSource();
        break;
      case "profile_visited":
        refetchSource();
        break;
      case "caste":
        casteRefetch();
        break;
      case "sub_caste":
        subCasteRefetch();
        break;
      case "native_state":
        stateRefetch();
        break;
      case "native_town":
        CityRefetch();
        break;
      case "visa":
        visaRefetch();
        break;
      case "religion":
        religionRefetch();
        break;
      default:
        return false;
    }
  };

  if (clientFromModuleLoading) {
    return <LoadingPage />;
  }

  const handleChange = (name: string, value: any) => {
    const jsonObj = { ...formValues[name], value: value };
    setFormValues((prev) => ({ ...prev, [name]: jsonObj }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formValues);
    const formData: FormSubmitItemProps[] = [];
    Object.keys(formValues).map((item) => {
      console.log(formValues[item]);
      formData.push({
        field_id: formValues[item].id,
        value: formValues[item].value,
      });
    });
    const finalObj = {
      form_fields: formData,
    };
    mutation.mutate(finalObj);
  };

  const getFormItems = (item: ClientForm, index: number) => {
    switch (item.field_type) {
      case "text":
        return (
          <MemoizedTextField
            key={item.field_name}
            label={item.display_name}
            name={item.field_name}
            required={item.required === 1}
            value={formValues[item.field_name].value || ""}
            onChange={(e) => handleChange(item.field_name, e.target.value)}
          />
        );
      case "dropdown":
        return (
          <MemoizedDropDown
            key={item.field_name}
            onClick={() => {
              fetchData(item.field_name);
            }}
            loading={getLoading(item.field_name)}
            searchable
            label={item.display_name}
            name={item.field_name}
            required={item.required === 1}
            options={getOptions(item.field_name)}
            value={formValues[item.field_name].value || ""}
            onChange={(val) => handleChange(item.field_name, val)}
          />
        );
      case "textArea":
        return (
          <div key={item.field_name} className="col-span-4">
            <MemoizedTextArea
              label={item.display_name}
              name={item.field_name}
              required={item.required === 1}
              value={formValues[item.field_name].value || ""}
              onChange={(val) => handleChange(item.field_name, val)}
            />
          </div>
        );
      case "datepicker":
        return (
          <MemoizedDateField
            key={item.field_name}
            label={item.display_name}
            value={formValues[item.field_name].value || ""}
            onChange={(val) => handleChange(item.field_name, val)}
          />
        );
    }
  };

  const handleClientFromModule: any[] = clientFormModuleData
    ? clientFormModuleData.data
    : [];

  console.log(clientData, " <>? ");

  return (
    <div className="bg-white rounded-xl shadow-md m-1">
      <div className="flex p-4">
        {handleClientFromModule.map(
          (moduleItem: staticClientFormTab, moduleIndex: number) => (
            <Button
              disabled={true}
              type="clientFormBtn"
              className={`px-4 py-2 mr-2 text-sm font-medium text-white ${
                activeTab === moduleIndex ? "bg-[#161D27]" : "bg-[#a71634]"
              } rounded-lg`}
              key={moduleItem.name}
              text={moduleItem.name}
            />
          )
        )}
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-3 p-6">
        {clientData.map(
          (formItem, index: number) =>
            formItem.status === "active" && getFormItems(formItem, index)
        )}
        <div className="flex-1 mt-4 cursor-pointer">
          <Button
            onClick={() => {}}
            type="submit"
            className=""
            text={`Save ${1}`}
          />
        </div>
      </form>
    </div>
  );
};
export default AddClient;
