package com.housebartholomeow.LibraryBookTrackerAPI.services;

import com.housebartholomeow.LibraryBookTrackerAPI.entities.borrowdetail;
import com.housebartholomeow.LibraryBookTrackerAPI.entities.bookcopy;
import com.housebartholomeow.LibraryBookTrackerAPI.entities.member;
import com.housebartholomeow.LibraryBookTrackerAPI.repositories.borrowdetailrepository;
import com.housebartholomeow.LibraryBookTrackerAPI.repositories.bookcopyrepository;
import com.housebartholomeow.LibraryBookTrackerAPI.repositories.memberrepository;

import com.housebartholomeow.LibraryBookTrackerAPI.enums.Availability;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class borrowdetailservice {

    @Autowired
    private borrowdetailrepository borrowDetailRepository;

    @Autowired
    private bookcopyrepository bookCopyRepository;

    @Autowired
    private memberrepository memberRepository;

    // --- CREATE (Borrow a book) ---
    public borrowdetail borrowBook(int bookId, int memberId, int staffId, LocalDate dueDate) {
        
        Optional<bookcopy> copyOpt = bookCopyRepository.findById(bookId);
        Optional<member> memberOpt = memberRepository.findById(memberId);

        if (copyOpt.isEmpty() || memberOpt.isEmpty()) {
            return null;
        }

        bookcopy copy = copyOpt.get();
        member member = memberOpt.get();

        // Check availability
        if (copy.getAvailability() != Availability.Available) {
            return null;
        }

        if (member.getMemberStatus() != com.housebartholomeow.LibraryBookTrackerAPI.enums.MemberStatus.Active) {
            return null;
        }

        // Update book copy status to Borrowed
        copy.setAvailability(Availability.Borrowed);
        bookCopyRepository.save(copy);

        // Create borrow detail
        borrowdetail borrow = new borrowdetail();
        borrow.setBookId(bookId);
        borrow.setMemberId(memberId);
        borrow.setStaffId(staffId);
        borrow.setBorrowDate(LocalDate.now());
        borrow.setDueDate(dueDate);

        return borrowDetailRepository.save(borrow);
    }

    // --- READ ---
    public List<borrowdetail> getAllBorrows() {
        return borrowDetailRepository.findAll();
    }

    public Optional<borrowdetail> getBorrowById(int borrowId) {
        return borrowDetailRepository.findById(borrowId);
    }

    // --- UPDATE (Return book) ---
    public borrowdetail returnBook(int borrowId, LocalDate returnDate) {
    Optional<borrowdetail> borrowOpt = borrowDetailRepository.findById(borrowId);

    if (borrowOpt.isPresent()) {
        borrowdetail borrow = borrowOpt.get();

        borrow.setReturnDate(returnDate);

        Optional<bookcopy> copyOpt = bookCopyRepository.findById(borrow.getBookId());
        copyOpt.ifPresent(copy -> {
            copy.setAvailability(Availability.Available);
            bookCopyRepository.save(copy);
        });
        
        return borrowDetailRepository.save(borrow);
    } else {
        return null;
    }
}

    // --- DELETE ---
    public boolean deleteBorrow(int borrowId) {
        if (borrowDetailRepository.existsById(borrowId)) {
            borrowDetailRepository.deleteById(borrowId);
            return true;
        }
        return false;
    }

    // --- SEARCH ---
    public List<borrowdetail> searchBorrows(String keyword) {
        return borrowDetailRepository.search(keyword);
    }
}
