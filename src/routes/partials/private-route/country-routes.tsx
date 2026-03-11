import { PATH } from "@/constant/path";
import { lazy } from "react";

const Country = lazy(() => import("@/pages/country/Country"));

export const countryRoutes = [
  {
    path: PATH.country.index,
    element: <Country />,
  },
];

