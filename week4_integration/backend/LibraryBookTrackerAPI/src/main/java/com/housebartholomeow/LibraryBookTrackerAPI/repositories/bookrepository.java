package com.housebartholomeow.LibraryBookTrackerAPI.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.housebartholomeow.LibraryBookTrackerAPI.entities.book;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface bookrepository extends JpaRepository<book, String> {
    @Query("""
        SELECT b FROM book b
        WHERE LOWER(b.title) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(b.authorFirstName) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(b.authorLastName) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(b.genre) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(b.isbn) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR STR(b.publicationYear) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(b.publisher) LIKE LOWER(CONCAT('%', :keyword, '%'))
    """)
    List<book> search(@Param("keyword") String keyword);
}
