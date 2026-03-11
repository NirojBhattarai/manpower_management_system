import { IoSettingsOutline } from "react-icons/io5";
import { TfiWorld } from "react-icons/tfi";
import {
  NotepadText,
  Group,
  Receipt,
  BanknoteArrowDown,
  BanknoteArrowUp,
  ScrollText,
  BaggageClaim,
  ClipboardCheck,
} from "lucide-react";
import { BsRecycle } from "react-icons/bs";
import {
  FiClipboard,
  FiCheckCircle,
  FiUser,
  FiMessageSquare,
  FiFileText,
  FiActivity,
  FiGlobe,
  FiInfo,
  FiShield,
  FiCheckSquare,
  FiDollarSign,
  FiShoppingCart,
  FiTrendingUp,
  FiZap,
  FiBook,
} from "react-icons/fi";
import { MdFactCheck, MdSecurity } from "react-icons/md";
import { IoTicketOutline } from "react-icons/io5";
import { LiaIndustrySolid, LiaUserShieldSolid } from "react-icons/lia";
import { PiBuildingOffice } from "react-icons/pi";
import { FaUsersGear } from "react-icons/fa6";
import {
  LuLayoutDashboard,
  LuShieldCheck,
  LuFileCog,
  LuPresentation,
  LuHospital,
  LuLayers,
  LuLayers3,
  LuBriefcase,
  LuBadgeDollarSign,
  LuBadgeCheck,
  LuUser,
  LuKeyRound,
  LuBanknote,
} from "react-icons/lu";
import { PATH } from "@/constant/path";
import { IconType } from "react-icons";

export interface MenuItem {
  id: string;
  icon?: IconType;
  link?: string;
  label: string;
  children?: MenuItem[];
}

