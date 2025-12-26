package com.housebartholomeow.LibraryBookTrackerAPI.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import jakarta.validation.constraints.*;

@Entity
@Table(name = "Book")
public class book {

    @Id
    @Column(name = "ISBN")
    @NotBlank(message = "ISBN cannot be empty")
    @Size(min = 10, max = 13, message = "ISBN must be between 10–13 characters")
    private String isbn;

    @Column(name = "Genre")
    @Size(max = 50, message = "Genre cannot exceed 50 characters")
    private String genre;

    @Column(name = "Title")
    @NotBlank(message = "Title cannot be empty")
    @Size(min = 2, message = "Title must have at least 2 characters")
    private String title;

    @Column(name = "PublicationYear")
    @Min(value = 1500, message = "Publication year must be after 1500")
    @Max(value = 2025, message = "Publication year cannot be in the future")
    private int publicationYear;

    @Column(name = "Publisher")
    @NotBlank(message = "Publisher cannot be empty")
    private String publisher;

    @Column(name = "AuthorFirstName")
    @NotBlank(message = "Author first name cannot be empty")
    private String authorFirstName;

    @Column(name = "AuthorLastName")
    @NotBlank(message = "Author last name cannot be empty")
    private String authorLastName;

    public book() {}

    public book(String isbn, String genre, String title,
                int publicationYear, String publisher,
                String authorFirstName, String authorLastName) {

        this.isbn = isbn;
        this.genre = genre;
        this.title = title;
        this.publicationYear = publicationYear;
        this.publisher = publisher;
        this.authorFirstName = authorFirstName;
        this.authorLastName = authorLastName;
    }

    public String getIsbn() { return isbn; }
    public void setIsbn(String isbn) { this.isbn = isbn; }

    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public int getPublicationYear() { return publicationYear; }
    public void setPublicationYear(int publicationYear) { this.publicationYear = publicationYear; }

    public String getPublisher() { return publisher; }
    public void setPublisher(String publisher) { this.publisher = publisher; }

    public String getAuthorFirstName() { return authorFirstName; }
    public void setAuthorFirstName(String authorFirstName) { this.authorFirstName = authorFirstName; }

    public String getAuthorLastName() { return authorLastName; }
    public void setAuthorLastName(String authorLastName) { this.authorLastName = authorLastName; }
}
