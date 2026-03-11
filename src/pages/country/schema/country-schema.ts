import * as Yup from "yup";

const countrySchema = Yup.object().shape({
  country: Yup.string()
    .required("Country name is required")
    .min(3, "Country name must be at least 3 characters")
    .max(50, "Country name cannot exceed 50 characters"),

  currency: Yup.string()
    .required("Currency is required")
    .min(2, "Currency must be at least 2 characters")
    .max(5, "Currency cannot exceed 5 characters"),

  capital: Yup.string()
    .required("Capital city is required")
    .min(2, "Capital name must be at least 2 characters")
    .max(50, "Capital name cannot exceed 50 characters")
    .matches(
      /^[a-zA-Z\s-]+$/,
      "Capital can only contain letters, spaces and hyphens"
    ),

  language: Yup.string()
    .required("Preferred language is required")
    .min(2, "Language must be at least 2 characters")
    .max(30, "Language cannot exceed 30 characters"),
});

export type CountrySchemaType = Yup.InferType<typeof countrySchema>;
export const CountryValidationSchema = countrySchema;
