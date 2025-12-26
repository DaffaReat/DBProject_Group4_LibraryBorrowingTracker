package com.housebartholomeow.LibraryBookTrackerAPI.entities;

import jakarta.persistence.*;
import com.housebartholomeow.LibraryBookTrackerAPI.enums.FineStatus;


import java.time.LocalDate;

@Entity
@Table(name = "Fine")
public class fine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "FineID")
    private int fineId;

    @Column(name = "Amount")
    private int amount;

    @Column(name = "DateIssued")
    private LocalDate dateIssued;

    @Enumerated(EnumType.STRING)
    @Column(name = "FineStatus")
    private FineStatus fineStatus;

    @Column(name = "DatePaid")
    private LocalDate datePaid;

    @Column(name = "StaffID")
    private int staffId;

    @Column(name = "BorrowID")
    private int borrowId;

    public fine() {}

    public fine(int fineId, int amount, LocalDate dateIssued,
                FineStatus fineStatus, LocalDate datePaid,
                int staffId, int borrowId) {

        this.fineId = fineId;
        this.amount = amount;
        this.dateIssued = dateIssued;
        this.fineStatus = fineStatus;
        this.datePaid = datePaid;
        this.staffId = staffId;
        this.borrowId = borrowId;
    }

    public int getFineId() { return fineId; }
    public void setFineId(int fineId) { this.fineId = fineId; }

    public int getAmount() { return amount; }
    public void setAmount(int amount) { this.amount = amount; }

    public LocalDate getDateIssued() { return dateIssued; }
    public void setDateIssued(LocalDate dateIssued) { this.dateIssued = dateIssued; }

    public FineStatus getFineStatus() { return fineStatus; }
    public void setFineStatus(FineStatus fineStatus) { this.fineStatus = fineStatus; }

    public LocalDate getDatePaid() { return datePaid; }
    public void setDatePaid(LocalDate datePaid) { this.datePaid = datePaid; }

    public int getStaffId() { return staffId; }
    public void setStaffId(int staffId) { this.staffId = staffId; }

    public int getBorrowId() { return borrowId; }
    public void setBorrowId(int borrowId) { this.borrowId = borrowId; }
}
