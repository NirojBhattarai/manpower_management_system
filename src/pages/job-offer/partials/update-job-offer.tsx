import ExtendedForm from "@/components/extended-components/ExtendedForm";
import LoadingScreen from "@/components/reusable-component/LoadingScreen";
import useUpdateJobOffer from "../hooks/use-update-job-offer";
import JobOfferForm from "./job-offer-form";

const UpdateJobOffer = () => {
  const { formik, isInitialLoading, isLoading } = useUpdateJobOffer();
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      {isInitialLoading ? <LoadingScreen /> : <JobOfferForm />}
    </ExtendedForm>
  );
};

export default UpdateJobOffer;
