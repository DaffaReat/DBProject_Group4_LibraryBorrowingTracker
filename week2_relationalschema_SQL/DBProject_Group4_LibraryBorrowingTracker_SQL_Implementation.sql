CREATE TABLE Book
(
  Genre VARCHAR(255) NOT NULL,
  ISBN INT NOT NULL,
  Title VARCHAR(255) NOT NULL,
  PublicationYear VARCHAR(255) NOT NULL,
  Publisher VARCHAR(255) NOT NULL,
  AuthorFirstName VARCHAR(255) NOT NULL,
  AuthorLastName VARCHAR(255) NOT NULL,
  PRIMARY KEY (ISBN),
  UNIQUE (ISBN)
);

CREATE TABLE Member
(
  MemberID INT NOT NULL,
  MemberExpiryDate DATE NOT NULL,
  JoinDate DATE NOT NULL,
  Password VARCHAR(255) NOT NULL,
  DateOfBirth DATE NOT NULL,
  MemberStatus ENUM('Active', 'Not Active') NOT NULL,
  Address VARCHAR(255) NOT NULL,
  Email VARCHAR(255),
  PhoneNumber VARCHAR(30),
  Gender ENUM('Male', 'Female') NOT NULL,
  MemberFirstName VARCHAR(255) NOT NULL,
  MemberLastName VARCHAR(255) NOT NULL,
  PRIMARY KEY (MemberID),
  UNIQUE (Email)
);

CREATE TABLE Staff
(
  StaffID INT NOT NULL,
  StaffEmail VARCHAR(255) NOT NULL,
  Role VARCHAR(255) NOT NULL,
  Password VARCHAR(255) NOT NULL,
  EmploymentStatus ENUM('Active', 'Not Active') NOT NULL,
  PhoneNumber VARCHAR(30) NOT NULL,
  StaffFirstName VARCHAR(255) NOT NULL,
  StaffLastName VARCHAR(255) NOT NULL,
  PRIMARY KEY (StaffID),
  UNIQUE (StaffEmail)
);

CREATE TABLE BookCopy
(
  BookID INT NOT NULL,
  Availability ENUM('Available', 'Borrowed', 'Unavailable') NOT NULL,
  ISBN INT NOT NULL,
  StaffID INT NOT NULL,
  PRIMARY KEY (BookID),
  FOREIGN KEY (ISBN) REFERENCES Book(ISBN),
  FOREIGN KEY (StaffID) REFERENCES Staff(StaffID)
);

CREATE TABLE BorrowDetail
(
  BorrowID INT NOT NULL,
  BorrowDate DATE NOT NULL,
  DueDate DATE NOT NULL,
  ReturnDate DATE,
  BookID INT NOT NULL,
  StaffID INT NOT NULL,
  MemberID INT NOT NULL,
  PRIMARY KEY (BorrowID),
  FOREIGN KEY (BookID) REFERENCES BookCopy(BookID),
  FOREIGN KEY (StaffID) REFERENCES Staff(StaffID),
  FOREIGN KEY (MemberID) REFERENCES Member(MemberID)
);

CREATE TABLE Fine
(
  FineID INT NOT NULL,
  Amount INT NOT NULL,
  DateIssued DATE NOT NULL,
  FineStatus ENUM('Paid', 'Not Paid') NOT NULL,
  DatePaid DATE,
  StaffID INT NOT NULL,
  BorrowID INT NOT NULL,
  PRIMARY KEY (FineID),
  FOREIGN KEY (StaffID) REFERENCES Staff(StaffID),
  FOREIGN KEY (BorrowID) REFERENCES BorrowDetail(BorrowID)
);
