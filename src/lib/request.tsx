import axios from "axios";
import { NextResponse } from "next/server";

export const request = axios.create({
  baseURL: 'http://127.0.0.1:8080',
});

// // Add a response interceptor
// request.interceptors.response.use(function (response) {
//   // Any status code that lie within the range of 2xx cause this function to trigger
//   // Do something with response data
//   // console.log("response", response);
//   console.log("response.data", response.data);
//   if (response.data) {
//     const code = response.data.code;
//     console.log(code);
//     if (code === 10001) {
//       console.log("code 10001")
//       NextResponse.redirect('/install')
//     }
//   }

//   return response;
// }, function (error) {
//   // Any status codes that falls outside the range of 2xx cause this function to trigger
//   // Do something with response error
//   return Promise.reject(error);
// });

export const fetcher = (url: string) => axios.get(url).then(res => res.data)
