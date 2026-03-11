type FormDocument = {
  type: string;
  document: File | string | null;
};
export const normalizeDocuments = (documents: any): FormDocument[] => {
  if (!documents) return [];

  const result: FormDocument[] = [];

  if (documents.citizenship?.citizenImage?.length) {
    result.push({
      type: "citizenship",
      document: documents.citizenship.citizenImage[0],
    });
  }

  if (documents.passport?.passportImage?.length) {
    result.push({
      type: "passport",
      document: documents.passport.passportImage[0],
    });
  }

  if (documents.policeReport?.policeReportImage?.length) {
    result.push({
      type: "policeReport",
      document: documents.policeReport.policeReportImage[0],
    });
  }

  return result;
};
