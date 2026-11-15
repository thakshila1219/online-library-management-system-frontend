import { useEffect, useState } from "react";
import { backendApi } from "../../../api.ts";
import { CheckCircle, XCircle } from "lucide-react";

type BorrowedBook = {
    userEmail: string;
    productName: string;
    borrowDate: string;
    returnDate: string;
    isReturned: boolean;
};

export function AllBorrowedBooksPage() {
    const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await backendApi.get("/borrow/all");
                setBorrowedBooks(res.data);
            } catch (e) {
                console.error("Failed to fetch borrowed books", e);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="w-full mx-auto p-6 mt-10 bg-white shadow-md rounded-xl">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Borrowed Books Overview</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left font-semibold text-gray-600">User Email</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-600">Book Title</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-600">Borrow Date</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-600">Return Date</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-600">Status</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                    {borrowedBooks.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="text-center text-gray-500 py-10">
                                <div className="flex flex-col items-center">
                                    <img
                                        src="/assets/empty-box.svg"
                                        alt="No data"
                                        className="w-32 mb-4 opacity-60"
                                    />
                                    <p>No borrowed books found.</p>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        borrowedBooks.map((borrow, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 text-gray-800">{borrow.userEmail}</td>
                                <td className="px-6 py-4 font-medium text-gray-700">{borrow.productName}</td>
                                <td className="px-6 py-4 text-gray-500">
                                    {new Date(borrow.borrowDate).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-gray-500">
                                    {new Date(borrow.returnDate).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                    <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                            borrow.isReturned
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-600"
                        }`}
                    >
                      {borrow.isReturned ? (
                          <>
                              <CheckCircle className="w-4 h-4" /> Returned
                          </>
                      ) : (
                          <>
                              <XCircle className="w-4 h-4" /> Not Returned
                          </>
                      )}
                    </span>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
