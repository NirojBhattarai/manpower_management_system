import { ExpenseSchemaType } from "@/pages/purchase/expense/schema/expense-schema";
import { useFormikContext } from "formik";
import { useCallback } from "react";

const useExpenseForm = () => {
  const { values, setValues, setTouched, validateForm } =
    useFormikContext<ExpenseSchemaType>();
  //  ======================= Edit Expense Account ======================
  const handleEditExpense = useCallback(
    (index: number) => {
      const accountToEdit = values.expenses[index];
      setValues({
        ...values,
        temp_expense: {
          account: accountToEdit?.account,
          amount: accountToEdit?.amount,
          tax: accountToEdit?.tax,
        },
        editing_index: index,
      });
    },
    [values, setValues],
  );

  //   ========================= Update Expense Account =======================
  const handleUpdateExpense = useCallback(async () => {
    if (values?.editing_index === null || values?.editing_index === undefined)
      return;
    // Force validate the form
    const errors = await validateForm();
    const tempExpenseError = errors?.expenses;
    if (tempExpenseError && Object.keys(tempExpenseError).length > 0) {
      setTouched({
        temp_expense: {
          account: true,
          amount: true,
          tax: true,
        },
      });
      return;
    }

    const updateAccount = [...values?.expenses];
    updateAccount[values?.editing_index] = {
      account: values?.temp_expense?.account || "",
      amount: values?.temp_expense?.amount || "",
      tax: values?.temp_expense?.tax || false,
    };
    setValues({
      ...values,
      expenses: updateAccount,
      temp_expense: {
        account: "",
        amount: "",
        tax: false,
      },
      editing_index: null,
    });
    setTouched({
      temp_expense: {
        account: false,
        amount: false,
        tax: false,
      },
    });
  }, [values, setValues, setTouched]);

  // ========================== Cancel Update Expense ===============================
  const handleCancelUpdateExpense = useCallback(() => {
    setValues({
      ...values,
      temp_expense: {
        account: "",
        amount: "",
        tax: false,
      },
      editing_index: null,
    });
  }, [values, setValues]);

  //========================== Delete Expense Accont =====================
  const handleDeleteExpense = useCallback(
    (index: number) => {
      const updatedAccount = values?.expenses?.filter((_, i) => i !== index);
      setValues({
        ...values,
        expenses: updatedAccount,
        editing_index:
          values.editing_index === index ? null : values.editing_index,
        temp_expense:
          values.editing_index === index
            ? { account: "", amount: "", tax: false }
            : values.temp_expense,
      });
    },
    [setValues, values],
  );

  //   ====================== Add Temp Account to Account Array ============================
  const handleAddExpense = useCallback(async () => {
    // Force validate the form
    const errors = await validateForm();
    const tempExpenseError = errors?.temp_expense;
    if (tempExpenseError && Object.keys(tempExpenseError).length > 0) {
      setTouched({
        temp_expense: {
          account: true,
          amount: true,
          tax: true,
        },
      });
      return;
    }
    setValues({
      ...values,
      expenses: [
        ...values?.expenses,
        {
          account: values?.temp_expense?.account || "",
          amount: values?.temp_expense?.amount || "",
          tax: values?.temp_expense?.tax || false,
        },
      ],
      temp_expense: {
        account: "",
        amount: "",
        tax: false,
      },
      editing_index: null,
    });
    setTouched({
      temp_expense: {
        account: false,
        amount: false,
        tax: false,
      },
    });
  }, [values, setValues, setTouched, validateForm]);

  //   =============================== is Editing ===========================
  const isEditing =
    values?.editing_index !== null && values?.editing_index !== undefined;

  // ============================== Editing Index ===========================
  const editingIndex = values?.editing_index;
  return {
    handleEditExpense,
    isEditing,
    handleAddExpense,
    handleDeleteExpense,
    handleUpdateExpense,
    handleCancelUpdateExpense,
    editingIndex,
    values,
  };
};
export default useExpenseForm;
