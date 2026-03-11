import * as yup from "yup";

const REQUIRED_MESSAGE = "this field is required";

// ============================== Product List Item Schema =====================
const productListItemSchema = yup.object({
  service: yup.string().required(),
  quantity: yup
    .string()
    .required()
    .test(
      "is-valid-number",
      "Amount must be a valid number",
      (value) => value !== undefined && value !== "" && !isNaN(Number(value)),
    ),
  rate: yup
    .string()
    .required()
    .test(
      "is-valid-number",
      "Amount must be a valid number",
      (value) => value !== undefined && value !== "" && !isNaN(Number(value)),
    ),
  discount: yup
    .string()
    .required()
    .test(
      "is-valid-number",
      "Amount must be a valid number",
      (value) => value !== undefined && value !== "" && !isNaN(Number(value)),
    ),
  vat: yup.boolean().required(),
});
// ==================== Temporary Store the Product Validation Schema =========================
const tempProduct = yup.object({
  service: yup.string().nullable().optional(),
  quantity: yup.string().nullable().optional(),
  rate: yup.string().nullable().optional(),
  discount: yup.string().nullable().optional(),
  vat: yup.boolean().nullable().optional(),
});
// =============== Invoice Validation Schema =====================
const invoiceSchema = yup.object({
  jobseeker: yup.string().required(REQUIRED_MESSAGE),
  refNo: yup.string().required(REQUIRED_MESSAGE),
  invoiceDate: yup.string().required(REQUIRED_MESSAGE),
  dueDate: yup.string().required(REQUIRED_MESSAGE),
  tempProduct: tempProduct,
  services: yup
    .array()
    .of(productListItemSchema)
    .min(1, REQUIRED_MESSAGE)
    .required(REQUIRED_MESSAGE),
  editing_index: yup.number().required().nullable(),
});

export type InvoiceSchemaType = yup.InferType<typeof invoiceSchema>;
export type InvoiceProductSchemaType = yup.InferType<
  typeof productListItemSchema
>;

export const invoiceValidationSchema = invoiceSchema;
