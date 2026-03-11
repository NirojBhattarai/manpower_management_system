import ExtendedForm from "@/components/extended-components/ExtendedForm";
import LoadingScreen from "@/components/reusable-component/LoadingScreen";
import useUpdateBank from "../hooks/use-update-bank";
import BankForm from "./bank-form";

const UpdateBank = () => {
  const { formik, isLoading, isInitialLoading } = useUpdateBank();
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      {isInitialLoading ? <LoadingScreen /> : <BankForm />}
    </ExtendedForm>
  );
};

export default UpdateBank;
