import { useFormik } from "formik";
import { useGetDataQuery, usePostDataMutation } from "@/api/api";
import { apiTags } from "@/constant/tag";
import { endpoints } from "@/api/endpoints";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import { useAddModal } from "@/hooks/use-add-modal";
import QUERY_PARAMS from "@/constant/query-params";
import { UserSchemaType, UserValidationSchema } from "../schema/user-schema";
import { RoleListResponse } from "@/pages/role-permission/role/hooks/use-role-list";
import { IOption } from "@/components/form/form-input-select";

const initialValues: UserSchemaType = {
  name: "",
  email: "",
  phone: "",
  role: "",
};

const useCreateUser = () => {
  const [createUser, { isLoading }] = usePostDataMutation();
  const { handleCloseModal } = useAddModal(
    QUERY_PARAMS.user.createUser.key,
    QUERY_PARAMS.user.createUser.value,
  );

  const formik = useFormik<UserSchemaType>({
    initialValues,
    validationSchema: UserValidationSchema,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const response = (await createUser({
        url: endpoints.user.create,
        data: values,
        invalidateTag: [apiTags.user.list],
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

  const { data: roleList } = useGetDataQuery<{
    data: RoleListResponse;
  }>({ url: endpoints.role.list });

  const roles: IOption[] =
    roleList?.data?.records.map((role) => ({
      label: `${role?.label}`,
      value: role?.id,
    })) || [];

  return {
    formik,
    isLoading,
    roles,
  };
};

export default useCreateUser;
