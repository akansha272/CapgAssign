create database bankManagement;
 
use bankManagement;
 
create table customers( customerID int auto_increment primary key,
						firstName varchar(100) not null,
                        lastName varchar(100) not null,
                        email varchar(100) not null unique,
                        phone varchar(20) not null,
                        address varchar(300) );
 
create table accounts( accountID int auto_increment primary key,
					   customerID int not null,
                       accountType varchar(20) not null,
                       balance decimal(30,2) not null default 0.00,
                       createdDate date not null,
                       foreign key(customerID) references customers(customerID)
                       on delete cascade on update cascade);
create table transactions( transactionID int auto_increment primary key,
						   accountID int not null,
                           transactionType varchar(50) not null,
                           amount decimal(30,2) not null,
                           transactionDate datetime not null,
                           foreign key(accountID) references accounts(accountID)
                           on delete cascade on update cascade);
create table branches( branchID int auto_increment primary key,
					   branchName varchar(200) not null,
                       location varchar(200) not null);
create table employees( employeeID int auto_increment primary key,
						branchID int not null,
                        firstName varchar(50) not null,
                        lastName varchar(50) not null,
                        roles varchar(50) not null,
                        salary decimal(30,2) not null,
                        foreign key(branchID) references branches(branchID)
                        on delete cascade on update cascade);
INSERT INTO Customers (FirstName, LastName, Email, Phone, Address) 
VALUES ('John', 'Doe', 'john.doe@example.com', '1234567890', '123 Elm St'), 
       ('Jane', 'Smith', 'jane.smith@example.com', '9876543210', '456 Oak St'), 
       ('Michael', 'Brown', 'michael.brown@example.com', '5678901234', '789 Pine St');

INSERT INTO Accounts (CustomerID, AccountType, Balance, CreatedDate)
VALUES(1, 'Savings', 5000.00, '2023-01-15'),
      (1, 'Checking', 2000.00, '2023-02-10'),
      (2, 'Savings', 10000.00, '2023-03-05'),
      (3, 'Savings', 7000.00, '2023-04-20');

INSERT INTO Transactions (AccountID, TransactionType, Amount, TransactionDate)
VALUES(1, 'Deposit', 1000.00, '2023-01-20 10:00:00'),
      (1, 'Withdrawal', 500.00, '2023-01-25 14:30:00'),
      (2, 'Deposit', 2000.00, '2023-02-15 09:15:00'),
      (3, 'Withdrawal', 1000.00, '2023-04-25 16:45:00');