import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// API Base URL
 const USER_API = "http://localhost:3000/api/v1/resume/";
//  const USER_API = import.meta.env.VITE_REACT_APP_RESUMEAPI;

const resumeApi = createApi({
  reducerPath: "resumeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: 'include', // send cookies if needed
  }),
  endpoints: (builder) => ({
    uploadResume: builder.mutation({
      query: (formData) => {
        return {
          url: 'analyze',
          method: 'POST',
          body: formData,
        };
      },
    }),
     GenerateResume: builder.mutation({
      query: (formData) => {
        return {
          url: 'generateresume',
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});

export const { useUploadResumeMutation,useGenerateResumeMutation } = resumeApi;
export default resumeApi;
