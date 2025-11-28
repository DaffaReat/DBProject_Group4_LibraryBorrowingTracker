import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Dashboard from "./components/Dashboard";
import MemberList from "./components/members/MemberList";
import MemberForm from "./components/members/MemberForm";
import StaffList from "./components/staff/StaffList";
import StaffForm from "./components/staff/StaffForm";
import BookList from "./components/books/BookList";
import BookForm from "./components/books/BookForm";
import BookCopyList from "./components/books/BookCopyList";
import BookCopyForm from "./components/books/BookCopyForm";
import BorrowList from "./components/borrowing/BorrowList";
import BorrowForm from "./components/borrowing/BorrowForm";
import ReturnForm from "./components/borrowing/ReturnForm";
import FineList from "./components/fines/FineList";
import FineForm from "./components/fines/FineForm";
import PaymentForm from "./components/fines/PaymentForm";
import Sidebar from "./components/layout/Sidebar";
import TopNav from "./components/layout/TopNav";

export default function App() {
  const [currentView, setCurrentView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleNavigation = (view: string, item: any = null) => {
    setCurrentView(view);
    setSelectedItem(item);
  };

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard onNavigate={handleNavigation} />;

      // Member Management
      case "members":
        return <MemberList onNavigate={handleNavigation} />;
      case "member-create":
        return (
          <MemberForm
            onBack={() => handleNavigation("members")}
            onSave={() => handleNavigation("members")}
          />
        );
      case "member-edit":
        return (
          <MemberForm
            member={selectedItem}
            onBack={() => handleNavigation("members")}
            onSave={() => handleNavigation("members")}
          />
        );

      // Staff Management
      case "staff":
        return <StaffList onNavigate={handleNavigation} />;
      case "staff-create":
        return (
          <StaffForm
            onBack={() => handleNavigation("staff")}
            onSave={() => handleNavigation("staff")}
          />
        );
      case "staff-edit":
        return (
          <StaffForm
            staff={selectedItem}
            onBack={() => handleNavigation("staff")}
            onSave={() => handleNavigation("staff")}
          />
        );

      // Book Management
      case "books":
        return <BookList onNavigate={handleNavigation} />;
      case "book-create":
        return (
          <BookForm
            onBack={() => handleNavigation("books")}
            onSave={() => handleNavigation("books")}
          />
        );
      case "book-edit":
        return (
          <BookForm
            book={selectedItem}
            onBack={() => handleNavigation("books")}
            onSave={() => handleNavigation("books")}
          />
        );

      // Book Copy Management
      case "book-copies":
        return <BookCopyList onNavigate={handleNavigation} />;
      case "book-copy-create":
        return (
          <BookCopyForm
            onBack={() => handleNavigation("book-copies")}
            onSave={() => handleNavigation("book-copies")}
          />
        );
      case "book-copy-edit":
        return (
          <BookCopyForm
            bookCopy={selectedItem}
            onBack={() => handleNavigation("book-copies")}
            onSave={() => handleNavigation("book-copies")}
          />
        );

      // Borrowing Module
      case "borrows":
        return <BorrowList onNavigate={handleNavigation} />;
      case "borrow-create":
        return (
          <BorrowForm
            onBack={() => handleNavigation("borrows")}
            onSave={() => handleNavigation("borrows")}
          />
        );
      case "return-book":
        return (
          <ReturnForm
            borrow={selectedItem}
            onBack={() => handleNavigation("borrows")}
            onSave={() => handleNavigation("borrows")}
          />
        );

      // Fine Management
      case "fines":
        return <FineList onNavigate={handleNavigation} />;
      case "fine-create":
        return (
          <FineForm
            onBack={() => handleNavigation("fines")}
            onSave={() => handleNavigation("fines")}
          />
        );
      case "fine-payment":
        return (
          <PaymentForm
            fine={selectedItem}
            onBack={() => handleNavigation("fines")}
            onSave={() => handleNavigation("fines")}
          />
        );

      default:
        return <Dashboard onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        currentView={currentView}
        onNavigate={handleNavigation}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <TopNav
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}