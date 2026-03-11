import ExtendedForm from "@/components/extended-components/ExtendedForm";
import LoadingScreen from "@/components/reusable-component/LoadingScreen";
import useUpdateVisa from "../hooks/use-update-visa";
import VisaForm from "./visa-form";

const UpdateVisa = () => {
  const { formik, isInitialLoading, isLoading } = useUpdateVisa();
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      {isInitialLoading ? <LoadingScreen /> : <VisaForm />}
    </ExtendedForm>
  );
};

export default UpdateVisa;
