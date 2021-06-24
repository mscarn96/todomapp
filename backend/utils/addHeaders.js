const addHeaders = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
};

module.exports = addHeaders;
