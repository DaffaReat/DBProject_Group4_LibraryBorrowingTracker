package com.housebartholomeow.LibraryBookTrackerAPI.services;

import com.housebartholomeow.LibraryBookTrackerAPI.entities.bookcopy;
import com.housebartholomeow.LibraryBookTrackerAPI.repositories.bookcopyrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class bookcopyservice {

    @Autowired
    private bookcopyrepository bookCopyRepository;

    // --- CREATE ---
    public bookcopy addBookCopy(bookcopy newCopy) {
        return bookCopyRepository.save(newCopy);
    }

    // --- READ ---
    public List<bookcopy> getAllBookCopies() {
        return bookCopyRepository.findAll();
    }

    public Optional<bookcopy> getBookCopyById(int bookId) {
        return bookCopyRepository.findById(bookId);
    }

    // --- UPDATE ---
    public bookcopy updateBookCopy(int bookId, bookcopy updatedCopy) {
        Optional<bookcopy> existingCopyOpt = bookCopyRepository.findById(bookId);
        if (existingCopyOpt.isPresent()) {
            bookcopy existingCopy = existingCopyOpt.get();

            existingCopy.setAvailability(updatedCopy.getAvailability());
            existingCopy.setIsbn(updatedCopy.getIsbn());
            existingCopy.setStaffId(updatedCopy.getStaffId()); // assuming you have a setter

            return bookCopyRepository.save(existingCopy);
        } else {
            return null; // or throw exception
        }
    }

    // --- DELETE ---
    public boolean deleteBookCopy(int bookId) {
        if (bookCopyRepository.existsById(bookId)) {
            bookCopyRepository.deleteById(bookId);
            return true;
        } else {
            return false;
        }
    }

    // --- SEARCH ---
    public List<bookcopy> searchBookCopies(String keyword) {
        return bookCopyRepository.search(keyword);
    }

    // --- BUSINESS LOGIC EXAMPLE ---
    public boolean isAvailable(int bookId) {
        Optional<bookcopy> copyOpt = bookCopyRepository.findById(bookId);
        return copyOpt.map(copy -> copy.getAvailability().equals("Available")).orElse(false);
    }

    public int countCopiesByIsbn(String isbn) {
        return bookCopyRepository.countByIsbn(isbn);
    }
}
