import { Label, TextInput, Button } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";
export const Signup = () => {
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const kk = await fetch("api/auth/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto  flex-col md:flex-row md:items-center gap-5">
        {/* Left Side  */}
        <div className="flex-1">
          <Link
            to="/"
            className="  text-sn sm:text-xl font-bold dark:text-white text-4xl"
          >
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Kishor
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a Demo Project .You Cna sign Up with your email and Password
            or With Google
          </p>
        </div>
        {/* Right side */}
        <div className="flex-1">
          <form
            action=""
            method="post"
            className="flex flex-col gap-4  "
            onSubmit={handleSubmit}
          >
            <div className="">
              <Label value="Your Username" />
              <TextInput
                type="text"
                placeholder="username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit">
              Sign Up
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an Account </span>
            <Link to={"/signin"}> Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
