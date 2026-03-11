import ExtendedForm from "@/components/extended-components/ExtendedForm";
import OrientationInstituteForm from "./orientation-institute-form";
import LoadingScreen from "@/components/reusable-component/LoadingScreen";
import useUpdateOrientationInstitute from "../hooks/use-update-orientation-insttitute";

export default function UpdateOrientationInstitute() {
  const { formik, isLoading, isInitialLoading } =
    useUpdateOrientationInstitute();
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      {isInitialLoading ? <LoadingScreen /> : <OrientationInstituteForm />}
    </ExtendedForm>
  );
}
