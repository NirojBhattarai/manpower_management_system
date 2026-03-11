import ExtendedForm from "@/components/extended-components/ExtendedForm";
import useUpdateCountry from "../hooks/use-update-country";
import LoadingScreen from "@/components/reusable-component/LoadingScreen";
import CountryForm from "./country-form";

const UpdateCountry = () => {
  const { formik, isLoading, isInitialLoading } = useUpdateCountry();
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      {isInitialLoading ? <LoadingScreen /> : <CountryForm />}
    </ExtendedForm>
  );
};

export default UpdateCountry;
