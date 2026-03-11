import ExtendedForm from "@/components/extended-components/ExtendedForm";
import useUpdateChartOfAccount from "../hooks/use-update-chart-of-account";
import ChartOfAccountForm from "./chart-of-account-form";
import LoadingScreen from "@/components/reusable-component/LoadingScreen";

const UpdateChartOfAccount = () => {
  const { formik, isLoading, isInitialLoading } = useUpdateChartOfAccount();
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      {isInitialLoading ? <LoadingScreen /> : <ChartOfAccountForm />}
    </ExtendedForm>
  );
};

export default UpdateChartOfAccount;
