import { sql } from "../config/db.js"

export const getAllTask = async (req, res) => {
    try{
        const tasks = await sql`
        SELECT * FROM tasks
        ORDER BY created_at DESC
        `
        console.log('fetched task', tasks)
        res.status(200).json({success: true, data: tasks})
    }catch(error){
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}
export const createTask = async (req, res) => {
    const {name, notes = '', due_date} = req.body

    if (!name || !due_date) {
        return res.status(400).json({
        success: false,
        message: 'Name and due date are required',
        });
    }
    try{
        const newTask = await sql`
            INSERT INTO tasks (name, notes, due_date)
            VALUES(${name},${notes},${due_date})
            RETURNING *
        `
        // postman if arject isnt active
        res.status(201).json({success: true, data: newTask[0]})
    }catch(error){
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
}

export const getTask = async (req, res) => {
    const { id } = req.params

    try{
        const task = await sql`
        SELECT * FROM tasks
        WHERE id=${id}
        `

        res.status(200).json({success:true, data: task[0]})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false, message:"Internal server error"})
    }
}


export const updateTask = async (req, res) => {
    const { id } = req.params
    const {name, notes = '' , due_date} = req.body

    if (!name || !due_date) {
        return res.status(400).json({
        success: false,
        message: 'Name and due date are required',
        });
    }

    try{
        const updatedTask = await sql`
        UPDATE tasks
        SET name=${name}, notes=${notes}, due_date=${due_date}
        WHERE id=${id}
        RETURNING *
        `

        if(updatedTask.length === 0){
            return res.status(404).json({
                success:false,
                message:"Task not found"}
            )
        }
        res.status(200).json({success:true, data:updatedTask[0]})

    }catch(error){
        res.status(500).json({success:false, message:"Internal server error"})

    }

}
export const deleteTask = async (req, res) => {
    const { id } = req.params
    try{
        const deletedTask = await sql`
        DELETE FROM tasks
        WHERE id=${id}
        RETURNING *
        `
        if(deletedTask.length === 0){
            console.log("task not found to delete")
            return res.status(404).json({
                success:false,
                message:"Task not found"}
            )
        }
        res.status(200).json({success:true, data:deletedTask[0]})

    }catch(error){
        console.log("Error in deleteTask Function", error)
        res.status(500).json({success:false, message:"Internal server error"})
    }

}