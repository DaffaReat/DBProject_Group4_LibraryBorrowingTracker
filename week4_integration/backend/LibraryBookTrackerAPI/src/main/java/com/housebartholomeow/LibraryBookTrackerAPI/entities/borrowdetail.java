package com.housebartholomeow.LibraryBookTrackerAPI.entities;

import jakarta.persistence.*;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

@Entity
@Table(name = "BorrowDetail")
public class borrowdetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BorrowID")
    private int borrowId;

    @Column(name = "BorrowDate", nullable = false)
    @NotNull(message = "Borrow date is required")
    private LocalDate borrowDate;

    @Column(name = "DueDate", nullable = false)
    @NotNull(message = "Due date is required")
    @Future(message = "Due date must be in the future")
    private LocalDate dueDate;

    @Column(name = "ReturnDate")
    private LocalDate returnDate;

    @Column(name = "BookID", nullable = false)
    @Positive(message = "Book ID must be positive")
    private int bookId;

    @Column(name = "StaffID", nullable = false)
    @Positive(message = "Staff ID must be positive")
    private int staffId;

    @Column(name = "MemberID", nullable = false)
    @Positive(message = "Member ID must be positive")
    private int memberId;

    public borrowdetail() {}

    public borrowdetail(LocalDate borrowDate, LocalDate dueDate,
                        int bookId, int staffId, int memberId) {

        this.borrowDate = borrowDate;
        this.dueDate = dueDate;
        this.bookId = bookId;
        this.staffId = staffId;
        this.memberId = memberId;
    }

    public int getBorrowId() { return borrowId; }
    public void setBorrowId(int borrowId) { this.borrowId = borrowId; }

    public LocalDate getBorrowDate() { return borrowDate; }
    public void setBorrowDate(LocalDate borrowDate) { this.borrowDate = borrowDate; }

    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }

    public LocalDate getReturnDate() { return returnDate; }
    public void setReturnDate(LocalDate returnDate) { this.returnDate = returnDate; }

    public int getBookId() { return bookId; }
    public void setBookId(int bookId) { this.bookId = bookId; }

    public int getStaffId() { return staffId; }
    public void setStaffId(int staffId) { this.staffId = staffId; }

    public int getMemberId() { return memberId; }
    public void setMemberId(int memberId) { this.memberId = memberId; }
}
