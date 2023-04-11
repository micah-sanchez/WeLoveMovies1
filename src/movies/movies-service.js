const knex = require("../db/connection");

function list() {
    return knex("comments")
      .select("*")
  }

module.exports = {
    list,
}