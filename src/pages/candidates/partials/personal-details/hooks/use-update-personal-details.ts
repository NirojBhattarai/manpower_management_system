import { useUpdateDataMutation } from "@/api/api";
import { ApiResponse } from "@/api/api.error";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { handleResponse } from "@/utils/handleResponse";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { useGetPersonalDetails } from "./use-personal-details-details";
import {
  PersonalDetailsSchemaType,
  PersonalDetailsValidationSchema,
} from "../schema/personal-details-schema";

export const useUpdatePersonalDetails = () => {
  const { id } = useParams();
  const [updatePersonalDetails, { isLoading }] = useUpdateDataMutation();
  const { personalDetailsData, isLoading: isInitialLoading } =
    useGetPersonalDetails({
      id: id ?? "",
    });

  const initialValues: PersonalDetailsSchemaType = {
    fullName: personalDetailsData?.data?.fullName || "",
    passportNumber: personalDetailsData?.data?.passportNumber || "",
    dateOfBirth: personalDetailsData?.data?.dateOfBirth || "",
    birthPlace: personalDetailsData?.data?.birthPlace || "",
    fatherName: personalDetailsData?.data?.fatherName || "",
    motherName: personalDetailsData?.data?.motherName || "",
    phone: personalDetailsData?.data?.phone || "",
    email: personalDetailsData?.data?.email || "",
    province: personalDetailsData?.data?.province || "",
    district: personalDetailsData?.data?.district || "",
    municipality: personalDetailsData?.data?.municipality || "",
    wardNumber: personalDetailsData?.data?.wardNumber || "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: PersonalDetailsValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors }) => {
      const response = (await updatePersonalDetails({
        data: values,
        url: endpoints.candidates.personalDetails.update.replace(
          ":id",
          id ?? "",
        ),
        invalidateTag: [
          apiTags.candidates.personalDetails.list,
          apiTags.candidates.personalDetails.details,
        ],
      })) as ApiResponse;
      handleResponse({
        response,
        setErrorCallBack: setErrors,
        handleOnSuccess: () => {},
      });
    },
  });
  const onSubmit = async () => {
    if (!formik.isValid) return false;
    return true;
  };

  return {
    formik,
    isLoading,
    isInitialLoading,
    onSubmit,
  };
};
