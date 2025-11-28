import React, { useState } from 'react';
import LoginPage from './components/user/LoginPage';
import RegisterPage from './components/user/RegisterPage';
import UserDashboard from './components/user/UserDashboard';
import BookCatalog from './components/user/BookCatalog';
import BookDetails from './components/user/BookDetails';
import BorrowRequest from './components/user/BorrowRequest';
import MyBorrowedBooks from './components/user/MyBorrowedBooks';
import BorrowHistory from './components/user/BorrowHistory';
import ReturnConfirmation from './components/user/ReturnConfirmation';
import UserFines from './components/user/UserFines';
import FinePayment from './components/user/FinePayment';
import UserProfile from './components/user/UserProfile';
import EditProfile from './components/user/EditProfile';
import ChangePassword from './components/user/ChangePassword';
import UserLayout from './components/user/UserLayout';

export default function App() {
  const [currentView, setCurrentView] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const handleNavigation = (view: string, item: any = null) => {
    setCurrentView(view);
    setSelectedItem(item);
  };

  const handleLogin = (userData: any) => {
    setIsLoggedIn(true);
    setCurrentUser(userData);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentView('login');
  };

  const renderContent = () => {
    if (!isLoggedIn) {
      switch (currentView) {
        case 'login':
          return <LoginPage onLogin={handleLogin} onNavigate={handleNavigation} />;
        case 'register':
          return <RegisterPage onNavigate={handleNavigation} />;
        default:
          return <LoginPage onLogin={handleLogin} onNavigate={handleNavigation} />;
      }
    }

    switch (currentView) {
      case 'dashboard':
        return <UserDashboard user={currentUser} onNavigate={handleNavigation} />;
      case 'books':
        return <BookCatalog onNavigate={handleNavigation} />;
      case 'book-details':
        return <BookDetails book={selectedItem} onNavigate={handleNavigation} />;
      case 'borrow-request':
        return <BorrowRequest book={selectedItem} user={currentUser} onNavigate={handleNavigation} />;
      case 'my-borrowed':
        return <MyBorrowedBooks user={currentUser} onNavigate={handleNavigation} />;
      case 'borrow-history':
        return <BorrowHistory user={currentUser} onNavigate={handleNavigation} />;
      case 'return-confirmation':
        return <ReturnConfirmation borrow={selectedItem} onNavigate={handleNavigation} />;
      case 'fines':
        return <UserFines user={currentUser} onNavigate={handleNavigation} />;
      case 'fine-payment':
        return <FinePayment fine={selectedItem} onNavigate={handleNavigation} />;
      case 'profile':
        return <UserProfile user={currentUser} onNavigate={handleNavigation} />;
      case 'edit-profile':
        return <EditProfile user={currentUser} onNavigate={handleNavigation} />;
      case 'change-password':
        return <ChangePassword user={currentUser} onNavigate={handleNavigation} />;
      default:
        return <UserDashboard user={currentUser} onNavigate={handleNavigation} />;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {renderContent()}
      </div>
    );
  }

  return (
    <UserLayout currentView={currentView} onNavigate={handleNavigation} onLogout={handleLogout} user={currentUser}>
      {renderContent()}
    </UserLayout>
  );
}
