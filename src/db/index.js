import pg from "pg"

import s from "sequelize"
const Sequelize = s.Sequelize
const DataTypes = s.DataTypes

import AuthorModel from "./authors.js"
import BlogModel from "./blogs.js"

const { PGUSER, PGDATABASE, PGPASSWORD, PGHOST } = process.env
const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
    host: PGHOST,
    dialect: "postgres"
})

const pool = new pg.Pool()

const models = {
    Author: AuthorModel(sequelize, DataTypes),
    Blog: BlogModel(sequelize, DataTypes),

    sequelize: sequelize,
    pool: pool
}

models.Author.hasMany(models.Blog)
models.Blog.belongsTo(models.Author)

export default models
