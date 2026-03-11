import ExtendedForm from "@/components/extended-components/ExtendedForm";
import LoadingScreen from "@/components/reusable-component/LoadingScreen";
import useUpdateApppliedJob from "./hooks/use-update-applied-job";
import AppliedJobForm from "./form/applied-job-form";

const UpdateAppliedJob = () => {
  const { formik, isLoading, isInitialLoading } = useUpdateApppliedJob();
  console.log(formik.values, "Formik");
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      {isInitialLoading ? <LoadingScreen /> : <AppliedJobForm />}
    </ExtendedForm>
  );
};

export default UpdateAppliedJob;
