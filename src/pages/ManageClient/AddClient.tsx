import React, { use, useState } from "react";
import {
  addClientFormClientType,
  clientVerificationOptions,
  complexionOptions,
  defaultClientData,
  personalityOptions,
} from "../../data/ClientForm";
import { TextField } from "../../component/form/TextField";
import Button from "../../component/form/Button";
import { DropDown } from "../../component/form/SearchableDropdown";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddClientApi, fetchSourcedFrom } from "../../api/client";
import LoadingPage from "../Loading/Loading";
import { getLabelValue } from "../../util/ClientUtils";
import {
  fetchClientFormModule,
  fetchClientModuleById,
} from "../../api/clientFormModule";
import { ClientModuleField } from "../../types/clientModule";
import { staticClientFormTab } from "../../types/form";
import TextArea from "../../component/form/TextArea";
import { fetchProfileSource } from "../../api/profileSource";
import { fetchCasteAPI } from "../../api/caste";
import { fetchSubCasteAPI } from "../../api/subCaste";
import { fetchManageUserAPI } from "../../api/manageUser";
import { DateOfBirthField } from "../../component/form/DateField";

const AddClient = () => {
  const [clientData, setClientData] = useState(defaultClientData);
  const [activeTab, setActiveTab] = useState<number>(1);

  const queryClient = useQueryClient();

  const {
    data: formItemData,
    error: formItemError,
    isLoading: formItemLoading,
    refetch: formItemFromRefetch,
  } = useQuery({
    queryKey: ["form-item-list", activeTab],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey;
      return fetchClientModuleById(id);
    },
  });

  const { data: clientFormModuleData, isLoading: clientFromModuleLoading } =
    useQuery({
      queryKey: ["client-form-module-list"],
      queryFn: fetchClientFormModule,
      retry: false,
    });

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
    queryKey: ["subCaste"], // unique cache key
    queryFn: fetchSubCasteAPI,
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
      // case "personality":
      //   return personalityLoading;
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
      case "complexion":
        break;
      case "personality":
        break;
      default:
        return false;
    }
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

  if (formItemLoading || clientFromModuleLoading) {
    return <LoadingPage />;
  }

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

  const getFormItems = (item: ClientModuleField) => {
    switch (item.field_type) {
      case "text":
        return (
          <TextField
            key={item.field_name}
            label={item.display_name}
            name={item.field_name}
            required={item.required === 1}
            value={""}
            onChange={(e) => handleChange(item.field_name, e.target.value)}
          />
        );
      case "dropdown":
        return (
          <DropDown
            onClick={() => {
              fetchData(item.field_name);
            }}
            loading={getLoading(item.field_name)}
            searchable
            label={item.display_name}
            name={item.field_name}
            required={item.required === 1}
            options={getOptions(item.field_name)}
            value={clientData.sourced_from_id}
            onChange={(val) => handleChange(item.field_name, val)}
          />
        );
      case "textArea":
        return (
          <div key={item.field_name} className="col-span-4">
            <TextArea
              label={item.display_name}
              name={item.field_name}
              required={item.required === 1}
              value={clientData.sourced_from_id}
              onChange={(val) => handleChange(item.field_name, val)}
            />
          </div>
        );
      case "datepicker":
        return (
          <DateOfBirthField
            value=""
            label={item.field_name}
            onChange={() => {}}
          />
        );
    }
  };

  const handdledFromItemData = formItemData ? formItemData.client_forms : [];
  const handleclientFromModule: any[] = clientFormModuleData
    ? clientFormModuleData.data
    : [];

  return (
    <div className="bg-white rounded-xl shadow-md m-1">
      <div className="flex p-4">
        {handleclientFromModule.map((moduleItem: staticClientFormTab) => (
          <Button
            disabled={true}
            type="clientFormBtn"
            className={`px-4 py-2 mr-2 text-sm font-medium text-white ${
              activeTab === moduleItem.id ? "bg-[#161D27]" : "bg-[#a71634]"
            } rounded-lg`}
            key={moduleItem.name}
            text={moduleItem.name}
          />
        ))}
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-3 p-6">
        {handdledFromItemData.map((formItem: ClientModuleField) =>
          getFormItems(formItem)
        )}
        <div className="flex-1 mt-4 cursor-pointer">
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
