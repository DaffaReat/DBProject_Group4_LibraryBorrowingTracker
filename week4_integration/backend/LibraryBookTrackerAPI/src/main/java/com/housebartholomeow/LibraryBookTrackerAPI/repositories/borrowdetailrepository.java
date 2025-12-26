package com.housebartholomeow.LibraryBookTrackerAPI.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.housebartholomeow.LibraryBookTrackerAPI.entities.borrowdetail;

import java.util.List;

public interface borrowdetailrepository extends JpaRepository<borrowdetail, Integer> {
    @Query("""
        SELECT bd FROM borrowdetail bd
        WHERE STR(bd.borrowId) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR STR(bd.borrowDate) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR STR(bd.dueDate) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR STR(bd.returnDate) LIKE LOWER(CONCAT('%', :keyword, '%'))
    """)
    List<borrowdetail> search(@Param("keyword") String keyword);
}
