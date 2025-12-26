package com.housebartholomeow.LibraryBookTrackerAPI.entities;

import jakarta.persistence.*;
import com.housebartholomeow.LibraryBookTrackerAPI.enums.*;

@Entity
@Table(name = "Staff")
public class staff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "StaffID")
    private int staffId;

    @Column(name = "StaffEmail")
    private String staffEmail;

    @Column(name = "Role")
    private String role;

    @Column(name = "Password", nullable = true)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "EmploymentStatus")
    private EmploymentStatus employmentStatus;

    @Column(name = "PhoneNumber")
    private String phoneNumber;

    @Column(name = "StaffFirstName")
    private String staffFirstName;

    @Column(name = "StaffLastName")
    private String staffLastName;

    public staff() {}

    public staff(int staffId, String staffEmail, String role, String password,
                 EmploymentStatus employmentStatus, String phoneNumber,
                 String staffFirstName, String staffLastName) {

        this.staffId = staffId;
        this.staffEmail = staffEmail;
        this.role = role;
        this.password = password;
        this.employmentStatus = employmentStatus;
        this.phoneNumber = phoneNumber;
        this.staffFirstName = staffFirstName;
        this.staffLastName = staffLastName;
    }

    public int getStaffId() { return staffId; }
    public void setStaffId(int staffId) { this.staffId = staffId; }

    public String getStaffEmail() { return staffEmail; }
    public void setStaffEmail(String staffEmail) { this.staffEmail = staffEmail; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public EmploymentStatus getEmploymentStatus() { return employmentStatus; }
    public void setEmploymentStatus(EmploymentStatus employmentStatus) { this.employmentStatus = employmentStatus; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getStaffFirstName() { return staffFirstName; }
    public void setStaffFirstName(String staffFirstName) { this.staffFirstName = staffFirstName; }

    public String getStaffLastName() { return staffLastName; }
    public void setStaffLastName(String staffLastName) { this.staffLastName = staffLastName; }
}
