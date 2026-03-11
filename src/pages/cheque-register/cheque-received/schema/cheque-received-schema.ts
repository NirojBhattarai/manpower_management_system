import * as Yup from "yup";

const ChequeRecievedSchema = Yup.object().shape({
  customerAccount: Yup.string().required("This field is required"),
  chequeNumber: Yup.string().required("This field is required"),
  chequeDate: Yup.string().required("This field is required"),
  receivedDate: Yup.string().required("This field is required"),
  amount: Yup.number().required("This field is required"),
  status: Yup.string().required("This field is required"),
});

export type ChequeReceivedSchemaType = Yup.InferType<
  typeof ChequeRecievedSchema
>;
export const ChequeRecievedValidationSchema = ChequeRecievedSchema;
