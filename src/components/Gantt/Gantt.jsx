import React, { useEffect, useRef } from "react";
import { gantt } from "dhtmlx-gantt";

import "dhtmlx-gantt/codebase/dhtmlxgantt.css";

export default function Gantt({ tasks, zoom }) {
	gantt.config.lightbox_additional_height = 150;
	gantt.templates.lightbox_header = function () {
		let headerStyle = "text-align:center; cursor:default;";
		return "<div style='" + headerStyle + "'>Информация</div>";
	};

	// Общие + ордер
	gantt.locale.labels.section_startDate = "Start date";
	gantt.locale.labels.section_endDate = "End date";
	gantt.locale.labels.section_nomenclature = "Номенклатура";
	gantt.locale.labels.section_product = "Изделие";
	gantt.locale.labels.section_quantity = "Количество";
	gantt.locale.labels.section_laborIntensity = "Трудоем.,н/час";
	gantt.locale.labels.section_customer = "Заказчик";
	gantt.locale.labels.section_productivity = "Выполнено, %";
	gantt.locale.labels.section_cost = "Стоимость, руб";
	gantt.locale.labels.section_priority = "Приоритет";
	gantt.locale.labels.section_planDate = "Дата (план)";
	gantt.locale.labels.section_actualDate = "Дата (факт)";
	gantt.locale.labels.section_deviation = "Отклонение, ч";
	gantt.locale.labels.section_blank = "Заготовка";

	// Операция
	gantt.locale.labels.section_number = "Номер";
	gantt.locale.labels.section_name = "Наименование";
	gantt.locale.labels.section_codeOperation = "Код операции";
	gantt.locale.labels.section_gild = "Цех";
	gantt.locale.labels.section_technicalProcess = "Техпроцесс";
	gantt.locale.labels.section_outfit = "Наряд/заказ";

	// Ресурс
	gantt.locale.labels.section_text = "Обозначение";
	gantt.locale.labels.section_description = "Наименование";
	gantt.locale.labels.section_typical = "Тип";
	gantt.locale.labels.section_system = "Система ЧПУ";
	gantt.locale.labels.section_nowstatus = "Текущий статус";
	gantt.locale.labels.section_uin = "УИН";

	// Работник
	gantt.locale.labels.section_surname = "Фамилия";
	gantt.locale.labels.section_secSurname = "Отчество";
	gantt.locale.labels.section_profession = "Профессия";
	gantt.locale.labels.section_rank = "Разряд";
	gantt.locale.labels.section_currentStatus = "Текущий статус";


	gantt.config.buttons_left = []; // Удалите кнопки с левой стороны
	gantt.config.buttons_right = ["gantt_cancel_btn"]; // Добавляет стандартную кнопку закрытия справа

	gantt.config.columns = [
		{ name: "text", label: "Task name", tree: true, width: "*" },
		{ name: "start_date", label: "Start time", align: "center" },
		{ name: "duration", label: "Duration", align: "center" },
		// Removes the '+' button by not including the 'add' column.
	];
	gantt.attachEvent('onBeforeLightbox', function (task_id) {
		const task = gantt.getTask(task_id);
		switch (task.taskType) {
			case 'order':
				gantt.config.lightbox.sections = [
					{ name: "nomenclature", height: 21, map_to: "nomenclature", type: "textarea" },
					{ name: "product", height: 21, map_to: "product", type: "textarea" },
					{ name: "quantity", height: 21, map_to: "quantity", type: "textarea" },
					{ name: "laborIntensity", height: 21, map_to: "laborIntensity", type: "textarea" },
					{ name: "customer", height: 21, map_to: "customer", type: "textarea" },
					{ name: "productivity", height: 21, map_to: "productivity", type: "textarea" },
					{ name: "cost", height: 21, map_to: "cost", type: "textarea" },
					{ name: "priority", height: 21, map_to: "priority", type: "textarea" },
					{ name: "planDate", height: 21, map_to: "plan_date", type: "textarea" },
					{ name: "actualDate", height: 21, map_to: "actual_date", type: "textarea" },
					{ name: "deviation", height: 21, map_to: "deviation", type: "textarea" },
					{ name: "blank", height: 21, map_to: "blank", type: "textarea", readonly: true },
				];
				break;
			case 'operation':
				gantt.config.lightbox.sections = [
					{ name: "number", height: 21, map_to: "number", type: "textarea" },
					{ name: "name", height: 21, map_to: "name", type: "textarea" },
					{ name: "codeOperation", height: 30, map_to: "codeOperation", type: "textarea", },
					{ name: "laborIntensity", height: 21, map_to: "laborIntensity", type: "textarea" },
					{ name: "gild", height: 21, map_to: "gild", type: "textarea" },
					{ name: "technicalProcess", height: 21, map_to: "technicalProcess", type: "textarea" },
					{ name: "cost", height: 21, map_to: "cost", type: "textarea" },
					{ name: "quantity", height: 21, map_to: "quantity", type: "textarea" },
					{ name: "planDate", height: 21, map_to: "plan_date", type: "textarea" },
					{ name: "actualDate", height: 21, map_to: "actual_date", type: "textarea" },
					{ name: "deviation", height: 21, map_to: "deviation", type: "textarea" },
					{ name: "outfit", height: 21, map_to: "outfit", type: "textarea" },


				];
				break;
			case 'resources':
				gantt.config.lightbox.sections = [
					{ name: "text", height: 21, map_to: "text", type: "textarea" },
					{ name: "description", height: 21, map_to: "description", type: "textarea" },
					{ name: "typical", height: 21, map_to: "typical", type: "textarea" },
					{ name: "gild", height: 21, map_to: "gild", type: "textarea" },
					{ name: "system", height: 21, map_to: "system", type: "textarea" },
					{ name: "nowstatus", height: 21, map_to: "nowstatus", type: "textarea" },
					{ name: "uin", height: 21, map_to: "uin", type: "textarea" },
				];
				break;
			case 'worker':
				gantt.config.lightbox.sections = [
					{ name: "surname", height: 21, map_to: "surname", type: "textarea" },
					{ name: "name", height: 21, map_to: "name", type: "textarea" },
					{ name: "secSurname", height: 21, map_to: "secSurname", type: "textarea" },
					{ name: "profession", height: 21, map_to: "profession", type: "textarea" },
					{ name: "rank", height: 21, map_to: "rank", type: "textarea" },
					{ name: "gild", height: 21, map_to: "gild", type: "textarea" },
					{ name: "uin", height: 21, map_to: "uin", type: "textarea" },
					{ name: "currentStatus", height: 21, map_to: "current_status", type: "textarea" },

				];
				break;
			default:
				gantt.config.lightbox.sections = [
					{ name: "description", height: 38, map_to: "description", type: "textarea", focus: true },
					{
						name: "startDate",
						height: 30,
						type: "duration",
						time_format: ["%d", "%m", "%Y"],
						map_to: "start_date",
						single_date: true,
						readonly: true,
					},
					{
						name: "endDate",
						height: 30,
						type: "duration",
						time_format: ["%d", "%m", "%Y"],
						map_to: "end_date",
						single_date: true,
						readonly: true,
					},
				];
		}
		gantt.resetLightbox();
		return true; // Возвращаем true, чтобы lightbox открылся
	})
	const container = useRef(null);

	const initZoom = () => {
		gantt.ext.zoom.init({
			levels: [
				{
					name: "Hours",
					scale_height: 60,
					min_column_width: 30,
					scales: [
						{ unit: "day", step: 1, format: "%d %M" },
						{ unit: "hour", step: 1, format: "%H" },
					],
				},
				{
					name: "Days",
					scale_height: 60,
					min_column_width: 70,
					scales: [
						{ unit: "week", step: 1, format: "Week #%W" },
						{ unit: "day", step: 1, format: "%d %M" },
					],
				},
				{
					name: "Months",
					scale_height: 60,
					min_column_width: 70,
					scales: [
						{ unit: "month", step: 1, format: "%F" },
						{ unit: "week", step: 1, format: "#%W" },
					],
				},
			],
		});
	};

	const setZoom = (value) => {
		if (!gantt.ext.zoom.getLevels()) {
			initZoom();
		}
		gantt.ext.zoom.setLevel(value);
	};

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

	return (
		<div ref={container} style={{ width: "100%", height: "500px" }}></div>
	); // Ensure a minimum height is set
}
