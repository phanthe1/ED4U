-------------------------------------------
-- manage Mentors

-- show all mentors in the table
SELECT * From Mentors;

-- add a new mentor
INSERT INTO Mentors (first_name, last_name) VALUES (:first_nameInput, :last_nameInput);

-- edit an existing mentor by clicking on the edit icon
UPDATE Mentors SET first_name = :first_nameInput, last_name = :last_nameInput WHERE mentor_id = :mentor_id_to_be_edited;

-- search a mentor by submiting its first name and last name
SELECT * FROM Mentors WHERE first_name = :first_nameInput AND last_name = :last_nameInput;

-- delete an existing mentor by clicking on the trash can icon
DELETE FROM Mentors WHERE mentor_id = :mentor_id_to_be_deleted;

-------------------------------------------
-- manage Tutors

-- show all tutors in the table
SELECT * From Tutors;

-- add a new tutor
INSERT INTO Tutors (first_name, last_name) VALUES (:first_nameInput, :last_nameInput);

-- edit an existing tutor by clicking on the edit icon
UPDATE Tutors SET first_name = :first_nameInput, last_name = :last_nameInput WHERE tutor_id = :tutor_id_to_be_edited;

-- search a tutor by submiting its first name and last name
SELECT * FROM Tutors WHERE first_name = :first_nameInput AND last_name = :last_nameInput;

-- delete an existing tutor by clicking on the trash can icon
DELETE FROM Tutors WHERE tutor_id = :tutor_id_to_be_deleted;

-------------------------------------------
-- manage Students

-- show all students in the table
SELECT * FROM Students;

-- add a new student Query 1, when the student is inactive and does not have a mentor
INSERT INTO Students (first_name, last_name, email) VALUES (:first_nameInput, :last_nameInput, :emailInput);
-- add a new student Query 2, when the student is active and has a mentor
INSERT INTO Students (first_name, last_name, email, mentor_id) VALUES (:first_nameInput, :last_nameInput, :emailInput, :mentor_idInput);

-- edit an existing student by clicking on the edit icon
UPDATE Students SET first_name = :first_nameInput, last_name = :last_nameInput, email = :emailInput, mentor_id = :mentor_idInput WHERE student_id = :student_id_to_be_edited;

-- search a student by submiting its first name, last name and mentor_id
SELECT * FROM Students WHERE first_name = :first_nameInput AND last_name = :last_nameInput and mentor_id = :mentor_idInput;

-- delete an existing student by clicking on the trash can icon
DELETE FROM Students WHERE student_id = :student_id_to_be_deleted;

-------------------------------------------
-- manage Courses

-- show all courses in the table
SELECT * FROM Courses;

-- add a new course
INSERT INTO Courses (course_name, tutor_id, tuition) VALUES (:course_nameInput, :tutor_idInput, :tuitionInput);

-- edit an existing course by clicking on the edit icon
UPDATE Courses SET course_name = :course_nameInput, tutor_id = :tutor_idInput, tuition = :tuitionInput WHERE course_id = :course_id_to_be_edited;

-- search a course by submiting its course name and tutor id
SELECT * FROM Courses WHERE course_name = :course_nameInput AND tutor_id = :tutor_idInput;

-- delete an existing course by clicking on the trash can icon
DELETE FROM Courses WHERE course_id = :course_id_to_be_deleted;

-------------------------------------------
-- manage Students_Courses

-- show all student and course information in the table
SELECT * FROM Students_Courses;

-- add data
INSERT INTO Students_Courses (course_id, student_id) VALUES (:course_idInput, :student_idInput);

-- edit an existing student_course pair by clicking on the edit icon
UPDATE Students_Courses SET course_id = :course_idInput, student_id = :student_idInput WHERE course_id = :course_id_to_be_edited AND student_id = :student_id_to_be_edited;

-- search a student_course pair by submitting couse id and student id
SELECT * FROM Students_Courses WHERE course_id = :course_idInput AND student_id = :student_idInput;

-- delete an excisting student_course pair by clicking on the trash can icon
DELETE FROM Students_Courses WHERE course_id = :course_id_to_be_deleted AND student_id = :student_id_to_be_deleted;

-------------------------------------------
-- manage Invoices

-- show all invoice data in the table
SELECT * From Invoices

-- add an invoice
INSERT INTO Invoices (student_id, tuition_per_course, number_of_courses, total_cost, payment_status) VALUES
(:student_idInput, :tuition_per_courseInput, :number_of_coursesInput, :total_costInput, :payment_statusInput);

-- edit an existing invoice by clicking on the edit icon
UPDATE Invoices SET student_id = :student_idInput, tuition_per_course = :tuition_per_courseInput, number_of_courses = :number_of_coursesInput, total_cost = :total_costInput, payment_status = :payment_statusInput WHERE invoice_id = :invoice_id_to_be_edited;

-- search an invoice by submitting invoice id and student id
SELECT * FROM Invoices Where invoice_id = :invoice_idInput AND student_id = :student_idInput;

-- delete an existing invoice by clicking on the trash can icon
DELETE FROM Invoices WHERE invoice_id = :invoice_id_to_be_deleted;