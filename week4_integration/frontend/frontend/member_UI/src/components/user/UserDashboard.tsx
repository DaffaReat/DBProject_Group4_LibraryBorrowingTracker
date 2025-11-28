import React from 'react';
import { Book, AlertCircle, DollarSign, Calendar, CheckCircle, Clock, TrendingUp, ArrowRight } from 'lucide-react';

interface UserDashboardProps {
  user: any;
  onNavigate: (view: string) => void;
}

export default function UserDashboard({ user, onNavigate }: UserDashboardProps) {
  const stats = [
    {
      title: 'Books Borrowed',
      value: '3',
      icon: Book,
      color: 'blue',
      description: 'Currently borrowed',
      action: () => onNavigate('my-borrowed')
    },
    {
      title: 'Overdue Books',
      value: '1',
      icon: AlertCircle,
      color: 'red',
      description: 'Need immediate return',
      action: () => onNavigate('my-borrowed')
    },
    {
      title: 'Unpaid Fines',
      value: '$15.00',
      icon: DollarSign,
      color: 'yellow',
      description: 'Outstanding balance',
      action: () => onNavigate('fines')
    },
    {
      title: 'Membership',
      value: 'Active',
      icon: CheckCircle,
      color: 'green',
      description: `Until ${user?.MemberExpiryDate}`,
      action: () => onNavigate('profile')
    },
  ];

  const recentBorrows = [
    { 
      title: 'The Great Gatsby', 
      author: 'F. Scott Fitzgerald',
      borrowDate: '2025-11-18', 
      dueDate: '2025-12-02', 
      status: 'Active',
      daysLeft: 6
    },
    { 
      title: '1984', 
      author: 'George Orwell',
      borrowDate: '2025-11-19', 
      dueDate: '2025-12-03', 
      status: 'Active',
      daysLeft: 7
    },
    { 
      title: 'To Kill a Mockingbird', 
      author: 'Harper Lee',
      borrowDate: '2025-11-10', 
      dueDate: '2025-11-24', 
      status: 'Overdue',
      daysLeft: -2
    },
  ];

  const recommendedBooks = [
    { 
      title: 'Pride and Prejudice', 
      author: 'Jane Austen',
      genre: 'Classic Fiction',
      available: true
    },
    { 
      title: 'The Catcher in the Rye', 
      author: 'J.D. Salinger',
      genre: 'Classic Fiction',
      available: true
    },
    { 
      title: "Harry Potter and the Philosopher's Stone", 
      author: 'J.K. Rowling',
      genre: 'Fantasy',
      available: true
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      red: 'from-red-500 to-red-600',
      yellow: 'from-yellow-500 to-yellow-600',
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-white mb-2">Welcome back, {user?.MemberFirstName}! 👋</h1>
            <p className="text-blue-100">
              Member ID: {user?.MemberID} • Joined: {user?.JoinDate}
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <div className="text-xs text-blue-100">Member Status</div>
              <div className="text-white mt-1">{user?.MemberStatus}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <button
              key={stat.title}
              onClick={stat.action}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all hover:-translate-y-1 text-left"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getColorClasses(stat.color)} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-sm text-gray-600 mb-1">{stat.title}</div>
              <div className="text-2xl text-gray-900 mb-2">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.description}</div>
            </button>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Borrows */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-gray-900">Current Borrows</h2>
              <p className="text-sm text-gray-600">Your active borrowed books</p>
            </div>
            <button
              onClick={() => onNavigate('my-borrowed')}
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {recentBorrows.map((borrow, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-gray-900">{borrow.title}</h3>
                    <p className="text-sm text-gray-600">{borrow.author}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    borrow.status === 'Active' 
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {borrow.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Due: {borrow.dueDate}
                  </span>
                  <span className={borrow.daysLeft < 0 ? 'text-red-600' : 'text-gray-600'}>
                    {borrow.daysLeft < 0 
                      ? `${Math.abs(borrow.daysLeft)} days overdue`
                      : `${borrow.daysLeft} days left`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Books */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-gray-900">Recommended for You</h2>
              <p className="text-sm text-gray-600">Based on your reading history</p>
            </div>
            <button
              onClick={() => onNavigate('books')}
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              Browse All
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {recommendedBooks.map((book, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-gray-900">{book.title}</h3>
                    <p className="text-sm text-gray-600">{book.author}</p>
                  </div>
                  {book.available && (
                    <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                      Available
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{book.genre}</span>
                  <button
                    onClick={() => onNavigate('books')}
                    className="text-xs text-blue-600 hover:text-blue-700"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => onNavigate('books')}
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center group"
          >
            <Book className="w-6 h-6 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-sm text-gray-900">Browse Books</div>
          </button>
          <button
            onClick={() => onNavigate('my-borrowed')}
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center group"
          >
            <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-sm text-gray-900">My Books</div>
          </button>
          <button
            onClick={() => onNavigate('borrow-history')}
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center group"
          >
            <TrendingUp className="w-6 h-6 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-sm text-gray-900">History</div>
          </button>
          <button
            onClick={() => onNavigate('fines')}
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center group"
          >
            <DollarSign className="w-6 h-6 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-sm text-gray-900">Pay Fines</div>
          </button>
        </div>
      </div>
    </div>
  );
}
