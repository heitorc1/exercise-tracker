import { loginSchema } from "@exercise-tracker/shared/schemas/auth";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { Button, Input } from "antd";
import LoginFrame from "@/components/shared/LoginFrame";
import { ILogin } from "@/interfaces/login";
import authService from "@/services/auth";
import { useAuth } from "@/hooks/useAuth";
import { IUser } from "@/interfaces/users";
import FormInput from "@/components/shared/Form/FormInput";
import FormGroup from "@/components/shared/Form/FormGroup";
import Form from "@/components/shared/Form";

type InputProps = {
  username: string;
  password: string;
};

const Login = () => {
  const { login } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InputProps>({ resolver: zodResolver(loginSchema) });

  const mutation = useMutation(
    async (data: ILogin) => authService.login(data),
    {
      onSuccess: (data: IUser | null) => {
        login(data);
        toast.success("User logged in");
      },
      onError: () => {
        toast.error("Incorrect data provided");
      },
    }
  );

  const onSubmit: SubmitHandler<InputProps> = (values: InputProps) => {
    mutation.mutate({
      username: values.username,
      password: values.password,
    });
  };

  return (
    <LoginFrame title="Login">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInput title="Username" errorMessage={errors.username?.message}>
          <Controller
            name="username"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </FormInput>

        <FormInput title="Password" errorMessage={errors.password?.message}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => <Input.Password {...field} />}
          />
        </FormInput>

        <FormGroup>
          <Link to="register">
            <Button type="text">Register</Button>
          </Link>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </FormGroup>
      </Form>
    </LoginFrame>
  );
};

export default Login;
