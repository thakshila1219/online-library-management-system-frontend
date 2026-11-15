import { useEffect, useState } from "react";
import { backendApi } from "../../../api.ts";

type User = {
    _id: string;
    username: string;
    email: string;
    role: string;
    image?: string;
};

export function SystemUsersPage() {
    const [admins, setAdmins] = useState<User[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await backendApi.get("/user/all");
                const allUsers: User[] = response.data;

                const admins = allUsers.filter((u) => u.role === "ADMIN");
                const regularUsers = allUsers.filter((u) => u.role !== "ADMIN");

                setAdmins(admins);
                setUsers(regularUsers);
            } catch (error) {
                console.error("Failed to fetch users", error);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (email: string) => {
        if (confirm("Are you sure you want to delete this user?")) {
            try {
                await backendApi.delete(`/user/delete/${email}`);
                window.location.reload();
                alert("User deleted successfully.");
            } catch (error) {
                console.error("Failed to delete user", error);
                alert("Failed to delete user.");
            }
        }
    };

    const renderRow = (user: User) => (
        <tr key={user._id} className="hover:bg-gray-50 border-b border-zinc-300">
            <td className="px-4 py-3">
                <img
                    src={`../src/assets/users/${user.image}`}
                    alt={user.username}
                    className="w-10 h-10 rounded-full object-cover"
                />
            </td>
            <td className="px-4 py-3 font-medium text-gray-900">{user.username}</td>
            <td className="px-4 py-3 text-gray-700">{user.email}</td>
            <td className="px-4 py-3">
        <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
                user.role === "ADMIN" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
            }`}
        >
          {user.role}
        </span>
            </td>
            <td className="px-4 py-3">
                <div className="flex gap-2">
                    <button className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded">View</button>
                    <button
                        onClick={() => handleDelete(user.email)}
                        className="text-sm bg-red-500 hover:bg-red-400 text-white px-3 py-1 rounded"
                    >
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    );

    return (
        <div className="p-6 bg-white rounded-xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">System Users</h2>

            <table className="min-w-full table-auto text-sm text-left border border-gray-200">
                <thead className="bg-gray-100 text-gray-700 uppercase">
                <tr>
                    <th className="px-4 py-3">Avatar</th>
                    <th className="px-4 py-3">Username</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Actions</th>
                </tr>
                </thead>
                <tbody className="divide-y">
                {admins.map(renderRow)}
                {users.map(renderRow)}
                </tbody>
            </table>
        </div>
    );
}
