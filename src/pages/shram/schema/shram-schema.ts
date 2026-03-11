import * as Yup from "yup";

export type ShramStatusType = "pending" | "approved" | "rejected";

const ShramSchema = Yup.object().shape({
  olsReferenceNo: Yup.string().required("This field is required"),
  approvalDate: Yup.string().required("This field is required"),
  approvalFile: Yup.mixed<string | File>().required("This field is required"),
  shramStatus: Yup.string().required("This field is required"),
});

export type ShramSchemaType = Yup.InferType<typeof ShramSchema>;
export const ShramValidationSchema = ShramSchema;
