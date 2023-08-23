"use client";
import { useState } from "react";
import { useFormik } from "formik";
import Image from "next/image";
import Hidden from "@/assets/auth/icons/hidden.svg";
import Google from "@/assets/auth/icons/google.svg";
import Show from "@/assets/auth/icons/show.svg";
import { ValidationSchema } from "@/assets/yup/schema";
import { useRouter } from "next/navigation";

const Signup = ({ width, callBack }) => {
  const router = useRouter();
  const [hidden, setHidden] = useState(true);

  const onFormSubmit = async (userData) => {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (data.message) {
      if (callBack) {
        callBack();
      } else router.push("login");
    } else if (data.error) {
      alert(data.error);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      onFormSubmit(values);
    },
  });

  return (
    <div className="px-10 py-8 bg-white login rounded-xl" style={{ width }}>
      <div className="text-[30px] font-medium">
        <h1 className="mb-[20px]">Sign Up</h1>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col overflow-hidden bg-white ">
            <div className="flex items-center justify-between w-full gap-3 px-4 border rounded-xl custom-input">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="py-3 outline-none text-[16px] w-full"
              />
            </div>
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="text-red-500 text-[12px] mt-1">
                {formik.errors.firstName}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col overflow-hidden bg-white custom-input">
            <div className="flex items-center justify-between w-full gap-3 px-4 border rounded-xl">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="py-3 outline-none text-[16px] w-full"
              />
            </div>
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="text-red-500 text-[12px] mt-1">
                {formik.errors.lastName}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col overflow-hidden bg-white custom-input">
            <div className="flex items-center justify-between w-full gap-3 px-4 border rounded-xl">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="py-3 outline-none text-[16px] w-full"
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-[12px] mt-1">
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col overflow-hidden bg-white custom-input">
            <div className="flex items-center justify-between w-full gap-3 px-4 border rounded-xl">
              <div className="flex w-[90%] gap-3">
                <input
                  type={hidden ? "password" : "text"}
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="password"
                  className="py-3 outline-none text-[16px] w-full"
                />
              </div>
              <Image
                src={hidden ? Hidden : Show}
                width={15}
                alt="hidden-icon"
                onClick={() => setHidden(!hidden)}
                className="cursor-pointer"
              />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-[12px] mt-1">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="text-white bg-dark-orange rounded-xl text-[16px] p-3"
          >
            Create Account
          </button>
          <div className="flex items-center justify-between">
            <div className="h-[1px] w-[45%] bg-[#ABABAB]"></div>
            <p className="text-[16px] text-[#ABABAB]">or</p>
            <div className="h-[1px] w-[45%]  bg-[#ABABAB]"></div>
          </div>
          <button className="bg-white flex gap-3 border justify-center items-center  rounded-xl text-[16px] p-3">
            <Image src={Google} width={20} alt="google-icon" />{" "}
            <p className="tex-[16px] text-[#ABABAB]">Continue with Google</p>
          </button>
          <div className="flex justify-center mt-10">
            <p className="text-[15px]">
              Already have an account?{" "}
              <span className="text-dark-orange">Login</span>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
