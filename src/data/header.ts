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
        children: [
          {
            id: "cl-2",
            text: "edit Client",
            link: "/editClient",
            element: lazy(() => import("../pages/ManageClient/AddClient")),
          },
        ],
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
        element: lazy(
          () =>
            import(
              "../pages/ManageClient/ClientAdvanceSearch/ClientAdvanceSearch"
            )
        ),
      },
      {
        id: "mc-4",
        text: "Client Response",
        link: "/client-response",
        element: lazy(
          () => import("../pages/ManageClient/ClientResponse/ClientResponse")
        ),
        children: [
          {
            id: "cr-1",
            text: "Add Client Response",
            link: "/addClient-response",
            element: lazy(
              () =>
                import("../pages/ManageClient/ClientResponse/AddClientResponse")
            ),
          },
          {
            id: "cr-2",
            text: "Edit Client Response",
            link: "/editClient-response",
            element: lazy(
              () =>
                import("../pages/ManageClient/ClientResponse/AddClientResponse")
            ),
          },
        ],
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
        element: lazy(() => import("../pages/ManageLeads/Leads/LeadsList")),
        children: [
          {
            id: "ml-3",
            text: "Add Leads",
            link: "/addLeads",
            element: lazy(
              () => import("../pages/ManageLeads/Leads/AddEditLeads")
            ),
          },
          {
            id: "ml-4",
            text: "Edit Leads",
            link: "/editLeads",
            element: lazy(
              () => import("../pages/ManageLeads/Leads/AddEditLeads")
            ),
          },
        ],
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
      {
        id: "mt-3",
        text: "Edit Task",
        link: "/task-edit",
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
        element: lazy(() => import("../pages/ManageUsers/Users/ManageUsers")),
        children: [
          {
            id: "mu-4",
            text: "Add Manage Users",
            link: "/addManageUsers",
            element: lazy(
              () => import("../pages/ManageUsers/Users/AddEditUsers")
            ),
          },
          {
            id: "mu-5",
            text: "Edit Manage Users",
            link: "/editManageUsers",
            element: lazy(
              () => import("../pages/ManageUsers/Users/AddEditUsers")
            ),
          },
        ],
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
        element: lazy(() => import("../pages/ManageUsers/Roles/Roles")),
        children: [
          {
            id: "ps-1",
            text: "Add Roles",
            link: "/addRoles",
            element: lazy(
              () => import("../pages/ManageUsers/Roles/AddEditRoles")
            ),
          },
          {
            id: "pc-2",
            text: "Edit Roles",
            link: "/editRoles",
            element: lazy(
              () => import("../pages/ManageUsers/Roles/AddEditRoles")
            ),
          },
        ],
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
                text: "Add Profile Source",
                link: "/addProfileSource",
                element: lazy(
                  () =>
                    import(
                      "../pages/Settings/ProfileSource/AddEditProfileSource"
                    )
                ),
              },
              {
                id: "pc-2",
                text: "Edit Profile Source",
                link: "/editProfileSource",
                element: lazy(
                  () =>
                    import(
                      "../pages/Settings/ProfileSource/AddEditProfileSource"
                    )
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
            element: lazy(() => import("../pages/Settings/Income/Income")),
            children: [
              {
                id: "s-1",
                text: "Add Income",
                link: "/addIncome",
                element: lazy(
                  () => import("../pages/Settings/Income/AddEditIncome")
                ),
              },
              {
                id: "s-2",
                text: "Edit Income",
                link: "/editIncome",
                element: lazy(
                  () => import("../pages/Settings/Income/AddEditIncome")
                ),
              },
            ],
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
      {
        id: "as-1",
        text: "CRM Setting",
        link: "/crm-setting",
        element: lazy(
          () => import("../pages/AdminSettings/CRMSetting/CRMSetting")
        ),
        children: [
          {
            id: "crm-1",
            text: "Add CRM Setting",
            link: "/addCRMSetting",
            element: lazy(
              () =>
                import("../pages/AdminSettings/CRMSetting/AddEditCrmSetting")
            ),
          },
          {
            id: "crm-2",
            text: "Edit CRM Setting",
            link: "/editCRMSetting",
            element: lazy(
              () =>
                import("../pages/AdminSettings/CRMSetting/AddEditCrmSetting")
            ),
          },
        ],
      },
      {
        id: "as-2",
        text: "Website Setting",
        link: "/website-setting",
        element: lazy(
          () => import("../pages/AdminSettings/WebsiteSetting/WebsiteSettings")
        ),
      },
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
      {
        id: "as-4",
        text: "Email Template",
        link: "/email-template",
        element: lazy(() => import("../pages/AdminSettings/EmailTemplate")),
      },
      {
        id: "as-5",
        text: "PDF Template",
        link: "/pdf-templte",
        element: lazy(() => import("../pages/AdminSettings/PDFTemplate")),
      },
      {
        id: "as-6",
        text: "Lead Status",
        link: "/lead-status",
        element: lazy(
          () => import("../pages/AdminSettings/LeadStatus/LeadStatus")
        ),
        children: [
          {
            id: "ls-1",
            text: "Add Lead Status",
            link: "/addLeadStatus",
            element: lazy(
              () =>
                import("../pages/AdminSettings/LeadStatus/AddEditLeadStatus")
            ),
          },
          {
            id: "ls-2",
            text: "Edit Lead status",
            link: "/editLeadStatus",
            element: lazy(
              () =>
                import("../pages/AdminSettings/LeadStatus/AddEditLeadStatus")
            ),
          },
        ],
      },
      {
        id: "as-7",
        text: "Membership Plan",
        link: "/membership-plan",
        element: lazy(
          () => import("../pages/AdminSettings/MembershipPlan/MembershipPlan")
        ),
        children: [
          {
            id: "mp-1",
            text: "Add Membership Plan",
            link: "/addMembershipPlan",
            element: lazy(
              () =>
                import(
                  "../pages/AdminSettings/MembershipPlan/AddEditMembershipPlan"
                )
            ),
          },
          {
            id: "mp-2",
            text: "Edit Membership Plan",
            link: "/editMembershipPlan",
            element: lazy(
              () =>
                import(
                  "../pages/AdminSettings/MembershipPlan/AddEditMembershipPlan"
                )
            ),
          },
        ],
      },
      {
        id: "as-8",
        text: "Membership Status",
        link: "/membership-status",
        element: lazy(
          () =>
            import("../pages/AdminSettings/MembershipStatus/MembershipStatus")
        ),
        children: [
          {
            id: "mp-1",
            text: "Add Membership Status",
            link: "/addMembershipStatus",
            element: lazy(
              () =>
                import(
                  "../pages/AdminSettings/MembershipStatus/AddEditMembershipStatus"
                )
            ),
          },
          {
            id: "mp-2",
            text: "Edit Membership Status",
            link: "/editMembershipStatus",
            element: lazy(
              () =>
                import(
                  "../pages/AdminSettings/MembershipStatus/AddEditMembershipStatus"
                )
            ),
          },
        ],
      },
      {
        id: "as-9",
        text: "Membership Type",
        link: "/membership-type",
        element: lazy(
          () => import("../pages/AdminSettings/TaskCategory/TaskCategory")
        ),
        children: [
          {
            id: "mp-1",
            text: "Add Membership Type",
            link: "/addMembershipType",
            element: lazy(
              () =>
                import(
                  "../pages/AdminSettings/MembershipType/AddEditMembershipType"
                )
            ),
          },
          {
            id: "mp-2",
            text: "Edit Membership Type",
            link: "/editMembershipType",
            element: lazy(
              () =>
                import(
                  "../pages/AdminSettings/MembershipType/AddEditMembershipType"
                )
            ),
          },
        ],
      },
      {
        id: "as-10",
        text: "Task Category",
        link: "/task-category",
        element: lazy(
          () => import("../pages/AdminSettings/TaskCategory/TaskCategory")
        ),
        children: [
          {
            id: "mp-1",
            text: "Add Task Category",
            link: "/addTaskCategory",
            element: lazy(
              () =>
                import(
                  "../pages/AdminSettings/TaskCategory/AddEditTaskCategory"
                )
            ),
          },
          {
            id: "mp-2",
            text: "Edit Task Category",
            link: "/editTaskCategory",
            element: lazy(
              () =>
                import(
                  "../pages/AdminSettings/TaskCategory/AddEditTaskCategory"
                )
            ),
          },
        ],
      },
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
      {
        id: "as-12",
        text: "Whatsapp Provider",
        link: "/whatsapp-provider",
        element: lazy(() => import("../pages/AdminSettings/WhatsappProvider")),
      },
      {
        id: "as-13",
        text: "Whatsapp Key",
        link: "/whatsapp-key",
        element: lazy(() => import("../pages/AdminSettings/WhatsappKey")),
      },
      {
        id: "as-14",
        text: "Whatsapp Template",
        link: "/whatsapp-template",
        element: lazy(() => import("../pages/AdminSettings/WhatsappTemplate")),
      },
    ],
  },
];
