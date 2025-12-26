package com.housebartholomeow.LibraryBookTrackerAPI.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.housebartholomeow.LibraryBookTrackerAPI.entities.staff;

import java.util.Optional;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface staffrepository extends JpaRepository<staff, Integer> {
    Optional<staff> findByStaffEmail(String staffEmail);

    @Query("""
        SELECT s FROM staff s
        WHERE LOWER(s.staffFirstName) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(s.staffLastName) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(s.role) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(s.employmentStatus) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(s.staffEmail) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR STR(s.phoneNumber) LIKE LOWER(CONCAT('%', :keyword, '%'))
    """)
    List<staff> search(@Param("keyword") String keyword);
}
