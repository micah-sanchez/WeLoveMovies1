const service = require("./movies-service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const { movieId } = req.params;

  const movie = await service.read(movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  return next({ status: 404, message: `Movie cannot be found.` });
}

async function read(req, res, next) {
  const { movie } = res.locals;
  res.json({ data: movie });
}

async function list(req, res, next) {
  const data = await service.list();
  res.json({ data });
}

async function validateIsTrue(req, res, next) {
  const { isTrue } = req.query;

  if (isTrue === true) {
    return next();
  }
  return next({ status: 404, message: `Something went wrong.` });
}

module.exports = {
  read: [asyncErrorBoundary(movieExists), read],
  list: asyncErrorBoundary(list),
};
