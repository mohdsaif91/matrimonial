import { GroupedPermission } from "../pages/ManageUsers/Roles/AddEditRoles";

export interface RoleProps {
  id?: string;
  name: string;
  role_for: string;
  status: string;
  permissions: number[] | GroupedPermission[];
}

export interface PermissionIdProps {
  id: number;
  name: string;
}
