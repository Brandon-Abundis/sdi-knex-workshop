/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('vehicles', table => {
    table.increments();
    table.string('vin', 50);
    table.integer('year', 8);
    table.string('horse_power', 50);
    table.string('color', 50);
    table.integer('mpg', 50);
    table.integer('model_id').unsigned().notNullable();
    table.foreign('model_id').references(`models.id`);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('vehicles', table => {
    table.dropForeign('models_id');
  }).then(function() {
    return knex.schema.dropSchemaIfExists('vehicles');
  })
};
