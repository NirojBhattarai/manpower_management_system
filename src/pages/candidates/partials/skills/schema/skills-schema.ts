import * as yup from "yup";

export const SkillValidationSchema = yup.object().shape({
  skills: yup.array().of(yup.string()).required("Skills is required"),
  languages: yup.array().of(yup.string()).required("Languages is required"),
});

export type SkillSchemaType = yup.InferType<typeof SkillValidationSchema>;
