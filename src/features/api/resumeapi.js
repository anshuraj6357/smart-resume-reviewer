import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// API Base URL
const USER_API = "http://localhost:5000/api/v1/resume/";

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
  }),
});

export const { useUploadResumeMutation } = resumeApi;
export default resumeApi;
