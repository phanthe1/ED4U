-- phpMyAdmin SQL Dump
-- version 5.1.1-1.el7.remi
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 12, 2021 at 12:04 AM
-- Server version: 10.4.21-MariaDB-log
-- PHP Version: 7.4.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_chubi`
--

-- --------------------------------------------------------

--
-- Table structure for table `Courses`
--

CREATE TABLE `Courses` (
  `course_id` int(11) NOT NULL,
  `course_name` varchar(255) NOT NULL,
  `tutor_id` int(11) NOT NULL,
  `tuition` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Courses`
--

INSERT INTO `Courses` (`course_id`, `course_name`, `tutor_id`, `tuition`) VALUES
(1, 'Course 1', 1, 1000),
(2, 'Course 2', 2, 1000);

-- --------------------------------------------------------

--
-- Table structure for table `Invoices`
--

CREATE TABLE `Invoices` (
  `invoice_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `tuition_per_course` int(11) NOT NULL,
  `number_of_courses` int(11) NOT NULL,
  `total_cost` int(11) NOT NULL,
  `payment_status` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Invoices`
--

INSERT INTO `Invoices` (`invoice_id`, `student_id`, `tuition_per_course`, `number_of_courses`, `total_cost`, `payment_status`) VALUES
(1, 1, 1000, 2, 2000, b'1'),
(2, 2, 1000, 1, 1000, b'1');

-- --------------------------------------------------------

--
-- Table structure for table `Mentors`
--

CREATE TABLE `Mentors` (
  `mentor_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Mentors`
--

INSERT INTO `Mentors` (`mentor_id`, `first_name`, `last_name`) VALUES
(1, 'Joe', 'Lee'),
(2, 'Marcus', 'Thompson'),
(3, 'Rose', 'Carter');

-- --------------------------------------------------------

--
-- Table structure for table `Students`
--

CREATE TABLE `Students` (
  `student_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mentor_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Students`
--

INSERT INTO `Students` (`student_id`, `first_name`, `last_name`, `email`, `mentor_id`) VALUES
(1, 'Elizabeth', 'Smith', 'smith.eli@gmail.com', 1),
(2, 'Charlie', 'Miller', 'miller.cha@gmail.com', 2),
(3, 'Rebecca', 'Williams', 'williams.reb@gmail.com', 3);

-- --------------------------------------------------------

--
-- Table structure for table `Students_Courses`
--

CREATE TABLE `Students_Courses` (
  `course_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Students_Courses`
--

INSERT INTO `Students_Courses` (`course_id`, `student_id`) VALUES
(1, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `Tutors`
--

CREATE TABLE `Tutors` (
  `tutor_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Tutors`
--

INSERT INTO `Tutors` (`tutor_id`, `first_name`, `last_name`) VALUES
(1, 'Mary', 'Brown'),
(2, 'Jane', 'Garcia');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Courses`
--
ALTER TABLE `Courses`
  ADD PRIMARY KEY (`course_id`),
  ADD KEY `tutor_id` (`tutor_id`);

--
-- Indexes for table `Invoices`
--
ALTER TABLE `Invoices`
  ADD PRIMARY KEY (`invoice_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `Mentors`
--
ALTER TABLE `Mentors`
  ADD PRIMARY KEY (`mentor_id`);

--
-- Indexes for table `Students`
--
ALTER TABLE `Students`
  ADD PRIMARY KEY (`student_id`),
  ADD KEY `mentor_id` (`mentor_id`);

--
-- Indexes for table `Students_Courses`
--
ALTER TABLE `Students_Courses`
  ADD PRIMARY KEY (`course_id`,`student_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `Tutors`
--
ALTER TABLE `Tutors`
  ADD PRIMARY KEY (`tutor_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Courses`
--
ALTER TABLE `Courses`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Invoices`
--
ALTER TABLE `Invoices`
  MODIFY `invoice_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Mentors`
--
ALTER TABLE `Mentors`
  MODIFY `mentor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Students`
--
ALTER TABLE `Students`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Tutors`
--
ALTER TABLE `Tutors`
  MODIFY `tutor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Courses`
--
ALTER TABLE `Courses`
  ADD CONSTRAINT `Courses_ibfk_1` FOREIGN KEY (`tutor_id`) REFERENCES `Tutors` (`tutor_id`) ON DELETE CASCADE;

--
-- Constraints for table `Invoices`
--
ALTER TABLE `Invoices`
  ADD CONSTRAINT `Invoices_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `Students` (`student_id`) ON DELETE CASCADE;

--
-- Constraints for table `Students`
--
ALTER TABLE `Students`
  ADD CONSTRAINT `Students_ibfk_1` FOREIGN KEY (`mentor_id`) REFERENCES `Mentors` (`mentor_id`) ON DELETE CASCADE;

--
-- Constraints for table `Students_Courses`
--
ALTER TABLE `Students_Courses`
  ADD CONSTRAINT `Students_Courses_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `Courses` (`course_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Students_Courses_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `Students` (`student_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
