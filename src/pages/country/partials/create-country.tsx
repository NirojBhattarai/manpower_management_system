import ExtendedForm from "@/components/extended-components/ExtendedForm";
import useCreateCountry from "../hooks/use-create-country";
import CountryForm from "./country-form";

const CreateCountry = () => {
  const { formik, isLoading } = useCreateCountry();
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      <CountryForm />
    </ExtendedForm>
  );
};
export default CreateCountry;
