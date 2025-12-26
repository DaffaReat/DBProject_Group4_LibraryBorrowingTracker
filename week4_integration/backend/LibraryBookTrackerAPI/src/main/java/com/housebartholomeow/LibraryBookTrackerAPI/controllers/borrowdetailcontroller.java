package com.housebartholomeow.LibraryBookTrackerAPI.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.List;
import com.housebartholomeow.LibraryBookTrackerAPI.entities.borrowdetail;

import com.housebartholomeow.LibraryBookTrackerAPI.services.borrowdetailservice;

import org.springframework.http.ResponseEntity;

import java.time.LocalDate;


@RestController
@RequestMapping("/borrow")
public class borrowdetailcontroller {

    @Autowired
    private borrowdetailservice borrowService;

    // CREATE borrow record
    @PostMapping
public borrowdetail borrowBook(@RequestBody borrowdetail request) {
    return borrowService.borrowBook(
        request.getBookId(),
        request.getMemberId(),
        request.getStaffId(),
        request.getDueDate()
    );
}


    @GetMapping
    public List<borrowdetail> getAll() {
        return borrowService.getAllBorrows();
    }

    @GetMapping("/{id}")
    public ResponseEntity<borrowdetail> getOne(@PathVariable int id) {
        return borrowService.getBorrowById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // RETURN book
    @PutMapping("/return/{id}")
    public ResponseEntity<borrowdetail> returnBook (
        @PathVariable int id,
        @RequestParam @DateTimeFormat(pattern="yyyy-MM-dd") LocalDate returnDate) {
    
    borrowdetail updated = borrowService.returnBook(id, returnDate);
    return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        boolean deleted = borrowService.deleteBorrow(id);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/search")
    public List<borrowdetail> search(@RequestParam String keyword) {
        return borrowService.searchBorrows(keyword);
    }
}
