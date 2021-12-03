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
  let query1 = "SELECT * FROM Mentors;";
  mysql.pool.query(query1, function(err, rows, fields) {
      res.render('mentors', {data: rows})
  });
});

app.post('/add-mentor-form', function(req, res){
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;
  // Create the query and run it on the database
  let query1 = `INSERT INTO Mentors (first_name, last_name) VALUES ('${data['first_name']}', '${data['last_name']}')`;
  mysql.pool.query(query1, function(error, rows, fields){
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
  var sql = "SELECT mentor_id, first_name, last_name FROM Mentors WHERE mentor_id = ?";
  var inserts = [mentor_id];
  mysql.pool.query(sql, inserts, function(error, results, fields){
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
  var context = {};

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
  var sql = "UPDATE Mentors SET first_name=?, last_name=? WHERE mentor_id = ?";
  var inserts = [req.body.first_name, req.body.last_name, req.params.id];
  sql = mysql.pool.query(sql,inserts,function(error, results, fields){
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
  var sql = "DELETE FROM Mentors WHERE mentor_id = ?"
  var inserts = [req.params.id];
  sql = mysql.pool.query(sql, inserts, function(error, results, fields){
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
  let query1 = "SELECT * FROM Tutors;";
  mysql.pool.query(query1, function(err, rows, fields) {
      res.render('tutors', {data: rows})
  });
});

app.post('/add-tutor-form', function(req, res){
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;
  // Create the query and run it on the database
  let query1 = `INSERT INTO Tutors (first_name, last_name) VALUES ('${data['first_name']}', '${data['last_name']}')`;
  mysql.pool.query(query1, function(error, rows, fields){
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
  var sql = "SELECT tutor_id, first_name, last_name FROM Tutors WHERE tutor_id = ?";
  var inserts = [tutor_id];
  mysql.pool.query(sql, inserts, function(error, results, fields){
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
  var context = {};

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
  var sql = "UPDATE Tutors SET first_name=?, last_name=? WHERE tutor_id = ?";
  var inserts = [req.body.first_name, req.body.last_name, req.params.id];
  sql = mysql.pool.query(sql,inserts,function(error, results, fields){
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
  var sql = "DELETE FROM Tutors WHERE tutor_id = ?"
  var inserts = [req.params.id];
  sql = mysql.pool.query(sql, inserts, function(error, results, fields){
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
  let query1;
  // If there is no query string, we just perform a basic SELECT
  if (req.query.last_name === undefined){
      query1 = "SELECT * FROM Students;";
  } else {
      query1 = `SELECT * FROM Students WHERE last_name LIKE "${req.query.last_name}%"`
  }
  let query2 = "SELECT * FROM Mentors;";
  mysql.pool.query(query1, function(err, rows, fields) {
      let students = rows;
      mysql.pool.query(query2, function(err, rows, fields){
        let mentors = rows;
        return res.render('students', {data: students, mentors: mentors});
      });
  });
});

app.post('/add-student-form', function(req, res){
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;
  let query1 = `INSERT INTO Students (first_name, last_name, email, mentor_id) VALUES ('${data['first_name']}', '${data['last_name']}', '${data['email']}', '${data['mentor_id']}')`;

  mysql.pool.query(query1, function(error, rows, fields){
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
  var sql = "SELECT student_id, first_name, last_name, email, mentor_id FROM Students WHERE student_id = ?";
  var inserts = [student_id];
  mysql.pool.query(sql, inserts, function(error, results, fields){
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
  var context = {};

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
  var sql = "UPDATE Students SET first_name=?, last_name=?, email=?, mentor_id=? WHERE student_id = ?";
  var inserts = [req.body.first_name, req.body.last_name, req.body.email, req.body.mentor_id, req.params.id];

  sql = mysql.pool.query(sql,inserts,function(error, results, fields){
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
  var sql = "DELETE FROM Students WHERE student_id = ?"
  var inserts = [req.params.id];
  sql = mysql.pool.query(sql, inserts, function(error, results, fields){
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
  let query1 = "SELECT * FROM Courses;";
  let query2 = "SELECT * FROM Tutors;";
  mysql.pool.query(query1, function(err, rows, fields) {
      let courses = rows;
      mysql.pool.query(query2, function(err, rows, fields){
        let tutors = rows;
        return res.render('courses', {data: courses, tutors: tutors});
      });
  });
});

app.post('/add-course-form', function(req, res){
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;
  // Create the query and run it on the database
  query1 = `INSERT INTO Courses (course_name, tutor_id) VALUES ('${data['course_name']}', '${data['tutor_id']}')`;
  mysql.pool.query(query1, function(error, rows, fields){
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

function getCourse(res, mysql, context, course_id, complete){
  var sql = "SELECT course_id, course_name, tutor_id FROM Courses WHERE course_id = ?";
  var inserts = [course_id];
  mysql.pool.query(sql, inserts, function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      context.course = results[0];
      complete();
  });
}

function getTutors(res, mysql, context, complete){
  mysql.pool.query("SELECT tutor_id, first_name, last_name FROM Tutors", function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      context.tutors  = results;
      complete();
  });
}

// Update a course
app.get('/courses/:course_id', function(req, res){
  callbackCount = 0;
  var context = {};

  getCourse(res, mysql, context, req.params.course_id, complete);
  getTutors(res, mysql, context, complete);
  function complete(){
      callbackCount++;
      if(callbackCount >= 2){
          res.render('update_course', context);
      }
  }
});

app.put('/courses/:id', function(req,res){
  console.log(req.body)
  console.log(req.params.id)
  var sql = "UPDATE Courses SET course_name=?, tutor_id=? WHERE course_id = ?";
  var inserts = [req.body.course_name, req.body.tutor_id, req.params.id];
  sql = mysql.pool.query(sql,inserts,function(error, results, fields){
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

// Delete a course. It will return a 202 upon success. Uses AJAX.
app.delete('/courses/:id', function(req,res){
  var sql = "DELETE FROM Courses WHERE course_id = ?"
  var inserts = [req.params.id];
  sql = mysql.pool.query(sql, inserts, function(error, results, fields){
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
  let query1 = 
  `SELECT s.first_name, s.last_name, sc.student_id, sc.course_id, c.course_name 
  FROM Students_Courses sc
  JOIN Students s ON sc.student_id = s.student_id
  JOIN Courses c ON sc.course_id = c.course_id;`;
  let query2 = "SELECT * FROM Students;";
  let query3 = "SELECT * FROM Courses;";

  mysql.pool.query(query1, function(err, rows, fields) {
      let students_courses = rows;
      mysql.pool.query(query2, function(err, rows, fields){
        let students = rows;
        mysql.pool.query(query3, function(err, rows, fields){
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
  query1 = `INSERT INTO Students_Courses (course_id, student_id) VALUES ('${data['course_id']}', '${data['student_id']}')`;
  mysql.pool.query(query1, function(error, rows, fields){
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
  var sql = "DELETE FROM Students_Courses WHERE course_id = ? AND student_id = ?";
  var inserts = [req.params.cid, req.params.sid];
  sql = mysql.pool.query(sql, inserts, function(error, results, fields){
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
  let query1 = "SELECT * FROM Invoices;";
  let query2 = "SELECT * FROM Students;";
  mysql.pool.query(query1, function(err, rows, fields) {
      let invoices = rows;
      for(let invoice of invoices){
        if(invoice.payment_status == 1){
          invoice.payment_status = "Yes"
        }else{
          invoice.payment_status = "No"
        }
      }
      mysql.pool.query(query2, function(err, rows, fields){
        let students = rows;
        return res.render('invoices', {data: invoices, students: students});
      });
  });
});

app.post('/add-invoice-form', function(req, res){
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;
  // Fix request body so payment_status is either 1 or 0
  data.payment_status == "yes"? data.payment_status = 1 : data.payment_status = 0
  // Create the query and run it on the database
  query1 = `INSERT INTO Invoices (student_id, payment_status) VALUES ('${data['student_id']}','${data['payment_status']}')`;
  mysql.pool.query(query1, function(error, rows, fields){
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
  var sql = "SELECT invoice_id, student_id, payment_status FROM Invoices WHERE invoice_id = ?";
  var inserts = [invoice_id];
  mysql.pool.query(sql, inserts, function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      context.invoice = results[0];
      complete();
  });
}

function getStudents(res, mysql, context, complete){
  mysql.pool.query("SELECT student_id, first_name, last_name, email, mentor_id FROM Students", function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      context.students  = results;
      complete();
  });
}

// Update an invoice
app.get('/invoices/:invoice_id', function(req, res){
  callbackCount = 0;
  var context = {};

  getInvoice(res, mysql, context, req.params.invoice_id, complete);
  getStudents(res, mysql, context, complete);
  function complete(){
      callbackCount++;
      if(callbackCount >= 2){
          res.render('update_invoice', context);
      }
  }
});

app.put('/invoices/:id', function(req,res){
  console.log(req.body)
  console.log(req.params.id)
  var sql = "UPDATE Invoices SET student_id=?, payment_status=? WHERE invoice_id = ?";
  var inserts = [req.body.student_id, req.body.payment_status, req.params.id];
  sql = mysql.pool.query(sql,inserts,function(error, results, fields){
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
  var sql = "DELETE FROM Invoices WHERE invoice_id = ?"
  var inserts = [req.params.id];
  sql = mysql.pool.query(sql, inserts, function(error, results, fields){
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