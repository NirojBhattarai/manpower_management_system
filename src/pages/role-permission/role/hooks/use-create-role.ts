import { useFormik } from "formik";
import { usePostDataMutation } from "@/api/api";
import { apiTags } from "@/constant/tag";
import { endpoints } from "@/api/endpoints";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import { useAddModal } from "@/hooks/use-add-modal";
import { RoleSchemaType, RoleValidationSchema } from "../schema/role-schema";
import QUERY_PARAMS from "@/constant/query-params";

const initialValues: RoleSchemaType = {
  label: "",
};

const useCreateRole = () => {
  const [createRole, { isLoading }] = usePostDataMutation();
  const { handleCloseModal } = useAddModal(
    QUERY_PARAMS.role.createRole.key,
    QUERY_PARAMS.role.createRole.value,
  );

  const formik = useFormik<RoleSchemaType>({
    initialValues,
    validationSchema: RoleValidationSchema,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const response = (await createRole({
        url: endpoints.role.create,
        data: values,
        invalidateTag: [apiTags.role.list],
      })) as ApiResponse;
      handleResponse({
        response,
        setErrorCallBack: setErrors,
        handleOnSuccess: () => {
          resetForm();
          handleCloseModal();
        },
      });
    },
  });

  return {
    formik,
    isLoading,
  };
};

export default useCreateRole;
