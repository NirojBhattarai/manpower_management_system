import * as Yup from "yup";

// =========================== Temporary store the payment ============================
const temp_payment = Yup.object({
  account: Yup.string().nullable().optional(),
  amount: Yup.string().nullable().optional(),
  description: Yup.string().nullable().optional(),
});

// =========================== Payment Schema ======================
const payment = Yup.object({
  account: Yup.string().required("This field is required"),
  amount: Yup.string()
    .required("This field is required")
    .test(
      "is-valid-number",
      "Amount must be a valid number",
      (value) => value !== undefined && value !== "" && !isNaN(Number(value)),
    ),
  description: Yup.string().required("This field is required"),
});

// ========================= Quick Payment Schema =========================
const quickPaymentSchema = Yup.object({
  paidFrom: Yup.string().required("This field is required"),
  date: Yup.string().required("This field is required"),
  reference: Yup.string().required("This field is required"),
  payments: Yup.array().of(payment).required("This field is required"),
  temp_payment,
  edit_index: Yup.number().nullable(),
});

export const quickPaymentValidationSchema = quickPaymentSchema;
export type QuickPaymentSchema = Yup.InferType<typeof quickPaymentSchema>;
export type QuickPaymentItemSchema = Yup.InferType<typeof payment>;
