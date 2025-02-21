import React from 'react';
import { UserIcon, Mail, Shield, Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { formatDistance } from "date-fns"

const Profile: React.FC = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    if (!user) {
        logout();
        navigate('/login');
        return null;
    }
    const created_at = formatDistance(new Date(user.created_at), new Date(), { addSuffix: true });
    const updated_at = formatDistance(new Date(user.updated_at), new Date(), { addSuffix: true });

    return (
        <div className='min-h-screen flex flex-col bg-gradient-to-br from-dun to-jet'>
            {/* Header Section */}
            <div className="container mx-auto px-6 py-8">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-night hover:text-jet transition-colors"
                >
                    <ArrowLeft size={20} />
                    <span>Back to Home</span>
                </Link>
            </div>

            {/* Profile Content */}
            <div className="container mx-auto px-6 py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Profile Header */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
                        <div className="flex items-center gap-5 justify-center mb-6">
                            <div className="bg-jet rounded-full p-4">
                                <UserIcon size={32} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-jet">{user.name}</h1>
                                <p className="text-night">{user?.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* User Information */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <h2 className="text-2xl font-bold text-jet mb-6">Account Details</h2>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="bg-dun rounded-lg p-2">
                                        <UserIcon size={20} className="text-jet" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-night">Full Name</p>
                                        <p className="font-medium text-jet">{user.name}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="bg-dun rounded-lg p-2">
                                        <Mail size={20} className="text-jet" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-night">Email Address</p>
                                        <p className="font-medium text-jet">{user.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="bg-dun rounded-lg p-2">
                                        <Shield size={20} className="text-jet" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-night">Role</p>
                                        <p className="font-medium text-jet">{user.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Account Timeline */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <h2 className="text-2xl font-bold text-jet mb-6">Account Timeline</h2>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="bg-dun rounded-lg p-2">
                                        <Calendar size={20} className="text-jet" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-night">Member Since</p>
                                        <p className="font-medium text-jet">{created_at}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="bg-dun rounded-lg p-2">
                                        <Clock size={20} className="text-jet" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-night">Last Updated</p>
                                        <p className="font-medium text-jet">{updated_at}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;