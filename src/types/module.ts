export interface ModuleProps {
  slug_key: string;
  name: string;
  permission: string[];
  id?: number;
}

export interface UpdateModuleProps {
  created_at: string;
  id: number;
  name: string;
  permission: string;
  slug: string;
  updated_at: string;
}
