import React, { useState } from 'react';
import AdminHeader from '../components/AdminHeader';
import Navigation from '../components/Navigation';
import OverviewTab from '../tabs/OverviewTab';
import BookingsTab from '../tabs/BookingsTab';
import RoomsTab from '../tabs/RoomsTab';
import GuestsTab from '../tabs/GuestsTab';
import type { Booking, Room, Guest, TabType } from '../types/hotel';

const HotelAdminDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('overview');
    const [searchTerm, setSearchTerm] = useState('');

    // Mock data
    const stats = {
        totalBookings: 148,
        occupancyRate: 87,
        totalRevenue: 45680,
        averageRating: 4.7
    };

    const recentBookings: Booking[] = [
        {
            id: '1',
            guestName: 'John Smith',
            email: 'john@email.com',
            phone: '+1234567890',
            roomType: 'Deluxe Suite',
            roomNumber: '201',
            checkIn: '2025-06-12',
            checkOut: '2025-06-15',
            guests: 2,
            status: 'confirmed',
            totalAmount: 1200
        },
        {
            id: '2',
            guestName: 'Sarah Johnson',
            email: 'sarah@email.com',
            phone: '+1234567891',
            roomType: 'Standard Room',
            roomNumber: '105',
            checkIn: '2025-06-11',
            checkOut: '2025-06-13',
            guests: 1,
            status: 'checked-in',
            totalAmount: 400
        },
        {
            id: '3',
            guestName: 'Mike Wilson',
            email: 'mike@email.com',
            phone: '+1234567892',
            roomType: 'Presidential Suite',
            roomNumber: '301',
            checkIn: '2025-06-10',
            checkOut: '2025-06-14',
            guests: 4,
            status: 'pending',
            totalAmount: 2800
        }
    ];

    const rooms: Room[] = [
        {
            id: '1',
            number: '101',
            type: 'Standard Room',
            status: 'available',
            price: 150,
            amenities: ['WiFi', 'TV', 'AC']
        },
        {
            id: '2',
            number: '201',
            type: 'Deluxe Suite',
            status: 'occupied',
            price: 300,
            amenities: ['WiFi', 'TV', 'AC', 'Balcony', 'Kitchenette']
        },
        {
            id: '3',
            number: '301',
            type: 'Presidential Suite',
            status: 'maintenance',
            price: 500,
            amenities: ['WiFi', 'TV', 'AC', 'Balcony', 'Kitchenette', 'Jacuzzi']
        }
    ];

    const guests: Guest[] = [
        {
            id: '1',
            name: 'John Smith',
            email: 'john@email.com',
            phone: '+1234567890',
            totalBookings: 5,
            totalSpent: 3500,
            lastVisit: '2025-06-12',
            vipStatus: true
        },
        {
            id: '2',
            name: 'Sarah Johnson',
            email: 'sarah@email.com',
            phone: '+1234567891',
            totalBookings: 2,
            totalSpent: 800,
            lastVisit: '2025-06-11',
            vipStatus: false
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            case 'checked-in': return 'bg-blue-100 text-blue-800';
            case 'checked-out': return 'bg-gray-100 text-gray-800';
            case 'available': return 'bg-green-100 text-green-800';
            case 'occupied': return 'bg-red-100 text-red-800';
            case 'maintenance': return 'bg-orange-100 text-orange-800';
            case 'cleaning': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <AdminHeader />
            <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === 'overview' && (
                    <OverviewTab
                        stats={stats}
                        recentBookings={recentBookings}
                        getStatusColor={getStatusColor}
                    />
                )}
                {activeTab === 'bookings' && (
                    <BookingsTab
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        recentBookings={recentBookings}
                        getStatusColor={getStatusColor}
                    />
                )}
                {activeTab === 'rooms' && (
                    <RoomsTab
                        rooms={rooms}
                        getStatusColor={getStatusColor}
                    />
                )}
                {activeTab === 'guests' && (
                    <GuestsTab
                        guests={guests}
                        getStatusColor={getStatusColor}
                    />
                )}
            </main>
        </div>
    );
};

export default HotelAdminDashboard;