import { usePostDataMutation } from "@/api/api";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { useFormik } from "formik";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import useMembershipDetails from "./use-get-membership";
import {
  MembershipSchemaType,
  MembershipValidationSchema,
} from "../schema/membership-schema";

const useUpdateMembership = () => {
  const { handleCloseModal } = useUpdateModal();
  const [updateBank, { isLoading }] = usePostDataMutation();
  const { membershipDetails, isLoading: isInitialLoading } =
    useMembershipDetails();

  const initialValues: MembershipSchemaType = {
    companyName: membershipDetails?.data?.companyName || "",
    companyRegistrationNumber:
      membershipDetails?.data?.companyRegistrationNumber || "",
    registrationDate: membershipDetails?.data?.registrationDate || "",
    panNumber: membershipDetails?.data?.panNumber || "",
    managingDirector: membershipDetails?.data?.managingDirector || "",
    licenseNumber: membershipDetails?.data?.licenseNumber || "",
  };

  const formik = useFormik<MembershipSchemaType>({
    initialValues,
    validationSchema: MembershipValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const response = (await updateBank({
        data: values,
        url: endpoints.membership.update,
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

  return { formik, isLoading, isInitialLoading };
};
export default useUpdateMembership;
