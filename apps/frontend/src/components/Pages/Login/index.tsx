import { loginSchema } from "@exercise-tracker/shared/schemas/auth";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { Button, Input } from "antd";
import LoginFrame from "@/components/shared/LoginFrame";
import FormInput from "@/components/shared/Form/FormInput";
import FormGroup from "@/components/shared/Form/FormGroup";
import Form from "@/components/shared/Form";
import authService from "@/services/auth";
import tokenHelper from "@/helper/token";

type InputProps = {
  username: string;
  password: string;
};

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InputProps>({ resolver: zodResolver(loginSchema) });
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
