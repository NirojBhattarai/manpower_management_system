import { PATH } from "@/constant/path";
import { lazy } from "react";

const Interview = lazy(() => import("@/pages/interview"));

export const interviewRoutes = [
  {
    path: PATH.interview.index,
    element: <Interview />,
  },
];

