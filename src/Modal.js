// Modal.js
import React from 'react';
import { getTaskDetails } from './data.js';

export const TaskModal = ({ taskId, onClose }) => {
    const task = getTaskDetails(taskId);

    return (
        <div style={{ position: 'fixed', top: '20%', left: '20%', backgroundColor: 'white', padding: '20px', zIndex: 1000 }}>
            <h1>Детали Задачи</h1>
            {task ? (
                <div>
                    <p><b>Label:</b> {task.label}</p>
                    <p><b>Start Date:</b> {task.dateStart}</p>
                    <p><b>End Date:</b> {task.dateEnd}</p>
                    {/* Вывод других свойств задачи */}
                </div>
            ) : (
                <p>Задача не найдена.</p>
            )}
            <button onClick={onClose}>Закрыть</button>
        </div>
    );
};
