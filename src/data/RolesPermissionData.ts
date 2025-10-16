import { Permission } from "../types/manageUser";

export const permissionData: Permission[] = [
  {
    module: "Manage Users",
    permissions: {
      view: false,
      add: false,
      edit: false,
      delete: false,
      logout: false,
    },
  },
  {
    module: "Manage Clients",
    permissions: {
      view: false,
      view_all: false,
      add: false,
      edit: false,
      edit_all: false,
      view_pdf: false,
      interaction: false,
    },
  },
  {
    module: "Manage Shortlist Profile",
    permissions: {
      view: false,
      view_all: false,
      view_approved_rejected: false,
      view_all_approved_rejected: false,
      add_to_shortlist: false,
      approve_or_reject_profiles: false,
    },
  },
  {
    module: "Manage Leads",
    permissions: {
      view: false,
      view_all: false,
      add: false,
      edit: false,
      edit_all: false,
      delete: false,
      delete_all: false,
    },
  },
  {
    module: "Manage Tasks",
    permissions: {
      view: false,
      view_all: false,
      add: false,
      edit: false,
      edit_all: false,
      delete: false,
    },
  },
  {
    module: "Manage Tasks Follow UP",
    permissions: {
      view: false,
      add: false,
      edit: false,
      delete: false,
    },
  },
  {
    module: "Manage Lead Follow UP",
    permissions: {
      view: false,
      add: false,
      edit: false,
      delete: false,
    },
  },
  {
    module: "Manage Send Profiles",
    permissions: {
      view_profile_sent: false,
      send_profile_without_approval: false,
    },
  },
  {
    module: "Manage Roles",
    permissions: {
      view: false,
      add: false,
      edit: false,
      delete: false,
    },
  },
  {
    module: "Manage Report",
    permissions: {
      activity_log: false,
      attendance: false,
      staff: false,
      client: false,
      payment: false,
    },
  },
  {
    module: "Manage Setting",
    permissions: {
      view: false,
      add: false,
      edit: false,
      delete: false,
    },
  },
  {
    module: "Manage Payment",
    permissions: {
      view: false,
      edit: false,
      delete: false,
    },
  },
];
