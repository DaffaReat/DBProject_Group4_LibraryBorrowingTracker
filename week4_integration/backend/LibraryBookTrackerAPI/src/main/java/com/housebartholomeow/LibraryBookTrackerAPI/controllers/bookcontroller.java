package com.housebartholomeow.LibraryBookTrackerAPI.controllers;

import org.springframework.web.bind.annotation.*;

import com.housebartholomeow.LibraryBookTrackerAPI.services.bookservice;

import java.util.List;

import com.housebartholomeow.LibraryBookTrackerAPI.entities.book;

import org.springframework.http.ResponseEntity;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.validation.annotation.Validated;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/books")
@Validated
public class bookcontroller {

    @Autowired
    private bookservice bookService;

    @PostMapping
    public book createBook(@Valid @RequestBody book book) {
        return bookService.addBook(book);
    }

    @GetMapping
    public List<book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("/{isbn}")
    public ResponseEntity<book> getBook(@PathVariable String isbn) {
        return bookService.getBookByIsbn(isbn)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{isbn}")
    public ResponseEntity<book> updateBook(@PathVariable String isbn,
                                           @Valid @RequestBody book book) {
        book updated = bookService.updateBook(isbn, book);
        return (updated != null)
                ? ResponseEntity.ok(updated)
                : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{isbn}")
    public ResponseEntity<Void> deleteBook(@PathVariable String isbn) {
        boolean deleted = bookService.deleteBook(isbn);
        return deleted
                ? ResponseEntity.ok().build()
                : ResponseEntity.notFound().build();
    }

    @GetMapping("/search")
    public List<book> searchBooks(@RequestParam String keyword) {
        return bookService.searchBooks(keyword);
    }
}
