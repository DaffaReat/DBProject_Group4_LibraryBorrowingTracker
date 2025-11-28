import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, MoreVertical, Filter } from 'lucide-react';

interface MemberListProps {
  onNavigate: (view: string, item?: any) => void;
}

export default function MemberList({ onNavigate }: MemberListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const members = [
    {
      MemberID: 'M001',
      MemberFirstName: 'John',
      MemberLastName: 'Smith',
      MemberEmail: 'john.smith@email.com',
      MemberPhoneNumber: '555-0101',
      Gender: 'Male',
      DateOfBirth: '1990-05-15',
      Address: '123 Main St, City, State 12345',
      JoinDate: '2023-01-15',
      MemberExpiryDate: '2026-01-15',
      MemberStatus: 'Active',
      MemberPassword: '********'
    },
    {
      MemberID: 'M002',
      MemberFirstName: 'Sarah',
      MemberLastName: 'Johnson',
      MemberEmail: 'sarah.johnson@email.com',
      MemberPhoneNumber: '555-0102',
      Gender: 'Female',
      DateOfBirth: '1988-08-22',
      Address: '456 Oak Ave, City, State 12345',
      JoinDate: '2023-03-20',
      MemberExpiryDate: '2026-03-20',
      MemberStatus: 'Active',
      MemberPassword: '********'
    },
    {
      MemberID: 'M003',
      MemberFirstName: 'Michael',
      MemberLastName: 'Brown',
      MemberEmail: 'michael.brown@email.com',
      MemberPhoneNumber: '555-0103',
      Gender: 'Male',
      DateOfBirth: '1995-11-30',
      Address: '789 Pine Rd, City, State 12345',
      JoinDate: '2022-06-10',
      MemberExpiryDate: '2025-06-10',
      MemberStatus: 'Active',
      MemberPassword: '********'
    },
    {
      MemberID: 'M004',
      MemberFirstName: 'Emily',
      MemberLastName: 'Davis',
      MemberEmail: 'emily.davis@email.com',
      MemberPhoneNumber: '555-0104',
      Gender: 'Female',
      DateOfBirth: '1992-03-18',
      Address: '321 Elm St, City, State 12345',
      JoinDate: '2023-09-05',
      MemberExpiryDate: '2026-09-05',
      MemberStatus: 'Active',
      MemberPassword: '********'
    },
    {
      MemberID: 'M005',
      MemberFirstName: 'David',
      MemberLastName: 'Wilson',
      MemberEmail: 'david.wilson@email.com',
      MemberPhoneNumber: '555-0105',
      Gender: 'Male',
      DateOfBirth: '1985-12-25',
      Address: '654 Maple Dr, City, State 12345',
      JoinDate: '2021-11-15',
      MemberExpiryDate: '2024-11-15',
      MemberStatus: 'Expired',
      MemberPassword: '********'
    },
  ];

  const filteredMembers = members.filter(member => {
    const matchesSearch = 
      member.MemberFirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.MemberLastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.MemberEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.MemberID.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || member.MemberStatus.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Member Management</h1>
          <p className="text-gray-600">Manage library members and their information</p>
        </div>
        <button
          onClick={() => onNavigate('member-create')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Member
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, email, or member ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="suspended">Suspended</option>
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
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Member ID</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Expiry Date</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMembers.map((member) => (
                <tr key={member.MemberID} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{member.MemberID}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {member.MemberFirstName} {member.MemberLastName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{member.MemberEmail}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{member.MemberPhoneNumber}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{member.JoinDate}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{member.MemberExpiryDate}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      member.MemberStatus === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : member.MemberStatus === 'Expired'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {member.MemberStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onNavigate('member-edit', member)}
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
            Showing {filteredMembers.length} of {members.length} members
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
              1
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              2
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
