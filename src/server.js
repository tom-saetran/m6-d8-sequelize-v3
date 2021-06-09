import express from "express"
import cors from "cors"
import db from "./db/index.js"
import services from "./services/index.js"
const app = express()

app.use(cors())
app.use(express.json())
app.use("/", services)
const port = process.env.PORT || 5000

db.sequelize
    .sync({ force: false })
    .then(() => {
        app.listen(port, () => console.log("Server is running on port: " + port))
        app.on("error", error => console.info(" ❌ Server is not running due to : ", error))
    })
    .catch(e => console.log(e))
