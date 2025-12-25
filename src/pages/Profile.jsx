// src/pages/Profile.jsx
import Navbar from "../components/Navbar";

const Profile = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <Navbar />
      <div className="pt-24 max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Profile Page</h1>
        <p className="text-gray-600">
          This page is protected. User information will be displayed here.
        </p>
      </div>
    </div>
  );
};

export default Profile;
