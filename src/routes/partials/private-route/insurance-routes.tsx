import { PATH } from "@/constant/path";
import { lazy } from "react";

const Insurance = lazy(() => import("@/pages/insurance"));

export const insuranceRoutes = [
  {
    path: PATH.insurance.index,
    element: <Insurance />,
  },
];

