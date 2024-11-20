import express from "express";
import pg from "pg";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());


const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "weatherapp",
  password: "toanTOAN123$",
  port: 5432,
});

db.connect();

app.post("/register", async (req, res) => {
  const { username, password, city } = req.body;

  try {
    const result = await db.query(
      "insert into users(username, password, city) values($1, $2, $3) returning id",
      [username, password, city]
    );
    res.json({ id: result.rows[0].id });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await db.query(
      "select * from users where username = $1 and password = $2",
      [username, password]
    );
    if (result.rows.length === 0) {
      res.status(401);
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/user/:id/city", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query("select city from users where id = $1", [
      id,
    ]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404);
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
