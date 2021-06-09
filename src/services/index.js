import express from "express"
const route = express.Router()

import authorsRoute from "./authors/index.js"
import blogsRoute from "./blogs/index.js"

route.use("/authors", authorsRoute)
route.use("/blogs", blogsRoute)

export default route
