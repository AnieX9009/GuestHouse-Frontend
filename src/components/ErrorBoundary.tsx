// src/components/ErrorBoundary.tsx
import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {error.status} {error.statusText}
          </h1>
          <p className="text-gray-600 mb-6">
            {error.data?.message || "The page you're looking for doesn't exist."}
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => navigate(-1)}
              className="bg-[#14274A] hover:bg-[#1a365d] text-white"
            >
              Go Back
            </Button>
            <Button
              onClick={() => navigate("/")}
              className="bg-[#E0B973] hover:bg-amber-600 text-white"
            >
              Go Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Unexpected Error
        </h1>
        <p className="text-gray-600 mb-6">
          Something went wrong. Please try again later.
        </p>
        <div className="flex justify-center gap-4">
          <Button
            onClick={() => navigate(-1)}
            className="bg-[#14274A] hover:bg-[#1a365d] text-white"
          >
            Go Back
          </Button>
          <Button
            onClick={() => navigate("/")}
            className="bg-[#E0B973] hover:bg-amber-600 text-white"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}