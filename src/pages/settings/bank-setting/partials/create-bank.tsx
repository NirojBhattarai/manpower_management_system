import ExtendedForm from "@/components/extended-components/ExtendedForm";
import useCreateBank from "../hooks/use-create-bank";
import BankForm from "./bank-form";

const CreateBank = () => {
  const { formik, isLoading } = useCreateBank();

  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      <BankForm />
    </ExtendedForm>
  );
};
export default CreateBank;
