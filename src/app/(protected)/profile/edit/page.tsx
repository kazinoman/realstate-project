import React from "react";
import EditProfileForm from "@/components/pageComponent/profile/EditProfile";
import UpdateUserPassword from "@/components/pageComponent/profile/UpdatePassword";

const EditProfilePage = () => {
  return (
    <div className="flex flex-col gap-4">
      <EditProfileForm />

      <UpdateUserPassword />
    </div>
  );
};

export default EditProfilePage;
