import { registerSchema } from "@exercise-tracker/shared/schemas/auth";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginFrame from "@/components/shared/LoginFrame";
import userService from "@/services/users";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

type InputProps = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const Route = createFileRoute("/register")({
  component: Register,
});

function Register() {
  const navigate = useNavigate({ from: "register" });
  const form = useForm<InputProps>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<InputProps> = (values: InputProps) => {
    const data = {
      username: values.username,
      email: values.email,
      password: values.password,
    };
    userService.createUser(data).subscribe({
      next: () => {
        toast({ description: "User created successfully" });
        navigate({ to: "/" });
      },
      error: () =>
        toast({ description: "Failed to create user", variant: "destructive" }),
    });
  };

  return (
    <LoginFrame title="Register">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" type="email" {...field} />
                </FormControl>
                <FormMessage />
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
                  <Input
                    placeholder="Password"
                    data-testid="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirm Password"
                    data-testid="confirm-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-4 flex gap-8 items-center justify-center">
            <Button className={buttonVariants({ variant: "secondary" })}>
              <Link to="/">Cancel</Link>
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </LoginFrame>
  );
}
