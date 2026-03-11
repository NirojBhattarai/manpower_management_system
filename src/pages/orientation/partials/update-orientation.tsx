import ExtendedForm from "@/components/extended-components/ExtendedForm";
import LoadingScreen from "@/components/reusable-component/LoadingScreen";
import useUpdateOrientation from "../hooks/use-update-orientation";
import OrientationForm from "./orientation-form";

const UpdateOrientation = () => {
  const { formik, isInitialLoading, isLoading } = useUpdateOrientation();
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      {isInitialLoading ? <LoadingScreen /> : <OrientationForm />}
    </ExtendedForm>
  );
};

export default UpdateOrientation;
