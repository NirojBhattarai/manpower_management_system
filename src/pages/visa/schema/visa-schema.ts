import * as Yup from "yup";

const VisaSchema = Yup.object().shape({
  applicationDate: Yup.string().required("This field is required"),
});

const UpdateVisaSchema = Yup.object().shape({
  applicationDate: Yup.string().required("This field is required"),
  approvalDate: Yup.string().required("This field is required"),
  visaExpireDate: Yup.string().required("This field is required"),
  visaStatus: Yup.string().required("This field is required"),
  visaFile: Yup.mixed<string | File>().required("This field is required"),
});

export type VisaSchemaType = Yup.InferType<typeof VisaSchema>;
export const VisaValidationSchema = VisaSchema;

export type UpdateVisaSchemaType = Yup.InferType<typeof UpdateVisaSchema>;
export const UpdateVisaValidationSchema = UpdateVisaSchema;
