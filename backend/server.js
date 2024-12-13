import app from './app.js';

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.status(200).json({ status: "OK", message: "Sever Down Hai new port" });
});


app.listen(PORT,'http://127.0.0.1', () => {
  console.log(`Server running on port ${PORT}`);
});
