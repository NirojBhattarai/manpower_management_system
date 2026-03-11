import { PATH } from "@/constant/path";
import { lazy } from "react";

// const Candidate = lazy(() => import("@/pages/candidate"));

// const CreateCandidate = lazy(
//   () => import("@/pages/candidate/child/create/CreateCandidate"),
// );

// const UpdateCandidate = lazy(
//   () => import("@/pages/candidate/child/update/UpdateCandidate"),
// );

const CreateCandidate = lazy(
  () => import("@/pages/candidates/partials/create-candidate"),
);

const UpdateCandidate = lazy(
  () => import("@/pages/candidates/partials/update-candidate"),
);

const Candidates = lazy(() => import("@/pages/candidates"));

export const candidateRoutes = [
  {
    path: PATH.candidate.index,
    // element: <Candidate />,
    element: <Candidates />,
  },
  {
    path: PATH.candidate.create,
    element: <CreateCandidate />,
  },
  {
    path: PATH.candidate.update,
    element: <UpdateCandidate />,
  },
];
