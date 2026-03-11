import { PATH } from "@/constant/path";
import BankSetting from "@/pages/settings/bank-setting/bank-setting";
import { lazy } from "react";

const DocumentSetting = lazy(
  () => import("@/pages/settings/document-setting/document-setting"),
);
const InsuranceComapany = lazy(
  () => import("@/pages/settings/insurance-company"),
);
const Category = lazy(
  () => import("@/pages/settings/job-setting/category/Category"),
);
const Industry = lazy(
  () => import("@/pages/settings/job-setting/industry/Industry"),
);
const JobTitle = lazy(
  () => import("@/pages/settings/job-setting/job-title/job-title"),
);
const SubCategory = lazy(
  () => import("@/pages/settings/job-setting/sub-category/sub-category"),
);
const MedicalInstitute = lazy(
  () => import("@/pages/settings/medical-institute"),
);
const OrientationInstitute = lazy(
  () => import("@/pages/settings/orientation-institute"),
);

export const settingRoutes = [
  {
    path: PATH.setting.bankSetting,
    element: <BankSetting />,
  },
  {
    path: PATH.setting.documentSetting,
    element: <DocumentSetting />,
  },
  {
    path: PATH.setting.insuranceCompany,
    element: <InsuranceComapany />,
  },
  {
    path: PATH.setting.medicalInstitute,
    element: <MedicalInstitute />,
  },
  {
    path: PATH.setting.orientationInstitute,
    element: <OrientationInstitute />,
  },
  {
    path: PATH.setting.jobSetting.industry,
    element: <Industry />,
  },
  {
    path: PATH.setting.jobSetting.category,
    element: <Category />,
  },
  {
    path: PATH.setting.jobSetting.subCategory,
    element: <SubCategory />,
  },
  {
    path: PATH.setting.jobSetting.jobTitle,
    element: <JobTitle />,
  },
];
