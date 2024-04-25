import React, { useEffect, useRef } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';

export default function GanttView({ tasks, zoom, onDataUpdated }) {
    const container = useRef(null);

    const initZoom = () => {
        gantt.ext.zoom.init({
            levels: [
                {
                    name: 'Hours',
                    scale_height: 60,
                    min_column_width: 30,
                    scales: [
                        { unit: 'day', step: 1, format: '%d %M' },
                        { unit: 'hour', step: 1, format: '%H' }
                    ]
                },
                {
                    name: 'Days',
                    scale_height: 60,
                    min_column_width: 70,
                    scales: [
                        { unit: 'week', step: 1, format: 'Week #%W' },
                        { unit: 'day', step: 1, format: '%d %M' }
                    ]
                },
                {
                    name: 'Months',
                    scale_height: 60,
                    min_column_width: 70,
                    scales: [
                        { unit: 'month', step: 1, format: '%F' },
                        { unit: 'week', step: 1, format: '#%W' }
                    ]
                }
            ]
        });
    };

    const setZoom = (value) => {
        if (!gantt.ext.zoom.getLevels()) {
            initZoom();
        }
        gantt.ext.zoom.setLevel(value);
    };

    gantt.config.lightbox.sections = [
        { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
        { name: "cost", height: 22, map_to: "cost", type: "textarea" },
        { name: "time", type: "duration", map_to: "auto" },
        // Добавить новые секции для новых данных
    ];

    useEffect(() => {
        try {
            gantt.init(container.current);
            gantt.parse(tasks);
            setZoom(zoom);
        } catch (error) {
            console.error("Failed to initialize Gantt chart: ", error);
        }
    }, [zoom, tasks]);
    // Add tasks to dependency array if tasks data can change over time

    return <div ref={container} style={{ width: "100%", height: "500px" }}></div>;  // Ensure a minimum height is set

}