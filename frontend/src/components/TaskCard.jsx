import { EditIcon, Trash2Icon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useTask } from '../hooks/useTask';

function TaskCard({task}) {
    const { deleteTask } = useTask()
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">


      <div className="card-body">
        {/* PRODUCT INFO */}
        <h2 className="card-title text-lg font-semibold">{task.name}</h2>
        <p className="text-2xl font-bold text-primary">{task.notes}</p>
        <p className="text-2xl font-bold text-primary">
            {new Date(task.due_date).toLocaleDateString("en-US", {
                month: "numeric",
                day: "numeric",
                year: "numeric",
            }).replace(/\//g, "/")}
        </p>

        {/* CARD ACTIONS */}
        <div className="card-actions justify-end mt-4">
          <Link to={`/tasks/${task.id}`} className="btn btn-sm btn-info btn-outline">
            <EditIcon className="size-4" />
          </Link>

          <button
            className="btn btn-sm btn-error  btn-outline"
            onClick={() => {deleteTask(task.id)}}
          >
            <Trash2Icon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard