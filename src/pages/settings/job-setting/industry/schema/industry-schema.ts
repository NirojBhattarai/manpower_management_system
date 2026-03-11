import * as Yup from "yup";

const industrySchema = Yup.object().shape({
  industry: Yup.string().required("Industry name is required"),
});

export const IndustryValidationSchema = industrySchema;
export type IndustrySchemaType = Yup.InferType<typeof industrySchema>;
