import * as yup from "yup";

export type InterviewModeType = "online" | "onsite";
export type InterviewStatusType = "scheduled" | "cancelled" | "completed";
export type InterviewResultType = "selected" | "rejected";

export const InterviewScheduleValidationSchema = yup.object().shape({
  jobseeker: yup.string().required("This field is required"),
  jobVacancy: yup.string().required("This field is required"),
  jobTitle: yup.string().required("This field is required"),
  interviewDate: yup.string().required("This field is required"),

  interviewMode: yup
    .mixed<InterviewModeType>()
    .oneOf(["online", "onsite"])
    .required("This field is required"),

  interviewLocation: yup.string().when("interviewMode", {
    is: "onsite",
    then: (schema) =>
      schema.required("Location is required for onsite interview"),
    otherwise: (schema) => schema.notRequired().nullable(),
  }),

  interviewerName: yup.string().required("This field is required"),

  interviewStatus: yup
    .mixed<InterviewStatusType>()
    .oneOf(["scheduled", "cancelled", "completed"])
    .required("This field is required"),

  company: yup.string().required("This field is required"),
  remarks: yup.string().notRequired(),
  interviewResult: yup
    .mixed<InterviewResultType>()
    .oneOf(["selected", "rejected"])
    .notRequired(),
});

export type InterviewScheduleSchemaType = yup.InferType<
  typeof InterviewScheduleValidationSchema
>;
