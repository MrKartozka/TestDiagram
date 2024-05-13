import React, { useState, useEffect } from "react";
import Gantt from "../components/Gantt/Gantt";
import { getData } from "../data";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import SideNav from "../components/SideNav/SideNav";
import Toolbar from "./../components/Toolbar/Toolbar";
import "./GanttView.css";
import TableGantt from "../TableGantt/TableGantt";

function GanttView() {
	const [currentView, setCurrentView] = useState("Gantt");
	const [currentZoom, setZoom] = useState("Days");
	const [data, setData] = useState(getData());

	// Обработчик переключения вида
	const handleViewChange = (view) => {
		setCurrentView(view);
	};

	// Обновление данных при переключении представлений
	useEffect(() => {
		setData(getData());
	}, [currentView]);

	return (
		<div>
			<NavigationBar />
			<div className="gantt-view">
				<div className="zoom-bar">
					<Toolbar zoom={currentZoom} setZoom={setZoom} />
					<button onClick={() => handleViewChange("Gantt")}>
						Гант
					</button>
					<button onClick={() => handleViewChange("Table")}>
						Таблица
					</button>
				</div>
				<div className="gantt-container">
					{currentView === "Gantt" ? (
						<Gantt
							tasks={data}
							zoom={currentZoom}
							key={`gantt-view-${currentView}`}
						/>
					) : (
						<TableGantt
							data={data}
							key={`table-view-${currentView}`}
						/>
					)}
				</div>
			</div>
			<SideNav />
		</div>
	);
}

export default GanttView;
