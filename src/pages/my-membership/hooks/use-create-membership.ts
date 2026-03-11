import { usePostDataMutation } from "@/api/api";
import { useAddModal } from "@/hooks/use-add-modal";
import { useFormik } from "formik";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import QUERY_PARAMS from "@/constant/query-params";
import {
  MembershipSchemaType,
  MembershipValidationSchema,
} from "../schema/membership-schema";

const useCreateMembership = () => {
  const [createMembership, { isLoading }] = usePostDataMutation();
  const { handleCloseModal } = useAddModal(
    QUERY_PARAMS.membership.createMembership.key,
    QUERY_PARAMS.membership.createMembership.value,
  );
  const initialValues: MembershipSchemaType = {
    companyName: "",
    companyRegistrationNumber: "",
    registrationDate: "",
    panNumber: "",
    managingDirector: "",
    licenseNumber: "",
  };

  const formik = useFormik<MembershipSchemaType>({
    initialValues,
    validationSchema: MembershipValidationSchema,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const response = (await createMembership({
        url: endpoints.membership.create,
        data: values,
        invalidateTag: [apiTags.membership.details],
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

  return { formik, isLoading };
};

export default useCreateMembership;
