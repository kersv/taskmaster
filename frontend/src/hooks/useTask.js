import axios from "axios";
import { create } from "zustand";
import toast from "react-hot-toast";


// base url will by dynamic depending on environment
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : ""

export const useTask = create((set,get) => ({
    // tasks state
    tasks: [],
    loading: false,
    error: null,
    currentTask: null,

    // form state
    formData: {
        name: '',
        notes: '',
        due_date: ''
    },

    setFormData: (formData) => set({formData}),
    resetForm: () => set({formData: {name : '', notes: '', due_date: ''}}),

    fetchTasks: async () => {
        set({loading:true})
        try{
            const response = await axios.get(`${BASE_URL}/api/tasks`)
            set({tasks:response.data.data, error:null})

        }catch(err){
            if(err.status == 429) set({error:"Rate limiting exceeded", tasks:[]} )
            else set({error:"Something went wrong", tasks:[]})
            console.log(err)

        } finally {
            set({loading:false})
        }
    },

    deleteTask: async (id) => {
        set({loading:true})
        try{
            await axios.delete(`${BASE_URL}/api/tasks/${id}`)
            set((prev) => ({tasks: prev.tasks.filter(task => task.id !== id)}))
            toast.success("Task deleted successfully")
        }catch(err){
            console.log("Error deleting task")
            toast.error("Something went wrong")
        }finally{
            set({loading:false})
        }
    },

    addTask: async (e) => {
        e.preventDefault()
        set({loading:true})
        try{
            const {formData} = get()
            await axios.post(`${BASE_URL}/api/tasks`, formData)
            await get().fetchTasks()
            get().resetForm()
            toast.success("Task added succesfully")
            document.getElementById('add_task_modal').close()
        }catch(err){
            console.log(err)
            toast.error("Something went wrong")

        }finally{
            set({loading:false})
        }

    },

    fetchTask: async (id) => {
        set({loading:true})
        try{
            const response = await axios.get(`${BASE_URL}/api/tasks/${id}`)
            set({
                currentTask:response.data.data,
                formData: response.data.data, // prefill form with current task data,
                error: null
            })
            // console.log(get().currentTask)

        }catch(err){
            console.log('Error in fetchTask func',err)
            set({error:"Something went wrong", currentTask:null})
        }finally{
            set({loading:false})
        }
    },

    updateTask: async (id) => {
        set({loading:true})
        try{
            const {formData} = get()
            const response = await axios.put(`${BASE_URL}/api/tasks/${id}`, formData)
            set({currentTask: response.data.data})
            toast.success("Task updated successfully")
        }catch(err){
            toast.error("Failed updating task")
            console.log("Error in updateTask func", err)

        }finally{
            set({loading:false})
        }
    }


}))