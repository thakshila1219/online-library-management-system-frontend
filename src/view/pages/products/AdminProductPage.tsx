import {useForm} from "react-hook-form";
import {backendApi} from "../../../api.ts";
import {useState} from "react";
import type {ProductData} from "../../../modal/ProductData.ts";

type BookFormData = {
    title: string;
    author: string;
    description: string;
    coverImage: FileList;
};

export function AdminProductPage() {
    const {register, handleSubmit, reset} = useForm<BookFormData>();
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [imageFileName, setImageFileName] = useState<string>("");

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));

            const imageData = new FormData();
            imageData.append("coverImage", file);

            try {
                const response = await backendApi.post("/product/upload_image", imageData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                const fileName = response.data.fileName;
                console.log("Image uploaded successfully:", fileName);
                setImageFileName(fileName);
            } catch (error) {
                console.error("Error uploading image:", error);
                alert("Failed to upload image.");
            }
        }
    };


    const onSubmit = async (data: BookFormData) => {
        try {
            const bookData: ProductData = {
                id: "",
                title: data.title,
                author: data.author,
                description: data.description,
                coverImage: imageFileName
            };

            await backendApi.post("/product/save", bookData);
            alert("Book added successfully!");
            reset();
            setPreviewUrl(null);
        } catch (error) {
            console.error("Error adding book:", error);
            alert("Failed to add book.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-10 bg-white rounded-2xl">
            <h1 className="text-3xl font-semibold text-gray-800 mb-8 border-b pb-4">
                Add New Book
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Book Title
                        </label>
                        <input
                            {...register("title", { required: true })}
                            type="text"
                            placeholder="Enter book title"
                            className="w-full rounded-xl border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Author Name
                        </label>
                        <input
                            {...register("author", { required: true })}
                            type="text"
                            placeholder="Enter author's name"
                            className="w-full rounded-xl border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Cover Image Upload */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Cover Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="file:mr-4 file:py-2 file:px-4
                                   file:rounded-xl file:border-0
                                   file:text-sm file:font-semibold
                                   file:bg-blue-600 file:text-white
                                   hover:file:bg-blue-500
                                   cursor-pointer"
                        />
                    </div>

                    <div>
                        {previewUrl && (
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="w-32 h-32 object-cover rounded-lg border shadow"
                            />
                        )}
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        {...register("description")}
                        rows={5}
                        placeholder="Write a short summary of the book..."
                        className="w-full rounded-xl border border-gray-300 px-4 py-2 shadow-sm resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* Submit Button */}
                <div className="text-right">
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-600 transition duration-200 shadow"
                    >
                        ➕ Add Book
                    </button>
                </div>
            </form>
        </div>
    );

}
