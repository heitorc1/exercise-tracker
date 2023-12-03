import { registerSchema } from "@exercise-tracker/shared/schemas/auth";
import { useMutation } from "@tanstack/react-query";
import { Button, Input } from "antd";
import { Link, redirect } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import userService from "@/services/users";
import { ICreateUser } from "@/interfaces/users";
import LoginFrame from "@/components/shared/LoginFrame";
import FormGroup from "@/components/shared/Form/FormGroup";
import Form from "@/components/shared/Form";
import FormInput from "@/components/shared/Form/FormInput";

type InputProps = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InputProps>({ resolver: zodResolver(registerSchema) });

  const mutation = useMutation(
    (createUser: ICreateUser) => {
      return userService.createUser(createUser);
    },
    {
      onSuccess: () => {
        toast.success("User created successfully");
        redirect("/login");
      },
      onError: () => {
        toast.error("User not created");
      },
    }
  );

  const onSubmit: SubmitHandler<InputProps> = (values: InputProps) => {
    mutation.mutate({
      username: values.username,
      email: values.email,
      password: values.password,
    });
  };

  return (
    <LoginFrame title="Register">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInput title="Username" errorMessage={errors.username?.message}>
          <Controller
            name="username"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </FormInput>

        <FormInput title="Email" errorMessage={errors.email?.message}>
          <Controller
            name="email"
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

        <FormInput
          title="Confirm your password"
          errorMessage={errors.confirmPassword?.message}
        >
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => <Input.Password {...field} />}
          />
        </FormInput>

        <FormGroup>
          <div className="flex flex-row justify-center">
            <Link to="/">
              <Button type="text">Cancel</Button>
            </Link>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </FormGroup>
      </Form>
    </LoginFrame>
  );
};

export default Register;
