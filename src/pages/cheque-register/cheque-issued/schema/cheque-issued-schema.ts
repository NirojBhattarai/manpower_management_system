import * as yup from "yup";

const MESSAGE = "This field is required";

const ChequeIssuedSchema = yup.object().shape({
  supplierAccount: yup.string().trim().required(MESSAGE),
  payeeName: yup.string().trim().required(MESSAGE),
  bankAccount: yup.string().trim().required(MESSAGE),
  chequeNumber: yup.string().trim().required(MESSAGE),
  chequeDate: yup.string().trim().required(MESSAGE),
  issuedDate: yup.string().trim().required(MESSAGE),
  amount: yup.number().required(MESSAGE),
  status: yup.string().trim().required(MESSAGE),
});

export type ChequeIssuedSchemaType = yup.InferType<typeof ChequeIssuedSchema>;
export const ChequeIssuedValidationSchema = ChequeIssuedSchema;
