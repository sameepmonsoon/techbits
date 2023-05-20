import React from "react";
import Logo from "../Components/Logo/Logo";

const SignUpPage = () => {
  return (
    <div className="font-sans p-10 flex flex-col sm:flex-row justify-between items-center h-screen w-screen">
      <div className="signup h-[40rem] w-[30rem] font-sans p-2 flex flex-col">
        <div className="h-20 w-full flex justify-center items-center gap-2">
          <Logo />
          <span className="w-[6rem] h-[1.6rem] text-[18px] font-[800] text-gray-600 overflow-hidden">
              TechBits
            </span>
           

        </div> <span className="flex justify-center text-[32px] font-[600] text-gray-600">Sign Up to TechBits</span>
      </div>
    </div>
  );
};

export default SignUpPage;
