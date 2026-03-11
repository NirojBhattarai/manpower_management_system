import { usePostDataMutation } from "@/api/api";
import { ApiResponse } from "@/api/api.error";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { handleResponse } from "@/utils/handleResponse";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { useGetPersonalDocumentDetails } from "./use-details-personal-document";
import {
  PersonalDocumentSchemaType,
  PersonalDocumentValidationSchema,
} from "../schema/personal-document-schema";

const appendIfExists = (formData: FormData, key: string, value: any) => {
  if (value === undefined || value === null || value === "") return;
  formData.append(key, value);
};

const appendFileArray = (
  formData: FormData,
  key: string,
  files: (File | string)[],
) => {
  if (!files?.length) return;
  files.forEach((file) => formData.append(`${key}[]`, file));
};

const buildFormData = (values: PersonalDocumentSchemaType) => {
  const formData = new FormData();

  if (
    values.citizenship.citizenshipNo ||
    values.citizenship.citizenImage.length
  ) {
    appendIfExists(formData, "citizenship.documentType", "citizenship");
    appendIfExists(
      formData,
      "citizenship.citizenshipNo",
      values.citizenship.citizenshipNo,
    );
    appendIfExists(
      formData,
      "citizenship.issueDate",
      values.citizenship.issueDate,
    );
    appendFileArray(
      formData,
      "citizenship.citizenImage",
      values.citizenship.citizenImage,
    );
  }

  if (values.passport.passportNo || values.passport.passportImage.length) {
    appendIfExists(formData, "passport.documentType", "passport");
    appendIfExists(formData, "passport.passportNo", values.passport.passportNo);
    appendIfExists(formData, "passport.issueDate", values.passport.issueDate);
    appendIfExists(formData, "passport.expiryDate", values.passport.expiryDate);
    appendFileArray(
      formData,
      "passport.passportImage",
      values.passport.passportImage,
    );
  }

  if (values.policeReport.dispatchNo || values.policeReport.policeReportImage) {
    appendIfExists(formData, "policeReport.documentType", "policeReport");
    appendIfExists(
      formData,
      "policeReport.dispatchNo",
      values.policeReport.dispatchNo,
    );
    appendIfExists(
      formData,
      "policeReport.issueDate",
      values.policeReport.issueDate,
    );
    appendIfExists(
      formData,
      "policeReport.policeReportImage",
      values.policeReport.policeReportImage,
    );
  }

  return formData;
};

export const useUpdatePersonalDocument = () => {
  const { id } = useParams<{ id: string }>();
  const [updatePersonalDocument, { isLoading }] = usePostDataMutation();
  const { personalDocumentDetails, isLoading: isInitialLoading } =
    useGetPersonalDocumentDetails({ id: id ?? "" });

  const initialValues: PersonalDocumentSchemaType = {
    documentType: personalDocumentDetails?.data?.documentType ?? "citizenship",
    citizenship: {
      documentType:
        personalDocumentDetails?.data?.citizenship?.documentType ??
        "citizenship",
      citizenImage:
        personalDocumentDetails?.data?.citizenship?.citizenImage ?? [],
      citizenshipNo:
        personalDocumentDetails?.data?.citizenship?.citizenshipNo ?? "",
      issueDate: personalDocumentDetails?.data?.citizenship?.issueDate ?? "",
    },
    passport: {
      documentType:
        personalDocumentDetails?.data?.passport?.documentType ?? "passport",
      passportImage:
        personalDocumentDetails?.data?.passport?.passportImage ?? [],
      passportNo: personalDocumentDetails?.data?.passport?.passportNo ?? "",
      issueDate: personalDocumentDetails?.data?.passport?.issueDate ?? "",
      expiryDate: personalDocumentDetails?.data?.passport?.expiryDate ?? "",
    },
    policeReport: {
      documentType:
        personalDocumentDetails?.data?.policeReport?.documentType ??
        "policeReport",
      policeReportImage:
        personalDocumentDetails?.data?.policeReport?.policeReportImage ?? "",
      issueDate: personalDocumentDetails?.data?.policeReport?.issueDate ?? "",
      dispatchNo: personalDocumentDetails?.data?.policeReport?.dispatchNo ?? "",
    },
  };

  const formik = useFormik<PersonalDocumentSchemaType>({
    initialValues,
    validationSchema: PersonalDocumentValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors }) => {
      try {
        const formData = buildFormData(values);

        const response = (await updatePersonalDocument({
          url: endpoints.candidates.personalDocument.update.replace(
            ":id",
            id ?? "",
          ),
          data: formData,
          invalidateTag: [
            apiTags.candidates.personalDocument.list,
            apiTags.candidates.personalDocument.details,
          ],
        })) as ApiResponse;

        handleResponse({
          response,
          setErrorCallBack: setErrors,
          handleOnSuccess: () => {
            formik.resetForm();
          },
        });
      } catch (error) {
        console.error("Update Personal Document Error:", error);
      }
    },
  });

  const onSubmit = async () => {
    await formik.submitForm();
    return formik.isValid;
  };

  return {
    formik,
    onSubmit,
    isLoading,
    isInitialLoading,
  };
};
