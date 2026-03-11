import * as Yup from "yup";

const chartOfGroupSchema = Yup.object({
  groupName: Yup.string().required("This field is required"),
  under: Yup.string().required("This field is required"),
  description: Yup.string().required("This field is required"),
});

export type ChartOfGroupSchemaType = Yup.InferType<typeof chartOfGroupSchema>;
export const chartOfGroupValidation = chartOfGroupSchema;
