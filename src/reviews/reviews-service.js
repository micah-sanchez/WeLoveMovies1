const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function read(reviewId) {
    return knex("reviews")
        .select("*")
        .limit(1)
}

function update(updatedReview) {
    return knex("reviews")
      .select("*")
      .where({ review_id: updatedReview.review_id })
      .update(updatedReview, "*");
  }

module.exports = {
    read,
    update
}