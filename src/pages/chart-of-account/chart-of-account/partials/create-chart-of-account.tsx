import ExtendedForm from "@/components/extended-components/ExtendedForm";
import ChartOfAccountForm from "./chart-of-account-form";
import useCreateChartOfAccount from "../hooks/use-create-chart-of-account";

const CreateChartOfAccount = () => {
  const chartOfAccount = useCreateChartOfAccount();

  return (
    <ExtendedForm
      formik={chartOfAccount.formik}
      isSubmitting={chartOfAccount.isLoading}
    >
      <ChartOfAccountForm />
    </ExtendedForm>
  );
};

export default CreateChartOfAccount;
