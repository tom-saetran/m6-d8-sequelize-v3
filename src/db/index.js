import pg from "pg"
import s from "sequelize"
import AuthorModel from "./authors.js"
import BlogModel from "./blogs.js"
import CategoryModel from "./categories.js"
import CommentModel from "./comments.js"

const Sequelize = s.Sequelize
const DataTypes = s.DataTypes

const { PGUSER, PGDATABASE, PGPASSWORD, PGHOST } = process.env
const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
    host: PGHOST,
    dialect: "postgres"
})

const pool = new pg.Pool()

const models = {
    Author: AuthorModel(sequelize, DataTypes),
    Blog: BlogModel(sequelize, DataTypes),
    Category: CategoryModel(sequelize, DataTypes),
    Comment: CommentModel(sequelize, DataTypes),

    sequelize: sequelize,
    pool: pool
}

models.Author.hasMany(models.Blog)
models.Blog.belongsTo(models.Author)

models.Author.belongsToMany(models.Blog, {
    through: { model: models.Comment, unique: false }
})

models.Blog.belongsToMany(models.Author, {
    through: { model: models.Comment, unique: false }
})

models.Category.hasMany(models.Blog)
models.Blog.belongsTo(models.Category)

models.Author.hasMany(models.Comment)
models.Comment.belongsTo(models.Author)

models.Blog.hasMany(models.Comment)
models.Comment.belongsTo(models.Blog)

export default models
