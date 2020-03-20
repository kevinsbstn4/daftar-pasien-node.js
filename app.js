const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();

//Koneksi ke mysql database
const conn = mysql.createConnection({
  host: "localhost",
  user: "kevin",
  password: "0000",
  database: "daftar_pasien"
});

//connect ke database
conn.connect(err => {
  if (err) throw err;
  console.log("Koneksi berhasil");
});

app.use(bodyParser.json());
app.listen(4000, () => console.log("Server berjalan di port 4000"));
app.use(express.static("public"));

//Baca Semua Data
app.get("/read", (req, res) => {
  let sql = "SELECT * FROM list";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//Baca Data Berdasarkan NIS
app.get("/readbynis/:nis", async (req, res) => {
  const nis = req.params.nis;
  console.log(nis);

  let sql = "SELECT * FROM list Where nis = " + nis + "";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//route untuk insert data
app.post("/api", (req, res) => {
  let action = req.body.action;
  let data = {
    nis: req.body.nis,
    nama_pasien: req.body.nama_pasien,
    umur_pasien: req.body.umur_pasien,
    asal_rs: req.body.asal_rs,
    status: req.body.status,
    asal_rumah: req.body.asal_rumah
  };
  let sql;

  if (action === "Simpan") {
    sql = "INSERT INTO list SET ?";
  } else {
    sql =
      `UPDATE list SET nama_pasien='` +
      req.body.nama_pasien +
      `', 
     umur_pasien='` +
      req.body.umur_pasien +
      `', asal_rs='` +
      req.body.asal_rs +
      `', status='` +
      req.body.status +
      `', asal_rumah='` +
      req.body.asal_rumah +
      `'
    WHERE nis='` +
      req.body.nis +
      `';`;
  }

  console.log(sql);
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.json(results);
    console.log(results);
  });
});

//Baca Data Berdasarkan NIS
app.get("/hapus/:nis", async (req, res) => {
  const nis = req.params.nis;
  console.log(nis);

  let sql = `DELETE FROM list Where nis = '` + nis + `';`;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

///////////////////////////////////////////////DATA PERAWAT//////////////////////////////////

//Baca Semua Data
app.get("/read", (req, res) => {
  let sql = "SELECT * FROM perawat";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//Baca Data Berdasarkan NIS
app.get("/readbynis/:nis", async (req, res) => {
  const nis = req.params.nis;
  console.log(nis);

  let sql = "SELECT * FROM perawat Where nis = " + nis + "";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//route untuk insert data
app.post("/api", (req, res) => {
  let action = req.body.action;
  let data = {
    nis: req.body.nis,
    nama_perawat: req.body.nama_perawat,
    nama_pasien: req.body.nama_pasien
  };
  let sql;

  if (action === "Simpan") {
    sql = "INSERT INTO perawat SET ?";
  } else {
    sql =
      `UPDATE perawat SET nama_perawat='` +
      req.body.nama_perawat +
      `', 
     nama_pasien='` +
      req.body.nama_pasien +
      `'
    WHERE nis='` +
      req.body.nis +
      `';`;
  }

  console.log(sql);
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.json(results);
    console.log(results);
  });
});

//Baca Data Berdasarkan NIS
app.get("/hapus/:nis", async (req, res) => {
  const nis = req.params.nis;
  console.log(nis);

  let sql = `DELETE FROM perawat Where nis = '` + nis + `';`;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
