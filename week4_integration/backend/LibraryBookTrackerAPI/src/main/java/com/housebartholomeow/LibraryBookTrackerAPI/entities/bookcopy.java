package com.housebartholomeow.LibraryBookTrackerAPI.entities;

import jakarta.persistence.*;
import com.housebartholomeow.LibraryBookTrackerAPI.enums.*;

import jakarta.validation.constraints.*;

@Entity
@Table(name = "book_copy")
public class bookcopy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")
    private int bookId;

    @Enumerated(EnumType.STRING)
    @Column(name = "availability", nullable = false)
    @NotNull(message = "Availability must be provided")
    private Availability availability;

    @Column(name = "isbn", nullable = false)
    @NotBlank(message = "ISBN cannot be empty")
    @Size(min = 10, max = 13, message = "ISBN must be 10-13 characters")
    private String isbn;

    @Column(name = "staff_id", nullable = false)
    @Positive(message = "StaffID must be a positive integer")
    private int staffId;

    public bookcopy() {}

    public bookcopy(Availability availability, String isbn, int staffId) {
        this.availability = availability;
        this.isbn = isbn;
        this.staffId = staffId;
    }

    public int getBookId() { return bookId; }
    public void setBookId(int bookId) { this.bookId = bookId; }

    public Availability getAvailability() { return availability; }
    public void setAvailability(Availability availability) { this.availability = availability; }

    public String getIsbn() { 
            if (this.isbn != null) {
                return this.isbn.replaceAll("-", ""); 
            }
            return this.isbn;
        }
    public void setIsbn(String isbn) { 
        if (isbn != null) {
            this.isbn = isbn.replaceAll("-", ""); 
        } else {
            this.isbn = null;
        }
    }

    public int getStaffId() { return staffId; }
    public void setStaffId(int staffId) { this.staffId = staffId; }
}