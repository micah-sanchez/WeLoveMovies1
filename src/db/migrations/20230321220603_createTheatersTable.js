
exports.up = function(knex) {

// - `theater_id`: (Primary Key) A unique ID for the theater.
// - `name`: (String) The name of the theater.
// - `address_line_1`: (String) The first line of the address of the theater.
// - `address_line_2`: (String) The second line of the address of the theater.
// - `city`: (String) The city in which the theater is located.
// - `state`: (String) The state in which the theater is located.
// - `zip`: (String) The zip in which the theater is located.

    return knex.schema.createTable("theatres", (table) => {
        table.increments("theater_id").primary(); // Sets supplier_id as the primary key
        table.string("name");
        table.string("address_line_1");
        table.string("address_line_2");
        table.string("city");
        table.string("state");
        table.string("zip");
        table.timestamps(true, true); // Adds created_at and updated_at columns
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable("theatres");
};
