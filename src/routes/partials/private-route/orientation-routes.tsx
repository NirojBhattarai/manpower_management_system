import { PATH } from "@/constant/path";
import { lazy } from "react";

const Orientation = lazy(() => import("@/pages/orientation"));

export const orientationRoutes = [
  {
    path: PATH.orientation.index,
    element: <Orientation />,
  },
];

