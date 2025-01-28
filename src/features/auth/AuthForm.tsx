import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";
import { useForm, SubmitHandler } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { IUserDTO } from "@/api/api.types";

interface AuthFormProps {
  mode: "login" | "register"; // Determines whether the form is for login or register
}

export default function AuthForm({ mode }: AuthFormProps) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IUserDTO>();
  const { login, register: signup } = useAuth();

  const loginUser = async (values: IUserDTO) => {
    const { success, message } = await login(values);
    if (success) {
      navigate("/dashboard");
    } else {
      setError("root", {
        type: "manual",
        message,
      });
    }
  };

  const registerUser = async (values: IUserDTO) => {
    const { email, name, password, password2 } = values;
    if (!name || !email || !password || !password2) {
      setError("root", {
        type: "manual",
        message: "Fill the form please",
      });
      return;
    }

    if (values.password !== values.password2) {
      setError("password2", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    const { success, message } = await signup({
      email,
      name,
      password,
      password2,
    });
    if (success) {
      navigate("/dashboard");
    } else {
      setError("root", {
        type: "manual",
        message,
      });
    }
  };

  const onSubmit: SubmitHandler<IUserDTO> = async (values: IUserDTO) => {
    if (mode == "login") loginUser(values);
    else registerUser(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            {...register("email")}
          />
        </div>
        {mode == "register" && (
          <div className="grid gap-2">
            <Label htmlFor="name">name</Label>
            <Input
              id="name"
              type="name"
              placeholder="John Doe"
              required
              {...register("name")}
            />
            {errors.name && (
              <Label className="text-red-500">{errors.name.message}</Label>
            )}
          </div>
        )}
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            {...register("password")}
          />
          {errors.password && (
            <Label className="text-red-500">{errors.password.message}</Label>
          )}
        </div>

        {mode == "register" && (
          <div className="grid gap-2">
            <Label htmlFor="password2">Confirm Password</Label>
            <Input
              id="password2"
              type="password"
              required
              {...register("password2")}
            />
            {errors.password2 && (
              <Label className="text-red-500">{errors.password2.message}</Label>
            )}
          </div>
        )}
        {errors.root && (
          <Label className="text-red-500">{errors.root.message}</Label>
        )}
        <Button type="submit" className="w-full">
          {mode == "login" ? "Login" : "Register"}
        </Button>
      </div>
    </form>
  );
}
