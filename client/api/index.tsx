import axios from "axios";

const base = process.env.NEXT_PUBLIC_API_ENDPOINT;

const userBase = `${base}/api/user`;
const authBase = `${base}/api/auth/login`;
const videoBase = `${base}/api/video`;

export function registerUser(payload: {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}) {
  return axios.post(`${userBase}/register`, payload).then((res) => res.data);
}

export function loginUser(payload: { email: string; password: string }) {
  return axios
    .post(authBase, payload, { withCredentials: true })
    .then((res) => res.data);
}

export function getMe() {
  return axios
    .get(`${userBase}/me`, { withCredentials: true })
    .then((res) => res.data)
    .catch(() => null);
}

export function uploadVideo({
  formData,
  config,
}: {
  formData: FormData;
  config: { onUploadProgress: (progressEvent: ProgressEvent) => void };
}) {
  return axios
    .post(videoBase, formData, {
      withCredentials: true,
      ...config,
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
}

export function updateVideo({
  videoId,
  ...payload
}: {
  videoId: string;
  title: string;
  description: string;
  published: boolean;
}) {
  return axios.patch(`${videoBase}/${videoId}`, payload, {
    withCredentials: true,
  });
}

export function getVideos() {
  return axios.get(videoBase).then((res) => res.data);
}
