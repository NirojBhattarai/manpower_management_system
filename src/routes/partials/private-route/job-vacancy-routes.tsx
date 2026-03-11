import { PATH } from "@/constant/path";
import { lazy } from "react";

const JobVacancy = lazy(() => import("@/pages/job-vacancy/index.tsx"));

export const jobVacancyRoutes = [
  {
    path: PATH.jobVacancy.index,
    element: <JobVacancy />,
  },
];
