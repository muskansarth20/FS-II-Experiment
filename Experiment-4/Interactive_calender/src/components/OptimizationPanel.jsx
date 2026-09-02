function Switch({ checked, onChange }) {
  return (
    <button
      type="button"
      className={`toggle ${
        checked ? "active" : ""
      }`}
      onClick={() => onChange(!checked)}
    >
      <span className="toggle-circle"></span>
    </button>
  );
}

function OptimizationPanel({
  optimized,
  setOptimized,
  liveClock,
  setLiveClock,
  resetCounters,
  componentRenders,
  functionCalls,
  optimizationScore,
}) {
  return (
    <section className="control-panel">

      <div className="control-grid">

        {/* React.memo */}

        <div className="control-item">

          <Switch
            checked={optimized}
            onChange={setOptimized}
          />

          <div>
            <h3>
              React.memo on cards
            </h3>

            <p>
              Prevents unnecessary re-renders
              of unchanged event cards.
            </p>
          </div>

        </div>

        {/* useCallback */}

        <div className="control-item">

          <Switch
            checked={optimized}
            onChange={setOptimized}
          />

          <div>
            <h3>
              useCallback for handlers
            </h3>

            <p>
              Keeps drag-and-drop handlers
              referentially stable.
            </p>
          </div>

        </div>

        {/* useMemo */}

        <div className="control-item">

          <Switch
            checked={optimized}
            onChange={setOptimized}
          />

          <div>
            <h3>
              useMemo for agenda filter
            </h3>

            <p>
              Avoids unnecessary event-filter
              calculations.
            </p>
          </div>

        </div>

      </div>

      {/* ==================================== */}
      {/* LIVE CLOCK */}
      {/* ==================================== */}

      <div className="control-bottom">

        <div className="control-item">

          <Switch
            checked={liveClock}
            onChange={setLiveClock}
          />

          <div>
            <h3>
              Live clock
            </h3>

            <p>
              Updates every 450ms to create
              unrelated application renders.
            </p>
          </div>

        </div>

        <button
          type="button"
          className="reset-button"
          onClick={resetCounters}
        >
          Reset counters
        </button>

      </div>

      {/* ==================================== */}
      {/* STATISTICS */}
      {/* ==================================== */}

      <div className="optimization-stats">

        <div className="stat-box">

          <span>
            COMPONENT RENDERS
          </span>

          <strong>
            {componentRenders}
          </strong>

        </div>

        <div className="stat-box">

          <span>
            FUNCTION CALLS
          </span>

          <strong>
            {functionCalls}
          </strong>

        </div>

        <div className="stat-box">

          <span>
            OPTIMAL SCORE
          </span>

          <strong className="score">
            {optimizationScore}%
          </strong>

        </div>

        <div className="mode-box">

          <span>
            CURRENT MODE
          </span>

          <strong
            className={
              optimized
                ? "optimized"
                : "normal"
            }
          >
            {optimized
              ? "OPTIMIZED"
              : "NON-OPTIMIZED"}
          </strong>

        </div>

      </div>

    </section>
  );
}

export default OptimizationPanel;