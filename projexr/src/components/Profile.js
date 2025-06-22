import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { User, Mail, Calendar, MapPin, Phone, IdCard } from 'lucide-react';
import Layout from './common/Layout';

const Profile = () => {
  const { user } = useAuth();

  const userRole = Array.isArray(user?.user_role) ? user.user_role[0] : (user?.user_role || 'N/A');

  return (
    <Layout>
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <h1 className="text-[#131416] tracking-light text-[32px] font-bold leading-tight">User Profile</h1>
          </div>
          
          <div className="p-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {/* Profile Header */}
              <div className="flex items-center gap-6 mb-8">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-24"
                  style={{
                    backgroundImage: `url("https://ui-avatars.com/api/?name=${encodeURIComponent(user?.display_name || user?.username || 'User')}&background=9fa6ca&color=131416&size=256")`
                  }}
                />
                <div>
                  <h2 className="text-2xl font-bold text-[#131416] mb-2">
                    {user?.display_name || user?.username || 'User'}
                  </h2>
                  <p className="text-[#6e717c] text-lg">{userRole}</p>
                </div>
              </div>

              {/* Profile Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#131416] mb-4">Personal Information</h3>
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-[#6e717c]" />
                    <div>
                      <p className="text-sm text-[#6e717c]">Full Name</p>
                      <p className="text-[#131416] font-medium">{user?.display_name || user?.username || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#6e717c]" />
                    <div>
                      <p className="text-sm text-[#6e717c]">Email Address</p>
                      <p className="text-[#131416] font-medium">{user?.user_email || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <IdCard className="w-5 h-5 text-[#6e717c]" />
                    <div>
                      <p className="text-sm text-[#6e717c]">User ID</p>
                      <p className="text-[#131416] font-medium">{user?.user_id || 'N/A'}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#131416] mb-4">Account Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-[#6e717c]">Username</p>
                      <p className="text-[#131416] font-medium">{user?.username || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#6e717c]">Role</p>
                      <p className="text-[#131416] font-medium">{userRole}</p>
                    </div>
                  </div>
                  <div className="pt-4">
                    <h4 className="text-md font-semibold text-[#131416] mb-3">Recent Activity</h4>
                    <div className="space-y-2">
                      <div className="text-sm text-[#6e717c]">
                        • Last login: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                      </div>
                      <div className="text-sm text-[#6e717c]">
                        • Updated profile: 2 days ago
                      </div>
                      <div className="text-sm text-[#6e717c]">
                        • Created 15 client projects this month
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Action Buttons */}
              <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
                <button className="px-4 py-2 bg-[#15267d] text-white rounded-lg hover:bg-[#0f1a5a] transition-colors">
                  Edit Profile
                </button>
                <button className="px-4 py-2 border border-gray-300 text-[#131416] rounded-lg hover:bg-gray-50 transition-colors">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile; 