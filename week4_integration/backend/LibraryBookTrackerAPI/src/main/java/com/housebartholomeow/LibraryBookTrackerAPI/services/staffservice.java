package com.housebartholomeow.LibraryBookTrackerAPI.services;

import com.housebartholomeow.LibraryBookTrackerAPI.entities.staff;
import com.housebartholomeow.LibraryBookTrackerAPI.repositories.staffrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.transaction.annotation.Transactional; // Ensure this is imported

@Service
@Transactional
public class staffservice {

    @Autowired
    private staffrepository staffRepository;

    // --- CRUD ---
    public staff createStaff(staff staff) {
        return staffRepository.save(staff);
    }

    public List<staff> getAllStaff() {
        return staffRepository.findAll();
    }
    
    public Optional<staff> getStaffById(int id) {
        return staffRepository.findById(id);
    }

    public Optional<staff> getStaffByEmail(String staffEmail) {
        return staffRepository.findByStaffEmail(staffEmail);
    }
    
    public staff updateStaff(int id, staff staff) {
        return null;
    }

    public boolean deleteStaff(int id) {
        return false;
    }

    public List<staff> searchStaff(String keyword) {
        return List.of();
    }
}
