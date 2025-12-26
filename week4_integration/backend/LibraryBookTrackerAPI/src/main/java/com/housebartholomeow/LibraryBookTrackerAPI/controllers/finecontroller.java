package com.housebartholomeow.LibraryBookTrackerAPI.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.List;
import com.housebartholomeow.LibraryBookTrackerAPI.entities.fine;

import org.springframework.http.ResponseEntity;

import java.time.LocalDate;

import com.housebartholomeow.LibraryBookTrackerAPI.services.fineservice;

@RestController
@RequestMapping("/fines")
public class finecontroller {

    @Autowired
    private fineservice fineService;

    // CREATE a fine
    @PostMapping
    public fine createFine(@RequestParam int borrowId,
                           @RequestParam int staffId,
                           @RequestParam int amount) {
        return fineService.addFine(borrowId, staffId, amount);
    }

    // READ ALL
    @GetMapping
    public List<fine> getAll() {
        return fineService.getAllFines();
    }

    // READ BY ID
    @GetMapping("/{id}")
    public ResponseEntity<fine> getOne(@PathVariable int id) {
        return fineService.getFineById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // UPDATE (mark fine paid)
    @PutMapping("/pay/{id}")
    public ResponseEntity<fine> markPaid(@PathVariable int id,
                                         @RequestParam @DateTimeFormat(pattern="yyyy-MM-dd") LocalDate datePaid) {
        fine updated = fineService.markFinePaid(id, datePaid);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        boolean deleted = fineService.deleteFine(id);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    // SEARCH (status or amount)
    @GetMapping("/search")
    public List<fine> search(@RequestParam String keyword) {
        return fineService.searchFines(keyword);
    }
}
