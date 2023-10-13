create table users (
	userId int primary key not null auto_increment,
	username varchar (100) not null,
	password varchar(100) not null,
	name varchar(100) not null,
	address text not null,
	age integer not null,
	roleStatus enum  ('pending','approved','rejected'),
	role enum('user','librarian','admin') not null
)

create table books (
	bookId int primary key not null auto_increment,
	bookName varchar(100) not null,
	author varchar (100) not null,
	genre varchar (100) not null,
	bookStatus enum ('available','booked','rejected','approved') default 'available' not null,
	yearRelease year not null
);

insert into users(username,password,name,address,age,roleStatus,role)
values ("hilmansf","121212","hilman","bandung","28","approved","admin")