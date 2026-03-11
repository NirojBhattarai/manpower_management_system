import * as yup from "yup";

export const ExperienceValidationSchema = yup.object().shape({
  title: yup.string().required("Level is required"),
  companyName: yup.string().required("Institute name is required"),
  level: yup.string().required("Faculty name is required"),
  currentlyWorking: yup.boolean().required("Currently working is required"),
  startDate: yup.string().required("Start date is required"),
  endDate: yup.string().when("currentlyWorking", {
    is: true,
    then: (schema) => schema.notRequired(),
    otherwise: (schema) => schema.required("End date is required"),
  }),
  description: yup.string().notRequired(),
});

export type ExperienceSchemaType = yup.InferType<
  typeof ExperienceValidationSchema
>;

export type ExperiencePayload = Omit<ExperienceSchemaType, "endDate"> & {
  endDate?: string;
  jobseeker?: string;
};
