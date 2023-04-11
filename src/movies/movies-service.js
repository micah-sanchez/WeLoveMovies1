const knex = require("../db/connection");

function listAll() {
    return knex("movies")
      .select("*")
  }

function listShowingMovies() {
  return knex("movies as m")
    .join("movies_theatres as mt")
    .select("m.*")
    .where("mt.is_showing", "=", "true")
}

function read(movieId) {
  return knex("movies")
  .select("*")
  .where({ movie_id: movieId })
}

module.exports = {
    listAll,
    listShowingMovies,
    read
}