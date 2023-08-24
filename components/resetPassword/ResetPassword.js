"use client";
import { useState } from "react";
import Image from "next/image";
import reseticon from "@/assets/auth/forgot/reset.svg"
import Lock from "@/assets/auth/icons/lock.svg";
import Hidden from "@/assets/auth/icons/hidden.svg";
import { useFormik } from "formik";
import { resetPassSchema } from "@/assets/yup/schema";

const ResetPassword = ({ width }) => {
  const [hidden, setHidden] = useState(true);

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: resetPassSchema,
    onSubmit: (values) => {
      console.log('Password:', values.password);
    },
  });


  return (
    <div className="relative px-10 py-12 bg-white  rounded-xl" style={{ width }}>
      <div className="text-[30px] ">
        <span className="flex items-center my-6 justify-center font-medium">
          <Image src={reseticon} width={100} alt="forgot icon" />
        </span>
        <span className="flex items-center justify-center font-medium">
          <h1 className="my-[10px] font-medium">Reset Password</h1>
        </span>
        <span className="flex items-center justify-center">
          <p className="text-[14px]">Set a new password to enable you continue with your login process</p>
        </span>
        <form onSubmit={formik.handleSubmit}>
          <div className="gap-5 mt-10">
            <div className="flex flex-col overflow-hidden bg-white custom-input my-5">
              <div className="flex items-center justify-between gap-3 px-4 border rounded-xl">
                <div className="flex w-[90%] gap-3">
                  <input
                    type={hidden ? "password" : "text"}
                    placeholder="Password"
                    id="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    name="password"
                    className="py-3 outline-none text-[16px] w-full"
                  />
                  <Image
                    src={hidden ? Hidden : Show}
                    width={15}
                    alt="hidden-icon"
                    onClick={() => setHidden(!hidden)}
                    className="cursor-pointer"
                  />
                </div>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-[12px] mt-1">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col overflow-hidden bg-white custom-input">
              <div className="flex items-center justify-between gap-3 px-4 border rounded-xl">
                <div className="flex w-[90%] gap-3">
                  <input
                    type={hidden ? "password" : "text"}
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    name="confirmPassword"
                    className="py-3 outline-none text-[16px] w-full"
                  />
                  <Image
                    src={hidden ? Hidden : Show}
                    width={15}
                    alt="hidden-icon"
                    onClick={() => setHidden(!hidden)}
                    className="cursor-pointer"
                  />
                </div>
              </div>
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div className="text-red-500 text-[12px] mt-1">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>

            {/* <div className="flex items-center justify-between gap-3 px-4 overflow-hidden bg-white border  rounded-xl custom-input">
              <div className="flex flex-col overflow-hidden bg-white custom-input">
                <div className="flex w-[90%] gap-3">
                  <input
                    type={hidden ? "password" : "text"}
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    name="confirmPassword"
                    className="py-3 outline-none text-[16px] w-full"
                  />
                  <Image
                    src={hidden ? Hidden : Show}
                    width={15}
                    alt="hidden-icon"
                    onClick={() => setHidden(!hidden)}
                    className="cursor-pointer"
                  />
                </div>
              </div>
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div className="text-red-500 text-[12px] mt-1">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div> */}
          </div>
        </form>
        <div className="flex flex-col gap-5">
          <button className="text-white bg-dark-orange rounded-xl text-[16px] my-4 p-3" >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
