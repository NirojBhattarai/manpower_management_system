import ExtendedForm from "@/components/extended-components/ExtendedForm";
import ChequeIssuedForm from "./cheque-issued-form";
import useUpdateChequeIssued from "../hooks/use-update-cheque-issued";
import LoadingScreen from "@/components/reusable-component/LoadingScreen";

const UpdateChequeIssued = () => {
  const { formik, isLoading, isInitialLoading } = useUpdateChequeIssued();

  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      {isInitialLoading ? <LoadingScreen /> : <ChequeIssuedForm />}
    </ExtendedForm>
  );
};

export default UpdateChequeIssued;
