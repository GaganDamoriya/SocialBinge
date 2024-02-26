import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./style.css";

type FormValue = {
  username: string;
  password: string;
};

interface SignInProps {
  onSignIn: (formData: FormValue) => void;
}

const SignIn: React.FC<SignInProps> = ({ onSignIn }) => {
  const navigate = useNavigate();
  const schema = z.object({
    username: z.string().min(2),
    password: z.string().min(5).max(30),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({ resolver: zodResolver(schema) });

  const submitData = (data: FormValue) => {
    onSignIn(data);
  };

  return (
    <div className="signdiv">
      <form
        onSubmit={handleSubmit((data) => {
          submitData(data);
        })}
      >
        <span>
          <p>
            can use username - <span style={{ color: "blue" }}>test1</span> ,
            password -<span style={{ color: "blue" }}>test1</span> or create new
            from register
          </p>
        </span>
        <div className="userForm">
          <label>Username</label>
          <input type="text" placeholder="Username" {...register("username")} />
          {errors.username && (
            <span className="err_msg">{errors.username.message}</span>
          )}
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <span className="err_msg">{errors.password.message}</span>
          )}
          <input className="landing_btn" type="submit" />
          <p className="register_line" style={{ color: "grey" }}>
            Dont have an account{" "}
            <a
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              Register
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;

{
  /*  */
}
