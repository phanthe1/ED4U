/*
    Uses express, dbcon for database connection, body parser to parse form data
    handlebars for HTML templates
*/
const express = require("express");
const handlebars = require('express-handlebars').create({defaultLayout:'main'});
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const mysql = require('./database/dbcon.js');
const bodyParser = require('body-parser');

app.engine('handlebars',handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('port', 9428);

/* Homepage */
app.get('/', (req, res) => {
  res.render('index')
});

/* Mentors Page */
app.get('/mentors', (req, res) => {
  let querySelectMentor = "SELECT * FROM Mentors;";
  mysql.pool.query(querySelectMentor, function(err, rows, fields) {
      res.render('mentors', {data: rows})
  });
});

app.post('/add-mentor-form', function(req, res){
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;
  // Create the query and run it on the database
  let queryInsertMentor = `INSERT INTO Mentors (first_name, last_name) VALUES ('${data['first_name']}', '${data['last_name']}')`;
  mysql.pool.query(queryInsertMentor, function(error, rows, fields){
      // Check to see if there was an error
      if (error) {
          // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
          console.log(error)
          res.sendStatus(400);
      }
      // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
      // presents it on the screen
      else
      {
          res.redirect('/mentors');
      };
  });
});

function getMentor(res, mysql, context, mentor_id, complete){
  let queryGetMentor = "SELECT mentor_id, first_name, last_name FROM Mentors WHERE mentor_id = ?";
  let inserts = [mentor_id];
  mysql.pool.query(queryGetMentor, inserts, function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      context.mentor = results[0];
      complete();
  });
};  

// Update a mentor
app.get('/mentors/:mentor_id', function(req, res){
  callbackCount = 0;
  let context = {};

  getMentor(res, mysql, context, req.params.mentor_id, complete);
  function complete(){
      callbackCount++;
      if(callbackCount >= 1){
          console.log(context);
          res.render('update_mentor', context);
      }
  }
});

app.put('/mentors/:id', function(req,res){
  console.log(req.body)
  console.log(req.params.id)
  let queryUpdateMentor = "UPDATE Mentors SET first_name=?, last_name=? WHERE mentor_id = ?";
  let inserts = [req.body.first_name, req.body.last_name, req.params.id];
  sql = mysql.pool.query(queryUpdateMentor,inserts,function(error, results, fields){
      if(error){
          console.log(error)
          res.write(JSON.stringify(error));
          res.end();
      }else{
          res.status(200);
          res.end();
      }
  });
});

// Delete a mentor. It will return a 202 upon success. Uses AJAX.
app.delete('/mentors/:id', function(req,res){
  let queryDeleteMentor = "DELETE FROM Mentors WHERE mentor_id = ?"
  let inserts = [req.params.id];
  sql = mysql.pool.query(queryDeleteMentor, inserts, function(error, results, fields){
      if(error){
          console.log(error)
          res.write(JSON.stringify(error));
          res.status(400);
          res.end();
      }else{
          res.status(202).end();
      }
  })
});


/* Tutors Page */
app.get('/tutors', (req, res) => {
  let querySelectTutor = "SELECT * FROM Tutors;";
  mysql.pool.query(querySelectTutor, function(err, rows, fields) {
      res.render('tutors', {data: rows})
  });
});

app.post('/add-tutor-form', function(req, res){
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;
  // Create the query and run it on the database
  let queryInsertTutor = `INSERT INTO Tutors (first_name, last_name) VALUES ('${data['first_name']}', '${data['last_name']}')`;
  mysql.pool.query(queryInsertTutor, function(error, rows, fields){
      // Check to see if there was an error
      if (error) {
          // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
          console.log(error)
          res.sendStatus(400);
      }
      // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
      // presents it on the screen
      else
      {
          res.redirect('/tutors');
      };
  });
});

function getTutor(res, mysql, context, tutor_id, complete){
  let queryGetTutor = "SELECT tutor_id, first_name, last_name FROM Tutors WHERE tutor_id = ?";
  let inserts = [tutor_id];
  mysql.pool.query(queryGetTutor, inserts, function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      context.tutor = results[0];
      complete();
  });
};  

