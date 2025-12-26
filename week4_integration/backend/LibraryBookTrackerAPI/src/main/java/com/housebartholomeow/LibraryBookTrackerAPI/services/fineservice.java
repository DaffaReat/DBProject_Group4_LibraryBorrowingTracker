package com.housebartholomeow.LibraryBookTrackerAPI.services;

import com.housebartholomeow.LibraryBookTrackerAPI.entities.fine;
import com.housebartholomeow.LibraryBookTrackerAPI.entities.borrowdetail;
import com.housebartholomeow.LibraryBookTrackerAPI.entities.staff;
import com.housebartholomeow.LibraryBookTrackerAPI.enums.FineStatus;
import com.housebartholomeow.LibraryBookTrackerAPI.repositories.finerepository;
import com.housebartholomeow.LibraryBookTrackerAPI.repositories.borrowdetailrepository;
import com.housebartholomeow.LibraryBookTrackerAPI.repositories.staffrepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import java.time.LocalDate;

@Service
public class fineservice {

    @Autowired
    private finerepository fineRepository;

    @Autowired
    private borrowdetailrepository borrowDetailRepository;

    @Autowired
    private staffrepository staffRepository;

    // --- CREATE ---
    public fine addFine(int borrowId, int staffId, int amount) {
        Optional<borrowdetail> borrowOpt = borrowDetailRepository.findById(borrowId);
        Optional<staff> staffOpt = staffRepository.findById(staffId);

        if (borrowOpt.isEmpty() || staffOpt.isEmpty()) {
            return null;
        }

        fine newFine = new fine();
        newFine.setBorrowId(borrowId);
        newFine.setStaffId(staffId);
        newFine.setAmount(amount);
        newFine.setDateIssued(LocalDate.now());
        newFine.setFineStatus(FineStatus.Not_Paid);

        return fineRepository.save(newFine);
    }

    // --- READ ---
    public List<fine> getAllFines() {
        return fineRepository.findAll();
    }

    public Optional<fine> getFineById(int fineId) {
        return fineRepository.findById(fineId);
    }

    // --- UPDATE ---
    public fine markFinePaid(int fineId, LocalDate datePaid) {
        Optional<fine> fineOpt = fineRepository.findById(fineId);

        if (fineOpt.isPresent()) {
            fine existingFine = fineOpt.get();
            existingFine.setFineStatus(FineStatus.Paid);
            existingFine.setDatePaid(datePaid);

            return fineRepository.save(existingFine);
        } else {
            return null;
        }
    }

    // --- DELETE ---
    public boolean deleteFine(int fineId) {
        if (fineRepository.existsById(fineId)) {
            fineRepository.deleteById(fineId);
            return true;
        }
        return false;
    }

    // --- SEARCH ---
    public List<fine> searchFines(String keyword) {
        return fineRepository.search(keyword);
    }

    // --- BUSINESS LOGIC EXAMPLES ---
    public boolean isFinePaid(int fineId) {
        Optional<fine> fineOpt = fineRepository.findById(fineId);
        return fineOpt.map(f -> f.getFineStatus() == FineStatus.Paid).orElse(false);
    }
}
