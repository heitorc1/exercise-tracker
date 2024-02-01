import { registerSchema } from "@exercise-tracker/shared/schemas/auth";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AppFrame from "@/components/shared/AppFrame";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

type InputProps = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Profile = () => {
  const { user } = useAuth();
  const [isEdit, setIsEdit] = useState(false);

  const form = useForm<InputProps>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: user?.username ?? "",
      email: user?.email ?? "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<InputProps> = (values: InputProps) => {
    console.log(values);
  };

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <AppFrame title="Profile">
      <div className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="username"
              disabled={!isEdit}
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
              disabled={!isEdit}
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
              disabled={!isEdit}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              disabled={!isEdit}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm your password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4 flex flex-row justify-center gap-4">
              {isEdit && (
                <>
                  <Button
                    onClick={handleEdit}
                    className={buttonVariants({ variant: "destructive" })}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Submit</Button>
                </>
              )}
            </div>
          </form>
        </Form>
        {!isEdit && (
          <div className="flex flex-row justify-end max-w-xl">
            <Button onClick={handleEdit}>Edit</Button>
          </div>
        )}
      </div>
    </AppFrame>
  );
};

export default Profile;
