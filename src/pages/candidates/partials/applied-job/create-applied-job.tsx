import ExtendedForm from "@/components/extended-components/ExtendedForm";
import useCreateAppliedJob from "./hooks/use-create-applied-job";
import AppliedJobForm from "./form/applied-job-form";

const CreateAppliedJob = () => {
  const { formik, isAppliedJobLoading: isLoading } = useCreateAppliedJob();

  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      <AppliedJobForm hideApprovalStatus={true} />
    </ExtendedForm>
  );
};
export default CreateAppliedJob;
