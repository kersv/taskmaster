import React from 'react'
import { X, Package2Icon, NotepadText, CalendarIcon, PlusCircleIcon } from 'lucide-react'
import { useTask } from '../hooks/useTask'
function AddTaskModal() {
    const {addTask, formData, setFormData, loading} = useTask()
  return (
    <dialog id='add_task_modal' className='modal'>
        <div className='modal-box'>
        {/* CLOSE BUTTON */}
        <form>
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
                <X className='size-4'/>
            </button>
        </form>
        {/* MODAL HEADER */}
        <h3 className='font-bold text-xl mb-8'>Add New Task</h3>
        <form onSubmit={addTask} className='space-y-6'>
            <div className="grid gap-6">
            {/* TASK NAME INPUT */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Task Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <Package2Icon className="size-5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter task name"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>
            {/* TASK NOTES */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Notes</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <NotepadText className="size-5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter notes"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
            </div>
            {/* TASK DUE_DATE  */}
            <div className="form-control">
            <label className="label">
                <span className="label-text text-base font-medium">Due Date</span>
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                    <CalendarIcon className="size-5" />
                </div>
                <input
                type="text"
                placeholder='Select due date'
                className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                value={formData.due_date}
                onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                />
            </div>
            </div>
            </div>

            {/* MODAL ACTIONS */}
            <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-ghost">Cancel</button>
            </form>
            <button
              type="submit"
              className="btn btn-primary min-w-[120px]"
              disabled={!formData.name || !formData.due_date || loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  <PlusCircleIcon className="size-5 mr-2" />
                  Add Task
                </>
              )}
            </button>
          </div>
        </form>
        </div>

        {/* BACKDROP */}
        <form method='dialog' className='modal-backdrop'>
            <button>
                close
            </button>
        </form>
    </dialog>
  )
}

export default AddTaskModal