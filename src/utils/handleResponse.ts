import handleErrors, { ApiResponse, SetErrorCallback } from "@/api/api.error";
import { showErrorMessage, showSuccessMessage } from "./toast";

type NormalizedResponse =
  | { type: "success"; message?: string }
  | { type: "field-error"; errors: Record<string, string>[] }
  | { type: "error"; message: string };

export function normalizeResponse(response: ApiResponse): NormalizedResponse {
  if (response?.error?.data?.errors) {
    return {
      type: "field-error",
      errors: response.error.data.errors,
    };
  }

  if (response?.error?.data?.message) {
    return {
      type: "error",
      message: response.error.data.message,
    };
  }

  return {
    type: "success",
    message: response?.data?.message,
  };
}

interface IProps {
  response: ApiResponse;
  setErrorCallBack: SetErrorCallback;
  handleOnSuccess: () => void;
}

export const handleResponse = ({
  response,
  setErrorCallBack,
  handleOnSuccess,
}: IProps) => {
  const result = normalizeResponse(response);

  switch (result.type) {
    case "success":
      if (result.message) {
        showSuccessMessage(result.message);
      }
      handleOnSuccess();
      break;

    case "error":
      showErrorMessage(result.message);
      break;

    case "field-error":
      handleErrors(response, setErrorCallBack);
      break;
  }
};
