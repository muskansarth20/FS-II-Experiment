function RenderMonitor({
  events,
  renderCounts,
  totalRenders,
  optimized,
  optimizationScore,
}) {
  return (
    <aside className="monitor">

      <div className="monitor-header">
        <div>
          <h2>RENDER MONITOR</h2>
          <p>
            Performance tracking
          </p>
        </div>

        <div
          className={`monitor-mode ${
            optimized ? "optimized" : "normal"
          }`}
        >
          {optimized ? "OPTIMIZED" : "NORMAL"}
        </div>
      </div>

      {/* Main statistics */}

      <div className="monitor-stats">

        <div>
          <strong>{totalRenders}</strong>
          <span>total renders logged</span>
        </div>

        <div>
          <strong>
            {Object.keys(renderCounts).length}/{events.length}
          </strong>

          <span>
            cards that have rendered
          </span>
        </div>

      </div>

      {/* Optimization Score */}

      <div className="score-panel">
        <div className="score-header">
          <span>OPTIMIZATION SCORE</span>

          <strong>
            {optimizationScore}%
          </strong>
        </div>

        <div className="score-bar">
          <div
            className="score-fill"
            style={{
              width: `${optimizationScore}%`,
            }}
          />
        </div>
      </div>

      {/* Individual Cards */}

      <div className="render-list">

        {events.map((event) => {

          const count =
            renderCounts[event.id] || 0;

          const percentage = Math.min(
            count * 15,
            100
          );

          return (
            <div
              className="render-row"
              key={event.id}
            >
              <span className="render-name">
                {event.title}
              </span>

              <div className="render-progress">
                <div
                  className="render-progress-fill"
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>

              <span className="render-count">
                {count}
              </span>
            </div>
          );
        })}

      </div>

      {/* Explanation */}

      <div className="monitor-tip">
        <strong>
          {optimized
            ? "Optimization is active"
            : "Optimization is disabled"}
        </strong>

        <p>
          {optimized
            ? "Memoized cards avoid unnecessary renders when unrelated state changes."
            : "Every parent update can cause child cards to render again."}
        </p>
      </div>

    </aside>
  );
}

export default RenderMonitor;