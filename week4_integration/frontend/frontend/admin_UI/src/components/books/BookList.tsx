import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Filter } from 'lucide-react';

interface BookListProps {
  onNavigate: (view: string, item?: any) => void;
}

export default function BookList({ onNavigate }: BookListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGenre, setFilterGenre] = useState('all');

  const books = [
    {
      ISBN: '978-0-7432-7356-5',
      Title: 'The Great Gatsby',
      AuthorFirstName: 'F. Scott',
      AuthorLastName: 'Fitzgerald',
      Genre: 'Classic Fiction',
      Publisher: 'Scribner',
      PublicationYear: '1925'
    },
    {
      ISBN: '978-0-452-28423-4',
      Title: '1984',
      AuthorFirstName: 'George',
      AuthorLastName: 'Orwell',
      Genre: 'Dystopian Fiction',
      Publisher: 'Plume',
      PublicationYear: '1949'
    },
    {
      ISBN: '978-0-06-112008-4',
      Title: 'To Kill a Mockingbird',
      AuthorFirstName: 'Harper',
      AuthorLastName: 'Lee',
      Genre: 'Classic Fiction',
      Publisher: 'Harper Perennial',
      PublicationYear: '1960'
    },
    {
      ISBN: '978-0-14-143951-8',
      Title: 'Pride and Prejudice',
      AuthorFirstName: 'Jane',
      AuthorLastName: 'Austen',
      Genre: 'Romance',
      Publisher: 'Penguin Classics',
      PublicationYear: '1813'
    },
    {
      ISBN: '978-0-316-76948-0',
      Title: 'The Catcher in the Rye',
      AuthorFirstName: 'J.D.',
      AuthorLastName: 'Salinger',
      Genre: 'Classic Fiction',
      Publisher: 'Little, Brown and Company',
      PublicationYear: '1951'
    },
    {
      ISBN: '978-0-439-02348-1',
      Title: "Harry Potter and the Philosopher's Stone",
      AuthorFirstName: 'J.K.',
      AuthorLastName: 'Rowling',
      Genre: 'Fantasy',
      Publisher: 'Scholastic',
      PublicationYear: '1997'
    },
    {
      ISBN: '978-0-06-093546-7',
      Title: 'The Hobbit',
      AuthorFirstName: 'J.R.R.',
      AuthorLastName: 'Tolkien',
      Genre: 'Fantasy',
      Publisher: 'Houghton Mifflin',
      PublicationYear: '1937'
    },
  ];

  const filteredBooks = books.filter(book => {
    const matchesSearch = 
      book.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.AuthorFirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.AuthorLastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.ISBN.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterGenre === 'all' || book.Genre.toLowerCase().includes(filterGenre.toLowerCase());
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Book Management</h1>
          <p className="text-gray-600">Manage library book catalog</p>
        </div>
        <button
          onClick={() => onNavigate('book-create')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Book
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, author, or ISBN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterGenre}
              onChange={(e) => setFilterGenre(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Genres</option>
              <option value="classic">Classic Fiction</option>
              <option value="dystopian">Dystopian Fiction</option>
              <option value="romance">Romance</option>
              <option value="fantasy">Fantasy</option>
              <option value="mystery">Mystery</option>
              <option value="science">Science Fiction</option>
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
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">ISBN</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Genre</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Publisher</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Year</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBooks.map((book) => (
                <tr key={book.ISBN} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{book.ISBN}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{book.Title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {book.AuthorFirstName} {book.AuthorLastName}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                      {book.Genre}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{book.Publisher}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{book.PublicationYear}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onNavigate('book-edit', book)}
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
            Showing {filteredBooks.length} of {books.length} books
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
