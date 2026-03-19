const express = require('express');
const app = express();
const port = 8080;

const knex = require('knex')(require('../knexfile.js')['development']);

app.use(express.json());
//___________________________GET______________________________
app.get('/makes', async (req, res) => {
  try{
    const data = await knex('makes').select('*');
    const makes = data.map(make => ({
      id: make.id,
      make: make.name
    }));
    res.status(200).send(makes);
  }catch(err){
    res.status(500).json({error: err.message})
  }
});
//SELECT vehicles.*, makes.name AS make, models.name AS model FROM vehicles
//  JOIN models ON vehicles.model_id = models.id
//  JOIN makes ON models.make_id = makes.id;

app.get("/makes/vehicles", async (req, res) => {
  try {
    const data = await knex("vehicles")
      .join("models", "vehicles.model_id", "models.id")
      .join("makes", "models.make_id", "makes.id")
      .select(
        "vehicles.*",
        "models.name as model_name",
        "makes.name as make_name",
      );
    const vehicles = data.map((vehicle) => ({
      id: vehicle.id,
      model: vehicle.model_name,
      make: vehicle.make_name,
      vin: vehicle.vin,
      year: vehicle.year,
      horse_power: vehicle.horse_power,
      color: vehicle.color,
      mpg: vehicle.mpg,
    }));
    res.status(200).send(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/makes/models', async (req, res) => {
  try{
    const data = await knex('models').select('*');
    const models = data.map(model => ({
      id: model.id,
      model: model.name
    }));
    res.status(200).send(models);
  }catch(err){
    res.status(500).json({error: err.message})
  }
});

// select * from models where make_id = (select id from makes where name = 'toyota');
app.get('/makes/:make', async (req, res) => {
  try{
    const param = req.params.make;
    const paramUpper = param.charAt(0).toUpperCase() + param.slice(1);
    const data = await knex('models').where('make_id',
      knex('makes').select('id').where('name', paramUpper)).select('*');
    const models = data.map(model => ({
      id: model.id,
      model: model.name
    }));
    res.status(200).send(models);
  }catch(err){
    res.status(500).json({error: err.message});
  }
});

//___________________________POST______________________________

app.post('/vehicle', async (req, res) => {
  const {vin,year,horse_power,color,mpg,model_id} = req.body;
  try{
    //Force the Postgres ID sequence to sync with the current max ID
    await knex.raw(`SELECT setval(pg_get_serial_sequence('vehicles', 'id'), max(id)) FROM vehicles`);
    const [newVehicle] = await knex('vehicles')
      .insert({
        vin: vin,
        year: year,
        horse_power: horse_power,
        color: color,
        mpg: mpg,
        model_id: model_id
      }).returning('*');
      res.status(201).json(newVehicle);
      // res.status(201).json(req.body);
  }catch(err){
    res.status(500).json({error: err.message});
  }
});

//___________________________DELETE______________________________

//__________________________________________________
app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});