"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/contexts/AuthContext";
import useSessionToast from "@/hooks/useSessionToast";
import { loginSchema } from "./helperfns/zodSchema";
import { Loader2 } from "lucide-react";
import { RotateCcw, RotateCw } from "@deemlol/next-icons";

export default function Home() {
  const router = useRouter();
  const { login, loading } = useAuth();
  useSessionToast();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data) => {
    const { user, success } = await login(data);

    // ---This will storage the toast session and will show on required page
    if (!success) {
      // ---reset the form and empty the fields
      form.reset();
      return;
    }

    if (success) {
      sessionStorage.setItem("showLoginToast", true);
      switch (user?.role) {
        case "admin":
          router.push("/admin/dashboard");
          break;
        case "vendor":
          router.push("/vendor/dashboard");
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col gap-3 items-center justify-center">
      <p className="text-xl text-center md:text-2xl mb-3">
        Manage your project with ease !!
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)}>
          {loading && (
            <div className=" absolute z-10 flex justify-center items-center inset-0 ">
              <RotateCw size={36} className=" w-8 h-8 text-primary" />
            </div>
          )}
          <Card className="w-full max-w-sm md:max-w-md md:min-w-[28rem] min-w-[24rem]">
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
              <CardAction>
                <Button variant="link" onClick={() => router.push("/signup")}>
                  Sign Up
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="m@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <div className="flex items-center gap-2 md:gap-0">
                        <FormLabel>Password</FormLabel>
                        <a
                          href="#"
                          className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </a>
                      </div>
                      <FormControl>
                        <Input type="password" placeholder="****" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <div className="flex items-center gap-2 justify-center">
                    <RotateCw className="animate-spin w-4 h-4" />
                    Logging in...
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
