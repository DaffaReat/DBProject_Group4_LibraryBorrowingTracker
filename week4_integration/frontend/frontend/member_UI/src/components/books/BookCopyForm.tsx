import React, { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';

interface BookCopyFormProps {
  bookCopy?: any;
  onBack: () => void;
  onSave: () => void;
}

export default function BookCopyForm({ bookCopy, onBack, onSave }: BookCopyFormProps) {
  const [formData, setFormData] = useState({
    BookID: bookCopy?.BookID || '',
    ISBN: bookCopy?.ISBN || '',
    Availability: bookCopy?.Availability || 'Available',
    StaffID: bookCopy?.StaffID || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving book copy:', formData);
    onSave();
  };

  const books = [
    { ISBN: '978-0-7432-7356-5', Title: 'The Great Gatsby' },
    { ISBN: '978-0-452-28423-4', Title: '1984' },
    { ISBN: '978-0-06-112008-4', Title: 'To Kill a Mockingbird' },
    { ISBN: '978-0-14-143951-8', Title: 'Pride and Prejudice' },
    { ISBN: '978-0-316-76948-0', Title: 'The Catcher in the Rye' },
    { ISBN: '978-0-439-02348-1', Title: "Harry Potter and the Philosopher's Stone" },
    { ISBN: '978-0-06-093546-7', Title: 'The Hobbit' },
  ];

  const staff = [
    { StaffID: 'S001', Name: 'Alice Johnson' },
    { StaffID: 'S002', Name: 'Robert Williams' },
    { StaffID: 'S003', Name: 'Maria Garcia' },
  ];

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
          <h1 className="text-gray-900">{bookCopy ? 'Edit Book Copy' : 'Add New Book Copy'}</h1>
          <p className="text-gray-600">
            {bookCopy ? 'Update book copy information' : 'Add a new physical copy of a book'}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="space-y-6">
          {/* Copy Information */}
          <div>
            <h3 className="text-gray-900 mb-4">Copy Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Book ID (Copy ID) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="BookID"
                  value={formData.BookID}
                  onChange={handleChange}
                  placeholder="BC001"
                  required
                  disabled={!!bookCopy}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Book (ISBN) <span className="text-red-500">*</span>
                </label>
                <select
                  name="ISBN"
                  value={formData.ISBN}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a book...</option>
                  {books.map(book => (
                    <option key={book.ISBN} value={book.ISBN}>
                      {book.Title} - {book.ISBN}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Availability <span className="text-red-500">*</span>
                </label>
                <select
                  name="Availability"
                  value={formData.Availability}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Available">Available</option>
                  <option value="Borrowed">Borrowed</option>
                  <option value="Damaged">Damaged</option>
                  <option value="Lost">Lost</option>
                  <option value="In Repair">In Repair</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Responsible Staff <span className="text-red-500">*</span>
                </label>
                <select
                  name="StaffID"
                  value={formData.StaffID}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select staff...</option>
                  {staff.map(s => (
                    <option key={s.StaffID} value={s.StaffID}>
                      {s.Name} ({s.StaffID})
                    </option>
                  ))}
                </select>
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
              {bookCopy ? 'Update Book Copy' : 'Create Book Copy'}
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
