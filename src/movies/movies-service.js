const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function listAll() {
    return knex("movies")
      .select("*")
  }

function listShowingMovies() {
  return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .distinct("m.title"
    , "m.runtime_in_minutes "
    , "m.rating" 
    , "m.description" 
    , "m.image_url" 
    , "m.created_at" 
    , "m.updated_at")
    .where("mt.is_showing", true)
}

function read(movieId) {
  return knex("movies")
  .select("*")
  .where({ "movie_id": movieId })
  .first()
}

function readTheaters(movieId) {
  return knex("theaters as t")
  .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
  .select("t.*", "mt.*")
  .where({"mt.movie_id": movieId})
}
const addCritics = mapProperties({
  critic_id:"critic.critic_id", 
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at"
})

function readReviews(movieId) {
  return knex("reviews as r")
  .join("critics as c", "c.critic_id", "r.critic_id")
  .select("r.*", "c.*")
  .where({"r.movie_id": movieId})
  .then(reviews => reviews.map(review => addCritics(review)))
}

module.exports = {
    listAll,
    listShowingMovies,
    read,
    readTheaters,
    readReviews
}