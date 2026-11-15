import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../store/store.ts";
import {useEffect} from "react";
import {getAllProducts} from "../../../slices/productsSlice.ts";
import {Product} from "../../common/product/Product.tsx";

export function AllProductPage() {

    const dispatch = useDispatch<AppDispatch>();
    const {list} = useSelector((state: RootState) => state.products)

    useEffect(() => {
        dispatch(getAllProducts())
    }, [])

    return (
        <>
            <div className="flex flex-col items-start p-8 mt-5 bg-zinc-100 w-full">
                <h2 className="text-3xl font-semibold mb-6 text-gray-800">All Books</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                    {list.map((product) => (
                        <Product key={product.id} data={product}></Product>
                    ))}
                </div>
            </div>
        </>
    );
}
