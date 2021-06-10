import express from "express"
import models from "../../db/index.js"
import createError from "http-errors"

const Blog = models.Blog

const router = express.Router()

router
    .route("/")
    .get(async (req, res, next) => {
        try {
            const data = await Blog.findAll({
                include: [
                    {
                        model: models.Category,
                        attributes: ["id", "category"]
                    },
                    {
                        model: models.Comment,
                        attributes: ["id", "comment"],
                        include: {
                            model: models.Author,
                            attributes: ["name", "surname"]
                        }
                    },
                    {
                        model: models.Author,
                        attributes: ["id", "name", "surname", "avatar"]
                    }
                ],
                attributes: ["id", "title", "cover", "read_time_value", "read_time_unit", "content"]
            })
            res.send(data)
        } catch (error) {
            next(error.message)
        }
    })
    .post(async (req, res, next) => {
        try {
            if (!req.body.authorId) next(createError(400, "Author ID required"))
            if (!req.body.categoryId) next(createError(400, "Cateogry ID required"))
            else {
                const data = await Blog.create(req.body)
                res.send(data)
            }
        } catch (error) {
            next(error)
        }
    })

router
    .route("/:id")
    .get(async (req, res, next) => {
        try {
            const data = await Blog.findByPk(req.params.id, {
                include: [
                    {
                        model: models.Category,
                        attributes: ["id", "category"]
                    },
                    {
                        model: models.Comment,
                        attributes: ["id", "comment"],
                        include: {
                            model: models.Author,
                            attributes: ["name", "surname"]
                        }
                    },
                    {
                        model: models.Author,
                        attributes: ["id", "name", "surname", "avatar"]
                    }
                ],
                attributes: ["id", "title", "cover", "read_time_value", "read_time_unit", "content"]
            })
            res.send(data)
        } catch (error) {
            next(error.message)
        }
    })
    .put(async (req, res, next) => {
        try {
            const data = await Blog.update(req.body, {
                where: { id: req.params.id },
                returning: true
            })
            if (data[0] === 1) res.send(data[1][0])
            else res.status(404).send("ID not found")
        } catch (error) {
            next(error.message)
        }
    })
    .delete(async (req, res, next) => {
        try {
            const row = await Blog.destroy({ where: { id: req.params.id } })
            if (row > 0) res.send("Deleted")
            else res.status(404).send("ID not found")
        } catch (error) {
            next(error.message)
        }
    })

export default router
