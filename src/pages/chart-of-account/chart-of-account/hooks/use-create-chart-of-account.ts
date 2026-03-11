import { usePostDataMutation } from "@/api/api";
import {
  ChartOfAccountSchemaType,
  chartOfAccountValidation,
} from "../schema/chart-of-account-schema";
import { useFormik } from "formik";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import { useAddModal } from "@/hooks/use-add-modal";
import QUERY_PARAMS from "@/constant/query-params";

const useCreateChartOfAccount = () => {
  const [createAccount, { isLoading }] = usePostDataMutation();
  const { handleCloseModal } = useAddModal(
    QUERY_PARAMS.chartOfAccount.account.createAccount.key,
    QUERY_PARAMS.chartOfAccount.account.createAccount.value,
  );

  const initialValues: ChartOfAccountSchemaType = {
    accountName: "",
    group: "",
    code: "",
    description: "",
  };
  const formik = useFormik<ChartOfAccountSchemaType>({
    initialValues,
    validationSchema: chartOfAccountValidation,
    onSubmit: async (values, { setErrors }) => {
      const response = (await createAccount({
        url: endpoints.chartOfAccount.account.create,
        data: values,
        invalidateTag: [apiTags.chartOfAccount.account.list],
      })) as ApiResponse;
      handleResponse({
        response,
        setErrorCallBack: setErrors,
        handleOnSuccess: () => {
          handleCloseModal();
        },
      });
    },
  });
  return { formik, isLoading };
};

export default useCreateChartOfAccount;
