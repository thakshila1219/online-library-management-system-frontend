import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import type {RegisterData} from "../../../modal/RegisterData.ts";
import logo from "../../../assets/logo/icon-library.png";
import {backendApi} from "../../../api.ts";

export function RegisterPage() {
    const navigate = useNavigate();

    const {register, handleSubmit, formState: {errors}} = useForm<RegisterData>()

    const onSubmit = async (data: RegisterData) => {
        const response = await backendApi.post("/auth/register", data)
        if (response.status === 201) {
            navigate("/login");
            alert("Registration successful! Please login.");
        } else {
            alert("Registration failed. Please try again.");
        }
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
                <img alt="logo" src={logo} className="mt-10 bg-zinc-400 p-2 rounded-full"/>
                <h2 className="mt-5 text-black text-center text-2xl font-semibold tracking-tight ">
                    Register Here
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="username" className="block text-black text-sm/6 font-medium "></label>
                        <input
                            type="text"
                            id="username"
                            className="block w-full rounded-md outline-2 bg-white text-black px-3 py-1.5 text-base -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            placeholder="Username"
                            {...register("username", {
                                required: "Name is required!",
                                pattern: {
                                    value: /^[a-zA-Z\s]+$/,
                                    message: "Invalid name!"
                                }
                            })}
                        />
                        {
                            errors.username ? <span className="text-red-500">{errors.username.message}</span> : null
                        }
                        <label htmlFor="email" className="block text-sm/6 font-medium mt-2"></label>
                        <div className="mt-2">
                            <input
                                id="email"
                                type="email"
                                className="block w-full rounded-md outline-2 bg-white text-black px-3 py-1.5 text-base -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                placeholder="Email"
                                {...register("email", {
                                    required: "Email is required!",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Invalid email address!"
                                    }
                                })}
                            />
                            {errors.email ? <span className="text-red-500">{errors.email.message}</span> : null}

                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium "></label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                type="password"
                                className="block w-full rounded-md outline-2 text-black bg-white px-3 py-1.5 text-base -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                placeholder="Password"
                                {...register("password", {
                                    required: true
                                })}
                            />
                            {errors.password ? <span className="text-red-500">Password couldn't empty!</span> : null}
                        </div>

                    </div>

                    <div>
                        <button
                            type="submit"
                            className="cursor-pointer flex w-full justify-center rounded-md bg-green-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Register
                        </button>
                    </div>
                </form>

                <p className="mt-5 text-center text-sm/6 text-gray-500">
                    <button onClick={() => {
                        navigate("/login")
                    }} className="text-sm text-green-500 hover:text-green-700 underline cursor-pointer">Back to login
                    </button>
                </p>
            </div>
        </div>
    );
}