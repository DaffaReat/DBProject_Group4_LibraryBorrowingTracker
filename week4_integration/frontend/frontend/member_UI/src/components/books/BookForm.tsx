import React, { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';

interface BookFormProps {
  book?: any;
  onBack: () => void;
  onSave: () => void;
}

export default function BookForm({ book, onBack, onSave }: BookFormProps) {
  const [formData, setFormData] = useState({
    ISBN: book?.ISBN || '',
    Title: book?.Title || '',
    AuthorFirstName: book?.AuthorFirstName || '',
    AuthorLastName: book?.AuthorLastName || '',
    Genre: book?.Genre || '',
    Publisher: book?.Publisher || '',
    PublicationYear: book?.PublicationYear || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving book:', formData);
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
          <h1 className="text-gray-900">{book ? 'Edit Book' : 'Add New Book'}</h1>
          <p className="text-gray-600">
            {book ? 'Update book information' : 'Add a new book to the catalog'}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="space-y-6">
          {/* Book Information */}
          <div>
            <h3 className="text-gray-900 mb-4">Book Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  ISBN <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="ISBN"
                  value={formData.ISBN}
                  onChange={handleChange}
                  placeholder="978-0-7432-7356-5"
                  required
                  disabled={!!book}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="Title"
                  value={formData.Title}
                  onChange={handleChange}
                  placeholder="The Great Gatsby"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Genre <span className="text-red-500">*</span>
                </label>
                <select
                  name="Genre"
                  value={formData.Genre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select genre...</option>
                  <option value="Classic Fiction">Classic Fiction</option>
                  <option value="Dystopian Fiction">Dystopian Fiction</option>
                  <option value="Romance">Romance</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Science Fiction">Science Fiction</option>
                  <option value="Biography">Biography</option>
                  <option value="History">History</option>
                  <option value="Self-Help">Self-Help</option>
                  <option value="Poetry">Poetry</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Publication Year <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="PublicationYear"
                  value={formData.PublicationYear}
                  onChange={handleChange}
                  placeholder="1925"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Author Information */}
          <div>
            <h3 className="text-gray-900 mb-4">Author Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Author First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="AuthorFirstName"
                  value={formData.AuthorFirstName}
                  onChange={handleChange}
                  placeholder="F. Scott"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Author Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="AuthorLastName"
                  value={formData.AuthorLastName}
                  onChange={handleChange}
                  placeholder="Fitzgerald"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Publisher Information */}
          <div>
            <h3 className="text-gray-900 mb-4">Publisher Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Publisher <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="Publisher"
                  value={formData.Publisher}
                  onChange={handleChange}
                  placeholder="Scribner"
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
              {book ? 'Update Book' : 'Create Book'}
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
