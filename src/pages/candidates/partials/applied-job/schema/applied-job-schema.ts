import * as yup from "yup";

export const AppliedJobValidationSchema = yup.object().shape({
  country: yup.string().required("This field is required"),
  company: yup.string().required("This field is required"),
  jobvacancy: yup.string().required("This field is required"),
  approvalStatus: yup
    .object()
    .shape({
      status: yup.string().notRequired(),
    })
    .notRequired(),
  description: yup.string().notRequired(),
});

export type AppliedJobSchemaType = yup.InferType<
  typeof AppliedJobValidationSchema
>;
