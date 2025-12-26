package com.housebartholomeow.LibraryBookTrackerAPI.services;

import com.housebartholomeow.LibraryBookTrackerAPI.entities.book;
import com.housebartholomeow.LibraryBookTrackerAPI.repositories.bookrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class bookservice {

    @Autowired
    private bookrepository bookRepository;

    // --- CREATE ---
    public book addBook(book newBook) {
        return bookRepository.save(newBook);
    }

    // --- READ ---
    public List<book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Optional<book> getBookByIsbn(String isbn) {
        return bookRepository.findById(isbn);
    }

    // --- UPDATE ---
    public book updateBook(String isbn, book updatedBook) {
        Optional<book> existingBookOpt = bookRepository.findById(isbn);
        if (existingBookOpt.isPresent()) {
            book existingBook = existingBookOpt.get();
            
            existingBook.setTitle(updatedBook.getTitle());
            existingBook.setGenre(updatedBook.getGenre());
            existingBook.setAuthorFirstName(updatedBook.getAuthorFirstName());
            existingBook.setAuthorLastName(updatedBook.getAuthorLastName());
            existingBook.setPublisher(updatedBook.getPublisher());
            existingBook.setPublicationYear(updatedBook.getPublicationYear());
            
            return bookRepository.save(existingBook);
        } else {
            return null;
        }
    }

    // --- DELETE ---
    public boolean deleteBook(String isbn) {
        if (bookRepository.existsById(isbn)) {
            bookRepository.deleteById(isbn);
            return true;
        } else {
            return false;
        }
    }

    // --- SEARCH ---
    public List<book> searchBooks(String keyword) {
        return bookRepository.search(keyword);
    }
}
