import { useFormik } from "formik";
import { useGetDataQuery, usePostDataMutation } from "@/api/api";
import { apiTags } from "@/constant/tag";
import { endpoints } from "@/api/endpoints";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import { useAddModal } from "@/hooks/use-add-modal";
import QUERY_PARAMS from "@/constant/query-params";
import {
  PermissionSchemaType,
  PermissionValidationSchema,
} from "../schema/permission-schema";
import { RoleListResponse } from "../../role/hooks/use-role-list";
import { IOption } from "@/components/form/form-input-select";

const initialValues: PermissionSchemaType = {
  role: "",
  adminAccess: false,
  permissionScopes: [],
};

const useCreatePermission = () => {
  const [createPermission, { isLoading }] = usePostDataMutation();
  const { handleCloseModal } = useAddModal(
    QUERY_PARAMS.permission.createPermission.key,
    QUERY_PARAMS.permission.createPermission.value,
  );

  const formik = useFormik<PermissionSchemaType>({
    initialValues,
    validationSchema: PermissionValidationSchema,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const response = (await createPermission({
        url: endpoints.permission.create,
        data: values,
        invalidateTag: [apiTags.permission.list],
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

export default useCreatePermission;
