import { useUpdateDataMutation } from "@/api/api";
import { ApiResponse } from "@/api/api.error";
import { endpoints } from "@/api/endpoints";
import { PATH } from "@/constant/path";
import { apiTags } from "@/constant/tag";
import { useGetPreApprovalDofeDetails } from "@/pages/pre-approval-dofe/hooks/useGetPreApprovalDofeDetails";
import {
  PreApprovalDofeFormType,
  PreApprovalValidation,
} from "@/pages/pre-approval-dofe/schema/pre-approval-dofe-schema";
import { handleResponse } from "@/utils/handleResponse";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";

const useUpdatePreApprovalDofe = () => {
  const { id } = useParams();
  const [updatePreApprovalDofe, { isLoading }] = useUpdateDataMutation();
  const navigate = useNavigate();
  const { preapprovalDetails, isLoading: isInitialLoading } =
    useGetPreApprovalDofeDetails({
      id: id ?? "",
    });

  const initialValues: PreApprovalDofeFormType = {
    country: preapprovalDetails?.data?.country?.id || "",
    company: preapprovalDetails?.data?.company?.id || "",
    preApprovalCertificateNumber:
      preapprovalDetails?.data?.preApprovalCertificateNumber || "",
    preApprovalCertificatePDF:
      preapprovalDetails?.data?.preApprovalCertificatePDF || "",
    preApprovalDate: preapprovalDetails?.data?.preApprovalDate || "",
    preApprovalValidity: preapprovalDetails?.data?.preApprovalValidity || "",
    preltNumber: preapprovalDetails?.data?.preltNumber || "",
    chalaniNumber: preapprovalDetails?.data?.chalaniNumber || "",
    documents: (preapprovalDetails?.data?.documents || []).map((doc: any) => {
      return {
        documentType: doc.documentType || "pre-approval",
        document: doc.document || "",
      };
    }),

    jobvacancy: (preapprovalDetails?.data?.jobvacancy || []).map(
      (job: any) => ({
        jobTitle: job.jobTitle || "",
        male: job.male || "",
        female: job.female || "",
        basicSalaryAED: job.basicSalaryAED || "",
        basicSalaryNPR: job.basicSalaryNPR || "",
        workingHours: job.workingHours || "",
        workingDays: job.workingDays || "",
        contractPeriod: job.contractPeriod || "",
        workingCity: job.workingCity || "",
        experience: job.experience ?? false,
        years: job.years || "0",
        academicQualification: job.academicQualification || "",
      }),
    ),

    temp_job_details: {
      jobTitle: "",
      male: "",
      female: "",
      basicSalaryNPR: "",
      basicSalaryAED: "",
      contractPeriod: "",
      workingCity: "",
      workingDays: "",
      workingHours: "",
      experience: false,
      academicQualification: "",
      years: "",
    },
    edit_index: null,

    food: preapprovalDetails?.data?.food || false,
    accomodation: preapprovalDetails?.data?.accomodation || false,
    transportation: preapprovalDetails?.data?.transportation || false,
    freevisa: preapprovalDetails?.data?.freevisa || false,
    freeticket: preapprovalDetails?.data?.freeticket || false,
    overtime: preapprovalDetails?.data?.overtime || false,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: PreApprovalValidation,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors }) => {
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
      const response = (await updatePreApprovalDofe({
        data: formData,
        url: endpoints.preApprovalDofe.update.replace(":id", id ?? ""),
        invalidateTag: [
          apiTags.preApprovalDofe.list,
          apiTags.preApprovalDofe.details,
        ],
      })) as ApiResponse;
      handleResponse({
        response,
        setErrorCallBack: setErrors,
        handleOnSuccess: () => {
          navigate(PATH.preApprovalDofe.index);
        },
      });
    },
  });

  return {
    formik,
    isLoading,
    isInitialLoading,
  };
};

export default useUpdatePreApprovalDofe;
