"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button, TextField, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
type formValues = {
  username: String;
  email: String;
  password: String;
};
//react toast notification
const notify = (errmsg: String, statusCode: Number) =>
  toast(errmsg, {
    position: "top-center",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type: statusCode == 201 ? "success" : "error",
    theme: "colored",
  });

//component
const Signup = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState } = useForm<formValues>();
  const { errors } = formState;
  const submit = async (data: formValues) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/signup", data);
      console.log(res.data);
      setLoading(false);

      notify(res.data.msg, res.data.statusCode);
    } catch (error: any) {
      console.log(error);
    }

    // const res = await sendEmailVerification();    console.log(res);
  };
  return (
    <div className="h-[89vh] flex items-center justify-center">
      <ToastContainer />
      <form
        onSubmit={handleSubmit(submit)}
        className="w-72 flex flex-col items-center"
      >
        <Typography variant="h3" className="mb-8">
          Sign Up
        </Typography>
        <TextField
          {...register("username", {
            pattern: {
              value: /^[a-zA-Z0-9]{5,}$/,
              message: "Username must be at least 5 characters",
            },
            required: {
              value: true,
              message: "Enter username.",
            },
          })}
          // id="standard-basic"
          id="standard-error-helper-text"
          label="Username"
          variant="standard"
          color={errors.username ? "error" : "primary"}
          className="w-full mt-4"
        />
        <p className="mr-auto text-xs m-0 text-red-700 mt-1">
          {errors.username?.message}
        </p>
        <TextField
          {...register("email", {
            required: {
              value: true,
              message: "Enter email.",
            },
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: "Invalid Email.",
            },
          })}
          id="standard-basic"
          label="Email"
          variant="standard"
          className="w-full mt-4"
          color={errors.email ? "error" : "primary"}
        />
        <p className="mr-auto text-xs m-0 text-red-700 mt-1">
          {errors.email?.message}
        </p>
        <TextField
          {...register("password", {
            pattern: {
              value: /^[a-zA-Z0-9@]{8,}$/,
              message: "Must contain at least 8 characters",
            },
            required: {
              value: true,
              message: "Enter password",
            },
          })}
          id="standard-basic"
          color={errors.password ? "error" : "primary"}
          label="Password"
          variant="standard"
          className="w-full mt-4"
        />
        <p className="mr-auto text-xs m-0 text-red-700 mt-1 mb-8">
          {errors.password?.message}
        </p>
        {loading ? (
          <LoadingButton
            size="medium"
            color="error"
            loading={loading}
            loadingPosition="end"
            variant="contained"
          >
            <span className="mr-6">Sign Up</span>
          </LoadingButton>
        ) : (
          <Button variant="contained" type="submit">
            Sign Up
          </Button>
        )}

        <Link href="/login" className="mt-4 block underline">
          Already have account?
        </Link>
      </form>
    </div>
  );
};

export default Signup;
