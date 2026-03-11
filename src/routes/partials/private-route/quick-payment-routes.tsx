import { PATH } from "@/constant/path";
import { lazy } from "react";

const QuickPayment = lazy(() => import("@/pages/quick-payment"));
const CreateQuickPayment = lazy(() => import("@/pages/quick-payment/child/create-quick-payment"));
const UpdateQuickPayment = lazy(() => import("@/pages/quick-payment/child/update-quick-payment"));

export const quickPaymentRoutes = [
  {
    path: PATH.quickPayment.index,
    element: <QuickPayment />,
  },
  {
    path: PATH.quickPayment.create,
    element: <CreateQuickPayment />,
  },
  {
    path: PATH.quickPayment.update,
    element: <UpdateQuickPayment />,
  },
];

