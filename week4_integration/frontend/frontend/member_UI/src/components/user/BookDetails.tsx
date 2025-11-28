import React from 'react';
import { ArrowLeft, Book, Calendar, User, Building, Tag, CheckCircle, XCircle } from 'lucide-react';

interface BookDetailsProps {
  book: any;
  onNavigate: (view: string, item?: any) => void;
}

export default function BookDetails({ book, onNavigate }: BookDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => onNavigate('books')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Catalog
      </button>

      {/* Book Details */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Book Cover */}
            <div>
              <div className="aspect-[3/4] bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-2xl">
                <Book className="w-24 h-24 text-white" />
              </div>
              
              {/* Availability Status */}
              <div className="mt-6 space-y-3">
                {book.available ? (
                  <div className="flex items-center gap-2 text-green-700 bg-green-50 rounded-lg p-3">
                    <CheckCircle className="w-5 h-5" />
                    <div>
                      <div className="text-sm">Available</div>
                      <div className="text-xs text-green-600">{book.copiesAvailable} of {book.totalCopies} copies</div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-700 bg-red-50 rounded-lg p-3">
                    <XCircle className="w-5 h-5" />
                    <div>
                      <div className="text-sm">Not Available</div>
                      <div className="text-xs text-red-600">All copies borrowed</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Book Information */}
            <div className="md:col-span-2 space-y-6">
              {/* Title and Author */}
              <div>
                <h1 className="text-gray-900 mb-2">{book.Title}</h1>
                <p className="text-xl text-gray-600">
                  by {book.AuthorFirstName} {book.AuthorLastName}
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Tag className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-600">Genre</div>
                    <div className="text-gray-900">{book.Genre}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-600">Publication Year</div>
                    <div className="text-gray-900">{book.PublicationYear}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-600">Publisher</div>
                    <div className="text-gray-900">{book.Publisher}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Book className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-600">ISBN</div>
                    <div className="text-gray-900 text-sm">{book.ISBN}</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-gray-900 mb-3">About this book</h3>
                <p className="text-gray-600 leading-relaxed">
                  This classic work by {book.AuthorFirstName} {book.AuthorLastName} has captivated readers for generations. 
                  Published in {book.PublicationYear}, it remains a cornerstone of {book.Genre.toLowerCase()} literature. 
                  Available in our library collection for all members to enjoy.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('borrow-request', book)}
                  disabled={!book.available}
                  className={`flex-1 px-6 py-3 rounded-lg transition-all ${
                    book.available
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {book.available ? 'Borrow This Book' : 'Not Available'}
                </button>
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Add to Wishlist
                </button>
              </div>

              {/* Borrowing Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm text-blue-900 mb-2">Borrowing Information</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Borrowing period: 14 days</li>
                  <li>• Can be renewed once if not reserved</li>
                  <li>• Late return fee: $1.00 per day</li>
                  <li>• Maximum 5 books can be borrowed at once</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Books */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-gray-900 mb-4">Similar Books</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-12 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded flex items-center justify-center flex-shrink-0">
                  <Book className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm text-gray-900 truncate">Book Title {i}</h3>
                  <p className="text-xs text-gray-600">Author Name</p>
                  <span className="inline-block px-2 py-1 rounded text-xs bg-green-100 text-green-700 mt-2">
                    Available
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
