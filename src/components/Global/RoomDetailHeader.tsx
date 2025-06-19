// RoomDetailHeader.tsx
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const RoomDetailHeader = ({ roomName }: { roomName: string }) => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
            Back to Home
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">{roomName}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-gray-500">Welcome, {user?.name}</span>
              <button
                onClick={logout}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-sm text-gray-500 hover:text-gray-700">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default RoomDetailHeader;