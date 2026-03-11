import { PATH } from "@/constant/path";
import { lazy } from "react";

const JobOffer = lazy(() => import("@/pages/job-offer"));

export const jobOfferRoutes = [
  {
    path: PATH.jobOffer.index,
    element: <JobOffer />,
  },
];

