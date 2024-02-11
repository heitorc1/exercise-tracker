import { useEffect } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { catchError, distinctUntilChanged, filter, of, switchMap } from "rxjs";
import { loginSchema } from "@exercise-tracker/shared/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import LoginFrame from "@/components/shared/LoginFrame";
import authService from "@/services/auth";
import tokenHelper from "@/helper/token";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useAuth } from "@/context/AuthProvider";

export const Route = createFileRoute("/")({
  component: Login,
});

type InputProps = {
  username: string;
  password: string;
};

function Login() {
  const form = useForm<InputProps>({ resolver: zodResolver(loginSchema) });
  const navigate = useNavigate({ from: "/" });
  const auth = useAuth();

  useEffect(() => {
    if (auth.user) {
      navigate({ to: "/dashboard" });
    }

    tokenHelper
      .getToken()
      .pipe(
        distinctUntilChanged(),
        filter((token) => !!token),
        switchMap((token) => authService.verify(token)),
        catchError(() => {
          tokenHelper.clearToken();
          return of(undefined);
        }),
        switchMap((token) => {
          if (token) {
            const userData = {
              id: token.id,
              username: token.username,
              email: token.email,
            };
            authService.setUser(userData);
            return of(userData);
          }
          return of(undefined);
        })
      )
      .subscribe((token) => {
        if (token) {
          const userData = {
            id: token.id,
            username: token.username,
            email: token.email,
          };
          auth.login(userData);
        }
      });
  });

  const onSubmit: SubmitHandler<InputProps> = (values: InputProps) => {
    const data = {
      username: values.username,
      password: values.password,
    };
    authService
      .login(data)
      .pipe(
        distinctUntilChanged(),
        switchMap((token) => tokenHelper.setToken(token)),
        switchMap((token) => authService.verify(token))
      )
      .subscribe((token) => {
        const userData = {
          id: token.id,
          username: token.username,
          email: token.email,
        };
        auth.login(userData);
        toast.success("User logged in");
        navigate({ to: "/dashboard" });
      });
  };

  return (
    <LoginFrame title="Login">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Username" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="pt-4 flex gap-8 items-center justify-center">
            <Button className={buttonVariants({ variant: "secondary" })}>
              <Link to="register">Register</Link>
            </Button>
            <Button>Submit</Button>
          </div>
        </form>
      </Form>
    </LoginFrame>
  );
}
