export interface ManageUserProps {
  id?: number;
  name: string;
  email: string;
  phone: string;
  gender: string;
  status: string;
  role_id: string;
  password: string;
  password_confirmation: string;
}

export interface Permission {
  module: string;
  permissions: {
    [key: string]: boolean;
  };
}

interface GroupedPermission {
  group: string;
  permissions: Permission[];
}

export interface PermissionFormData {
  roleName: string;
  roleFor: string;
  status: string;
  permission: GroupedPermission[];
}
