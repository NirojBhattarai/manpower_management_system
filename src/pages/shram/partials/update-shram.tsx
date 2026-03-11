import ExtendedForm from "@/components/extended-components/ExtendedForm";
import LoadingScreen from "@/components/reusable-component/LoadingScreen";
import useUpdateShram from "../hooks/use-update-shram";
import ShramForm from "./shram-form";

const UpdateShram = () => {
  const { formik, isInitialLoading, isLoading } = useUpdateShram();
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      {isInitialLoading ? <LoadingScreen /> : <ShramForm />}
    </ExtendedForm>
  );
};

export default UpdateShram;
