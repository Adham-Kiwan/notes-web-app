export default function Login() {
  return (
    <>
      <div className="flex">
        <div className="items-center bg-[#101927] text-white w-[50%] h-[100vh] flex justify-center">
          <form className="w-[95%] px-[40px]">
            <div>
              <h3 className="font-bold text-2xl">Welcome back</h3>
              <br />
            </div>
            <div className="flex justify-between">
              <button className="flex gap-[10px] text-white items-center bg-[#1f2937] border-white py-[8px] px-[70px] rounded-lg hover:bg-[#374050] transition duration-100 ease-in-out">
                <img src="/google.svg" className="h-[20px] w-[20px]" alt="" />
                Sign in with Google
              </button>
              <button className="flex gap-[10px] text-white items-center bg-[#1f2937] border-white py-[8px] px-[70px] rounded-lg hover:bg-[#374050] transition duration-100 ease-in-out">
                <img src="/apple.svg" className="h-[20px] w-[20px]" alt="" />
                Sign in with Apple
              </button>
            </div>
            <div className="flex items-center justify-between">
              <hr className="w-[40%] my-4 border-[#7a8595]" />
              <p className="text-[#7a8595] text-1xl">or</p>
              <hr className="w-[40%] my-4 border-[#7a8595]" />
            </div>
            <div className="flex flex-col gap-[5px]">
              <label htmlFor="mail">Email</label>
              <input
                className="bg-[#374050] rounded-lg px-[20px] py-[8px] text-white"
                id="mail"
                type="mail"
                placeholder="Enter your email"
              />
            </div>
            <br />
            <div className="flex flex-col gap-[5px]">
              <label htmlFor="password">Password</label>
              <input
                className="bg-[#374050] rounded-lg px-[20px] py-[8px] text-white"
                id="password"
                type="text"
                placeholder="Enter you password"
              />
            </div>
            <br />
            <div className="flex justify-between">
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
              <div>
                <a href="#">
                  <span className="text-blue-500 cursor-pointer">
                    Forgot password?
                  </span>
                </a>
              </div>
            </div>
            <br />
            <button className="w-[100%] rounded-lg py-[8px] bg-blue-500">
              Log in
            </button>
            <div>
                <br />
                <p>Don't have an account? <span className="text-blue-500 cursor-pointer">Sign up</span></p>
            </div>
          </form>
        </div>
        <div className="flex flex-col justify-center gap-[20px] w-[50%] h-[100vh] bg-[#2563eb] px-[50px] py-[100px]">
          <div className="flex gap-[10px]">
            <img src="/intro logo.svg" alt="" />

            <h2 className="text-white font-bold text-3xl">NoteNest</h2>
          </div>
          <h1 className="text-white font-bold text-5xl ">
            Your space to capture, organize, and prioritize notes with ease.
          </h1>
          <p className="text-white opacity-80">
            Effortlessly capture your thoughts, set priorities, and stay
            organized all in one place. With NoteNest, manage tasks, ideas, and
            reminders with simplicity and style. Your notes are always at your
            fingertips, ready whenever inspiration strikes.
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
    </>
  );
}
