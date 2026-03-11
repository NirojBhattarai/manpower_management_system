import { PATH } from "@/constant/path";
import { lazy } from "react";

const Invoice = lazy(() => import("@/pages/invoice"));
const CreateInvoice = lazy(() => import("@/pages/invoice/child/add-invoice"));
const UpdateInvoice = lazy(() => import("@/pages/invoice/child/update-invoice"));

export const invoiceRoutes = [
  {
    path: PATH.invoice.index,
    element: <Invoice />,
  },
  {
    path: PATH.invoice.create,
    element: <CreateInvoice />,
  },
  {
    path: PATH.invoice.update,
    element: <UpdateInvoice />,
  },
];

