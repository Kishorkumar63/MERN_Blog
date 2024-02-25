import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signInSuccess, signInFaile, signInStart } from "../slices/userSlice";
import OAuth from "../compnents/OAuth";
export const Signin = () => {
  const { error: errorMessage, loading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFaile("Please fill ou all fields"));
    }
    try {
      dispatch(signInStart());

      const res = await fetch("api/auth/signin", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFaile(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFaile(error.message));
    }
  };
  // console.log(formData);
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
            This is a Demo Project .You Cna sign In with your email and Password
            or With Google
          </p>
        </div>
        {/* Right side */}
        <div className="flex-1">
          <form
            action=""
            method="post"
            className="flex flex-col gap-4 "
            onSubmit={handleSubmit}
          >
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
                placeholder="******"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading....</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            <OAuth />
          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Dont Have an Account </span>
            <Link to={"/signup"}> Sign Up</Link>
          </div>

          {errorMessage && (
            <Alert className="mt-5 " color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};
