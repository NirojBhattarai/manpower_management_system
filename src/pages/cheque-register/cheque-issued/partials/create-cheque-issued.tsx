import ExtendedForm from "@/components/extended-components/ExtendedForm";
import ChequeIssuedForm from "./cheque-issued-form";
import useCreateChequeIssued from "../hooks/use-create-cheque-issued";

const CreateChequeIssued = () => {
  const { formik, isLoading } = useCreateChequeIssued();

  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      <ChequeIssuedForm />
    </ExtendedForm>
  );
};

export default CreateChequeIssued;
