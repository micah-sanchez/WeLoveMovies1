const service = require("./movies-service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  
  //const { movieId } = req.params;
  console.log(req.params.movieId)
  const movie = await service.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  return next({ status: 404, message: `Movie cannot be found.` });
}

function read(req, res, next) {
  const { movie: data } = res.locals;
  res.json({ data });
}

async function list(req, res, next) {
  const isTrue = req.query
  console.log("hello!")
  //console.log(JSON.stringify(isTrue))
  if (isTrue.is_showing === "true") {
    console.log("hits true if")
    const data = await service.listShowingMovies()
    res.json({ data })
  } else {
    console.log("hits else")
    const data = await service.listAll();
    res.json({ data });
  }
}

module.exports = {
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  list: asyncErrorBoundary(list),
};
