import * as yup from "yup";

export const EducationValidationSchema = yup.object().shape({
  level: yup.string().required("Level is required"),
  instituteName: yup.string().required("Institute name is required"),
  faculty: yup.string().required("Faculty name is required"),
  currentlyStudying: yup.boolean().required("Currently studying is required"),
  startDate: yup.string().required("Start date is required"),
  endDate: yup.string().when("currentlyStudying", {
    is: true,
    then: (schema) => schema.notRequired(),
    otherwise: (schema) => schema.required("End date is required"),
  }),
});

export type EducationSchemaType = yup.InferType<
  typeof EducationValidationSchema
>;

export type EducationPayload = Omit<EducationSchemaType, "endDate"> & {
  endDate?: string;
  jobseeker?: string;
};
