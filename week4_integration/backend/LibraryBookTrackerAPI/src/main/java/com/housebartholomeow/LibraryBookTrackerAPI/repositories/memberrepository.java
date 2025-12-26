package com.housebartholomeow.LibraryBookTrackerAPI.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.housebartholomeow.LibraryBookTrackerAPI.entities.member;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface memberrepository extends JpaRepository<member, Integer> {
    
    @Query("""
        SELECT m FROM member m
        WHERE STR(m.memberId) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR STR(m.memberExpiryDate) LIKE LOWER(CONCAT('%', :keyword, '%')) 
           OR STR(m.joinDate) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR STR(m.phoneNumber) LIKE LOWER(CONCAT('%', :keyword, '%'))      
           OR LOWER(m.memberStatus) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(m.memberFirstName) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(m.memberLastName) LIKE LOWER(CONCAT('%', :keyword, '%'))
    """)
    List<member> search(@Param("keyword") String keyword);
}
