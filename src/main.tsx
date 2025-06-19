import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Header from "./components/Global/Header";
import Homepage from "./pages/Homepage";
import Footer from "./components/Global/Footer";
import FacilitiesPage from "./pages/FacilitiesPage";
import RoomsAndRatesPage from "./pages/RoomsAndRatesPage";
import ContactPage from "./pages/ContactPage";
import ContactUsHeader from "./components/Global/ContactUsHeader";
import RoomDetailsPage from "./pages/RoomDetails";
// import RoomDetailHeader from "./components/Global/RoomDetailHeader";
import AboutHeader from "./components/Global/AboutHeader";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/login";
import BookNowHeader from "./components/Global/BookNowHeader";
import BookingDetails from "./pages/Booknow";
import HotelAdminDashboard from "./pages/HotelAdminDashboard";
import { AuthProvider } from "./context/AuthContext"; // Import the AuthProvider
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const router = createBrowserRouter([

  {
    path: "/",
    element: (
      <div className="w-screen min-h-screen flex flex-col">
        <Header
          backgroundImage={
            "https://res.cloudinary.com/dbezoksfw/image/upload/v1750091039/8af5f078eb2111e9bd560242ac110003_texs7m.jpg"
          }
          onBookNow={() => {
            // Handle booking logic
            console.log("Book now clicked");
          }}
        />
        <Homepage />
        <Footer />
      </div>
    ),
  },
  {
    path: "/facilities",
    element: (
      <div className="w-screen min-h-screen flex flex-col">
        <Header
          backgroundImage={
            "https://res.cloudinary.com/dbezoksfw/image/upload/v1750091569/133359161_1_j1saim.jpg"
          }
          onBookNow={() => {
            // Handle booking logic
            console.log("Book now clicked");
          }}
        />{" "}
        <FacilitiesPage />
        <Footer />
      </div>
    ),
  },
  {
    path: "/rooms",
    element: (
      <div className="w-screen min-h-screen flex flex-col">
        <Header
          backgroundImage="https://res.cloudinary.com/dbezoksfw/image/upload/v1749624094/Guest%20House/WhatsApp_Image_2025-06-11_at_10.11.38_341f1bd2_dcqx2c.jpg"
          onBookNow={() => {
            // Handle booking logic
            console.log("Book now clicked");
          }}
        />{" "}
        <RoomsAndRatesPage />
        <Footer />
      </div>
    ),
  },
  {
    path: "/RoomDetails",
    element: (
      <div className="w-screen min-h-screen flex flex-col">
        {/* <RoomDetailHeader /> */}
        <RoomDetailsPage />
        <Footer />
      </div>
    ),
  },
  {
    path: "/About",
    element: (
      <div className="w-screen min-h-screen flex flex-col">
        <AboutHeader />
        <About />
        <Footer />
      </div>
    ),
  },
  {
    path: "/contact",
    element: (
      <div className="w-screen min-h-screen flex flex-col">
        <ContactUsHeader />
        <ContactPage />
        <Footer />
      </div>
    ),
  },
  {
    path: "/booknow",
    element: (
      <div className="w-screen min-h-screen flex flex-col">
        <BookNowHeader />
        <BookingDetails />
        <Footer />
      </div>
    ),
  },
  {
    path: "/register",
    element: (
      <div className="w-screen min-h-screen flex flex-col">
        <Register />
      </div>
    )
  },
  {
    path: "/login",
    element: (
      <div className="w-screen min-h-screen flex flex-col">
        <Login />
      </div>
    ),
  },
    {
    path: "/forget-password",
    element: (
      <div className="w-screen min-h-screen flex flex-col">
        <ForgotPassword />
      </div>
    )
  },
      {
    path: "//reset-password/:token",
    element: (
      <div className="w-screen min-h-screen flex flex-col">
        <ResetPassword />
      </div>
    )
  },


    {
    path: "/AdminRoute",
    element: (
      <div className="w-screen min-h-screen flex flex-col">
        <HotelAdminDashboard />
      </div>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap the entire app with AuthProvider */}
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);