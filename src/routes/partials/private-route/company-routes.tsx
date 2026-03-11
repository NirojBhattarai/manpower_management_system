import { PATH } from "@/constant/path";
import { lazy } from "react";

const CreateCompany = lazy(() => import("@/pages/company/child/create/create-company"));
const UpdateCompany = lazy(() => import("@/pages/company/child/update/update-company"));
const Company = lazy(() => import("@/pages/company/Company"));

export const companyRoutes = [
  {
    path: PATH.company.index,
    element: <Company />,
  },
  {
    path: PATH.company.create,
    element: <CreateCompany />,
  },
  {
    path: PATH.company.update,
    element: <UpdateCompany />,
  },
];

