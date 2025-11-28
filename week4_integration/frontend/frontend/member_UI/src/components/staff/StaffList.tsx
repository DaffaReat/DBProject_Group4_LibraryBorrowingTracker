import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Filter } from 'lucide-react';

interface StaffListProps {
  onNavigate: (view: string, item?: any) => void;
}

export default function StaffList({ onNavigate }: StaffListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const staff = [
    {
      StaffID: 'S001',
      StaffFirstName: 'Alice',
      StaffLastName: 'Johnson',
      StaffEmail: 'alice.johnson@library.com',
      StaffPhoneNumber: '555-1001',
      Role: 'Librarian',
      EmploymentStatus: 'Full-time',
      StaffPassword: '********'
    },
    {
      StaffID: 'S002',
      StaffFirstName: 'Robert',
      StaffLastName: 'Williams',
      StaffEmail: 'robert.williams@library.com',
      StaffPhoneNumber: '555-1002',
      Role: 'Assistant',
      EmploymentStatus: 'Part-time',
      StaffPassword: '********'
    },
    {
      StaffID: 'S003',
      StaffFirstName: 'Maria',
      StaffLastName: 'Garcia',
      StaffEmail: 'maria.garcia@library.com',
      StaffPhoneNumber: '555-1003',
      Role: 'Manager',
      EmploymentStatus: 'Full-time',
      StaffPassword: '********'
    },
    {
      StaffID: 'S004',
      StaffFirstName: 'James',
      StaffLastName: 'Martinez',
      StaffEmail: 'james.martinez@library.com',
      StaffPhoneNumber: '555-1004',
      Role: 'Librarian',
      EmploymentStatus: 'Full-time',
      StaffPassword: '********'
    },
    {
      StaffID: 'S005',
      StaffFirstName: 'Linda',
      StaffLastName: 'Anderson',
      StaffEmail: 'linda.anderson@library.com',
      StaffPhoneNumber: '555-1005',
      Role: 'Assistant',
      EmploymentStatus: 'Part-time',
      StaffPassword: '********'
    },
  ];

  const filteredStaff = staff.filter(s => {
    const matchesSearch = 
      s.StaffFirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.StaffLastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.StaffEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.StaffID.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterRole === 'all' || s.Role.toLowerCase() === filterRole.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Staff Management</h1>
          <p className="text-gray-600">Manage library staff and their roles</p>
        </div>
        <button
          onClick={() => onNavigate('staff-create')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Staff
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, email, or staff ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Roles</option>
              <option value="manager">Manager</option>
              <option value="librarian">Librarian</option>
              <option value="assistant">Assistant</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Staff ID</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Employment Status</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStaff.map((s) => (
                <tr key={s.StaffID} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{s.StaffID}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {s.StaffFirstName} {s.StaffLastName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{s.StaffEmail}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{s.StaffPhoneNumber}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      s.Role === 'Manager'
                        ? 'bg-purple-100 text-purple-700'
                        : s.Role === 'Librarian'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {s.Role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{s.EmploymentStatus}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onNavigate('staff-edit', s)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {filteredStaff.length} of {staff.length} staff members
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
              1
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
