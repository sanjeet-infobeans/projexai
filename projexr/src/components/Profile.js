import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { User, Mail, Calendar, MapPin, Phone } from 'lucide-react';
import Layout from './common/Layout';

const Profile = () => {
  const { user } = useAuth();

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
                    backgroundImage: `url("${user?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhMqy4azEr8zqKaJBxVz6XaWdwxbUz9V8SZO-Gbe_BRMbfzfb5OMDECCM3lZdnuYXDTj1Leq-bySDVyFzLc5kDRnabVpnpeJgC_C-rMYJ0vU9T41F9nMpaJtp_nx7hBKNJiAWbfa8WeU9wIT0CmirN7pCJ8WlIIPwEMZed2_PaNkQ_vViMwGMNnclQNaR2TZjYCrGp-2qNMhbkO-jvkgIXaMpmgjBudIpFoQCzEKpQ_Y53016_0jlabmSjJMlOjeR3BScaxcskoW8'}")`
                  }}
                />
                <div>
                  <h2 className="text-2xl font-bold text-[#131416] mb-2">
                    {user?.name || user?.username || 'User'}
                  </h2>
                  <p className="text-[#6e717c] text-lg">{user?.role || 'Role'}</p>
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
                      <p className="text-[#131416] font-medium">{user?.name || 'Alex Johnson'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#6e717c]" />
                    <div>
                      <p className="text-sm text-[#6e717c]">Email Address</p>
                      <p className="text-[#131416] font-medium">{user?.email || 'alex.johnson@projexai.com'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#6e717c]" />
                    <div>
                      <p className="text-sm text-[#6e717c]">Phone Number</p>
                      <p className="text-[#131416] font-medium">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#6e717c]" />
                    <div>
                      <p className="text-sm text-[#6e717c]">Location</p>
                      <p className="text-[#131416] font-medium">San Francisco, CA</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[#6e717c]" />
                    <div>
                      <p className="text-sm text-[#6e717c]">Member Since</p>
                      <p className="text-[#131416] font-medium">January 2024</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#131416] mb-4">Account Information</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-[#6e717c]">Username</p>
                      <p className="text-[#131416] font-medium">{user?.username || 'alex.johnson'}</p>
                    </div>

                    <div>
                      <p className="text-sm text-[#6e717c]">Role</p>
                      <p className="text-[#131416] font-medium">{user?.role || 'N/A'}</p>
                    </div>

                    <div>
                      <p className="text-sm text-[#6e717c]">Department</p>
                      <p className="text-[#131416] font-medium">IT Services</p>
                    </div>

                    <div>
                      <p className="text-sm text-[#6e717c]">Status</p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
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