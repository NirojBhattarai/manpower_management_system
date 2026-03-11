import { useUpdateDataMutation } from "@/api/api";
import { ApiResponse } from "@/api/api.error";
import { endpoints } from "@/api/endpoints";
import { PATH } from "@/constant/path";
import { apiTags } from "@/constant/tag";
import {
  ExpenseSchemaType,
  expenseValidationSchema,
} from "@/pages/purchase/expense/schema/expense-schema";
import { handleResponse } from "@/utils/handleResponse";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import useExpenseDetails from "./use-expense-details";
import { Expenses } from "../../../interface/interface-expense";

const useUpdateExpense = () => {
  const [createExpense, { isLoading }] = useUpdateDataMutation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { expenseDetails, isLoading: isInitialLoading } = useExpenseDetails({
    id: id ?? "",
  });
  //   ======================= Initial Values =============================
  const initialValues: ExpenseSchemaType = {
    supplier: expenseDetails?.data?.supplier?.id || "",
    invoiceReferenceNo: expenseDetails?.data?.invoiceReferenceNo || "",
    date: expenseDetails?.data?.date || "",
    dueDate: expenseDetails?.data?.dueDate || "",
    temp_expense: {
      account: "",
      amount: "",
      tax: false,
    },
    expenses:
      expenseDetails?.data?.expenses?.map((item: Expenses) => ({
        account: item.account,
        amount: item.amount,
        tax: item.tax,
      })) || [],
  };
  // ======================== Formik Instance ================================
  const formik = useFormik({
    initialValues,
    validationSchema: expenseValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors }) => {
      const response = (await createExpense({
        url: endpoints.expense.update.replace(":id", id ?? ""),
        data: values,
        invalidateTag: [apiTags.expense.list, apiTags.expense.details],
      })) as ApiResponse;

      handleResponse({
        response,
        setErrorCallBack: setErrors,
        handleOnSuccess: () => {
          navigate(PATH.accounting.purchase.expense.index);
        },
      });
    },
  });

  return { formik, isLoading, isInitialLoading };
};

export default useUpdateExpense;
