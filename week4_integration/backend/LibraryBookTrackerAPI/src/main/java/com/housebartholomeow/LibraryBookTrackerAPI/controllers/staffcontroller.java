package com.housebartholomeow.LibraryBookTrackerAPI.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.*;

import java.util.List;
import com.housebartholomeow.LibraryBookTrackerAPI.entities.staff;

import org.springframework.http.ResponseEntity;

import com.housebartholomeow.LibraryBookTrackerAPI.services.staffservice;

@RestController
@RequestMapping("/staff")
public class staffcontroller {

    @Autowired
    private staffservice staffService;

    // CREATE
    @PostMapping
    public staff create(@RequestBody staff staff) {
        return staffService.createStaff(staff);
    }

    // READ ALL
    @GetMapping
    public List<staff> getAll() {
        return staffService.getAllStaff();
    }

    // READ BY ID
    @GetMapping("/{id}")
    public ResponseEntity<staff> getById(@PathVariable int id) {
        return staffService.getStaffById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/by-email/{email}")
    public ResponseEntity<staff> getStaffByEmail(@PathVariable("email") String email) {
        return staffService.getStaffByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<staff> update(@PathVariable int id, @RequestBody staff staff) {
        staff updated = staffService.updateStaff(id, staff);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        boolean deleted = staffService.deleteStaff(id);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    // SEARCH
    @GetMapping("/search")
    public List<staff> search(@RequestParam String keyword) {
        return staffService.searchStaff(keyword);
    }
}