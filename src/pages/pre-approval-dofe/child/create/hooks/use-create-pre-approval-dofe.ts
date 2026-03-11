import { usePostDataMutation } from "@/api/api";
import { ApiResponse } from "@/api/api.error";
import { endpoints } from "@/api/endpoints";
import { PATH } from "@/constant/path";
import { apiTags } from "@/constant/tag";
import {
  PreApprovalDofeFormType,
  PreApprovalValidation,
} from "@/pages/pre-approval-dofe/schema/pre-approval-dofe-schema";
import { handleResponse } from "@/utils/handleResponse";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const useCreatePreApprovalDofe = () => {
  const [
    createPreApprovalDofe,
    {
      isError: isPreApprovalError,
      isLoading: isPreApprovalLoading,
      isSuccess: isPreApprovalSuccess,
    },
  ] = usePostDataMutation();
  const navigate = useNavigate();
  const initialValues: PreApprovalDofeFormType = {
    country: "",
    company: "",
    preApprovalCertificateNumber: "",
    preApprovalCertificatePDF: "",
    preApprovalDate: "",
    preApprovalValidity: "",
    preltNumber: "",
    chalaniNumber: "",
    documents: [
      {
        documentType: "",
        document: "",
      },
    ],

    temp_job_details: {
      jobTitle: "",
      male: "",
      female: "",
      basicSalaryAED: "",
      basicSalaryNPR: "",
      workingHours: "",
      workingDays: "",
      contractPeriod: "",
      workingCity: "",
      experience: false,
      years: "",
      academicQualification: "",
    },

    jobvacancy: [],

    food: false,
    accomodation: false,
    transportation: false,
    freevisa: false,
    freeticket: false,
    overtime: false,
  };

  const formik = useFormik<PreApprovalDofeFormType>({
    initialValues,
    validationSchema: PreApprovalValidation,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const formData = new FormData();

      formData.append("country", values.country);
      formData.append("company", values.company);
      formData.append(
        "preApprovalCertificateNumber",
        values.preApprovalCertificateNumber,
      );
      formData.append("preApprovalDate", values.preApprovalDate);
      formData.append("preApprovalValidity", values.preApprovalValidity);
      formData.append("preltNumber", values.preltNumber);
      formData.append("chalaniNumber", values.chalaniNumber);

      if (values.preApprovalCertificatePDF instanceof File) {
        formData.append(
          "preApprovalCertificatePDF",
          values.preApprovalCertificatePDF,
        );
      }

      values.documents?.forEach((doc, index) => {
        formData.append(`documents[${index}][documentType]`, doc.documentType);

        if (doc.document instanceof File) {
          formData.append(`documents[${index}][document]`, doc.document);
        } else if (typeof doc.document === "string") {
          formData.append(`documents[${index}][document]`, doc.document);
        }
      });

      values.jobvacancy.forEach((job, index) => {
        formData.append(`jobvacancy[${index}][jobTitle]`, job.jobTitle);
        formData.append(`jobvacancy[${index}][male]`, job.male);
        formData.append(`jobvacancy[${index}][female]`, job.female);
        formData.append(
          `jobvacancy[${index}][basicSalaryAED]`,
          job.basicSalaryAED,
        );
        formData.append(
          `jobvacancy[${index}][basicSalaryNPR]`,
          job.basicSalaryNPR,
        );
        formData.append(`jobvacancy[${index}][workingHours]`, job.workingHours);
        formData.append(`jobvacancy[${index}][workingDays]`, job.workingDays);
        formData.append(
          `jobvacancy[${index}][contractPeriod]`,
          job.contractPeriod,
        );
        formData.append(`jobvacancy[${index}][workingCity]`, job.workingCity);
        formData.append(
          `jobvacancy[${index}][experience]`,
          String(job.experience),
        );
        formData.append(`jobvacancy[${index}][years]`, job.years);
        formData.append(
          `jobvacancy[${index}][academicQualification]`,
          job.academicQualification,
        );
      });

      formData.append("food", String(values.food));
      formData.append("accomodation", String(values.accomodation));
      formData.append("transportation", String(values.transportation));
      formData.append("freevisa", String(values.freevisa));
      formData.append("freeticket", String(values.freeticket));
      formData.append("overtime", String(values.overtime));

      const response = (await createPreApprovalDofe({
        url: endpoints.preApprovalDofe.create,
        data: formData,
        invalidateTag: [apiTags.preApprovalDofe.list],
      })) as ApiResponse;

      handleResponse({
        response,
        setErrorCallBack: setErrors,
        handleOnSuccess: () => {
          resetForm();
          navigate(PATH.preApprovalDofe.index);
        },
      });
    },
  });

  return {
    formik,
    isPreApprovalError,
    isPreApprovalLoading,
    isPreApprovalSuccess,
  };
};

export default useCreatePreApprovalDofe;
