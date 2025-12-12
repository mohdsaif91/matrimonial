import React, { useRef } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import Button from "../../../component/form/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { Permission, PermissionFormData } from "../../../types/manageUser";
import { BackNavigationButton } from "../../../component/BackNavigationButton";
import { addRole, getPermissionData, updateRole } from "../../../service/roles";
import Checkbox from "../../../component/form/Checkbox";
import Table from "../../../component/table/Table";
import { TextField } from "../../../component/form/TextField";
import { DropDown } from "../../../component/form/SearchableDropdown";
import { statusOptions } from "../../../data/ClientForm";
import LoadingPage from "../../Loading/Loading";
import { PermissionIdProps, RoleProps } from "../../../types/roles";

export interface GroupedPermission {
  group: string;
  permissions: Permission[];
}

const initialPermissionFormData = {
  name: "",
  role_for: "",
  status: "",
  permissions: [],
};

function AddEditRoles() {
  const [permissionFormData, setPermissionFormData] = useState<RoleProps>({
    ...initialPermissionFormData,
  });
  const [permissionArr, setPermissionArr] = useState<GroupedPermission[]>([
    {
      group: "",
      permissions: [],
    },
  ]);

  const permisionRef = useRef([]);

  const queryClient = useQueryClient();
  const { state } = useLocation();
  const navigate = useNavigate();

  const { data: permissionData, isLoading: permissionLoading } = useQuery({
    queryKey: ["permission-list"],
    queryFn: getPermissionData,
    retry: false,
  });

  useEffect(() => {
    if (state && state.data) {
      const updatedPermissionArr =
        Array.isArray(state.data.permissions) &&
        state.data.permissions.map((m: PermissionIdProps) => m.id);
      setPermissionFormData({
        ...state.data,
        permissions: updatedPermissionArr,
      });
    }
    if (permisionRef.current !== permissionData && permissionData) {
      const handledPermissionData = Array.isArray(permissionData)
        ? permissionData
        : [];
      const groupedArray: GroupedPermission[] = Object.values(
        handledPermissionData.reduce((acc, item) => {
          if (!acc[item.group]) {
            acc[item.group] = { group: item.group, permissions: [] };
          }
          acc[item.group].permissions.push(item);
          return acc;
        }, {} as Record<string, GroupedPermission>)
      );
      setPermissionArr(groupedArray);
    }
  }, [permissionData]);

  const handleChange = (name: string, value: string) => {
    setPermissionFormData((prev) => ({ ...prev, [name]: value }));
  };

  const mutation = useMutation({
    mutationFn: addRole,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["role-list"] });
      toast("Successfully added Role");
      const authUserData = data.data.permissions.map((m) => m.name);
      sessionStorage.setItem(
        "authUser",
        JSON.stringify({ ...data.data, permissions: authUserData })
      );
      setPermissionFormData({ ...initialPermissionFormData });
      // alert(`Successfully added form item! ${data}`);
    },
    onError: (error: any) => {
      console.error("❌ Error adding Role", error);
      toast(error.response?.data?.message || "Failed to add Role");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateRole,
    onSuccess: (data) => {
      const authUserData = data.data.permissions.map((m) => m.name);
      sessionStorage.setItem(
        "authUser",
        JSON.stringify({ ...data.data, permissions: authUserData })
      );
      queryClient.invalidateQueries({ queryKey: ["role-list"] });
      toast("Successfully Updated Role");
      setPermissionFormData({ ...initialPermissionFormData });
      navigate("/manage-roles");
    },
    onError: (error: any) => {
      console.error("❌ Error updating Role:", error);
      toast(error.response?.data?.message || "Failed to Update Role");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (state && state.data) {
      updateMutation.mutate(permissionFormData);
    } else {
      mutation.mutate(permissionFormData);
    }
  };

  if (permissionLoading) {
    return <LoadingPage />;
  }

  const columns: ColumnDef<Permission>[] = [
    {
      accessorKey: "group",
      header: "Module",
      cell: ({ row }) => {
        const value = row.original ? row.original.group : "";
        return (
          <span className="font-medium capitalize">
            {typeof value === "string" && value.split("_").join(" ")}
          </span>
        );
      },
    },
    {
      id: "permissions",
      header: "Permissions",
      cell: ({ row }) => {
        const arr = Array.isArray(row.original.permissions)
          ? row.original.permissions
          : [];
        return (
          <div className="flex flex-wrap gap-3">
            {arr.map((permissionItem) => {
              return (
                <Checkbox
                  id={permissionItem.id}
                  checked={permissionFormData.permissions.includes(
                    permissionItem.id
                  )}
                  key={permissionItem.id}
                  label={permissionItem.name
                    .split("_")
                    .join(" ")
                    .split(".")
                    .join(" ")}
                  onChange={(checked) => {
                    if (checked) {
                      setPermissionFormData({
                        ...permissionFormData,
                        permissions: [
                          ...permissionFormData.permissions,
                          permissionItem.id,
                        ],
                      });
                    } else {
                      const updatedPermissionArr =
                        permissionFormData.permissions.filter(
                          (f) => f != permissionItem.id
                        );
                      setPermissionFormData({
                        ...permissionFormData,
                        permissions: [...updatedPermissionArr],
                      });
                    }
                  }}
                />
              );
            })}
          </div>
        );
      },
    },
  ];

  console.log(permissionArr);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white p-6 rounded-xl shadow-md"
    >
      <ToastContainer />
      <h2 className="text-xl font-semibold mb-4">
        {state && state.data ? "Edit" : "ADD"} Roles
      </h2>
      <div className="grid grid-cols-3 md:grid-cols-3 gap-3 gap-y-5">
        <TextField
          label="Name"
          name="name"
          value={permissionFormData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
        />
        <TextField
          label="Role For"
          name="role_for"
          value={permissionFormData.role_for}
          onChange={(e) => handleChange("role_for", e.target.value)}
          required
        />

        <DropDown
          searchable={false}
          label="Status"
          name="module"
          options={statusOptions}
          value={permissionFormData.status}
          onChange={(val) => handleChange("status", val)}
        />
      </div>
      <Table borderX columns={columns} data={permissionArr || []} />

      <div className="flex">
        <Button
          text={`${state && state.data ? "Update" : "Save"} Roles`}
          type="submit"
          loading={mutation.isPending || updateMutation.isPending}
          className="mt-6 px-6 py-2 bg-[#465dff] text-white rounded-xl hover:bg-blue-600 flex align-middle"
        />
        <BackNavigationButton className="ml-2 mt-6 px-6 py-2  text-white rounded-xl hover:bg-blue-600 flex align-middle" />
      </div>
    </form>
  );
}

export default AddEditRoles;
