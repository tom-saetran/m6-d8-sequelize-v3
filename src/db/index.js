import s from "sequelize";
const Sequelize = s.Sequelize;
const DataTypes = s.DataTypes;
import StudentModel from "./students.js";
import ClassModel from "./classes.js";
import ModuleModel from "./modules.js";
import TutorModel from "./tutors.js";
const { PGUSER, PGDATABASE, PGPASSWORD, PGHOST } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  dialect: "postgres",
});

const test = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const models = {
  Student: StudentModel(sequelize, DataTypes),
  Class: ClassModel(sequelize, DataTypes),
  Module: ModuleModel(sequelize, DataTypes),
  Tutor: TutorModel(sequelize, DataTypes),
  sequelize: sequelize,
};

models.Module.hasMany(models.Class);
models.Class.belongsTo(models.Module);
test();

export default models;
