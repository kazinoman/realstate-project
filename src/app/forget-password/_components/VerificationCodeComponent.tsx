import React from "react";

const VerificationCodeComponent = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-primary">Enter Verification Code</h2>
      <p className="text-text-secondary mb-4">
        A verification code has been sent to your email. Please enter it below.
      </p>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Verification code"
          className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <button className="btn-primary">Verify Code</button>
      </div>
    </div>
  );
};

export default VerificationCodeComponent;
