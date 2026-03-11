import * as yup from "yup";

export const CertificateValidationSchema = yup.object().shape({
  title: yup.string().required("Level is required"),
  organizationName: yup.string().required("Organization name is required"),
  certificateFile: yup
    .mixed<string | File>()
    .required("Certificate is required"),
  description: yup.string().notRequired(),
});

export type CertificateSchemaType = yup.InferType<
  typeof CertificateValidationSchema
>;
