"use client";

import React from "react";

const EnterEmailAddress = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-primary">Enter Your Email</h2>
      <p className="text-text-secondary mb-4">Please provide your email address to receive a verification code.</p>
      <div className="flex flex-col space-y-4">
        <input
          type="email"
          placeholder="Email address"
          className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <button className="btn-primary">Send Verification Code</button>
      </div>
    </div>
  );
};

export default EnterEmailAddress;
