import { PATH } from "@/constant/path";
import { lazy } from "react";

const Sharam = lazy(() => import("@/pages/shram"));

export const shramRoutes = [
  {
    path: PATH.shram.index,
    element: <Sharam />,
  },
];

