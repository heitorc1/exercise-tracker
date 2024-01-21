import { loginSchema } from "@exercise-tracker/shared/schemas/auth";
import { Link, useNavigate } from "react-router-dom";
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

type InputProps = {
  username: string;
  password: string;
};

const Login = () => {
  const form = useForm<InputProps>({ resolver: zodResolver(loginSchema) });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<InputProps> = (values: InputProps) => {
    const data = {
      username: values.username,
      password: values.password,
    };
    authService.login(data).subscribe({
      next: (token) => {
        tokenHelper.setToken(token);
        authService.verify(token).subscribe((res) => {
          authService.setUser({
            id: res.id,
            email: res.email,
            username: res.username,
          });
        });
        toast.success("User logged in");
        navigate("/dashboard");
      },
      error: (err) => {
        toast.error(err);
      },
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
};

export default Login;
