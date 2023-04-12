const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");
const reduceProperties = require("../utils/reduce-properties");

const reduceTheaterAndMovies = reduceProperties("theater_id", {
    theater_id: ["theater", "theater_id"],
    name: ["theater", "name"],
    address_line_1: ["theater", "address_line_1"],
    address_line_2: ["theater", "address_line_2"],
    city: ["theater", "city"],
    state: ["theater", "state"],
    zip: ["theater","zip"],
    created_at: ["theater", "created_at"],
    updated_at: ["theater", "updated_at"],
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    rating: ["movies", null, "rating"],
    description: ["movies", null, "description"],
    image_url: ["movies", null, "image_url"],
    created_at: ["movies", null, "created_at"],
    updated_at: ["movies", null, "updated_at"],
  });

function listTheaters() {
    return knex("theaters as t")
        .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
        // .select("t.*")
        // .distinct("t.theater_id",
        // "t.name",
        // "t.address_line_1",
        // "t.address_line_2",
        // "t.city",
        // "t.state",
        // "t.zip",
        // "t.created_at",
        // "t.updated_at")
        .then(reduceTheaterAndMovies)
}

module.exports = {
    listTheaters
}

