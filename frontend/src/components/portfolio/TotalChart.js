import React from "react";

import TotalChartDiagramm from "./TotalChartDiagramm";

function TotalChart({
  user,
  marketCharts,
  toggleView,
  origin,
  loaded,
  duration,
}) {
  // const setDurationState = (val) => {
  //   setDuration(val);
  // };

  console.log("marketCharts @TotalCharts.js");
  console.log(marketCharts);

  return !loaded ? (
    <div>Loading ...</div>
  ) : (
    <div id="total_chart_container">
      <div id="toggle_view" onClick={toggleView}>
        go back
      </div>
      {/* <div id="durations_container">
        <div
          id={duration === "day" && "duration"}
          className="durations"
          onClick={() => setDurationState("day")}
        >
          day
        </div>
        <div
          id={duration === "week" && "duration"}
          className="durations"
          onClick={() => setDurationState("week")}
        >
          week
        </div>
        <div
          id={duration === "month" && "duration"}
          className="durations"
          onClick={() => setDurationState("month")}
        >
          month
        </div>
        <div
          id={duration === "all_total" && "duration"}
          className="durations"
          onClick={() => setDurationState("all_total")}
        >
          all
        </div>
      </div> */}
      <div>
        <TotalChartDiagramm
          marketCharts={marketCharts}
          positions={user.positions}
          fiat={user.positions[0].fiat_currency}
          origin={origin}
          duration={duration}
        />
      </div>
    </div>
  );
}

export default TotalChart;
