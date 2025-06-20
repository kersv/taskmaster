import express from "express"
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"
import dotenv from "dotenv"
import taskRoutes from "./routes/taskRoutes.js"
import { sql } from "./config/db.js"
import { aj } from "./lib/arcjet.js"
import path from "path"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const __dirname = path.resolve()

app.use(express.json())
app.use(cors())
app.use(helmet()) // security middleware for http header
app.use(morgan("dev")) // logs the request

// apply arcject rate limit to all routes
app.use(async (req,res,next) => {
    try{
        const decision = await aj.protect(req, {
            requested: 1 // specifies that each request consumes 1 token
        })
        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                res.status(429).json({error: "Too many request"})
            }
            else if(decision.reason.isBot()){
                res.status(403).json({error: "Bot access denied"})
            }
            else{
                res.status(403).json({error: "Forbidden"})
            }
            return
        }

        // check for spoofed bots
        if(decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())){
            res.status(403).json({error: "Spoofed bot detected"})
        }

        next()
    }catch(error){
        console.log("Arcjet error: ", error)
        next(error)
    }
})

app.use("/api/tasks", taskRoutes)

if (process.env.NODE_ENV === "production") {
  // server our react app
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

async function initDB(){
    try{
        await sql`
            CREATE TABLE IF NOT EXISTS tasks (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                notes VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                due_date DATE NOT NULL
            )
        `
        console.log('Database initialize')
    }catch(error){
        console.log('Error InitDB', error)
    }

}

// app.listen(PORT, () => {
//     console.log("Server is running on port " + PORT)
// })

initDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port " + PORT)
    })
})