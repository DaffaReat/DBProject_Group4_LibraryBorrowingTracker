package com.housebartholomeow.LibraryBookTrackerAPI.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.*;

import java.util.List;
import com.housebartholomeow.LibraryBookTrackerAPI.entities.bookcopy;

import com.housebartholomeow.LibraryBookTrackerAPI.services.bookcopyservice;

import org.springframework.http.ResponseEntity;

import org.springframework.validation.annotation.Validated;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/copies")
@Validated
public class bookcopycontroller {

    @Autowired
    private bookcopyservice bookCopyService;

    @PostMapping
    public bookcopy create(@Valid @RequestBody bookcopy copy) {
        return bookCopyService.addBookCopy(copy);
    }

    @GetMapping
    public List<bookcopy> getAll() {
        return bookCopyService.getAllBookCopies();
    }

    @GetMapping("/{id}")
    public ResponseEntity<bookcopy> getOne(@PathVariable int id) {
        return bookCopyService.getBookCopyById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<bookcopy> update(@PathVariable int id,
                                           @Valid @RequestBody bookcopy copy) {
        bookcopy updated = bookCopyService.updateBookCopy(id, copy);
        return updated != null
                ? ResponseEntity.ok(updated)
                : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        boolean deleted = bookCopyService.deleteBookCopy(id);
        return deleted
                ? ResponseEntity.ok().build()
                : ResponseEntity.notFound().build();
    }

    @GetMapping("/search")
    public List<bookcopy> search(@RequestParam String keyword) {
        return bookCopyService.searchBookCopies(keyword);
    }
}
