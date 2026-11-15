import { useEffect, useState } from "react";
import {backendApi} from "../../../api.ts";
import type {BorrowData} from "../../../modal/BorrowData.ts";

export function BorrowedBooks() {
    const [borrowed, setBorrowed] = useState<BorrowData[]>([]);

    useEffect(() => {
        const fetchBorrowed = async () => {
            try {
                const email = localStorage.getItem("email");
                const response = await backendApi.get(`/borrow/by_user/${email}`);
                setBorrowed(response.data);
            } catch (err) {
                console.error("Failed to fetch borrowed books:", err);
            }
        };

        fetchBorrowed();
    }, []);

    function handleReturn(recordId: string) {
        const confirmReturn = window.confirm("Are you sure you want to return this book?");
        if (!confirmReturn) return;

        backendApi.delete(`/borrow/return/${recordId}`)
            .then(() => {
                setBorrowed(borrowed.filter(record => record._id !== recordId));
                alert("Book returned successfully!");
            })
            .catch(err => {
                console.error("Failed to return book:", err);
                alert("Failed to return book. Please try again.");
            });
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">My Borrowed Books</h2>

            {borrowed.length === 0 ? (
                <p className="text-gray-600">You haven't borrowed any books yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-xl">
                        <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="py-3 px-6 text-left">Book Id</th>
                            <th className="py-3 px-6 text-left">Book Name</th>
                            <th className="py-3 px-6 text-left">Borrowed On</th>
                            <th className="py-3 px-6 text-left">Return By</th>
                            <th className="py-3 px-6 text-left">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {borrowed.map((record, index) => (
                            <tr key={index} className="border-t hover:bg-gray-50">
                                <td className="py-3 px-6">{record._id}</td>
                                <td className="py-3 px-6">{record.productName}</td>
                                <td className="py-3 px-6">{new Date(record.borrowDate).toLocaleDateString()}</td>
                                <td className="py-3 px-6">{new Date(record.returnDate).toLocaleDateString()}</td>
                                <td className="py-3 px-6"><button
                                    type="button"
                                    onClick={() => handleReturn(record._id)}
                                    className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
                                >
                                    Return
                                </button></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
