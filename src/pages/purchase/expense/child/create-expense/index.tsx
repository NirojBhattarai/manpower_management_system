import PageHeader from "@/common/PageHeader";
import ExtendedForm from "@/components/extended-components/ExtendedForm";
import ExpenseForm from "../../partials/expense-form";
import useCreateExpense from "./hooks/use-create-expense";

const CreateExpense = () => {
  const expense = useCreateExpense();
  return (
    <div className="u-flex-child">
      <PageHeader title="Create Expense" />
      <ExtendedForm
        formik={expense.formik}
        isSubmitting={expense.isLoading}
        className="mt-4"
      >
        <ExpenseForm />
      </ExtendedForm>
    </div>
  );
};
export default CreateExpense;