export const mainMenuItems: MenuItem[] = [
  {
    id: "dashboard",
    icon: LuLayoutDashboard,
    label: "Dashboard",
    link: PATH.dashboard.dashboard,
  },
  {
    id: "country",
    icon: TfiWorld,
    label: "Country",
    link: PATH.country.index,
  },
  {
    id: "recruitment-process",
    icon: BsRecycle,
    label: "Recruitment Process",

    children: [
      {
        id: "company",
        icon: PiBuildingOffice,
        label: "Company",
        link: PATH.company.index,
      },
      {
        id: "preApprovalDofe",
        icon: FiCheckCircle,
        label: "Pre-approval DOFE",
        link: PATH.preApprovalDofe.index,
      },
      {
        id: "Job Vacancy",
        icon: FiClipboard,
        label: "Job Vacancy",
        link: PATH.jobVacancy.index,
      },
      {
        id: "candidate",
        icon: FiUser,
        label: "Candidate",
        link: PATH.candidate.index,
      },
      {
        id: "interview",
        icon: FiMessageSquare,
        label: "Interview",
        link: PATH.interview.index,
      },
      {
        id: "job-offer",
        icon: FiFileText,
        label: "Job Offer",
        link: PATH.jobOffer.index,
      },
      {
        id: "medical",
        icon: FiActivity,
        label: "Medical",
        link: PATH.medical.index,
      },
      {
        id: "visa",
        icon: FiGlobe,
        label: "Visa",
        link: PATH.visa.index,
      },
      {
        id: "orientation",
        icon: FiInfo,
        label: "Orientation",
        link: PATH.orientation.index,
      },
      {
        id: "insurance",
        icon: FiShield,
        label: "Insurance",
        link: PATH.insurance.index,
      },
      {
        id: "labour-permit",
        icon: FiCheckSquare,
        label: "Labour Permit",
        link: PATH.shram.index,
      },
      {
        id: "ticket",
        icon: IoTicketOutline,
        label: "Ticket",
        link: PATH.ticket.index,
      },
    ],
  },
  {
    id: "accounting",
    icon: FiDollarSign,
    label: "Accounting",
    children: [
      {
        id: "purchase",
        icon: FiShoppingCart,
        label: "Purchase",
        children: [
          {
            id: "expense",
            icon: ScrollText,
            label: "Expense",
            link: PATH.accounting.purchase.expense.index,
          },
          {
            id: "supplier",
            icon: BaggageClaim,
            label: "Supplier",
            link: PATH.accounting.purchase.supplier.index,
          },
        ],
      },
      {
        id: "sales",
        icon: FiTrendingUp,
        label: "Sales",
        children: [
          {
            id: "invoice",
            icon: Receipt,
            label: "Invoice",
            link: PATH.invoice.index,
          },
        ],
      },
      {
        id: "quick-payment",
        icon: FiZap,
        label: "Quick Payment",
        link: PATH.quickPayment.index,
      },
      {
        id: "chart-of-account",
        icon: FiBook,
        label: "Chart of Account",
        children: [
          {
            id: "chart-of-account-account",
            label: "Account",
            icon: NotepadText,
            link: PATH.chartOfAccount.account.index,
          },
          {
            id: "chart-of-account-group",
            label: "Account Group",
            icon: Group,
            link: PATH.chartOfAccount.group.index,
          },
        ],
      },
      {
        id: "cheque-register",
        icon: MdFactCheck,
        label: "Cheque Register",
        // link: PATH.accounting.chequeRegister.index,
        children: [
          {
            id: "register",
            label: "Register",
            icon: ClipboardCheck,
            link: PATH.accounting.chequeRegister.index,
          },
          {
            id: "cheque-issued",
            label: "Cheque Issued",
            icon: BanknoteArrowDown,
            link: PATH.accounting.chequeRegister.chequeIssued.index,
          },
          {
            id: "cheque-received",
            label: "Cheque Received",
            icon: BanknoteArrowUp,
            link: PATH.accounting.chequeRegister.chequeReceived.index,
          },
        ],
      },
    ],
  },

  {
    id: "settings",
    icon: IoSettingsOutline,
    label: "Settings",
    children: [
      {
        id: "bank-setting",
        label: "Bank Setting",
        icon: LuBanknote,
        link: PATH.setting.bankSetting,
      },
      {
        id: "document-setting",
        label: "Document Setting",
        icon: LuFileCog,
        link: PATH.setting.documentSetting,
      },
      {
        id: "insurance-setting",
        label: "Insurance Company",
        icon: LuShieldCheck,
        link: PATH.setting.insuranceCompany,
      },
      {
        id: "orientation-setting",
        label: "Orientation Institute",
        icon: LuPresentation,
        link: PATH.setting.orientationInstitute,
      },
      {
        id: "medical-setting",
        label: "Medical Institute",
        icon: LuHospital,
        link: PATH.setting.medicalInstitute,
      },
      {
        id: "job-Setting",
        label: "Job Setting",
        icon: FaUsersGear,
        children: [
          {
            id: "industry",
            icon: LiaIndustrySolid,
            label: "Industry",
            link: PATH.setting.jobSetting.industry,
          },
          {
            id: "Category",
            icon: LuLayers,
            label: "Category",
            link: PATH.setting.jobSetting.category,
          },
          {
            id: "sub-category",
            icon: LuLayers3,
            label: "Sub Category",
            link: PATH.setting.jobSetting.subCategory,
          },
          {
            id: "job-title",
            icon: LuBriefcase,
            label: "Job Title",
            link: PATH.setting.jobSetting.jobTitle,
          },
        ],
      },
    ],
  },

  {
    id: "my-subscription",
    icon: LuBadgeDollarSign,
    label: "My Subscription",
    link: PATH.mySubscription.index,
  },
  {
    id: "my-membership",
    icon: LuBadgeCheck,
    label: "My Membership",
    link: PATH.myMembership.index,
  },
  {
    id: "role and permission",
    icon: LuKeyRound,
    label: "User & Permission",
    children: [
      {
        id: "user",
        icon: LuUser,
        label: "User",
        link: PATH.user.index,
      },
      {
        id: "role",
        icon: LiaUserShieldSolid,
        label: "Role",
        link: PATH.roleAndPermission.role,
      },
      {
        id: "permission",
        icon: MdSecurity,
        label: "Permission",
        link: PATH.roleAndPermission.permission,
      },
    ],
  },
];