// Update a tutor
app.get('/tutors/:tutor_id', function(req, res){
  callbackCount = 0;
  let context = {};

  getTutor(res, mysql, context, req.params.tutor_id, complete);
  function complete(){
      callbackCount++;
      if(callbackCount >= 1){
          console.log(context);
          res.render('update_tutor', context);
      }
  }
});

app.put('/tutors/:id', function(req,res){
  console.log(req.body)
  console.log(req.params.id)
  let queryUpdateTutor = "UPDATE Tutors SET first_name=?, last_name=? WHERE tutor_id = ?";
  let inserts = [req.body.first_name, req.body.last_name, req.params.id];
  sql = mysql.pool.query(queryUpdateTutor,inserts,function(error, results, fields){
      if(error){
          console.log(error)
          res.write(JSON.stringify(error));
          res.end();
      }else{
          res.status(200);
          res.end();
      }
  });
});

// Delete a tutor. It will return a 202 upon success. Uses AJAX.
app.delete('/tutors/:id', function(req,res){
  let queryDeleteTutor = "DELETE FROM Tutors WHERE tutor_id = ?"
  let inserts = [req.params.id];
  sql = mysql.pool.query(queryDeleteTutor, inserts, function(error, results, fields){
      if(error){
          console.log(error)
          res.write(JSON.stringify(error));
          res.status(400);
          res.end();
      }else{
          res.status(202).end();
      }
  })
});


/* Students Page */
app.get('/students', (req, res) => {
  // Declare Query 1
  let queryGetStudent;
  // If there is no query string, we just perform a basic SELECT
  if (req.query.last_name === undefined){
      queryGetStudent = "SELECT * FROM Students;";
  } else {
      queryGetStudent = `SELECT * FROM Students WHERE last_name LIKE "${req.query.last_name}%"`
  }
  let queryDisplayMentor = "SELECT * FROM Mentors;";
  mysql.pool.query(queryGetStudent, function(err, rows, fields) {
      let students = rows;
      mysql.pool.query(queryDisplayMentor, function(err, rows, fields){
        let mentors = rows;
        return res.render('students', {data: students, mentors: mentors});
      });
  });
});

app.post('/add-student-form', function(req, res){
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;
  
  // Create the query and run it on the database
  if (data.mentor_id === "NULL") {
    queryNullMentor = `INSERT INTO Students (first_name, last_name, email,mentor_id) VALUES ('${data['first_name']}', '${data['last_name']}', '${data['email']}', NULL)`;
  } else {
    queryNullMentor = `INSERT INTO Students (first_name, last_name, email, mentor_id) VALUES ('${data['first_name']}', '${data['last_name']}', '${data['email']}', '${data['mentor_id']}')`;
  }

  mysql.pool.query(queryNullMentor, function(error, rows, fields){
      // Check to see if there was an error
      if (error) {
          // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
          console.log(error)
          res.sendStatus(400);
      }
      // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
      // presents it on the screen
      else
      {
          res.redirect('/students');
      };
  });
});

function getStudent(res, mysql, context, student_id, complete){
  let  queryGetStudent = "SELECT student_id, first_name, last_name, email, mentor_id FROM Students WHERE student_id = ?";
  let inserts = [student_id];
  mysql.pool.query(queryGetStudent, inserts, function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      context.student = results[0];
      complete();
  });
}

function getMentors(res, mysql, context, complete){
  mysql.pool.query("SELECT mentor_id, first_name, last_name FROM Mentors", function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      context.mentors  = results;
      complete();
  });
}

// Update a student
app.get('/students/:student_id', function(req, res){
  callbackCount = 0;
  let context = {};

  getStudent(res, mysql, context, req.params.student_id, complete);
  getMentors(res, mysql, context, complete);
  function complete(){
      callbackCount++;
      if(callbackCount >= 2){
          res.render('update_student', context);
      }
  }
});

