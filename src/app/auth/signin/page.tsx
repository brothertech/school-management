import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | MySchool - School Management System",
  description: "Sign in to access your MySchool dashboard",
};

export default function SignIn() {
  return <SignInForm />;
}