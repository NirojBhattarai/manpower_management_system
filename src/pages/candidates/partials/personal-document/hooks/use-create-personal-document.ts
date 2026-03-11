import { usePostDataMutation } from "@/api/api";
import { ApiResponse } from "@/api/api.error";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { handleResponse } from "@/utils/handleResponse";
import { useFormik } from "formik";
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

const buildFormData = (
  values: PersonalDocumentSchemaType,
  jobSeekerId: string,
) => {
  const formData = new FormData();
  formData.append("jobseeker", jobSeekerId);

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

const useCreatePersonalDocument = () => {
  const [createPersonalDocument, { isError, isLoading, isSuccess }] =
    usePostDataMutation();
  const jobSeekerId = localStorage.getItem("jobSeekerId") || "";

  const initialValues: PersonalDocumentSchemaType = {
    documentType: "",
    citizenship: {
      documentType: "citizenship",
      citizenImage: [],
      citizenshipNo: "",
      issueDate: "",
    },
    passport: {
      documentType: "passport",
      passportImage: [],
      passportNo: "",
      issueDate: "",
      expiryDate: "",
    },
    policeReport: {
      documentType: "policeReport",
      policeReportImage: "",
      issueDate: "",
      dispatchNo: "",
    },
  };

  const formik = useFormik<PersonalDocumentSchemaType>({
    initialValues,
    validationSchema: PersonalDocumentValidationSchema,
    onSubmit: async (values, { setErrors }) => {
      try {
        const formData = buildFormData(values, jobSeekerId);

        const response = (await createPersonalDocument({
          url: endpoints.candidates.personalDocument.create,
          data: formData,
          invalidateTag: [apiTags.candidates.personalDocument.list],
        })) as ApiResponse;

        handleResponse({
          response,
          setErrorCallBack: setErrors,
          handleOnSuccess: () => {
            formik.resetForm();
          },
        });
      } catch (error) {
        console.error("Create Personal Document Error:", error);
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
    isPersonalDocumentError: isError,
    isPersonalDocumentLoading: isLoading,
    isPersonalDocumentSuccess: isSuccess,
  };
};

export default useCreatePersonalDocument;