app.put('/students/:id', function(req,res){
  console.log(req.body)
  console.log(req.params.id)
  if(req.body.mentor_id == 'NULL') {
    req.body.mentor_id = null;
  }
  let queryUpdateStudent = "UPDATE Students SET first_name=?, last_name=?, email=?, mentor_id=? WHERE student_id = ?";
  let inserts = [req.body.first_name, req.body.last_name, req.body.email, req.body.mentor_id, req.params.id];

  sql = mysql.pool.query(queryUpdateStudent,inserts,function(error, results, fields){
      if(error){
          console.log(error)
          res.write(JSON.stringify(error));
          res.end();
      }else{
          res.status(200);
          res.end();
      }
  });
});

// Delete a student. It will return a 202 upon success. Uses AJAX.
app.delete('/students/:id', function(req,res){
  let queryDeleteStudent = "DELETE FROM Students WHERE student_id = ?"
  let inserts = [req.params.id];
  sql = mysql.pool.query(queryDeleteStudent, inserts, function(error, results, fields){
      if(error){
          console.log(error)
          res.write(JSON.stringify(error));
          res.status(400);
          res.end();
      }else{
          res.status(202).end();
      }
  })
});

/* Courses Page */
app.get('/courses', (req, res) => {
  let querySelectCourse = "SELECT * FROM Courses;";
  let querySelectTutor = "SELECT * FROM Tutors;";
  mysql.pool.query(querySelectCourse, function(err, rows, fields) {
      let courses = rows;
      mysql.pool.query(querySelectTutor, function(err, rows, fields){
        // Push tutor IDs that are already assigned to a course into an array
        let takenTutors = []
        for(course of courses){
          takenTutors.push(course.tutor_id)
        }
        // Initialize array of untaken tutors
        let tutors = []

        //Push tutors that aren't assigned to a course
        for(tutor of rows){
          if(!takenTutors.includes(tutor.tutor_id)){
            tutors.push(tutor)
          }
        }
        return res.render('courses', {data: courses, tutors: tutors});
      });
  });
});

app.post('/add-course-form', function(req, res){
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;
  // Create the query and run it on the database
  queryAddCourse = `INSERT INTO Courses (course_name, tutor_id) VALUES ('${data['course_name']}', '${data['tutor_id']}')`;
  mysql.pool.query(queryAddCourse, function(error, rows, fields){
      // Check to see if there was an error
      if (error) {
          // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
          console.log(error)
          res.sendStatus(400);
      }
      // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
      // presents it on the screen
      else
      {
          res.redirect('/courses');
      };
  });
});

// Delete a course. It will return a 202 upon success. Uses AJAX.
app.delete('/courses/:id', function(req,res){
  let queryDeleteCourse = "DELETE FROM Courses WHERE course_id = ?"
  let inserts = [req.params.id];
  sql = mysql.pool.query(queryDeleteCourse, inserts, function(error, results, fields){
      if(error){
          console.log(error)
          res.write(JSON.stringify(error));
          res.status(400);
          res.end();
      }else{
          res.status(202).end();
      }
  })
});

/* Students_Courses Page */
app.get('/students_courses', (req, res) => {
  let validQuery;
  // Ternary statement: if the url param validQuery is false, then the local validQuery variable is set to false
  // else the local validQuery variable is set to true. This variable is used to display an error to the user on bad req.
  req.query.validQuery == "false"? validQuery = false : validQuery = true
  let queryGetStudentCourses = 
  `SELECT s.first_name, s.last_name, sc.student_id, sc.course_id, c.course_name 
  FROM Students_Courses sc
  JOIN Students s ON sc.student_id = s.student_id
  JOIN Courses c ON sc.course_id = c.course_id;`;
  let queryGetStudent = "SELECT * FROM Students;";
  let queryGetCourse = "SELECT * FROM Courses;";

  mysql.pool.query(queryGetStudentCourses, function(err, rows, fields) {
      let students_courses = rows;
      mysql.pool.query(queryGetStudent, function(err, rows, fields){
        let students = rows;
        mysql.pool.query(queryGetCourse, function(err, rows, fields){
          let courses = rows;
          //added local validQuery variable to list of things sent to the html
          return res.render('students_courses', {data: students_courses, students: students, courses: courses, validQuery: validQuery});
        });
      });
  });
});

