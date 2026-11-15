import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { backendApi } from "../../../api.ts";
import type { ProfileData } from "../../../modal/ProfileData.ts";

export function ProfilePage() {
    const { register, handleSubmit, reset } = useForm<ProfileData>();
    const [preview, setPreview] = useState<string | null>(null);
    const email = localStorage.getItem("email");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await backendApi.get(`/user/profile/${email}`);
                const data = res.data;
                reset(data);
                if (data.image) {
                    setPreview(`src/assets/users/${data.image}`);
                }
            } catch (e) {
                console.error("Failed to fetch user", e);
            }
        };
        fetchUser();
    }, [email, reset]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setPreview(URL.createObjectURL(file));
    };

    const onUpdate = async (data: ProfileData) => {
        const formData = new FormData();
        formData.append("username", data.username);
        formData.append("email", data.email);
        if (data.image && data.image[0]) {
            formData.append("image", data.image[0]);
        }

        try {
            await backendApi.put("/user/update", formData);
            alert("✅ Profile updated!");
        } catch {
            alert("❌ Update failed.");
        }
    };

    const onDelete = async () => {
        if (!confirm("Are you sure you want to delete your account?")) return;
        try {
            await backendApi.delete(`/user/delete/${email}`);
            alert("🗑️ Account deleted.");
            localStorage.clear();
            window.location.reload();
        } catch {
            alert("❌ Failed to delete account.");
        }
    };

    return (
        <div className="max-w-2xl min-w-xl mx-auto bg-white p-8 shadow-lg rounded-xl mt-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">👤 Your Profile</h2>

            <form onSubmit={handleSubmit(onUpdate)} className="space-y-6">
                <div className="flex items-center justify-center">
                    {preview ? (
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow"
                        />
                    ) : (
                        <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl">
                            No Image
                        </div>
                    )}
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Username</label>
                    <input
                        {...register("username")}
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Enter your username"
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        {...register("email")}
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                        disabled
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Profile Image</label>
                    <input
                        type="file"
                        {...register("image")}
                        onChange={handleImageChange}
                        className="w-full text-sm text-gray-600"
                    />
                </div>

                <div className="flex justify-between gap-4">
                    <button
                        type="submit"
                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Update
                    </button>
                    <button
                        type="button"
                        onClick={onDelete}
                        className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                    >
                        Delete Account
                    </button>
                </div>
            </form>
        </div>
    );
}
