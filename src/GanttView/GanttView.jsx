import Gantt from "../components/Gantt/Gantt";
import "./GanttView.css";
import { useState } from "react";
import Toolbar from "./../components/Toolbar/Toolbar";
import { getData } from "../data";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import SideNav from "../components/SideNav/SideNav";

function GanttView() {
	const [currentZoom, setZoom] = useState("Days");

	return (
		<div>
			<NavigationBar />
			<div className="gantt-view">
				<div className="zoom-bar">
					<Toolbar zoom={currentZoom} setZoom={setZoom} />
				</div>
				<div className="gantt-container">
					<Gantt tasks={getData()} zoom={currentZoom} />
				</div>
			</div>
			<SideNav />
		</div>
	);
}

export default GanttView;
