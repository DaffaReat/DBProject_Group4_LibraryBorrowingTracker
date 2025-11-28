import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Filter } from 'lucide-react';

interface BookCopyListProps {
  onNavigate: (view: string, item?: any) => void;
}

export default function BookCopyList({ onNavigate }: BookCopyListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAvailability, setFilterAvailability] = useState('all');

  const bookCopies = [
    {
      BookID: 'BC001',
      ISBN: '978-0-7432-7356-5',
      Title: 'The Great Gatsby',
      Availability: 'Available',
      StaffID: 'S001'
    },
    {
      BookID: 'BC002',
      ISBN: '978-0-7432-7356-5',
      Title: 'The Great Gatsby',
      Availability: 'Borrowed',
      StaffID: 'S001'
    },
    {
      BookID: 'BC003',
      ISBN: '978-0-452-28423-4',
      Title: '1984',
      Availability: 'Available',
      StaffID: 'S002'
    },
    {
      BookID: 'BC004',
      ISBN: '978-0-06-112008-4',
      Title: 'To Kill a Mockingbird',
      Availability: 'Available',
      StaffID: 'S001'
    },
    {
      BookID: 'BC005',
      ISBN: '978-0-14-143951-8',
      Title: 'Pride and Prejudice',
      Availability: 'Borrowed',
      StaffID: 'S003'
    },
    {
      BookID: 'BC006',
      ISBN: '978-0-316-76948-0',
      Title: 'The Catcher in the Rye',
      Availability: 'Available',
      StaffID: 'S002'
    },
    {
      BookID: 'BC007',
      ISBN: '978-0-439-02348-1',
      Title: "Harry Potter and the Philosopher's Stone",
      Availability: 'Available',
      StaffID: 'S001'
    },
    {
      BookID: 'BC008',
      ISBN: '978-0-439-02348-1',
      Title: "Harry Potter and the Philosopher's Stone",
      Availability: 'Damaged',
      StaffID: 'S003'
    },
    {
      BookID: 'BC009',
      ISBN: '978-0-06-093546-7',
      Title: 'The Hobbit',
      Availability: 'Available',
      StaffID: 'S002'
    },
  ];

  const filteredCopies = bookCopies.filter(copy => {
    const matchesSearch = 
      copy.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      copy.BookID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      copy.ISBN.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterAvailability === 'all' || copy.Availability.toLowerCase() === filterAvailability.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Book Copy Management</h1>
          <p className="text-gray-600">Manage individual book copies and their availability</p>
        </div>
        <button
          onClick={() => onNavigate('book-copy-create')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Book Copy
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, book ID, or ISBN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterAvailability}
              onChange={(e) => setFilterAvailability(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="borrowed">Borrowed</option>
              <option value="damaged">Damaged</option>
              <option value="lost">Lost</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600">Total Copies</div>
          <div className="text-2xl text-gray-900 mt-1">{bookCopies.length}</div>
        </div>
        <div className="bg-white rounded-lg border border-green-200 p-4">
          <div className="text-sm text-gray-600">Available</div>
          <div className="text-2xl text-green-700 mt-1">
            {bookCopies.filter(c => c.Availability === 'Available').length}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-yellow-200 p-4">
          <div className="text-sm text-gray-600">Borrowed</div>
          <div className="text-2xl text-yellow-700 mt-1">
            {bookCopies.filter(c => c.Availability === 'Borrowed').length}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-red-200 p-4">
          <div className="text-sm text-gray-600">Damaged/Lost</div>
          <div className="text-2xl text-red-700 mt-1">
            {bookCopies.filter(c => c.Availability === 'Damaged' || c.Availability === 'Lost').length}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Book ID</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">ISBN</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Availability</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Staff ID</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCopies.map((copy) => (
                <tr key={copy.BookID} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{copy.BookID}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{copy.ISBN}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{copy.Title}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      copy.Availability === 'Available'
                        ? 'bg-green-100 text-green-700'
                        : copy.Availability === 'Borrowed'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {copy.Availability}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{copy.StaffID}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onNavigate('book-copy-edit', copy)}
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
            Showing {filteredCopies.length} of {bookCopies.length} book copies
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
