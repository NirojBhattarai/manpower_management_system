import ExtendedForm from "@/components/extended-components/ExtendedForm";
import LoadingScreen from "@/components/reusable-component/LoadingScreen";
import InsuranceForm from "./insurance-form";
import useInsuranceUpdate from "../hooks/use-insurance-update";

const UpdateInsurance = () => {
  const { formik, isInitialLoading, isLoading } = useInsuranceUpdate();
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      {isInitialLoading ? <LoadingScreen /> : <InsuranceForm />}
    </ExtendedForm>
  );
};

export default UpdateInsurance;
