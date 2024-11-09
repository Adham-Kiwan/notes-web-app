import React, { useState } from "react";
import useStore from "./store";

function Signup() {
  const togglePage = useStore((state) => state.togglePage);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({}); // Track validation errors

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form fields
    const newErrors = {};
    if (!formData.name) newErrors.name = "This field is required";
    if (!formData.email) newErrors.email = "This field is required";
    if (!formData.password) newErrors.password = "This field is required";

    // If there are validation errors, set them and stop form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors if the form is valid
    setErrors({});

    try {
      const response = await fetch("http://localhost:2000/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("User created successfully!");
      } else {
        setMessage(data.error || "Failed to create user");
      }
    } catch (error) {
      setMessage("Error creating user. Please try again.");
    }
  };

  return (
    <div className="flex">
      <div className="items-center bg-[#101927] text-white w-[50%] h-[100vh] flex justify-center">
        <form className="w-[95%] px-[40px]" onSubmit={handleSubmit}>
          <div>
            <h3 className="font-bold text-2xl">You've made it here!</h3>
            <br />
          </div>
          <div className="flex justify-between">
            <div className="cursor-pointer flex gap-[10px] text-white items-center bg-[#1f2937] border-white py-[8px] px-[70px] rounded-lg hover:bg-[#374050] transition duration-100 ease-in-out">
              <img src="/google.svg" className="h-[20px] w-[20px]" alt="" />
              Sign up with Google
            </div>
            <div className="cursor-pointer flex gap-[10px] text-white items-center bg-[#1f2937] border-white py-[8px] px-[70px] rounded-lg hover:bg-[#374050] transition duration-100 ease-in-out">
              <img src="/apple.svg" className="h-[20px] w-[20px]" alt="" />
              Sign up with Apple
            </div>
          </div>
          <br />
          <div className="flex items-center justify-between">
            <hr className="w-[40%] my-4 border-[#7a8595]" />
            <p className="text-[#7a8595] text-1xl">or</p>
            <hr className="w-[40%] my-4 border-[#7a8595]" />
          </div>

          <div className="flex flex-col gap-[5px]">
            <label htmlFor="name">Name</label>
            <input
              className={`bg-[#374050] rounded-lg px-[20px] py-[8px] text-white ${
                errors.name ? "border-2 border-red-500" : ""
              }`}
              id="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <br />
          <div className="flex flex-col gap-[5px]">
            <label htmlFor="email">Email</label>
            <input
              className={`bg-[#374050] rounded-lg px-[20px] py-[8px] text-white ${
                errors.email ? "border-2 border-red-500" : ""
              }`}
              id="email"
              type="text"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <br />
          <div className="flex flex-col gap-[5px]">
            <label htmlFor="password">Password</label>
            <input
              className={`bg-[#374050] rounded-lg px-[20px] py-[8px] text-white ${
                errors.password ? "border-2 border-red-500" : ""
              }`}
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <br />
          <button
            className="w-[100%] rounded-lg py-[8px] bg-blue-500"
            type="submit"
          >
            Sign up
          </button>
          <div>
            <br />
            <p>
              Already a user?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={togglePage}
              >
                Log in
              </span>
            </p>
          </div>
        </form>
      </div>
      <div className="flex flex-col justify-center gap-[20px] w-[50%] h-[100vh] bg-[#2563eb] px-[50px] py-[100px]">
        <div className="flex gap-[10px]">
          <img src="/intro logo.svg" alt="" />
          <h2 className="text-white font-bold text-3xl">NoteNest</h2>
        </div>
        <h1 className="text-white font-bold text-5xl">
          Your space to capture, organize, and prioritize notes with ease.
        </h1>
        <p className="text-white opacity-80">
          Effortlessly capture your thoughts, set priorities, and stay organized
          all in one place. With NoteNest, manage tasks, ideas, and reminders
          with simplicity and style. Your notes are always at your fingertips,
          ready whenever inspiration strikes.
        </p>

        <div className="flex items-center gap-[20px]">
          <div className="flex">
            <a
              href="#"
              className="relative -ml-2 first:ml-0 z-[5] rounded-full border-2 border-white overflow-hidden w-[45px] h-[45px] bg-[#596376]"
            >
              <img
                className="w-full h-full"
                src="https://randomuser.me/api/portraits/women/65.jpg"
                alt=""
              />
            </a>
            <a
              href="#"
              className="relative -ml-2 z-[4] rounded-full border-2 border-white overflow-hidden w-[45px] h-[45px] bg-[#596376]"
            >
              <img
                className="w-full h-full"
                src="https://randomuser.me/api/portraits/men/25.jpg"
                alt=""
              />
            </a>
            <a
              href="#"
              className="relative -ml-2 z-[3] rounded-full border-2 border-white overflow-hidden w-[45px] h-[45px] bg-[#596376]"
            >
              <img
                className="w-full h-full"
                src="https://randomuser.me/api/portraits/women/25.jpg"
                alt=""
              />
            </a>
            <a
              href="#"
              className="relative -ml-2 z-[2] rounded-full border-2 border-white overflow-hidden w-[45px] h-[45px] bg-[#596376]"
            >
              <img
                className="w-full h-full"
                src="https://randomuser.me/api/portraits/men/55.jpg"
                alt=""
              />
            </a>
          </div>
          <div className="w-[2px] h-[30px] bg-white opacity-60"></div>

          <h4 className="text-white opacity-80">Over 15.7K Happy Users</h4>
        </div>
      </div>
    </div>
  );
}

export default Signup;
