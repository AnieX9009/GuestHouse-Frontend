import React from 'react';
import { Calendar, Users, DollarSign, Star, Eye, Edit, Trash2 } from 'lucide-react';
import StatCard from '../components/StatCard';
import type { Booking } from '../types/hotel';

interface OverviewTabProps {
  stats: {
    totalBookings: number;
    occupancyRate: number;
    totalRevenue: number;
    averageRating: number;
  };
  recentBookings: Booking[];
  getStatusColor: (status: string) => string;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ stats, recentBookings, getStatusColor }) => (
  <div className="space-y-8">
    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        icon={<Calendar className="w-6 h-6 text-blue-600" />}
        title="Total Bookings"
        value={stats.totalBookings}
        trend="+12%"
      />
      <StatCard
        icon={<Users className="w-6 h-6 text-blue-600" />}
        title="Occupancy Rate"
        value={`${stats.occupancyRate}%`}
        trend="+5%"
      />
      <StatCard
        icon={<DollarSign className="w-6 h-6 text-blue-600" />}
        title="Total Revenue"
        value={`$${stats.totalRevenue.toLocaleString()}`}
        trend="+18%"
      />
      <StatCard
        icon={<Star className="w-6 h-6 text-blue-600" />}
        title="Average Rating"
        value={stats.averageRating}
        trend="+0.3"
      />
    </div>

    {/* Recent Bookings */}
    <div className="bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentBookings.slice(0, 5).map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{booking.guestName}</div>
                    <div className="text-sm text-gray-500">{booking.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{booking.roomType}</div>
                  <div className="text-sm text-gray-500">Room {booking.roomNumber}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{booking.checkIn}</div>
                  <div className="text-sm text-gray-500">to {booking.checkOut}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${booking.totalAmount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900"><Eye className="w-4 h-4" /></button>
                    <button className="text-green-600 hover:text-green-900"><Edit className="w-4 h-4" /></button>
                    <button className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default OverviewTab;