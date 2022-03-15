

/*
  const text =
    "INSERT INTO users(id, name) VALUES($1, $2) RETURNING *";
  const values = [1, "Victor Jimenez"];

  try {
    const res = await pg.query(text, values);
    console.log(res.rows[0]);
  } catch (err) {
    console.log(err.stack);
  }

*/
