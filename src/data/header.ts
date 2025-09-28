import { Children, lazy } from "react";

export const headerLinks = [
  {
    id: 0,
    text: "Dashboard",
    link: "/dashboard",
    element: lazy(() => import("../pages/Dashboard")),
    children: [],
  },
  {
    id: 1,
    text: "Manage client",
    link: "/manage-client",
    children: [
      {
        id: "mc-1",
        text: "Client List",
        link: "/client-list",
        element: lazy(() => import("../pages/ManageClient/ClientList")),
      },
      {
        id: "mc-2",
        text: "Add Client",
        link: "/add-client",
        element: lazy(() => import("../pages/ManageClient/AddClient")),
      },
      {
        id: "mc-3",
        text: "Advance Search",
        link: "/advance-search",
        element: lazy(() => import("../pages/ManageClient/AdvanceSearch")),
      },
      {
        id: "mc-4",
        text: "Client Response",
        link: "/client-response",
        element: lazy(() => import("../pages/ManageClient/ClientResponse")),
      },
      {
        id: "mc-5",
        text: "Membership Expired",
        link: "/membership-expired",
        element: lazy(() => import("../pages/ManageClient/MembershipExpired")),
      },
      {
        id: "mc-6",
        text: "Manage Shortlist",
        children: [
          {
            id: "ms-1",
            text: "Shortlist Profile",
            link: "/shortlist-profile",
            element: lazy(
              () => import("../pages/ManageShortlist/ShortlistProfiles")
            ),
          },
          {
            id: "ms-2",
            text: "Approve Shortlist",
            link: "/approve-shortlist",
            element: lazy(
              () => import("../pages/ManageShortlist/ApprovedShortlist")
            ),
          },
          {
            id: "ms-3",
            text: "Reject Shortlist",
            link: "/reject-shortlist",
            element: lazy(
              () => import("../pages/ManageShortlist/RejectShortlist")
            ),
          },
        ],
      },
    ],
  },
  {
    id: 3,
    text: "Manage Leads",
    link: "/manage-leads",
    children: [
      {
        id: "ml-1",
        text: "Manage Leads",
        link: "/manage-leads",
        element: lazy(() => import("../pages/ManageLeads/ManageLeads")),
      },
      {
        id: "ml-2",
        text: "Leads Follow",
        link: "/leads-follow",
        element: lazy(() => import("../pages/ManageLeads/LeadsFollowUp")),
      },
    ],
  },
  {
    id: 4,
    text: "Manage Task",
    link: "/manage-task",
    children: [
      {
        id: "mt-1",
        text: "Task List",
        link: "/task-list",
        element: lazy(() => import("../pages/ManageTask/TaskList")),
      },
      {
        id: "mt-2",
        text: "Add Task",
        link: "/task-add",
        element: lazy(() => import("../pages/ManageTask/TaskAdd")),
      },
    ],
  },

  ,
  {
    id: 7,
    text: "Manage Users",
    link: "/manage-users",
    children: [
      {
        id: "mu-1",
        text: "Manage Users",
        link: "/manage-users",
        element: lazy(() => import("../pages/ManageUsers/ManageUsers")),
      },
      {
        id: "mu-2",
        text: "Manage Attendence",
        link: "/manage-attendence",
        element: lazy(() => import("../pages/ManageUsers/ManageAttendence")),
      },
      {
        id: "mu-3",
        text: "Manage Roles",
        link: "/manage-roles",
        element: lazy(() => import("../pages/ManageUsers/ManageRoles")),
      },
    ],
  },
  {
    id: 10,
    text: "More",
    children: [
      {
        id: "m-1",
        text: "Manage report",
        children: [
          {
            id: "mr-1",
            text: "Attendance Report",
            link: "/attendance-report",
            element: lazy(
              () => import("../pages/ManageReport/AttendenceReport")
            ),
          },
          {
            id: "mr-2",
            text: "Staff Report",
            link: "/staff-report",
            element: lazy(() => import("../pages/ManageReport/StaffReport")),
          },
          {
            id: "mr-3",
            text: "Client Report",
            link: "/client-report",
            element: lazy(() => import("../pages/ManageReport/ClientReport")),
          },
          {
            id: "mr-4",
            text: "Payment Report",
            link: "/payment-report",
            element: lazy(() => import("../pages/ManageReport/PaymentReport")),
          },
        ],
      },
      {
        id: "m-2",
        text: "Activity Log",
        link: "/activity-log",
        element: lazy(() => import("../pages/ActivityLog")),
        children: [],
      },
      {
        id: 8,
        text: "Settings",
        children: [
          {
            id: "s-1",
            text: "Profile Source",
            link: "/profile-source",
            element: lazy(
              () => import("../pages/Settings/ProfileSource/ProfileSource")
            ),
            children: [
              {
                id: "ps-1",
                text: "Add Premium college",
                link: "/addProfileSource",
                element: lazy(
                  () =>
                    import("../pages/Settings/PremiumCollege/AddPremiumCollege")
                ),
              },
              {
                id: "pc-2",
                text: "Edit Premium College",
                link: "/editPremiumCollege",
                element: lazy(
                  () =>
                    import("../pages/Settings/PremiumCollege/AddPremiumCollege")
                ),
              },
            ],
          },
          {
            id: "s-2",
            text: "Premium College",
            link: "/premium-college",
            element: lazy(
              () => import("../pages/Settings/PremiumCollege/PremiumCollege")
            ),
            children: [
              {
                id: "pc-1",
                text: "Add Premium college",
                link: "/addPremiumCollege",
                element: lazy(
                  () =>
                    import("../pages/Settings/PremiumCollege/AddPremiumCollege")
                ),
              },
              {
                id: "pc-2",
                text: "Edit Premium College",
                link: "/editPremiumCollege",
                element: lazy(
                  () =>
                    import("../pages/Settings/PremiumCollege/AddPremiumCollege")
                ),
              },
            ],
          },
          {
            id: "s-3",
            text: "Visa",
            link: "/visa",
            element: lazy(() => import("../pages/Settings/Visa/Visa")),
            children: [
              {
                id: "q-1",
                text: "Visa",
                link: "/addVisa",
                element: lazy(() => import("../pages/Settings/Visa/AddVisa")),
              },
              {
                id: "q-2",
                text: "Edit visa",
                link: "/editVisa",
                element: lazy(() => import("../pages/Settings/Visa/AddVisa")),
              },
            ],
          },
          {
            id: "s-4",
            text: "Religion",
            link: "/religion",
            element: lazy(() => import("../pages/Settings/Religion/Religion")),
            children: [
              {
                id: "r-1",
                text: "Add Religion",
                link: "/addReligion",
                element: lazy(
                  () => import("../pages/Settings/Religion/AddReligion")
                ),
              },
              {
                id: "r-2",
                text: "Edit Religion",
                link: "/editReligion",
                element: lazy(
                  () => import("../pages/Settings/Religion/AddReligion")
                ),
              },
            ],
          },
          {
            id: "s-5",
            text: "Qualification",
            link: "/qualification",
            element: lazy(
              () => import("../pages/Settings/Qulification/Qulification")
            ),
            children: [
              {
                id: "q-1",
                text: "Qualification",
                link: "/addQualification",
                element: lazy(
                  () =>
                    import("../pages/Settings/Qulification/AddQualification")
                ),
              },
              {
                id: "q-2",
                text: "Edit Qulification",
                link: "/editQulification",
                element: lazy(
                  () =>
                    import("../pages/Settings/Qulification/AddQualification")
                ),
              },
            ],
          },
          {
            id: "s-6",
            text: "Occupation",
            link: "/occupation",
            element: lazy(
              () => import("../pages/Settings/Occuption/Occupation")
            ),
            children: [
              {
                id: "q-1",
                text: "Occuption",
                link: "/addOccupation",
                element: lazy(
                  () => import("../pages/Settings/Occuption/AddOccupation")
                ),
              },
              {
                id: "q-2",
                text: "Edit Occuption",
                link: "/editOccupation",
                element: lazy(
                  () => import("../pages/Settings/Occuption/AddOccupation")
                ),
              },
              {
                id: "q-2",
                text: "Add Sub Occuption",
                link: "/addSubOccupation",
                element: lazy(
                  () => import("../pages/Settings/Occuption/AddSubOccupation")
                ),
              },
            ],
          },
          {
            id: "s-7",
            text: "Caste",
            link: "/caste",
            element: lazy(() => import("../pages/Settings/Caste/Caste")),
            children: [
              {
                id: "c-1",
                text: "Caste",
                link: "/addCaste",
                element: lazy(() => import("../pages/Settings/Caste/AddCaste")),
              },
              {
                id: "c-2",
                text: "Edit Caste",
                link: "/editCaste",
                element: lazy(() => import("../pages/Settings/Caste/AddCaste")),
              },
              {
                id: "c-3",
                text: "Add Sub Caste",
                link: "/addSubCaste",
                element: lazy(
                  () => import("../pages/Settings/Caste/AddSubCaste")
                ),
              },
            ],
          },
          {
            id: "s-8",
            text: "Country",
            link: "/country",
            element: lazy(() => import("../pages/Settings/Country/Country")),
            children: [
              {
                id: "c-1",
                text: "Add Country",
                link: "/addCountry",
                element: lazy(
                  () => import("../pages/Settings/Country/AddCountry")
                ),
              },
              {
                id: "c-2",
                text: "Edit Country",
                link: "/editCountry",
                element: lazy(
                  () => import("../pages/Settings/Country/AddCountry")
                ),
              },
            ],
          },
          {
            id: "s-9",
            text: "State",
            link: "/state",
            element: lazy(() => import("../pages/Settings/State/State")),
            children: [
              {
                id: "s-1",
                text: "Add State",
                link: "/addState",
                element: lazy(() => import("../pages/Settings/State/AddState")),
              },
              {
                id: "s-2",
                text: "Edit State",
                link: "/editState",
                element: lazy(() => import("../pages/Settings/State/AddState")),
              },
            ],
          },
          {
            id: "s-10",
            text: "City",
            link: "/city",
            element: lazy(() => import("../pages/Settings/City/City")),
            children: [
              {
                id: "s-1",
                text: "Add State",
                link: "/addCity",
                element: lazy(() => import("../pages/Settings/City/AddCity")),
              },
              {
                id: "s-2",
                text: "Edit City",
                link: "/editCity",
                element: lazy(() => import("../pages/Settings/City/AddCity")),
              },
            ],
          },
          {
            id: "s-11",
            text: "Income",
            link: "/income",
            element: lazy(() => import("../pages/Settings/Income")),
          },
          {
            id: "s-12",
            text: "Whatsapp Login",
            link: "/whatsapp-login",
            element: lazy(() => import("../pages/Settings/WhatspaaLogin")),
          },
        ],
      },
    ],
  },
  {
    id: 9,
    text: "Admin Settings",
    link: "/admin-settings",
    children: [
      { id: "as-1", text: "CRM Setting", link: "/crm-setting" },
      { id: "as-2", text: "Website Setting", link: "/website-setting" },
      {
        id: "as-3",
        text: "Module",
        link: "/module",
        element: lazy(() => import("../pages/AdminSettings/Module/Module")),
        children: [
          {
            id: "m-1",
            text: "Add Module",
            link: "/addModule",
            element: lazy(
              () => import("../pages/AdminSettings/Module/AddModule")
            ),
          },
          {
            id: "m-2",
            text: "Edit Module",
            link: "/editModule",
            element: lazy(
              () => import("../pages/AdminSettings/Module/AddModule")
            ),
          },
        ],
      },
      {
        id: "as-15",
        text: "Client Form Module",
        link: "/clientFormModule",
        element: lazy(
          () =>
            import("../pages/AdminSettings/ClientFormModule/ClientFormModule")
        ),
        children: [
          {
            id: "m-1",
            text: "Add Client Form Module",
            link: "/addClientFormModule",
            element: lazy(
              () =>
                import(
                  "../pages/AdminSettings/ClientFormModule/AddClientFormModule"
                )
            ),
          },
          {
            id: "m-2",
            text: "Edit Client Form Module",
            link: "/editClientFormModule",
            element: lazy(
              () =>
                import(
                  "../pages/AdminSettings/ClientFormModule/AddClientFormModule"
                )
            ),
          },
        ],
      },
      { id: "as-4", text: "Email Template", link: "/email-template" },
      { id: "as-5", text: "PDF Template", link: "/pdf-templte" },
      { id: "as-6", text: "Lead Status", link: "/lead-status" },
      { id: "as-7", text: "Membership Plan", link: "/membership-plan" },
      { id: "as-8", text: "Membership Status", link: "/membership-status" },
      { id: "as-9", text: "Membership Type", link: "/membership-type" },
      { id: "as-10", text: "Task Category", link: "/task-category" },
      {
        id: "as-11",
        text: "Client Form",
        link: "/client-form",
        element: lazy(
          () => import("../pages/AdminSettings/ClientFormPages/ClientForm")
        ),
        children: [
          {
            id: "cf-1",
            text: "Add Client Forms",
            link: "/addClientFormItem",
            element: lazy(
              () =>
                import(
                  "../pages/AdminSettings/ClientFormPages/AddClientFormItem"
                )
            ),
          },
          {
            id: "cf-2",
            text: "Edit Client Forms",
            link: "/editClientFormItem",
            element: lazy(
              () =>
                import(
                  "../pages/AdminSettings/ClientFormPages/AddClientFormItem"
                )
            ),
          },
        ],
      },
      { id: "as-12", text: "Whatsapp Provider", link: "/whatsapp-provider" },
      { id: "as-13", text: "Whatsapp Key", link: "/whatsapp-key" },
      { id: "as-14", text: "Whatsapp Template", link: "/whatsapp-template" },
    ],
  },
];
