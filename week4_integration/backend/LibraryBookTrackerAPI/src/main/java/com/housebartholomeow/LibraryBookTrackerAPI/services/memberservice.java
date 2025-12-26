package com.housebartholomeow.LibraryBookTrackerAPI.services;

import com.housebartholomeow.LibraryBookTrackerAPI.entities.member;
import com.housebartholomeow.LibraryBookTrackerAPI.repositories.memberrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.time.LocalDate;

@Service
public class memberservice {

    @Autowired
    private memberrepository memberRepository;

    // --- CREATE ---
    public member createMember(member newMember) {
        return memberRepository.save(newMember);
    }

    // --- READ ---
    public List<member> getAllMembers() {
        return memberRepository.findAll();
    }

    public Optional<member> getMemberById(int memberId) {
        return memberRepository.findById(memberId);
    }

    // --- UPDATE ---
    public member updateMember(int memberId, member updatedMember) {
        Optional<member> existingMemberOpt = memberRepository.findById(memberId);
        if (existingMemberOpt.isPresent()) {
            member existingMember = existingMemberOpt.get();

            existingMember.setMemberFirstName(updatedMember.getMemberFirstName());
            existingMember.setMemberLastName(updatedMember.getMemberLastName());
            existingMember.setEmail(updatedMember.getEmail());
            existingMember.setPhoneNumber(updatedMember.getPhoneNumber());
            existingMember.setAddress(updatedMember.getAddress());
            existingMember.setMemberStatus(updatedMember.getMemberStatus());
            existingMember.setPassword(updatedMember.getPassword());
            existingMember.setDateOfBirth(updatedMember.getDateOfBirth());
            existingMember.setJoinDate(updatedMember.getJoinDate());
            existingMember.setMemberExpiryDate(updatedMember.getMemberExpiryDate());
            existingMember.setGender(updatedMember.getGender());

            return memberRepository.save(existingMember);
        } else {
            return null;
        }
    }

    // --- DELETE ---
    public boolean deleteMember(int memberId) {
        if (memberRepository.existsById(memberId)) {
            memberRepository.deleteById(memberId);
            return true;
        } else {
            return false;
        }
    }

    // --- SEARCH ---
    public List<member> searchMembers(String keyword) {
        return memberRepository.search(keyword); // make sure search is defined in repository
    }

    // --- BUSINESS LOGIC EXAMPLES ---
    public boolean isMemberActive(int memberId) {
        Optional<member> memberOpt = memberRepository.findById(memberId);
        return memberOpt.map(member -> member.getMemberStatus().equals("Active")).orElse(false);
    }

    public boolean isMembershipExpired(int memberId) {
        Optional<member> memberOpt = memberRepository.findById(memberId);
        if (memberOpt.isPresent()) {
            return memberOpt.get().getMemberExpiryDate().isBefore(LocalDate.now()); 
        }
        return true;
    }
}
