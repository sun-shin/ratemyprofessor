const Pool = require("pg").Pool;
const pool = new Pool({
  user: "sshin2",
  host: "localhost",
  database: "ratemyprofessor",
  password: "password",
  port: 5432,
});

// Professors CRUD
// Professors Index
const getProfessors = (req, res) => {
  pool.query("SELECT * FROM professors ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};
// Professors Show
const getProfessorById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(
    "SELECT * FROM professors WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};
// Professors Create
const createProfessor = (request, response) => {
  const { name, university, department } = request.body;

  pool.query(
    "INSERT INTO professors (name, university, department) VALUES ($1, $2, $3)",
    [name, university, department],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Professor added with ID: ${results.insertId}`);
    }
  );
};
//Professors Update
const updateProfessor = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, university, department } = request.body;

  pool.query(
    "UPDATE professors SET name = $1, university = $2, department = $3 WHERE id = $4",
    [name, university, department, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Professor modified with ID: ${id}`);
    }
  );
};
//Professors Delete
const deleteProfessor = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM professors WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Professor deleted with ID: ${id}`);
  });
};

// Reviews CRUD

// Reviews Index
const getReviews = (req, res) => {
  pool.query("SELECT * FROM reviews ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};
// Reviews Show
const getReviewById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("SELECT * FROM reviews WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};
// Reviews Create
const createReview = (request, response) => {
  const { professor_id, title, review, rating } = request.body;

  pool.query(
    "INSERT INTO reviews (professor_id, title, review, rating) VALUES ($1, $2, $3, $4)",
    [professor_id, title, review, rating],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Review added with ID: ${results.insertId}`);
    }
  );
};
//Reviews Update
const updateReview = (request, response) => {
  const id = parseInt(request.params.id);
  const { professor_id, title, review, rating } = request.body;

  pool.query(
    "UPDATE reviews SET professor_id = $1, title = $2, review = $3, rating = $4 WHERE id = $5",
    [professor_id, title, review, rating, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Review modified with ID: ${id}`);
    }
  );
};
//Reviews Delete
const deleteReview = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM reviews WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Review deleted with ID: ${id}`);
  });
};

module.exports = {
  getProfessors,
  getProfessorById,
  createProfessor,
  updateProfessor,
  deleteProfessor,
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};
