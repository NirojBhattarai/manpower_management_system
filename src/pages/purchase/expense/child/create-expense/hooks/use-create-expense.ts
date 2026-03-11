import { usePostDataMutation } from "@/api/api";
import { ApiResponse } from "@/api/api.error";
import { endpoints } from "@/api/endpoints";
import { PATH } from "@/constant/path";
import { apiTags } from "@/constant/tag";
import { handleResponse } from "@/utils/handleResponse";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import {
  ExpenseSchemaType,
  expenseValidationSchema,
} from "@/pages/purchase/expense/schema/expense-schema";

const useCreateExpense = () => {
  const [createExpense, { isLoading }] = usePostDataMutation();
  const navigate = useNavigate();
  //   ======================= Initial Values =============================
  const initialValues: ExpenseSchemaType = {
    supplier: "",
    invoiceReferenceNo: "",
    date: "",
    dueDate: "",
    temp_expense: {
      account: "",
      amount: "",
      tax: false,
    },
    expenses: [],
  };
  // ======================== Formik Instance ================================
  const formik = useFormik({
    initialValues,
    validationSchema: expenseValidationSchema,
    onSubmit: async (values, { resetForm, setErrors }) => {
      const response = (await createExpense({
        url: endpoints.expense.create,
        data: values,
        invalidateTag: [apiTags.expense.list],
      })) as ApiResponse;

      handleResponse({
        response,
        setErrorCallBack: setErrors,
        handleOnSuccess: () => {
          resetForm();
          navigate(PATH.accounting.purchase.expense.index);
        },
      });
    },
  });

  return {
    formik,
    isLoading,
  };
};
export default useCreateExpense;
