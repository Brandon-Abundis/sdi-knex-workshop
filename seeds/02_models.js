/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('models').del()
  await knex('models').insert([
    {id: 1, name: 'Supra', make_id: 1},
    {id: 2, name: 'Camry', make_id: 1 },
    {id: 3, name: 'Outback', make_id: 2 },
    {id: 4, name: 'WRX', make_id: 2},
    {id: 5, name: 'NSX', make_id: 3},
    {id: 6, name: 'Civic', make_id: 3 },
  ]);
};
