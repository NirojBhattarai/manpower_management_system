import ExtendedForm from "@/components/extended-components/ExtendedForm";
import LoadingScreen from "@/components/reusable-component/LoadingScreen";
import useUpdateIndustry from "../hooks/use-update-industry";
import IndustryForm from "./industry-form";

export default function UpdateIndustry() {
  const { formik, isLoading, isInitialLoading } = useUpdateIndustry();
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      {isInitialLoading ? <LoadingScreen /> : <IndustryForm />}
    </ExtendedForm>
  );
}
