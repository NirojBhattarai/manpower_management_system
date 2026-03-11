import PageHeader from "@/common/PageHeader";
import useUpdateExpense from "./hooks/use-update-expense";
import ExtendedForm from "@/components/extended-components/ExtendedForm";
import ExpenseForm from "../../partials/expense-form";
import LoadingScreen from "@/components/reusable-component/LoadingScreen";

const UpdateExpense = () => {
  const expense = useUpdateExpense();
  return (
    <div className="u-flex-child">
      <PageHeader title="Update Expense" />
      <ExtendedForm
        formik={expense.formik}
        isSubmitting={expense.isLoading}
        className="mt-4"
      >
        {expense?.isInitialLoading ? <LoadingScreen /> : <ExpenseForm />}
      </ExtendedForm>
    </div>
  );
};
export default UpdateExpense;
