/* eslint-disable @typescript-eslint/no-explicit-any */
// import { logoutUser } from "@/store/features/authSlice";
import {
  BaseQueryApi,
  BaseQueryArg,
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "./endpoints";
import { COOKIE_CONFIG, getCookie } from "@/utils/cookie";
import { PATH } from "@/constant/path";

interface IGetDataArgs {
  url: string;
  params?: Record<string, string | number | boolean>;
  tag?: string;
}
interface IPostDataArgs {
  url: string;
  data?: any;
  options?: any;
  invalidateTag?: string[];
}
interface IUpdateDataArgs {
  url: string;
  data: any;
  options?: any;
  invalidateTag?: string[];
}

export interface IPatchDataArgs {
  url: string;
  data?: any;
  invalidateTag?: string[];
  options?: any;
}

interface IDeleteDataArgs {
  url: string;
  body?: any;
  options?: any;
  invalidateTag?: string[];
}

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API_URL,
  credentials: "include",
  prepareHeaders: async (headers) => {
    const tenantId = getCookie(COOKIE_CONFIG.tenantId);
    if (tenantId) {
      headers.set("x-tenant-id", `${tenantId}`);
    }
    headers.set("Accept", "application/json");
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn = async (
  args: BaseQueryArg<any>,
  api: BaseQueryApi,
  extraOptions: any,
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: "/user/refresh-token",
        method: "POST",
      },
      api,
      extraOptions,
    );
    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      window.location.replace(PATH.auth.login);
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Data"],
  endpoints: (builder) => ({
    getData: builder.query<any, IGetDataArgs>({
      query: ({ url, params }) => ({
        url,
        method: "GET",
        params,
      }),
      providesTags: (_, __, { tag }) =>
        tag ? [{ type: "Data", id: tag }] : [],
    }),

    postData: builder.mutation<any, IPostDataArgs>({
      query: ({ url, data, options }) => ({
        url,
        method: "POST",
        body: data,
        ...options,
      }),
      invalidatesTags: (_, __, { invalidateTag }) =>
        invalidateTag
          ? invalidateTag.map((tag: string) => ({ type: "Data", id: tag }))
          : [],
    }),

    updateData: builder.mutation<any, IUpdateDataArgs>({
      query: ({ url, data }) => ({
        url,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_, __, { invalidateTag }) =>
        invalidateTag
          ? invalidateTag.map((tag: string) => ({ type: "Data", id: tag }))
          : [],
    }),
    patchData: builder.mutation<any, IPatchDataArgs>({
      query: ({ url, data, options }) => ({
        url,
        method: "PATCH",
        body: data,
        ...options,
      }),
      invalidatesTags: (_, __, { invalidateTag }) =>
        invalidateTag
          ? invalidateTag.map((tag: string) => ({ type: "Data", id: tag }))
          : [],
    }),
    deleteData: builder.mutation<any, IDeleteDataArgs>({
      query: ({ url, body }) => ({
        url,
        method: "DELETE",
        body,
      }),
      invalidatesTags: (_, __, { invalidateTag }) =>
        invalidateTag
          ? invalidateTag.map((tag: string) => ({ type: "Data", id: tag }))
          : [],
    }),
    verifyAuth: builder.query<any, void>({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetDataQuery,
  useLazyGetDataQuery,
  usePostDataMutation,
  useUpdateDataMutation,
  useDeleteDataMutation,
  usePatchDataMutation,
} = apiSlice;
