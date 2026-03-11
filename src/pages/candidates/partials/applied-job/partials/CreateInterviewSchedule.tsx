import ExtendedForm from "@/components/extended-components/ExtendedForm";
import useScheduleInterview from "./hooks/use-schedule-interview";
import InterviewScheduleForm from "./form/interview-schedule-form";
import LoadingScreen from "@/components/reusable-component/LoadingScreen";

const CreateInterviewSchedule = () => {
  const {
    formik,
    isInitialLoading,
    isScheduleInterviewLoading: isLoading,
  } = useScheduleInterview();
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      {isInitialLoading ? <LoadingScreen /> : <InterviewScheduleForm />}
    </ExtendedForm>
  );
};

export default CreateInterviewSchedule;
