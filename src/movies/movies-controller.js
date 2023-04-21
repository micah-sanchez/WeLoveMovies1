const service = require("./movies-service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
// const { map } = require("../app");

async function movieExists(req, res, next) {
  
  //const { movieId } = req.params;
  //console.log(req.params.movieId)
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
  if (isTrue.is_showing === "true") {
    const data = await service.listShowingMovies()
    res.json({ data })
  } else {
    const data = await service.listAll();
    res.json({ data });
  }
}

async function readMovieFromTheaters(req, res, next) {
  const { movieId } = req.params;
  const data = await service.readTheaters(movieId);
  res.json({ data })
}

async function readReviewsFromMovieId(req, res, next) {
  const { movieId } = req.params;
  const data = await service.readReviews(movieId);
  res.json({ data })
}



module.exports = {
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  list: asyncErrorBoundary(list),
  readTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readMovieFromTheaters)],
  readReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readReviewsFromMovieId)]
};
