import ExtendedForm from "@/components/extended-components/ExtendedForm";
import InsuranceCompanyForm from "./insurance-company-form";
import useUpdateInsuranceCompany from "../hooks/use-update-insurance-company";
import LoadingScreen from "@/components/reusable-component/LoadingScreen";

export default function UpdateInsuranceCompany() {
  const { formik, isLoading, isInitialLoading } = useUpdateInsuranceCompany();
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      {isInitialLoading ? <LoadingScreen /> : <InsuranceCompanyForm />}
    </ExtendedForm>
  );
}
