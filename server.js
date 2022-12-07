const jsonServer = require("json-server");
const path = require("path");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults({
  static: "./build",
});
const db = router.db;

const port = process.env.PORT || 5000;

server.use(middlewares);
server.use(jsonServer.bodyParser);

module.exports = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
};

server.get("/:page", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

server.post("/api/users", (req, res) => {
  const { login, password } = req.body;
  const users = db.getState().users;

  const registeredUser = users.filter((user) => user.login === login);

  if (!registeredUser.length) {
    return res.status(404).jsonp({
      loginError: "This user is not registered",
    });
  }

  const isPasswordCorrect = registeredUser[0].password === password;

  if (!isPasswordCorrect) {
    return res.status(404).jsonp({
      passwordError: "Password is not correct",
    });
  }

  return res.status(200).jsonp(registeredUser);
});

server.use("/api", router);
server.listen(port, () => {
  console.log("JSON Server is running");
});
