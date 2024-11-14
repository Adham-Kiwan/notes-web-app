import React, { useState } from "react";
import useStore from "./store";

function Login() {
  const togglePage = useStore((state) => state.togglePage);
  const setLoggedIn = useStore((state) => state.setLoggedIn);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New state to track loading status

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.email) newErrors.email = "This field is required";
    if (!formData.password) newErrors.password = "This field is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true); // Set loading to true when starting the request

    try {
      const response = await fetch("http://localhost:2000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Login successful!");
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name); // Store user name
        setLoggedIn(); // Redirect to main page after login
      } else {
        setMessage(data.error || "Login failed");
      }
    } catch (error) {
      setMessage("Error logging in. Please try again.");
    } finally {
      setIsLoading(false); // Set loading to false after the request is done
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="items-center bg-[#101927] text-white w-full lg:w-[50%] h-[100vh] lg:h-auto flex justify-center">
        <form
          className="w-full lg:w-[95%] px-4 lg:px-[40px]"
          onSubmit={handleSubmit}
        >
          <div>
            <h3 className="font-bold text-xl lg:text-2xl">Welcome back</h3>
            <br />
          </div>
          <div className="flex flex-col lg:flex-row gap-4 lg:justify-between">
            <div className="cursor-pointer flex gap-[10px] text-white items-center bg-[#1f2937] py-[8px] px-[30px] lg:px-[70px] rounded-lg hover:bg-[#374050] transition duration-100 ease-in-out">
              <img src="/google.svg" className="h-[20px] w-[20px]" alt="" />
              Log in with Google
            </div>
            <div className="cursor-pointer flex gap-[10px] text-white items-center bg-[#1f2937] py-[8px] px-[30px] lg:px-[70px] rounded-lg hover:bg-[#374050] transition duration-100 ease-in-out">
              <img src="/apple.svg" className="h-[20px] w-[20px]" alt="" />
              Log in with Apple
            </div>
          </div>
          <br />
          <div className="flex items-center justify-between">
            <hr className="w-[40%] my-4 border-[#7a8595]" />
            <p className="text-[#7a8595] text-lg">or</p>
            <hr className="w-[40%] my-4 border-[#7a8595]" />
          </div>
          <div className="flex flex-col gap-[5px]">
            <label htmlFor="email">Email</label>
            <input
              className={`bg-[#374050] rounded-lg px-4 py-[8px] text-white ${
                errors.email ? "border-2 border-red-500" : ""
              }`}
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <br />
          <div className="flex flex-col gap-[5px]">
            <label htmlFor="password">Password</label>
            <input
              className={`bg-[#374050] rounded-lg px-4 py-[8px] text-white ${
                errors.password ? "border-2 border-red-500" : ""
              }`}
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <br />
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="flex items-center gap-[5px]">
              <input
                className=" h-[15px] w-[15px] border-2 bg-transparent rounded-md checked:bg-blue-500"
                id="checkbox"
                type="checkbox"
              />
              <label className="text-white" htmlFor="checkbox">
                Remember me
              </label>
            </div>
            <a href="#" className="text-blue-500 cursor-pointer mt-2 lg:mt-0">
              Forgot password?
            </a>
          </div>
          <br />
          <button
            className="w-full rounded-lg py-[8px] bg-blue-500"
            type="submit"
            disabled={isLoading} // Disable the button while loading
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>
          {message && (
            <p className="text-red-500 text-sm mt-2">Invalid credentials!</p>
          )}
          <div>
            <br />
            <p>
              Don't have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={togglePage}
              >
                Sign up
              </span>
            </p>
          </div>
        </form>
      </div>
      <div className="flex flex-col justify-center items-center gap-4 lg:gap-[20px] w-full lg:w-[50%] h-[100vh] bg-[#2563eb] p-4 lg:px-[50px] lg:py-[100px]">
        <div className="flex gap-[10px] w-full">
          <img src="/intro logo.svg" alt="" />
          <h2 className="text-white font-bold text-2xl lg:text-3xl">
            NoteNest
          </h2>
        </div>
        <h1 className="text-white font-bold text-3xl lg:text-5xl text-center lg:text-left">
          Your space to capture, organize, and prioritize notes with ease.
        </h1>
        <p className="text-white opacity-80 text-center lg:text-left">
          Effortlessly capture your thoughts, set priorities, and stay organized
          all in one place. With NoteNest, manage tasks, ideas, and reminders
          with simplicity and style. Your notes are always at your fingertips,
          ready whenever inspiration strikes.
        </p>
        <div className="flex flex-col lg:flex-row lg:w-full items-center w-full gap-[10px]">
          <div className="flex -space-x-2">
            {[
              "/women/65.jpg",
              "/men/25.jpg",
              "/women/25.jpg",
              "/men/55.jpg",
            ].map((src, idx) => (
              <a
                href="#"
                key={idx}
                className="z-[5] rounded-full border-2 border-white overflow-hidden w-[45px] h-[45px] bg-[#596376]"
              >
                <img
                  className="w-full h-full"
                  src={`https://randomuser.me/api/portraits${src}`}
                  alt=""
                />
              </a>
            ))}
          </div>
          <div className="w-[2px] h-[30px] bg-white opacity-60 hidden lg:block"></div>
          <h4 className="text-white opacity-80">Over 15.7K Happy Users</h4>
        </div>
      </div>
    </div>
  );
}

export default Login;
