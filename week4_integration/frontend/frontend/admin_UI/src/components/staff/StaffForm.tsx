import React, { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';

interface StaffFormProps {
  staff?: any;
  onBack: () => void;
  onSave: () => void;
}

export default function StaffForm({ staff, onBack, onSave }: StaffFormProps) {
  const [formData, setFormData] = useState({
    StaffID: staff?.StaffID || '',
    StaffFirstName: staff?.StaffFirstName || '',
    StaffLastName: staff?.StaffLastName || '',
    StaffEmail: staff?.StaffEmail || '',
    StaffPhoneNumber: staff?.StaffPhoneNumber || '',
    Role: staff?.Role || 'Librarian',
    EmploymentStatus: staff?.EmploymentStatus || 'Full-time',
    StaffPassword: staff?.StaffPassword || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving staff:', formData);
    onSave();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div>
          <h1 className="text-gray-900">{staff ? 'Edit Staff' : 'Add New Staff'}</h1>
          <p className="text-gray-600">
            {staff ? 'Update staff information' : 'Create a new staff member'}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Staff ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="StaffID"
                  value={formData.StaffID}
                  onChange={handleChange}
                  placeholder="S001"
                  required
                  disabled={!!staff}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  name="Role"
                  value={formData.Role}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Manager">Manager</option>
                  <option value="Librarian">Librarian</option>
                  <option value="Assistant">Assistant</option>
                  <option value="Clerk">Clerk</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="StaffFirstName"
                  value={formData.StaffFirstName}
                  onChange={handleChange}
                  placeholder="Alice"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="StaffLastName"
                  value={formData.StaffLastName}
                  onChange={handleChange}
                  placeholder="Johnson"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="StaffEmail"
                  value={formData.StaffEmail}
                  onChange={handleChange}
                  placeholder="alice.johnson@library.com"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="StaffPhoneNumber"
                  value={formData.StaffPhoneNumber}
                  onChange={handleChange}
                  placeholder="555-1001"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Employment Information */}
          <div>
            <h3 className="text-gray-900 mb-4">Employment Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Employment Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="EmploymentStatus"
                  value={formData.EmploymentStatus}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Temporary">Temporary</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="StaffPassword"
                  value={formData.StaffPassword}
                  onChange={handleChange}
                  placeholder="Enter password"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              {staff ? 'Update Staff' : 'Create Staff'}
            </button>
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
