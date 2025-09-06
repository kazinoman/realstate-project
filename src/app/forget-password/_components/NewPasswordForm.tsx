import React from "react";

const NewPasswordForm = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-primary">Set New Password</h2>
      <p className="text-text-secondary mb-4">Enter your new password below.</p>
      <div className="flex flex-col space-y-4">
        <input
          type="password"
          placeholder="New password"
          className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <input
          type="password"
          placeholder="Confirm password"
          className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <button className="btn-primary">Reset Password</button>
      </div>
    </div>
  );
};

export default NewPasswordForm;
