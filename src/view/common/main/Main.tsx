import {Route, Routes} from "react-router-dom";
import {Home} from "../../pages/home/Home.tsx";
import {AdminProductPage} from "../../pages/products/AdminProductPage.tsx";
import {AllProductPage} from "../../pages/products/AllProductPage.tsx";
import {SystemUsersPage} from "../../pages/users/SystemUsersPage.tsx";
import {ProfilePage} from "../../pages/profile/ProfilePage.tsx";
import {BorrowedBooks} from "../../pages/products/BorrowedBooks.tsx";
import {AllBorrowedBooksPage} from "../../pages/products/AllBorrowedBooksPage.tsx";

export function Main() {

    const role = localStorage.getItem('role');

    return (
        <>
            <Routes>
                {
                    role === 'ADMIN' && (
                        <>
                            <Route path="/admin/products" element={<AdminProductPage/>}></Route>
                            <Route path="/admin/users" element={<SystemUsersPage/>}></Route>
                            <Route path="/admin/all_borrowed" element={<AllBorrowedBooksPage/>}></Route>
                        </>
                    )
                }
                <Route path="/" element={<Home/>}></Route>
                <Route path="/products" element={<AllProductPage/>}></Route>
                <Route path="/profile" element={<ProfilePage/>}></Route>
                <Route path="/borrowed" element={<BorrowedBooks/>}></Route>
            </Routes>
        </>
    )
}
