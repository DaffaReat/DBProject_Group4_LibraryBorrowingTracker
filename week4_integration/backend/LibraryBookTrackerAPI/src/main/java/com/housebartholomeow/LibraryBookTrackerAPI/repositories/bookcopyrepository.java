package com.housebartholomeow.LibraryBookTrackerAPI.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.housebartholomeow.LibraryBookTrackerAPI.entities.bookcopy;

import java.util.List;

public interface bookcopyrepository extends JpaRepository<bookcopy, Integer> {

    int countByIsbn(String isbn);

    @Query("""
        SELECT bc FROM bookcopy bc
        WHERE LOWER(bc.isbn) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(bc.availability) LIKE LOWER(CONCAT('%', :keyword, '%'))
    """)
    List<bookcopy> search(@Param("keyword") String keyword);
}
