import Gantt from "./components/Gantt/Gantt";
import { getData } from "./data.js";
import Toolbar from './components/Toolbar/Toolbar';
import "./styles.css";
import { useState } from "react";

function App() {
  const [currentZoom, setZoom] = useState("Days");


  function logDataUpdate(type, action, item, id) {
    let text = item && item.text ? ` (${item.text})` : '';
    let message = `${type} ${action}: ${id} ${text} `;
    if (type === 'link' && action !== 'delete') {
      message += ` ( source: ${item.source}, target: ${item.target} )`;
    }
  }

  return (
    <div>
      <div className="zoom-bar">
        <Toolbar
          zoom={currentZoom}
          setZoom={setZoom}
        />
      </div>
      <div className="gantt-container">
        <Gantt
          tasks={getData()}
          zoom={currentZoom}
          onDataUpdated={logDataUpdate}
        />
      </div>
    </div>
  );
}

export default App;