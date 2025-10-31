import { Children, lazy } from "react";

export const headerLinks = [
  {
    id: 0,
    hide: false,
    text: "Dashboard",
    link: "/dashboard",
    element: lazy(() => import("../pages/Dashboard")),
    children: [],
  },
  {
    id: 1,
    hide: false,
    text: "Manage client",
    link: "/manage-client",
    children: [
      {
        id: "mc-1",
        hide: false,
        text: "Client List",
        link: "/client-list",
        element: lazy(() => import("../pages/ManageClient/ClientList")),
        children: [
          {
            id: "cl-2",
            hide: false,
            text: "edit Client",
            link: "/editClient",
            element: lazy(() => import("../pages/ManageClient/AddClient")),
          },
        ],
      },
      {
        id: "mc-2",
        hide: false,
        text: "Add Client",
        link: "/add-client",
        element: lazy(() => import("../pages/ManageClient/AddClient")),
      },
      {
        id: "mc-3",
        hide: false,
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
        hide: false,
        text: "Client Response",
        link: "/client-response",
        element: lazy(
          () => import("../pages/ManageClient/ClientResponse/ClientResponse")
        ),
        children: [
          {
            id: "cr-1",
            hide: false,
            text: "Add Client Response",
            link: "/addClient-response",
            element: lazy(
              () =>
                import("../pages/ManageClient/ClientResponse/AddClientResponse")
            ),
          },
          {
            id: "cr-2",
            hide: false,
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
        hide: false,
        text: "Membership Expired",
        link: "/membership-expired",
        element: lazy(() => import("../pages/ManageClient/MembershipExpired")),
      },
      {
        id: "mc-6",
        hide: false,
        text: "Manage Shortlist",
        children: [
          {
            id: "ms-1",
            hide: false,
            text: "Shortlist Profile",
            link: "/shortlist-profile",
            element: lazy(
              () =>
                import("../pages/ManageClient/ManageShortlist/ManageShortlist")
            ),
          },
          {
            id: "ms-2",
            hide: false,
            text: "Approve Shortlist",
            link: "/approve-shortlist",
            element: lazy(
              () =>
                import(
                  "../pages/ManageClient/ManageShortlist/ApprovedShortlist"
                )
            ),
          },
          {
            id: "ms-3",
            hide: false,
            text: "Reject Shortlist",
            link: "/reject-shortlist",
            element: lazy(
              () =>
                import("../pages/ManageClient/ManageShortlist/RejectShortlist")
            ),
          },
        ],
      },
      {
        id: "mc-7",
        text: "Search Profile",
        link: "/search-profile",
        hide: true,
        element: lazy(() => import("../pages/ManageClient/SearchClient")),
      },
    ],
  },
  {
    id: 3,
    hide: false,
    text: "Manage Leads",
    link: "/manage-leads",
    children: [
      {
        id: "ml-1",
        hide: false,
        text: "Manage Leads",
        link: "/manage-leads",
        element: lazy(() => import("../pages/ManageLeads/Leads/LeadsList")),
        children: [
          {
            id: "ml-3",
            hide: false,
            text: "Add Leads",
            link: "/addLeads",
            element: lazy(
              () => import("../pages/ManageLeads/Leads/AddEditLeads")
            ),
          },
          {
            id: "ml-4",
            hide: false,
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
        hide: false,
        text: "Leads Follow",
        link: "/leads-follow",
        element: lazy(() => import("../pages/ManageLeads/LeadsFollowUp")),
      },
    ],
  },
  {
    id: 4,
    hide: false,
    text: "Manage Task",
    link: "/manage-task",
    children: [
      {
        id: "mt-1",
        hide: false,
        text: "Task List",
        link: "/task-list",
        element: lazy(() => import("../pages/ManageTask/TaskList")),
      },
      {
        id: "mt-2",
        hide: false,
        text: "Add Task",
        link: "/task-add",
        element: lazy(() => import("../pages/ManageTask/TaskAdd")),
      },
      {
        id: "mt-3",
        hide: false,
        text: "Edit Task",
        link: "/task-edit",
        element: lazy(() => import("../pages/ManageTask/TaskAdd")),
      },
    ],
  },

  ,
  {
    id: 7,
    hide: false,
    text: "Manage Users",
    link: "/manage-users",
    children: [
      {
        id: "mu-1",
        hide: false,
        text: "Manage Users",
        link: "/manage-users",
        element: lazy(() => import("../pages/ManageUsers/Users/ManageUsers")),
        children: [
          {
            id: "mu-4",
            hide: false,
            text: "Add Manage Users",
            link: "/addManageUsers",
            element: lazy(
              () => import("../pages/ManageUsers/Users/AddEditUsers")
            ),
          },
          {
            id: "mu-5",
            hide: false,
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
        hide: false,
        text: "Manage Attendence",
        link: "/manage-attendence",
        element: lazy(() => import("../pages/ManageUsers/ManageAttendence")),
      },
      {
        id: "mu-3",
        hide: false,
        text: "Manage Roles",
        link: "/manage-roles",
        element: lazy(() => import("../pages/ManageUsers/Roles/Roles")),
        children: [
          {
            id: "ps-1",
            hide: false,
            text: "Add Roles",
            link: "/addRoles",
            element: lazy(
              () => import("../pages/ManageUsers/Roles/AddEditRoles")
            ),
          },
          {
            id: "pc-2",
            hide: false,
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
    hide: false,
    text: "More",
    children: [
      {
        id: "m-1",
        hide: false,
        text: "Manage report",
        children: [
          {
            id: "mr-1",
            hide: false,
            text: "Attendance Report",
            link: "/attendance-report",
            element: lazy(
              () => import("../pages/ManageReport/AttendenceReport")
            ),
          },
          {
            id: "mr-2",
            hide: false,
            text: "Staff Report",
            link: "/staff-report",
            element: lazy(() => import("../pages/ManageReport/StaffReport")),
          },
          {
            id: "mr-3",
            hide: false,
            text: "Client Report",
            link: "/client-report",
            element: lazy(() => import("../pages/ManageReport/ClientReport")),
          },
          {
            id: "mr-4",
            hide: false,
            text: "Payment Report",
            link: "/payment-report",
            element: lazy(() => import("../pages/ManageReport/PaymentReport")),
          },
        ],
      },
      {
        id: "m-2",
        hide: false,
        text: "Activity Log",
        link: "/activity-log",
        element: lazy(() => import("../pages/ActivityLog")),
        children: [],
      },
      {
        id: 8,
        hide: false,
        text: "Settings",
        children: [
          {
            id: "s-1",
            hide: false,
            text: "Profile Source",
            link: "/profile-source",
            element: lazy(
              () => import("../pages/Settings/ProfileSource/ProfileSource")
            ),
            children: [
              {
                id: "ps-1",
                hide: false,
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
                hide: false,
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
            hide: false,
            text: "Premium College",
            link: "/premium-college",
            element: lazy(
              () => import("../pages/Settings/PremiumCollege/PremiumCollege")
            ),
            children: [
              {
                id: "pc-1",
                hide: false,
                text: "Add Premium college",
                link: "/addPremiumCollege",
                element: lazy(
                  () =>
                    import("../pages/Settings/PremiumCollege/AddPremiumCollege")
                ),
              },
              {
                id: "pc-2",
                hide: false,
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
            hide: false,
            text: "Visa",
            link: "/visa",
            element: lazy(() => import("../pages/Settings/Visa/Visa")),
            children: [
              {
                id: "q-1",
                hide: false,
                text: "Visa",
                link: "/addVisa",
                element: lazy(() => import("../pages/Settings/Visa/AddVisa")),
              },
              {
                id: "q-2",
                hide: false,
                text: "Edit visa",
                link: "/editVisa",
                element: lazy(() => import("../pages/Settings/Visa/AddVisa")),
              },
            ],
          },
          {
            id: "s-4",
            hide: false,
            text: "Religion",
            link: "/religion",
            element: lazy(() => import("../pages/Settings/Religion/Religion")),
            children: [
              {
                id: "r-1",
                hide: false,
                text: "Add Religion",
                link: "/addReligion",
                element: lazy(
                  () => import("../pages/Settings/Religion/AddReligion")
                ),
              },
              {
                id: "r-2",
                hide: false,
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
            hide: false,
            text: "Qualification",
            link: "/qualification",
            element: lazy(
              () => import("../pages/Settings/Qulification/Qulification")
            ),
            children: [
              {
                id: "q-1",
                hide: false,
                text: "Qualification",
                link: "/addQualification",
                element: lazy(
                  () =>
                    import("../pages/Settings/Qulification/AddQualification")
                ),
              },
              {
                id: "q-2",
                hide: false,
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
            hide: false,
            text: "Occupation",
            link: "/occupation",
            element: lazy(
              () => import("../pages/Settings/Occuption/Occupation")
            ),
            children: [
              {
                id: "q-1",
                hide: false,
                text: "Occuption",
                link: "/addOccupation",
                element: lazy(
                  () => import("../pages/Settings/Occuption/AddOccupation")
                ),
              },
              {
                id: "q-2",
                hide: false,
                text: "Edit Occuption",
                link: "/editOccupation",
                element: lazy(
                  () => import("../pages/Settings/Occuption/AddOccupation")
                ),
              },
              {
                id: "q-2",
                hide: false,
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
            hide: false,
            text: "Caste",
            link: "/caste",
            element: lazy(() => import("../pages/Settings/Caste/Caste")),
            children: [
              {
                id: "c-1",
                hide: false,
                text: "Caste",
                link: "/addCaste",
                element: lazy(() => import("../pages/Settings/Caste/AddCaste")),
              },
              {
                id: "c-2",
                hide: false,
                text: "Edit Caste",
                link: "/editCaste",
                element: lazy(() => import("../pages/Settings/Caste/AddCaste")),
              },
              {
                id: "c-3",
                hide: false,
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
            hide: false,
            text: "Country",
            link: "/country",
            element: lazy(() => import("../pages/Settings/Country/Country")),
            children: [
              {
                id: "c-1",
                hide: false,
                text: "Add Country",
                link: "/addCountry",
                element: lazy(
                  () => import("../pages/Settings/Country/AddCountry")
                ),
              },
              {
                id: "c-2",
                hide: false,
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
            hide: false,
            text: "State",
            link: "/state",
            element: lazy(() => import("../pages/Settings/State/State")),
            children: [
              {
                id: "s-1",
                hide: false,
                text: "Add State",
                link: "/addState",
                element: lazy(() => import("../pages/Settings/State/AddState")),
              },
              {
                id: "s-2",
                hide: false,
                text: "Edit State",
                link: "/editState",
                element: lazy(() => import("../pages/Settings/State/AddState")),
              },
            ],
          },
          {
            id: "s-10",
            hide: false,
            text: "City",
            link: "/city",
            element: lazy(() => import("../pages/Settings/City/City")),
            children: [
              {
                id: "s-1",
                hide: false,
                text: "Add State",
                link: "/addCity",
                element: lazy(() => import("../pages/Settings/City/AddCity")),
              },
              {
                id: "s-2",
                hide: false,
                text: "Edit City",
                link: "/editCity",
                element: lazy(() => import("../pages/Settings/City/AddCity")),
              },
            ],
          },
          {
            id: "s-11",
            hide: false,
            text: "Income",
            link: "/income",
            element: lazy(() => import("../pages/Settings/Income/Income")),
            children: [
              {
                id: "s-1",
                hide: false,
                text: "Add Income",
                link: "/addIncome",
                element: lazy(
                  () => import("../pages/Settings/Income/AddEditIncome")
                ),
              },
              {
                id: "s-2",
                hide: false,
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
            hide: false,
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
    hide: false,
    text: "Admin Settings",
    link: "/admin-settings",
    children: [
      {
        id: "as-1",
        hide: false,
        text: "CRM Setting",
        link: "/crm-setting",
        element: lazy(
          () => import("../pages/AdminSettings/CRMSetting/CRMSetting")
        ),
        children: [
          {
            id: "crm-1",
            hide: false,
            text: "Add CRM Setting",
            link: "/addCRMSetting",
            element: lazy(
              () =>
                import("../pages/AdminSettings/CRMSetting/AddEditCrmSetting")
            ),
          },
          {
            id: "crm-2",
            hide: false,
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
        hide: false,
        text: "Website Setting",
        link: "/website-setting",
        element: lazy(
          () => import("../pages/AdminSettings/WebsiteSetting/WebsiteSettings")
        ),
        children: [
          {
            id: "ws-1",
            hide: false,
            text: "Add Website Setting",
            link: "/addWebsiteSetting",
            element: lazy(
              () =>
                import(
                  "../pages/AdminSettings/WebsiteSetting/AddEditWebsiteSetting"
                )
            ),
          },
          {
            id: "ws-2",
            hide: false,
            text: "Edit Website Setting",
            link: "/editWebsiteSetting",
            element: lazy(
              () =>
                import(
                  "../pages/AdminSettings/WebsiteSetting/AddEditWebsiteSetting"
                )
            ),
          },
        ],
      },
      {
        id: "as-3",
        hide: false,
        text: "Module",
        link: "/module",
        element: lazy(() => import("../pages/AdminSettings/Module/Module")),
        children: [
          {
            id: "m-1",
            hide: false,
            text: "Add Module",
            link: "/addModule",
            element: lazy(
              () => import("../pages/AdminSettings/Module/AddModule")
            ),
          },
          {
            id: "m-2",
            hide: false,
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
        hide: false,
        text: "Client Form Module",
        link: "/clientFormModule",
        element: lazy(
          () =>
            import("../pages/AdminSettings/ClientFormModule/ClientFormModule")
        ),
        children: [
          {
            id: "m-1",
            hide: false,
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
            hide: false,
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
        hide: false,
        text: "Email Template",
        link: "/email-template",
        element: lazy(
          () => import("../pages/AdminSettings/EmailTemplate/EmailTemplate")
        ),
        children: [
          {
            id: "et-1",
            hide: false,
            text: "Add Email Template",
            link: "/addEmailTemplate",
            element: lazy(
              () =>
                import(
                  "../pages/AdminSettings/EmailTemplate/AddEditEmailTemplate"
                )
            ),
          },
          {
            id: "et-2",
            hide: false,
            text: "Edit Email Template",
            link: "/editEmailTemplate",
            element: lazy(
              () =>
                import(
                  "../pages/AdminSettings/EmailTemplate/AddEditEmailTemplate"
                )
            ),
          },
        ],
      },
      {
        id: "as-5",
        hide: false,
        text: "PDF Template",
        link: "/pdf-templte",
        element: lazy(
          () => import("../pages/AdminSettings/PdfTemplate/PDFTemplate")
        ),
        children: [
          {
            id: "pt-1",
            hide: false,
            text: "Add PDF Template",
            link: "/addPDFTemplate",
            element: lazy(
              () =>
                import("../pages/AdminSettings/PdfTemplate/AddEditPDFTemplate")
            ),
          },
          {
            id: "pt-2",
            hide: false,
            text: "Edit PDf Template",
            link: "/editPDFTemplate",
            element: lazy(
              () =>
                import("../pages/AdminSettings/PdfTemplate/AddEditPDFTemplate")
            ),
          },
        ],
      },
      {
        id: "as-6",
        hide: false,
        text: "Lead Status",
        link: "/lead-status",
        element: lazy(
          () => import("../pages/AdminSettings/LeadStatus/LeadStatus")
        ),
        children: [
          {
            id: "ls-1",
            hide: false,
            text: "Add Lead Status",
            link: "/addLeadStatus",
            element: lazy(
              () =>
                import("../pages/AdminSettings/LeadStatus/AddEditLeadStatus")
            ),
          },
          {
            id: "ls-2",
            hide: false,
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
        hide: false,
        text: "Membership Plan",
        link: "/membership-plan",
        element: lazy(
          () => import("../pages/AdminSettings/MembershipPlan/MembershipPlan")
        ),
        children: [
          {
            id: "mp-1",
            hide: false,
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
            hide: false,
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
        hide: false,
        text: "Membership Status",
        link: "/membership-status",
        element: lazy(
          () =>
            import("../pages/AdminSettings/MembershipStatus/MembershipStatus")
        ),
        children: [
          {
            id: "mp-1",
            hide: false,
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
            hide: false,
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
        hide: false,
        text: "Membership Type",
        link: "/membership-type",
        element: lazy(
          () => import("../pages/AdminSettings/MembershipType/MembershipType")
        ),
        children: [
          {
            id: "mp-1",
            hide: false,
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
            hide: false,
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
        hide: false,
        text: "Task Category",
        link: "/task-category",
        element: lazy(
          () => import("../pages/AdminSettings/TaskCategory/TaskCategory")
        ),
        children: [
          {
            id: "mp-1",
            hide: false,
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
            hide: false,
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
        hide: false,
        text: "Client Form",
        link: "/client-form",
        element: lazy(
          () => import("../pages/AdminSettings/ClientFormPages/ClientForm")
        ),
        children: [
          {
            id: "cf-1",
            hide: false,
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
            hide: false,
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
        hide: false,
        text: "Whatsapp Provider",
        link: "/whatsapp-provider",
        element: lazy(
          () =>
            import("../pages/AdminSettings/WhatsAppProvider/WhatsappProvider")
        ),
        children: [
          {
            id: "wp-1",
            hide: false,
            text: "Add WhatsApp Provider",
            link: "/addWhatsAppProvider",
            element: lazy(
              () =>
                import(
                  "../pages/AdminSettings/WhatsAppProvider/AddEditWhatsAppProvider"
                )
            ),
          },
          {
            id: "wp-2",
            hide: false,
            text: "Edit WhatsApp Provider",
            link: "/editWhatsAppProvider",
            element: lazy(
              () =>
                import(
                  "../pages/AdminSettings/WhatsAppProvider/AddEditWhatsAppProvider"
                )
            ),
          },
        ],
      },
      {
        id: "as-13",
        hide: false,
        text: "Whatsapp Key",
        link: "/whatsapp-key",
        element: lazy(
          () => import("../pages/AdminSettings/WhatsappKey/WhatsappKey")
        ),
        children: [
          {
            id: "wk-1",
            hide: false,
            text: "Add WhatsApp Key",
            link: "/addWhatsAppKey",
            element: lazy(
              () =>
                import("../pages/AdminSettings/WhatsappKey/AddEditWhatsAppKey")
            ),
          },
          {
            id: "wk-2",
            hide: false,
            text: "Edit WhatsApp Key",
            link: "/editWhatsAppKey",
            element: lazy(
              () =>
                import("../pages/AdminSettings/WhatsappKey/AddEditWhatsAppKey")
            ),
          },
        ],
      },
      {
        id: "as-14",
        hide: false,
        text: "Whatsapp Template",
        link: "/whatsapp-template",
        element: lazy(() => import("../pages/AdminSettings/WhatsappTemplate")),
      },
    ],
  },
];