app.post('/add-student_course-form', function(req, res){
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;
  // Create the query and run it on the database
  queryAddStudent = `INSERT INTO Students_Courses (course_id, student_id) VALUES ('${data['course_id']}', '${data['student_id']}')`;
  mysql.pool.query(queryAddStudent, function(error, rows, fields){
      // Check to see if there was an error
      if (error) {
          // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
          console.log(error)
          // If error, redirect to student_courses page with a url param called validQuery, which is set to false
          res.redirect('/students_courses?validQuery=false');
      }
      // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
      // presents it on the screen
      else
      {
          res.redirect('/students_courses');
      };
  });
});

// Delete an invoice. It will return a 202 upon success. Uses AJAX.
app.delete('/course_id/:cid/student_id/:sid', function(req,res){
  let queryDeleteInvoice = "DELETE FROM Students_Courses WHERE course_id = ? AND student_id = ?";
  let inserts = [req.params.cid, req.params.sid];
  sql = mysql.pool.query(queryDeleteInvoice, inserts, function(error, results, fields){
      if(error){
          console.log(error)
          res.write(JSON.stringify(error));
          res.status(400);
          res.end();
      }else{
          res.status(202).end();
      }
  })
});

/* Invoices Page */
app.get('/invoices', (req, res) => {
  let querySelectInvoice = "SELECT * FROM Invoices;";
  let querySelectStudent = "SELECT * FROM Students;";
  mysql.pool.query(querySelectInvoice, function(err, rows, fields) {
      let invoices = rows;
      mysql.pool.query(querySelectStudent, function(err, rows, fields){
        let students = rows;
        return res.render('invoices', {data: invoices, students: students});
      });
  });
});

app.post('/add-invoice-form', function(req, res){
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;
  // Create the query and run it on the database
  queryAddInvoice = `INSERT INTO Invoices (student_id, payment_status) VALUES ('${data['student_id']}','${data['payment_status']}')`;
  mysql.pool.query(queryAddInvoice, function(error, rows, fields){
      // Check to see if there was an error
      if (error) {
          // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
          console.log(error)
          res.sendStatus(400);
      }
      // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
      // presents it on the screen
      else
      {
          res.redirect('/invoices');
      };
  });
});

function getInvoice(res, mysql, context, invoice_id, complete){
  let queryGetInvoice = "SELECT invoice_id, student_id, payment_status FROM Invoices WHERE invoice_id = ?";
  let inserts = [invoice_id];
  mysql.pool.query(queryGetInvoice, inserts, function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      context.invoice = results[0];
      complete();
  });
}

// Update an invoice
app.get('/invoices/:invoice_id', function(req, res){
  callbackCount = 0;
  let context = {};

  getInvoice(res, mysql, context, req.params.invoice_id, complete);
  function complete(){
      callbackCount++;
      if(callbackCount >= 1){
          res.render('update_invoice', context);
      }
  }
});

app.put('/invoices/:id', function(req,res){
  let queryUpdateInvoice = "UPDATE Invoices SET payment_status=? WHERE invoice_id = ?";
  let inserts = [req.body.payment_status, req.params.id];
  sql = mysql.pool.query(queryUpdateInvoice,inserts,function(error, results, fields){
      if(error){
          console.log(error)
          res.write(JSON.stringify(error));
          res.end();
      }else{
          res.status(200);
          res.end();
      }
  });
}); 

// Delete an invoice. It will return a 202 upon success. Uses AJAX.
app.delete('/invoices/:id', function(req,res){
  let queryDeleteInvoice = "DELETE FROM Invoices WHERE invoice_id = ?"
  let inserts = [req.params.id];
  sql = mysql.pool.query(queryDeleteInvoice, inserts, function(error, results, fields){
      if(error){
          console.log(error)
          res.write(JSON.stringify(error));
          res.status(400);
          res.end();
      }else{
          res.status(202).end();
      }
  })
});


app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
