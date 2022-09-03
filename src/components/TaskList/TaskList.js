import React from 'react';
import Task from '../../cells/Task/Task';
import { useDispatch, useSelector } from 'react-redux';
import { updateTaskState } from '../../lib/store';

export default function TaskList() {
  // We're retrieving our state from the store
  const tasks = useSelector((state) => {
    const tasksInOrder = [
      ...state.taskbox.tasks.filter((t) => t.state === 'TASK_PINNED'),
      ...state.taskbox.tasks.filter((t) => t.state !== 'TASK_PINNED'),
    ];
    const filteredTasks = tasksInOrder.filter(
      (t) => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED' || t.state === 'TASK_ARCHIVED'
    );
    return filteredTasks;
  });

  const { status } = useSelector((state) => state.taskbox);

  const dispatch = useDispatch();
 
  const pinTask = (value) => SetStatus(value, 'TASK_PINNED')

  const archiveTask = (value) => SetStatus(value, 'TASK_ARCHIVED')

  const SetStatus = (id, status) => {

    // Find task by id
    const task = tasks.find((t) => t.id === id)

    if (task.state === 'TASK_INBOX')
      // We're dispatching the Pinned event back to our store
      dispatch(updateTaskState({ id: id, newTaskState: status }));
      else
      // We're dispatching the Pinned event back to our store
      dispatch(updateTaskState({ id: id, newTaskState: 'TASK_INBOX' }));

  };

  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );
  if (status === 'loading') {
    return (
      <div className="list-items" data-testid="loading" key={"loading"}>
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }
  if (tasks.length === 0) {
    return (
      <div className="list-items" key={"empty"} data-testid="empty">
        <div className="wrapper-message">
          <span className="icon-check" />
          <p className="title-message">You have no tasks</p>
          <p className="subtitle-message">Sit back and relax</p>
        </div>
      </div>
    );
  }

  return (
    <div className="list-items" data-testid="success" key={"success"}>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onPinTask={(task) => pinTask(task)}
          onArchiveTask={(task) => archiveTask(task)}
        />
      ))}
    </div>
  );
}
