import React, { useEffect } from 'react'
import { useTask } from '../hooks/useTask'
import { PlusCircleIcon, RefreshCwIcon, PackageIcon } from 'lucide-react'
import TaskCard from '../components/TaskCard'
import AddTaskModal from '../components/AddTaskModal'

function Homepage() {
    const {tasks, loading, error, fetchTasks, resetForm} = useTask()

    useEffect(() => {
        fetchTasks()
        resetForm()
    }, [fetchTasks])

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 ">
      <div className="flex justify-between items-center mb-8">
        <button
          className="btn btn-primary"
          onClick={() => document.getElementById("add_task_modal").showModal()}
        >
          <PlusCircleIcon className="size-5 mr-2" />
          Add Task
        </button>
        <button className="btn btn-ghost btn-circle" onClick={fetchTasks}>
          <RefreshCwIcon className="size-5" />
        </button>
      </div>

      <AddTaskModal />

      {error && <div className="alert alert-error mb-8">{error}</div>}

      {tasks.length === 0 && !loading && (
        <div className="flex flex-col justify-center items-center h-96 space-y-4">
          <div className="bg-base-100 rounded-full p-6">
            <PackageIcon className="size-12" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold ">No tasks found</h3>
            <p className="text-gray-500 max-w-sm">
              Get started by adding your first product to the inventory
            </p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </main>
  )
}

export default Homepage