import React from 'react';
import { User, Mail, Phone, MapPin, Calendar, CreditCard, Edit, Lock, CheckCircle } from 'lucide-react';

interface UserProfileProps {
  user: any;
  onNavigate: (view: string) => void;
}

export default function UserProfile({ user, onNavigate }: UserProfileProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900">My Profile</h1>
        <p className="text-gray-600">View and manage your account information</p>
      </div>

      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/30">
            <User className="w-12 h-12 text-white" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-white mb-2">{user.MemberFirstName} {user.MemberLastName}</h2>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                {user.MemberID}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm ${
                user.MemberStatus === 'Active'
                  ? 'bg-green-500/20 backdrop-blur-sm text-white'
                  : 'bg-red-500/20 backdrop-blur-sm text-white'
              }`}>
                {user.MemberStatus}
              </span>
            </div>
          </div>
          <button
            onClick={() => onNavigate('edit-profile')}
            className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <Edit className="w-4 h-4" />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Profile Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-6">Personal Information</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <div className="text-sm text-gray-600">Full Name</div>
                <div className="text-gray-900">{user.MemberFirstName} {user.MemberLastName}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <div className="text-sm text-gray-600">Date of Birth</div>
                <div className="text-gray-900">{user.DateOfBirth}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <div className="text-sm text-gray-600">Gender</div>
                <div className="text-gray-900">{user.Gender}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-6">Contact Information</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <div className="text-sm text-gray-600">Email Address</div>
                <div className="text-gray-900">{user.MemberEmail}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <div className="text-sm text-gray-600">Phone Number</div>
                <div className="text-gray-900">{user.MemberPhoneNumber}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <div className="text-sm text-gray-600">Address</div>
                <div className="text-gray-900">{user.Address}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Membership Information */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-gray-900 mb-6">Membership Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <CreditCard className="w-5 h-5 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <div className="text-sm text-gray-600">Member ID</div>
              <div className="text-gray-900">{user.MemberID}</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <div className="text-sm text-gray-600">Join Date</div>
              <div className="text-gray-900">{user.JoinDate}</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <div className="text-sm text-gray-600">Expiry Date</div>
              <div className="text-gray-900">{user.MemberExpiryDate}</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <div className="text-sm text-gray-600">Status</div>
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs ${
                  user.MemberStatus === 'Active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {user.MemberStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-gray-900 mb-4">Account Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => onNavigate('edit-profile')}
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Edit className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-gray-900">Edit Profile</div>
              <div className="text-sm text-gray-600">Update your personal information</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('change-password')}
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-gray-900">Change Password</div>
              <div className="text-sm text-gray-600">Update your account password</div>
            </div>
          </button>
        </div>
      </div>

      {/* Membership Renewal */}
      {user.MemberStatus === 'Active' && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-blue-900 mb-2">Membership Active</h3>
              <p className="text-sm text-blue-800">
                Your membership is active until {user.MemberExpiryDate}. You can renew your membership up to 30 days before expiry.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
