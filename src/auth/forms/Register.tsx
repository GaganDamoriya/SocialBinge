import React from "react";
import "./style.css";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
//alternative
type FormValue = {
  username: string;
  email: string;
  password: string;
  confirmpassword: string;
};
interface RegisterProps {
  onRegister: (FormValue: any) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const navigate = useNavigate();
  const schema: ZodType<FormValue> = z
    .object({
      username: z.string().min(2),
      email: z.string().email(),
      password: z.string().min(5).max(30),
      confirmpassword: z.string().min(5).max(30),
    })
    .refine((data) => data.password === data.confirmpassword, {
      message: "password do not match",
      path: ["confirmpassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({
    resolver: zodResolver(schema),
  });

  const submitData = (data: FormValue) => {
    onRegister(data);
  };
  return (
    <div className="registerdiv">
      <form onSubmit={handleSubmit(submitData)}>
        <div className="userForm">
          <label>Username</label>
          <input type="text" placeholder="Username" {...register("username")} />
          {errors.username && (
            <span className="err_msg">{errors.username.message}</span>
          )}
          <label>Email</label>
          <input type="email" placeholder="xyz@m.com" {...register("email")} />
          {errors.email && (
            <span className="err_msg">{errors.email.message}</span>
          )}
          <label>Password</label>
          <input
            type="password"
            placeholder="•••••••••"
            {...register("password")}
          />
          {errors.password && (
            <span className="err_msg">{errors.password.message}</span>
          )}
          <label>Confirm password</label>
          <input
            type="password"
            placeholder="•••••••••"
            {...register("confirmpassword")}
          />
          {errors.confirmpassword && (
            <span className="err_msg">{errors.confirmpassword.message}</span>
          )}
          <input className="landing_btn" type="submit" />

          <p className="register_line" style={{ color: "grey" }}>
            Already have an account ?{" "}
            <a
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => navigate("/signin")}
            >
              Sign in
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
