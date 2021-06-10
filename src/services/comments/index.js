import express from "express"
import models from "../../db/index.js"
import createError from "http-errors"

const Comment = models.Comment

const router = express.Router()

router
    .route("/")

    .get(async (req, res, next) => {
        try {
            const data = await Comment.findAll()
            res.send(data)
        } catch (error) {
            next(error.message)
        }
    })

    .post(async (req, res, next) => {
        try {
            if (!req.body.authorId) next(createError(400, "ID required"))
            else {
                const data = await Comment.create(req.body)
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
            const data = await Comment.findByPk(req.params.id, {
                include: { model: models.Author, attributes: ["id", "name", "surname", "avatar"] },
                attributes: [
                    "id",
                    "category",
                    "title",
                    "cover",
                    "read_time_value",
                    "read_time_unit",
                    "content",
                    "createdAt",
                    "updatedAt"
                ]
            })
            res.send(data)
        } catch (error) {
            next(error.message)
        }
    })

    .put(async (req, res, next) => {
        try {
            const data = await Comment.update(req.body, {
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
            const row = await Comment.destroy({ where: { id: req.params.id } })
            if (row > 0) res.send("Deleted")
            else res.status(404).send("ID not found")
        } catch (error) {
            next(error.message)
        }
    })

export default router
