import API from "@/lib/axios-client";

type registerType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
type LoginType = {
  email: string;
  password: string;
};
export const registerMutationFn = async (data: registerType) => {
  return await API.post("/auth/register", data);
};
export const loginMutationFn = async (data: LoginType) =>
  await API.post("/auth/login", data);
