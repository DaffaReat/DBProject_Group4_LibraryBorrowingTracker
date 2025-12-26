package com.housebartholomeow.LibraryBookTrackerAPI.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.*;
import java.util.List;
import com.housebartholomeow.LibraryBookTrackerAPI.entities.member;

import org.springframework.http.ResponseEntity;

import com.housebartholomeow.LibraryBookTrackerAPI.services.memberservice;

@RestController
@RequestMapping("/members")
public class membercontroller {

    @Autowired
    private memberservice memberService;

    // CREATE member
    @PostMapping
    public member createMember(@RequestBody member member) {
        return memberService.createMember(member);
    }

    // READ ALL
    @GetMapping
    public List<member> getMembers() {
        return memberService.getAllMembers();
    }

    // READ BY ID
    @GetMapping("/{id}")
    public ResponseEntity<member> getMember(@PathVariable int id) {
        return memberService.getMemberById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // UPDATE (partial update allowed inside service)
    @PutMapping("/{id}")
    public ResponseEntity<member> updateMember(@PathVariable int id, @RequestBody member updated) {
        member result = memberService.updateMember(id, updated);
        return result != null ? ResponseEntity.ok(result) : ResponseEntity.notFound().build();
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable int id) {
        boolean deleted = memberService.deleteMember(id);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    // SEARCH (name, email)
    @GetMapping("/search")
    public List<member> search(@RequestParam String keyword) {
        return memberService.searchMembers(keyword);
    }
}
