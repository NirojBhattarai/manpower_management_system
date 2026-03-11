import { PATH } from "@/constant/path";
import { lazy } from "react";

const Visa = lazy(() => import("@/pages/visa"));

export const visaRoutes = [
  {
    path: PATH.visa.index,
    element: <Visa />,
  },
];

