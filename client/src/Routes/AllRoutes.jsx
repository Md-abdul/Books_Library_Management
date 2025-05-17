import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Components/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import ProfileLayout from "../Pages/ProfileLayout";
import MyBooks from "../Pages/MyBooks";
import AddBook from "../Pages/AddBook";
import ProfileContent from "../Pages/ProfileContent";
import PrivateRoutes from "./PrivateRoutes";
import AllBooks from "../Pages/AllBooks";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/all_books" element={<AllBooks />} />
      <Route
        path="/profile"
        element={
          <PrivateRoutes>
            <ProfileLayout />
          </PrivateRoutes>
        }
      >
        <Route index element={<ProfileContent />} />
        <Route path="my-books" element={<MyBooks />} />
        <Route path="add-book" element={<AddBook />} />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
