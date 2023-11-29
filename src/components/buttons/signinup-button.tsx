import React from "react";

export const SigninupButton: React.FC = () => {
  return (
    <button
      type="submit"
      className="px-4 py-2 tracking-wide -skew-x-6 whitespace-nowrap text-white transition-colors duration-200 transform bg-baseColor rounded-md hover:bg-baseFocusColor focus:outline-none focus:bg-baseFocusColor1"
      onClick={() => {
        window.location.href = "/auth/signin";
      }}
    >
      <span>Sign in/Sign up</span>
    </button>
  );
};
