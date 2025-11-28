import React, { useState } from 'react';
import { Search, Filter, Book as BookIcon, ChevronRight } from 'lucide-react';

interface BookCatalogProps {
  onNavigate: (view: string, item?: any) => void;
}

export default function BookCatalog({ onNavigate }: BookCatalogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGenre, setFilterGenre] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const books = [
    {
      ISBN: '978-0-7432-7356-5',
      Title: 'The Great Gatsby',
      AuthorFirstName: 'F. Scott',
      AuthorLastName: 'Fitzgerald',
      Genre: 'Classic Fiction',
      Publisher: 'Scribner',
      PublicationYear: '1925',
      available: true,
      copiesAvailable: 2,
      totalCopies: 3
    },
    {
      ISBN: '978-0-452-28423-4',
      Title: '1984',
      AuthorFirstName: 'George',
      AuthorLastName: 'Orwell',
      Genre: 'Dystopian Fiction',
      Publisher: 'Plume',
      PublicationYear: '1949',
      available: true,
      copiesAvailable: 1,
      totalCopies: 2
    },
    {
      ISBN: '978-0-06-112008-4',
      Title: 'To Kill a Mockingbird',
      AuthorFirstName: 'Harper',
      AuthorLastName: 'Lee',
      Genre: 'Classic Fiction',
      Publisher: 'Harper Perennial',
      PublicationYear: '1960',
      available: true,
      copiesAvailable: 1,
      totalCopies: 2
    },
    {
      ISBN: '978-0-14-143951-8',
      Title: 'Pride and Prejudice',
      AuthorFirstName: 'Jane',
      AuthorLastName: 'Austen',
      Genre: 'Romance',
      Publisher: 'Penguin Classics',
      PublicationYear: '1813',
      available: false,
      copiesAvailable: 0,
      totalCopies: 2
    },
    {
      ISBN: '978-0-316-76948-0',
      Title: 'The Catcher in the Rye',
      AuthorFirstName: 'J.D.',
      AuthorLastName: 'Salinger',
      Genre: 'Classic Fiction',
      Publisher: 'Little, Brown and Company',
      PublicationYear: '1951',
      available: true,
      copiesAvailable: 1,
      totalCopies: 1
    },
    {
      ISBN: '978-0-439-02348-1',
      Title: "Harry Potter and the Philosopher's Stone",
      AuthorFirstName: 'J.K.',
      AuthorLastName: 'Rowling',
      Genre: 'Fantasy',
      Publisher: 'Scholastic',
      PublicationYear: '1997',
      available: true,
      copiesAvailable: 3,
      totalCopies: 4
    },
    {
      ISBN: '978-0-06-093546-7',
      Title: 'The Hobbit',
      AuthorFirstName: 'J.R.R.',
      AuthorLastName: 'Tolkien',
      Genre: 'Fantasy',
      Publisher: 'Houghton Mifflin',
      PublicationYear: '1937',
      available: true,
      copiesAvailable: 2,
      totalCopies: 3
    },
    {
      ISBN: '978-0-141-03943-1',
      Title: 'Animal Farm',
      AuthorFirstName: 'George',
      AuthorLastName: 'Orwell',
      Genre: 'Political Fiction',
      Publisher: 'Penguin Books',
      PublicationYear: '1945',
      available: true,
      copiesAvailable: 1,
      totalCopies: 2
    },
  ];

  const filteredBooks = books.filter(book => {
    const matchesSearch = 
      book.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.AuthorFirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.AuthorLastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.Genre.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterGenre === 'all' || book.Genre.toLowerCase().includes(filterGenre.toLowerCase());
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900">Book Catalog</h1>
        <p className="text-gray-600">Browse and search our collection</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, author, or genre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterGenre}
              onChange={(e) => setFilterGenre(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Genres</option>
              <option value="classic">Classic Fiction</option>
              <option value="dystopian">Dystopian Fiction</option>
              <option value="romance">Romance</option>
              <option value="fantasy">Fantasy</option>
              <option value="political">Political Fiction</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Found {filteredBooks.length} books
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Books Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {filteredBooks.map((book) => (
          <div
            key={book.ISBN}
            onClick={() => onNavigate('book-details', book)}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <BookIcon className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-gray-900 mb-1 truncate">{book.Title}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {book.AuthorFirstName} {book.AuthorLastName}
                </p>
                <span className="inline-block px-2 py-1 rounded text-xs bg-blue-100 text-blue-700 mb-2">
                  {book.Genre}
                </span>
                <div className="flex items-center justify-between mt-3">
                  <div>
                    {book.available ? (
                      <span className="text-xs text-green-600 flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        {book.copiesAvailable} available
                      </span>
                    ) : (
                      <span className="text-xs text-red-600 flex items-center gap-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        Not available
                      </span>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <BookIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-gray-900 mb-2">No books found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
