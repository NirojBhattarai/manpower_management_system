import * as Yup from "yup";

const chartOfAccountSchema = Yup.object({
  accountName: Yup.string().required("This field is required"),
  group: Yup.string().required("This field is required"),
  description: Yup.string().required("This field is required"),
  code: Yup.string().required("This field is required"),
});

export type ChartOfAccountSchemaType = Yup.InferType<
  typeof chartOfAccountSchema
>;
export const chartOfAccountValidation = chartOfAccountSchema;
