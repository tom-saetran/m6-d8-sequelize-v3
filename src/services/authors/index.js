import express from "express"
import models from "../../db/index.js"

const Author = models.Author

const router = express.Router()

router
    .route("/")
    .get(async (req, res, next) => {
        try {
            const data = await Author.findAll({ include: models.Blogs })
            res.send(data)
        } catch (error) {
            next(error.message)
        }
    })
    .post(async (req, res, next) => {
        try {
            const data = await Author.create(req.body)
            res.send(data)
        } catch (error) {
            next(error.message)
        }
    })

router
    .route("/:id")
    .get(async (req, res, next) => {
        try {
            const data = await Author.findByPk(req.params.id, {
                include: {
                    model: models.Blog,
                    attributes: [
                        "id",
                        "title",
                        "content",
                        "cover",
                        "read_time_unit",
                        "read_time_value",
                        "createdAt",
                        "updatedAt"
                    ]
                }
            })
            res.send(data)
        } catch (error) {
            next(error.message)
        }
    })
    .put(async (req, res, next) => {
        try {
            const data = await Author.update(req.body, {
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
            const row = await Author.destroy({ where: { id: req.params.id } })
            if (row > 0) res.send("Deleted")
            else res.status(404).send("ID not found")
        } catch (error) {
            next(error.message)
        }
    })

export default router
