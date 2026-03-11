import { usePostDataMutation } from "@/api/api";
import { endpoints } from "@/api/endpoints";

export const useLogout = () => {
  const [logoutMutation, { data, isLoading, isError, error, isSuccess }] =
    usePostDataMutation();
  const logout = async () => {
    try {
      const response = await logoutMutation({
        url: endpoints.logout,
        data: {},
      }).unwrap();
      return response;
    } catch (err) {
      console.error("Logout failed:", err);
      throw err;
    }
  };

  return {
    logout,
    data,
    isLoading,
    isError,
    error,
    isSuccess,
  };
};

export default useLogout;
