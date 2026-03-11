import { usePostDataMutation } from "@/api/api";
import { useFormik } from "formik";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import { useAddModal } from "@/hooks/use-add-modal";
import {
  ChartOfGroupSchemaType,
  chartOfGroupValidation,
} from "../schema/chart-of-group-schema";
import QUERY_PARAMS from "@/constant/query-params";

const useCreateChartOfAccount = () => {
  const [createAccount, { isLoading }] = usePostDataMutation();
  const { handleCloseModal } = useAddModal(
    QUERY_PARAMS.chartOfAccount.group.createGroup.key,
    QUERY_PARAMS.chartOfAccount.group.createGroup.value,
  );

  const initialValues: ChartOfGroupSchemaType = {
    groupName: "",
    description: "",
    under: "",
  };
  const formik = useFormik<ChartOfGroupSchemaType>({
    initialValues,
    validationSchema: chartOfGroupValidation,
    onSubmit: async (values, { setErrors }) => {
      const response = (await createAccount({
        url: endpoints.chartOfAccount.group.create,
        data: values,
        invalidateTag: [apiTags.chartOfAccount.group.list],
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
