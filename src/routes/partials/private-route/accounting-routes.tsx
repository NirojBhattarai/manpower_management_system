import { PATH } from "@/constant/path";
import { lazy } from "react";

const Expense = lazy(() => import("@/pages/purchase/expense"));
const CreateExpense = lazy(
  () => import("@/pages/purchase/expense/child/create-expense"),
);
const UpdateExpense = lazy(
  () => import("@/pages/purchase/expense/child/update-expense"),
);
const Supplier = lazy(() => import("@/pages/purchase/supplier"));
const ChequeRegister = lazy(() => import("@/pages/cheque-register"));
const ChequeIssued = lazy(
  () => import("@/pages/cheque-register/cheque-issued"),
);
const ChequeReceived = lazy(
  () => import("@/pages/cheque-register/cheque-received"),
);

export const accountingRoutes = [
  // =================== Supplier Routes =================
  {
    path: PATH.accounting.purchase.supplier.index,
    element: <Supplier />,
  },

  // ===================== Expense Routes ===================
  {
    path: PATH.accounting.purchase.expense.index,
    element: <Expense />,
  },
  {
    path: PATH.accounting.purchase.expense.create,
    element: <CreateExpense />,
  },
  {
    path: PATH.accounting.purchase.expense.update,
    element: <UpdateExpense />,
  },

  // ================== Cheque Register Routes =================
  {
    path: PATH.accounting.chequeRegister.index,
    element: <ChequeRegister />,
    children: [
      {
        path: PATH.accounting.chequeRegister.chequeIssued.index,
        element: <ChequeIssued />,
      },
      {
        path: PATH.accounting.chequeRegister.chequeReceived.index,
        element: <ChequeReceived />,
      },
    ],
  },
];
