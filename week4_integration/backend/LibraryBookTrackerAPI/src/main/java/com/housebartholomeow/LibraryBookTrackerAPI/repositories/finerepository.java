package com.housebartholomeow.LibraryBookTrackerAPI.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.housebartholomeow.LibraryBookTrackerAPI.entities.fine;
import java.util.List;

public interface finerepository extends JpaRepository<fine, Integer> {
    @Query("""
        SELECT f FROM fine f
        WHERE STR(f.fineId) LIKE LOWER(CONCAT('%', :keyword, '%'))      
           OR STR(f.amount) LIKE LOWER(CONCAT('%', :keyword, '%'))      
           OR STR(f.dateIssued) LIKE LOWER(CONCAT('%', :keyword, '%'))  
           OR LOWER(f.fineStatus) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR STR(f.datePaid) LIKE LOWER(CONCAT('%', :keyword, '%'))    
    """)
    List<fine> search(@Param("keyword") String keyword);
}
