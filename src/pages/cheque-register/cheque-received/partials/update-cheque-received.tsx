import ExtendedForm from "@/components/extended-components/ExtendedForm";
import ChequeReceivedForm from "./cheque-received-form";
import useUpdateChequeReceived from "../hooks/use-update-cheque-received";
import LoadingScreen from "@/components/reusable-component/LoadingScreen";

const UpdateChequeReceived = () => {
  const { formik, isLoading, isInitialLoading } = useUpdateChequeReceived();
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      {isInitialLoading ? <LoadingScreen /> : <ChequeReceivedForm />}
    </ExtendedForm>
  );
};

export default UpdateChequeReceived;
