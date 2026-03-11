import * as Yup from "yup";

// const temp_expense = Yup.object({
//   account: Yup.string().required("This field is required"),
//   amount: Yup.string()
//     .required("This field is required")
//     .test(
//       "is-valid-number",
//       "Amount must be a valid number",
//       (value) => value !== undefined && value !== "" && !isNaN(Number(value)),
//     ),
//   tax: Yup.boolean().required("This field is required"),
// });

const temp_expense = Yup.object({
  account: Yup.string().nullable().optional(),
  amount: Yup.string().nullable().optional(),
  tax: Yup.boolean().nullable().optional(),
});

const expenses = Yup.object({
  account: Yup.string().required("This field is required"),
  amount: Yup.string()
    .required("This field is required")
    .test(
      "is-valid-number",
      "Amount must be a valid number",
      (value) => value !== undefined && value !== "" && !isNaN(Number(value)),
    ),
  tax: Yup.boolean().required("This field is required"),
});

// =================== Expense Schema =========================
const expenseSchema = Yup.object({
  supplier: Yup.string().required("This field is required"),
  invoiceReferenceNo: Yup.string().required("This field is required"),
  date: Yup.string().required("This field is required"),
  dueDate: Yup.string().required("This field is required"),
  expenses: Yup.array().of(expenses).required("This is required"),
  temp_expense,
  editing_index: Yup.number().nullable().optional(),
});

export const expenseValidationSchema = expenseSchema;
export type ExpenseSchemaType = Yup.InferType<typeof expenseSchema>;
export type ExpenseItemSchema = Yup.InferType<typeof expenses>;
