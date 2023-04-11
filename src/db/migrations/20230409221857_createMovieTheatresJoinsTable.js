exports.up = function (knex) {
  // The `movies_theaters` table is a join table that connects movies with theaters. It represents which movies are being shown in which theaters. It also includes a key that represents whether or not a movie is currently showing at the theater, or if it has in the past.

  // - `movie_id`: (Foreign Key) A reference ID to a particular movie.
  // - `theater_id`: (Foreign Key) A reference ID to a particular theater.
  // - `is_showing`: (Boolean) A representation of whether or not the movie is currently showing in the referenced theater.

  return knex.schema.createTable("movie_theaters", (table) => {
    table
      .foreign("movie_id")
      .references("movie_id")
      .inTable("movies")
      .onDelete("cascade");
    table
      .foreign("theater_id")
      .references("theater_id")
      .inTable("theaters")
      .onDelete("cascade");
    table.boolean("is_showing");
    table.timestamps(true, true); // Adds created_at and updated_at columns
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("movie_theaters");
};
