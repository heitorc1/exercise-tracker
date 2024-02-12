import { useEffect } from "react";
import {
  Link,
  createFileRoute,
  getRouteApi,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { distinctUntilChanged, switchMap } from "rxjs";
import { loginSchema } from "@exercise-tracker/shared/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import LoginFrame from "@/components/shared/LoginFrame";
import authService from "@/services/auth";
import tokenHelper from "@/helper/token";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useAuth } from "@/context/AuthProvider";
import { toast } from "@/components/ui/use-toast";

export const Route = createFileRoute("/")({
  component: Login,
  loader: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: "/dashboard" });
    }
  },
});

type InputProps = {
  username: string;
  password: string;
};

const routeApi = getRouteApi("/");

function Login() {
  const form = useForm<InputProps>({ resolver: zodResolver(loginSchema) });
  const navigate = useNavigate();
  const auth = useAuth();
  const search = routeApi.useSearch();

  useEffect(() => {
    if (auth.user) {
      navigate({ to: search.redirect });
    }
  }, [auth.user, navigate, search.redirect]);

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
      .subscribe({
        next: (token) => {
          const userData = {
            id: token.id,
            username: token.username,
            email: token.email,
          };
          auth.login(userData);
          toast({ description: "User logged in" });
          navigate({ to: "/dashboard" });
        },
        error: () =>
          toast({ description: "Failed to login", variant: "destructive" }),
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
            <Button variant="secondary">
              <Link to="register">Register</Link>
            </Button>
            <Button>Submit</Button>
          </div>
        </form>
      </Form>
    </LoginFrame>
  );
}
