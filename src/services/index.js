import express from "express"
const route = express.Router()

import authorsRoute from "./authors/index.js"
import blogsRoute from "./blogs/index.js"
import commentsRoute from "./comments/index.js"
import categoriesRoute from "./categories/index.js"

route.use("/authors", authorsRoute)
route.use("/blogs", blogsRoute)
route.use("/comments", commentsRoute)
route.use("/categories", categoriesRoute)

export default route
