import {Link, useNavigate} from "react-router-dom";
import logo from "../../../assets/logo/icon-library.png";
import {backendApi} from "../../../api.ts";
import {useForm} from "react-hook-form";
import type {LoginData} from "../../../modal/LoginData.ts";
import {getUserFromToken} from "../../../auth/auth.ts";
import type {UserData} from "../../../modal/UserData.ts";

export function LoginPage() {

    const navigate = useNavigate();

    const {register, handleSubmit} = useForm<LoginData>();

    const authenticateUser = async (data: LoginData) => {
        try {
            const response = await backendApi.post("/auth/login", data)
            const accessToken = response.data.accessToken;
            const refreshToken = response.data.refreshToken;

            localStorage.setItem('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            const user: UserData = getUserFromToken(accessToken);
            localStorage.setItem('username', user.username as string);
            localStorage.setItem('role', user.role as string);
            localStorage.setItem('email', data.email as string);
            alert("Successfully logged in!");
            navigate("/");
        } catch (error) {
            alert("Login failed.");
            console.log(error)
        }
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
                    <img alt="logo" src={logo} className="mt-10 bg-zinc-400 p-2 rounded-full"/>
                    <h2 className="mt-5 text-center text-black text-3xl font-semibold tracking-tight ">
                        Log in
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit(authenticateUser)}>
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium "></label>
                            <div className="mt-2">
                                <input
                                    {...register("email", { required: true })}
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-zinc-200 outline-2 text-black px-3 py-1.5 text-base -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />

                            </div>
                        </div>

                        <div>

                            <div className="mt-2">
                                <input
                                    {...register("password", { required: true })}
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    autoComplete="current-password"
                                    className="block w-full rounded-md text-black bg-zinc-200 outline-2 px-3 py-1.5 text-base -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />

                            </div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium "></label>
                                <div className="text-sm">
                                    <a href="/forget" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="cursor-pointer flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Log in
                            </button>
                        </div>
                    </form>

                    <div className="mt-10 text-center text-sm/6 text-gray-500">
                        Are you new user?{' '}
                        <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            register here
                        </Link>

                        <div className="mt-1 mb-4">
                            <Link className="text-sm text-green-500 hover:text-green-700 underline cursor-pointer"
                                  to="/">Back to home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}