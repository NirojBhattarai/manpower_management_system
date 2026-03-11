import FormInputDate from "@/components/form/form-input-date";
import FormInputText from "@/components/form/FormInputText";
import FormSwitch from "@/components/form/FormSwitch";
import { ExpenseItemSchema } from "../schema/expense-schema";
import Table from "@/components/Table";
import { ColumnDef } from "@tanstack/react-table";
import TableAction from "@/components/TableAction";
import { cn } from "@/lib/utils";
import React from "react";
import TableWrapper from "@/components/TableWrapper";
import useExpenseForm from "../hooks/use-expense-form";
import FormAsyncInputSelect from "@/components/form/form-async-input-select";
import { endpoints } from "@/api/endpoints";
import useChartOfAccountDetails from "@/pages/chart-of-account/chart-of-account/hooks/use-chart-of-account-details";

const ExpenseForm = () => {
  return (
    <div className="space-y-6">
      <ExpenseDetails />
      <ExpenseItemForm />
      <ExpenseTable />
    </div>
  );
};
export default ExpenseForm;

const ExpenseDetails = () => {
  return (
    <div className="gap-4 grid grid-cols-2">
      <FormAsyncInputSelect
        fetchUrl={endpoints.supplier.list}
        label="Supplier"
        name="supplier"
        labelKey="name"
        valueKey="id"
      />
      <FormInputText
        label="Supplier Invoice Reference No."
        name="invoiceReferenceNo"
      />
      <FormInputDate label="Date" name="date" />
      <FormInputDate label="Due Date" name="dueDate" />
    </div>
  );
};
// ========================== Expense Form =========================
const ExpenseItemForm = () => {
  const {
    isEditing,
    values,
    handleUpdateExpense,
    handleAddExpense,
    handleCancelUpdateExpense,
  } = useExpenseForm();
  return (
    <div className="gap-6 grid grid-cols-4">
      <FormAsyncInputSelect
        fetchUrl={endpoints.chartOfAccount.account.list}
        label="Account"
        name="temp_expense.account"
        labelKey="accountName"
        valueKey="id"
      />
      <FormInputText label="Amount (Rs.)" name="temp_expense.amount" />
      <FormSwitch
        title="Tax (13%)"
        activeText={((Number(values?.temp_expense?.amount) ?? 0) * 0.13)
          .toFixed(2)
          .toString()}
        name="temp_expense.tax"
      />
      <div className="flex items-center">
        {isEditing ? (
          <div className="flex items-center gap-x-4">
            <Button variant="update" handleClick={handleUpdateExpense}>
              Update
            </Button>
            <Button variant="delete" handleClick={handleCancelUpdateExpense}>
              Cancel
            </Button>
          </div>
        ) : (
          <div className="flex items-center">
            <Button variant="add" handleClick={handleAddExpense}>
              Add
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================== Expense List Table ===========================
const ExpenseTable = () => {
  const { values } = useExpenseForm();
  return (
    <TableWrapper
      isLoading={false}
      isDataAvailable={values?.expenses?.length > 0}
    >
      <Table columns={ExpenseColumn()} data={values?.expenses} />
    </TableWrapper>
  );
};
// ==================== Expense Item Column ===============================
const ExpenseColumn = (): ColumnDef<ExpenseItemSchema>[] => {
  const { handleEditExpense, handleDeleteExpense } = useExpenseForm();
  return [
    {
      header: "Account",
      cell: ({ row }) => {
        const accountID = row?.original?.account;
        const { chartOfAccountDetail } = useChartOfAccountDetails({
          id: accountID ?? "",
        });
        return <span>{chartOfAccountDetail?.data?.accountName}</span>;
      },
      size: 200,
    },
    {
      header: "Amount",
      accessorKey: "amount",
      size: 200,
    },
    {
      header: "Tax",
      accessorKey: "tax",
      cell: ({ row }) => (row?.original?.tax ? "13%" : "0%"),
      size: 200,
    },
    {
      header: "Tax Amount",
      cell: ({ row }) =>
        row?.original?.tax
          ? (Number(row?.original?.amount) * 0.13).toFixed(2)
          : "0",
      size: 200,
    },
    {
      header: "Total Expense",
      cell: ({ row }) => {
        const amount = Number(row?.original?.amount) || 0;
        const taxEnabled = row?.original?.tax;

        const taxAmount = taxEnabled ? amount * 0.13 : 0;
        const total = amount + taxAmount;

        return <span>{total.toFixed(2)}</span>;
      },
      size: 200,
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <TableAction
          edit={{
            active: true,
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              handleEditExpense(row?.index);
            },
          }}
          del={{
            active: true,
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              handleDeleteExpense(row?.index);
            },
          }}
        />
      ),
    },
  ];
};

// ============ Button Component ============
type ButtonVariant = "add" | "update" | "delete";

const Button = ({
  children,
  handleClick,
  variant,
  disabled = false,
}: {
  children: React.ReactNode;
  handleClick: () => void;
  variant: ButtonVariant;
  disabled?: boolean;
}) => {
  const baseStyle =
    "px-4 py-2 flex items-center justify-center typo-mid-bd-reg rounded-lg cursor-pointer transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants: Record<ButtonVariant, string> = {
    add: "text-white bg-secondary-500 hover:bg-secondary-700",
    update: "text-white bg-primary-500 hover:bg-primary-700",
    delete: "text-white bg-error-delete hover:bg-red-700",
  };
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        handleClick();
      }}
      className={cn(baseStyle, variants[variant])}
    >
      {children}
    </button>
  );
};
