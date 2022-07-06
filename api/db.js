const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const {DB_USER, DB_PASSWORD } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@localhost/bae_organizer`, {
    logging: false,
    native: false
});

sequelize.authenticate()
  .then(() => {
    console.log('Conectado')
  })
  .catch(err => {
    console.log('No se conecto')
  });

  const modelDefiners = [];

  const basename = path.basename(__filename);

  // Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
  fs.readdirSync(path.join(__dirname, '/Models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/Models', file)));
  });

  // Injectamos la conexion (sequelize) a todos los modelos
  modelDefiners.forEach(model => model(sequelize));
  // Capitalizamos los nombres de los modelos ie: product => Product
  let entries = Object.entries(sequelize.models);
  let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
  sequelize.models = Object.fromEntries(capsEntries);
  
  // En sequelize.models están todos los modelos importados como propiedades
  // Para relacionarlos hacemos un destructuring
  const { User, Application, Position, Modality, Skill, Interview } = sequelize.models;
  
  // Relaciones
  User.hasMany(Application);
  Application.belongsTo(User);

  Position.hasMany(Application);
  Application.belongsTo(Position);

  Modality.hasMany(Application);
  Application.belongsTo(Modality);

  Application.hasMany(Interview);
  Interview.belongsTo(Application);

  Application.belongsToMany(Skill, {through: 'appli_skill'});
  Skill.belongsToMany(Application, {through: 'appli_skill'});


  

  module.exports = {
    ...sequelize.models, // para poder importar los modelos
    conn: sequelize,     // para importart la conexión 
  };
