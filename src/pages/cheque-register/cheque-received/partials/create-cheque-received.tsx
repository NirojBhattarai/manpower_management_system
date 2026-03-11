import ExtendedForm from "@/components/extended-components/ExtendedForm";
import ChequeReceivedForm from "./cheque-received-form";
import useCreateChequeReceived from "../hooks/use-create-cheque-received";

const CreateChequeReceived = () => {
  const { formik, isLoading } = useCreateChequeReceived();
  console.log(formik.errors, "Errors");
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      <ChequeReceivedForm />
    </ExtendedForm>
  );
};

export default CreateChequeReceived;
