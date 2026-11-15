import type { ProductData } from "../../../modal/ProductData.ts";
import { backendApi } from "../../../api.ts";

type ProductProps = {
    data: ProductData;
};

export function Product({ data }: ProductProps) {
    const path = "src/assets/products/";
    const role = localStorage.getItem("role");

    const onDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            console.log("Delete book:", id);
            // await backendApi.delete(...) // implement if needed
        }
    };

    const onBorrow = async (id: string) => {
        if (window.confirm("Are you sure you want to borrow this book?")) {
            try {
                const email = localStorage.getItem("email");
                const borrowData = { email, productId: id };

                await backendApi.post(`/borrow/save_record`, borrowData);
                alert("Book borrowed successfully!");
            } catch (error) {
                alert("You can only borrow one book at a time.");
                console.error("Error borrowing book:", error);
            }
        }
    };

    return (
        <div className="bg-white w-72 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
            <div className="bg-gray-100 p-4 h-60 flex items-center justify-center">
                <img
                    src={path + data.coverImage}
                    alt={data.title}
                    className="max-h-full object-contain"
                />
            </div>

            <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold text-gray-800 truncate">{data.title}</h3>
                <p className="text-sm text-gray-500">by {data.author}</p>
                <p className="text-gray-600 text-sm line-clamp-3">{data.description}</p>

                <div className="mt-4 flex flex-col gap-2">
                    <button
                        onClick={() => onBorrow(data._id)}
                        className="w-full bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-500 transition"
                    >
                        Borrow
                    </button>

                    {role === "ADMIN" && (
                        <div className="flex justify-between gap-2">
                            <button
                                className="flex-1 bg-gray-300 text-gray-800 text-sm py-2 rounded-lg hover:bg-gray-400 transition"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onDelete(data._id)}
                                className="flex-1 bg-red-600 text-white text-sm py-2 rounded-lg hover:bg-red-500 transition"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
