import { PATH } from "@/constant/path";
import { lazy } from "react";

const Medical = lazy(() => import("@/pages/medical"));

export const medicalRoutes = [
  {
    path: PATH.medical.index,
    element: <Medical />,
  },
];

