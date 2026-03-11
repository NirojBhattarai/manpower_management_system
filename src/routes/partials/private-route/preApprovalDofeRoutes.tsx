import { PATH } from "@/constant/path";
import { lazy } from "react";

const CreatePreApprovalDofe = lazy(() => import("@/pages/pre-approval-dofe/child/create/create-pre-approval-dofe"));
const UpdatePreApprovalDofe = lazy(() => import("@/pages/pre-approval-dofe/child/update/update-pre-approval-dofe"));
const PreApprovalDofe = lazy(() => import("@/pages/pre-approval-dofe"));

export const preApprovalDofeRoutes = [
  {
    path: PATH.preApprovalDofe.index,
    element: <PreApprovalDofe />,
  },
  {
    path: PATH.preApprovalDofe.create,
    element: <CreatePreApprovalDofe />,
  },
  {
    path: PATH.preApprovalDofe.update,
    element: <UpdatePreApprovalDofe />,
  },
];

