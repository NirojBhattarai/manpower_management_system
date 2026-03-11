import ExtendedForm from "@/components/extended-components/ExtendedForm";
import useUpdateInterview from "../hooks/use-update-interview";
import LoadingScreen from "@/components/reusable-component/LoadingScreen";
import InterviewForm from "./interview-form";

const UpdateInterview = () => {
  const { formik, isInitialLoading, isLoading } = useUpdateInterview();
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      {isInitialLoading ? <LoadingScreen /> : <InterviewForm />}
    </ExtendedForm>
  );
};

export default UpdateInterview;
