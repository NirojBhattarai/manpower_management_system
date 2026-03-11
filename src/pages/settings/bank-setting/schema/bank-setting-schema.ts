import * as yup from "yup";

const BankSchema = yup.object().shape({
  bankName: yup.string().required("This field is required"),
  accountNumber: yup.string().required("This field is required"),
});

export const BankValidationSchema = BankSchema;
export type BankSchemaType = yup.InferType<typeof BankSchema>;
