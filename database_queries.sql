-------------------------------------------
-- manage Mentors

-- show all mentors in the table
SELECT * FROM Mentors;

-- add a new mentor
INSERT INTO Mentors (first_name, last_name) VALUES (:first_nameInput, :last_nameInput);

-- edit an existing mentor by clicking on the edit icon
UPDATE Mentors SET first_name = :first_nameInput, last_name = :last_nameInput WHERE mentor_id = :mentor_id_to_be_edited;

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

-- delete an existing tutor by clicking on the trash can icon
DELETE FROM Tutors WHERE tutor_id = :tutor_id_to_be_deleted;

-------------------------------------------
-- manage Students

-- show all students in the table
SELECT * FROM Students;

-- add a new student
INSERT INTO Students (first_name, last_name, email, mentor_id) VALUES (:first_nameInput, :last_nameInput, :emailInput, :mentor_idInput);

-- edit an existing student by clicking on the edit icon
UPDATE Students SET first_name = :first_nameInput, last_name = :last_nameInput, email = :emailInput, mentor_id = :mentor_idInput WHERE student_id = :student_id_to_be_edited;

-- search a student by submiting last name (Partial last names are OK)
SELECT * FROM Students WHERE last_name LIKE :last_nameInput%;

-- delete an existing student by clicking on the trash can icon
DELETE FROM Students WHERE student_id = :student_id_to_be_deleted;

-------------------------------------------
-- manage Courses

-- show all courses in the table
SELECT * FROM Courses;

-- add a new course
INSERT INTO Courses (course_name, tutor_id) VALUES (:course_nameInput, :tutor_idInput);

-- delete an existing course by clicking on the trash can icon
DELETE FROM Courses WHERE course_id = :course_id_to_be_deleted;

-------------------------------------------
-- manage Students_Courses

-- show all student and course information in the table
SELECT s.first_name, s.last_name, sc.student_id, sc.course_id, c.course_name 
FROM Students_Courses sc
JOIN Students s ON sc.student_id = s.student_id
JOIN Courses c ON sc.course_id = c.course_id;

-- add data
INSERT INTO Students_Courses (course_id, student_id) VALUES (:course_idInput, :student_idInput);

-- delete an excisting student_course pair by clicking on the trash can icon
DELETE FROM Students_Courses WHERE course_id = :course_id_to_be_deleted AND student_id = :student_id_to_be_deleted;

-------------------------------------------
-- manage Invoices

-- show all invoice data in the table
SELECT * From Invoices

-- add an invoice
INSERT INTO Invoices (student_id, payment_status) VALUES (:student_idInput, :payment_statusInput);

-- edit an existing invoice by clicking on the edit icon
UPDATE Invoices SET payment_status = :payment_statusInput WHERE invoice_id = :invoice_id_to_be_edited;

-- delete an existing invoice by clicking on the trash can icon
DELETE FROM Invoices WHERE invoice_id = :invoice_id_to_be_deleted;