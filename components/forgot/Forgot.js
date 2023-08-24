"use client";

import Image from "next/image";
import User from "@/assets/auth/icons/user.svg";
import forgotIcon from "@/assets/auth/forgot/forgotlock.svg"
import { emailSchema } from "@/assets/yup/schema";
import { useFormik } from "formik";

const Forgot = ({ width }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: emailSchema,
    onSubmit: (values) => {
      console.log('Email:', values.email);

    },
  });
  return (
    <div className="relative px-10 py-12 bg-white  rounded-xl" style={{ width }}>
      <div className="text-[30px] ">
        <span className="flex items-center my-6 justify-center font-medium">
          <Image src={forgotIcon} width={140} alt="forgot icon" />
        </span>
        <span className="flex items-center justify-center font-medium">
          <h1 className="my-[10px] font-medium">Forgot Password</h1>
        </span>
        <span className="flex items-center justify-center">
          <p className="text-[14px]">Don’t worry we got you covered. Enter the email <br></br> address associated with this account.</p>
        </span>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-5 mt-10">
            <div className="flex items-center justify-between  gap-3 px-4 overflow-hidden bg-white border rounded-xl custom-input">
              <div className="flex w-[90%] ">
                <Image src={User} width={15} alt="user-icon" />
                <input
                  type="email"
                  placeholder="Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  name="email"
                  className="py-4 outline-none text-[16px] w-full"
                />
              </div>
            </div>

            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-[14px] mt-[-12px]">
                {formik.errors.email}
              </div>
            ) : null}
            <button type="submit" className="text-white bg-dark-orange rounded-xl text-[16px] p-3 mt-4">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forgot;
