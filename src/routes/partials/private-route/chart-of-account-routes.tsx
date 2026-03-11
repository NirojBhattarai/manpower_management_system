import { PATH } from "@/constant/path";
import { lazy } from "react";

const ChartOfAccount = lazy(() => import("@/pages/chart-of-account/chart-of-account"));
const ChartOfGroup = lazy(() => import("@/pages/chart-of-account/chart-of-group"));

export const chartOfAccountRoutes = [
  {
    path: PATH.chartOfAccount.account.index,
    element: <ChartOfAccount />,
  },
  {
    path: PATH.chartOfAccount.group.index,
    element: <ChartOfGroup />,
  },
];

