import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { LoginFormValues, SignupFormValues } from "../types/type";
import { activateAccount, createUser, loginUser } from "./api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export const signupInputSchema = z.object({
  name: z
    .string()
    .min(4, "Name should have at least 4 characters")
    .max(15, "Name should have at most 15 characters"),
  email: z.string().min(1).email("Email format is not valid"),
  password: z
    .string()
    .min(6, "Password should have at least 6 characters")
    .max(15, "Password should have at most 15 characters"),
  // avatar: z.instanceof(FileList).optional(),
});

export const loginInputSchema = z.object({
  email: z.string().min(1).email("Email format is not valid"),
  password: z
    .string()
    .min(6, "Password should have at least 6 characters")
    .max(15, "Password should have at most 15 characters"),
  // avatar: z.instanceof(FileList).optional(),
});

export type SignupInput = z.infer<typeof signupInputSchema>;
export type LoginInput = z.infer<typeof loginInputSchema>;

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (data: SignupFormValues) => createUser(data),
    onSuccess: (data) => {
      toast.success(data.message)
    },

    onError: (error) => {
      if(error instanceof AxiosError) {
      toast.error(error.response?.data.message)
      }
    },
  });
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: (data: LoginFormValues) => loginUser(data),
    onSuccess: () => {
      toast.success("Login Success!")
    },

    onError: (error) => {
      if(error instanceof AxiosError) {
      toast.error(error.response?.data.message)
      }
    },
  });
};

export const useActivateAccount = () =>{
  return useMutation({
    mutationFn: (activation_token: string) => activateAccount(activation_token),
  })
}
