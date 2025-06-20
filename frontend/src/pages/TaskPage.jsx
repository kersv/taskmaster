import React, { useEffect } from 'react'
import { useTask } from '../hooks/useTask'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeftIcon, Trash2Icon, SaveIcon } from 'lucide-react'

function TaskPage() {
  const {currentTask, formData, setFormData, loading, error, updateTask, deleteTask, fetchTask} = useTask()
  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(() => {
    fetchTask(id)
  }, [fetchTask, id])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  const handleDelete = async () => {
    if(window.confirm("Are you sure you want to delete this task?")){
      await deleteTask(id)
      navigate('/')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button onClick={() => navigate("/")} className="btn btn-ghost mb-8">
        <ArrowLeftIcon className="size-4 mr-2" />
        Back to Tasks
      </button>

      {/* TASK FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className='card-body'>
          <h2 className='card-title text-2xl mb-6'>Edit Task</h2>

          <form onSubmit={(e) => {
            e.preventDefault()
            updateTask(id)
          }} className='space-y-6'>
            {/* TASK NAME */}
            <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">Task Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter task name"
                  className="input input-bordered w-full"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

            {/* TASK NOTES */}
            <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">Task Notes</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter notes"
                  className="input input-bordered w-full"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
            {/* TASK DUE_DATE  */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Task Due Date</span>
              </label>
              <input
                type="text"
                placeholder="Select due date"
                className="input input-bordered w-full"
                value={formData.due_date}
                onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
              />
            </div>

            {/* FORM ACTIONS */}
            <div className="flex justify-between mt-8">
                <button type="button" onClick={handleDelete} className="btn btn-error">
                  <Trash2Icon className="size-4 mr-2" />
                  Delete Task
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading || !formData.name || !formData.notes || !formData.due_date}
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    <>
                      <SaveIcon className="size-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
          </form>
        </div>
      </div>

    </div>
  )
}

export default TaskPage