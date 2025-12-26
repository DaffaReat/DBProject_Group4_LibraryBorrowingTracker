package com.housebartholomeow.LibraryBookTrackerAPI.entities;

import jakarta.persistence.*;
import com.housebartholomeow.LibraryBookTrackerAPI.enums.*;
import java.time.LocalDate;

@Entity
@Table(name = "member")
public class member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private int memberId;

    @Column(name = "member_expiry_date")
    private LocalDate memberExpiryDate;

    @Column(name = "join_date")
    private LocalDate joinDate;

    @Column(name = "Password", nullable = true)
    private String password;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    @Column(name = "member_status")
    private MemberStatus memberStatus;

    @Column(name = "address")
    private String address;

    @Column(name = "email")
    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

    @Column(name = "member_first_name")
    private String memberFirstName;

    @Column(name = "member_last_name")
    private String memberLastName;


    public member() {}

    public member(int memberId, LocalDate memberExpiryDate, LocalDate joinDate, String password,
                  LocalDate dateOfBirth, MemberStatus memberStatus, String address,
                  String email, String phoneNumber, Gender gender,
                  String memberFirstName, String memberLastName) {

        this.memberId = memberId;
        this.memberExpiryDate = memberExpiryDate;
        this.joinDate = joinDate;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.memberStatus = memberStatus;
        this.address = address;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.gender = gender;
        this.memberFirstName = memberFirstName;
        this.memberLastName = memberLastName;
    }

    public int getMemberId() { return memberId; }
    public void setMemberId(int memberId) { this.memberId = memberId; }

    public LocalDate getMemberExpiryDate() { return memberExpiryDate; }
    public void setMemberExpiryDate(LocalDate memberExpiryDate) { this.memberExpiryDate = memberExpiryDate; }

    public LocalDate getJoinDate() { return joinDate; }
    public void setJoinDate(LocalDate joinDate) { this.joinDate = joinDate; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }

    public MemberStatus getMemberStatus() { return memberStatus; }
    public void setMemberStatus(MemberStatus memberStatus) { this.memberStatus = memberStatus; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public Gender getGender() { return gender; }
    public void setGender(Gender gender) { this.gender = gender; }

    public String getMemberFirstName() { return memberFirstName; }
    public void setMemberFirstName(String memberFirstName) { this.memberFirstName = memberFirstName; }

    public String getMemberLastName() { return memberLastName; }
    public void setMemberLastName(String memberLastName) { this.memberLastName = memberLastName; }
}
