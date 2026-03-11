import ExtendedForm from "@/components/extended-components/ExtendedForm";
import InsuranceCompanyForm from "./insurance-company-form";
import useCreateInsuranceCompany from "../hooks/use-create-insurance-company";

const CreateInsuranceCompany = () => {
  const { formik, isLoading } = useCreateInsuranceCompany();

  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      <InsuranceCompanyForm />
    </ExtendedForm>
  );
};
export default CreateInsuranceCompany;
