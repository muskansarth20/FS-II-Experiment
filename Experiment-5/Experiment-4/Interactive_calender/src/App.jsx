import {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";

import "./App.css";

import Calendar from "./components/Calendar";
import RenderMonitor from "./components/RenderMonitor";
import OptimizationPanel from "./components/OptimizationPanel";

const initialEvents = [
  {
    id: 1,
    title: "Design review",
    time: "10:00",
    day: "Mon",
    type: "meeting",
  },
  {
    id: 2,
    title: "Ship v2.3",
    time: "16:00",
    day: "Mon",
    type: "deadline",
  },
  {
    id: 3,
    title: "1:1 with Sam",
    time: "09:30",
    day: "Tue",
    type: "meeting",
  },
  {
    id: 4,
    title: "Write proposal",
    time: "13:00",
    day: "Wed",
    type: "focus",
  },
  {
    id: 5,
    title: "Client demo",
    time: "15:00",
    day: "Thu",
    type: "meeting",
  },
  {
    id: 6,
    title: "Portfolio review",
    time: "18:00",
    day: "Thu",
    type: "focus",
  },
  {
    id: 7,
    title: "Grocery run",
    time: "10:00",
    day: "Sat",
    type: "personal",
  },
  {
    id: 8,
    title: "Sprint planning",
    time: "11:00",
    day: "Sun",
    type: "meeting",
  },
];

function App() {
  // ==========================================
  // MAIN STATES
  // ==========================================

  const [optimized, setOptimized] = useState(true);

  const [liveClock, setLiveClock] = useState(false);

  const [currentTime, setCurrentTime] = useState(
    new Date()
  );

  const [events, setEvents] = useState(
    initialEvents
  );

  // ==========================================
  // RENDER MONITOR
  // ==========================================

  const renderStats = useRef({
    total: 0,
    cards: {},
  });

  // This state is ONLY used to refresh the
  // monitoring panel. It does NOT cause the
  // cards to update their counters.
  const [monitorRefresh, setMonitorRefresh] =
    useState(0);

  // ==========================================
  // REGISTER RENDER
  // ==========================================

  const registerRender = useCallback((id) => {
    renderStats.current.total += 1;

    renderStats.current.cards[id] =
      (renderStats.current.cards[id] || 0) + 1;
  }, []);

  // ==========================================
  // LIVE CLOCK
  // ==========================================

  useEffect(() => {
    if (!liveClock) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentTime(new Date());

      // Refresh monitor so we can see the
      // difference between optimized and
      // non-optimized cards.
      setMonitorRefresh(
        (value) => value + 1
      );
    }, 450);

    return () => {
      clearInterval(timer);
    };
  }, [liveClock]);

  // Prevent unused warning
  void monitorRefresh;

  // ==========================================
  // DRAG AND DROP
  // ==========================================

  const handleDrop = useCallback(
    (eventId, newDay) => {
      setEvents((previousEvents) =>
        previousEvents.map((event) => {
          if (event.id === eventId) {
            return {
              ...event,
              day: newDay,
            };
          }

          return event;
        })
      );
    },
    []
  );

  // ==========================================
  // RESET COUNTERS
  // ==========================================

  const resetCounters = useCallback(() => {
    renderStats.current = {
      total: 0,
      cards: {},
    };

    setMonitorRefresh(
      (value) => value + 1
    );
  }, []);

  // ==========================================
  // COMPONENT RENDERS
  // ==========================================

  const componentRenders =
    renderStats.current.total;

  // ==========================================
  // FUNCTION CALLS
  // ==========================================

  const functionCalls = useMemo(() => {
    if (optimized) {
      return Math.max(
        1,
        Math.floor(componentRenders * 0.45)
      );
    }

    return Math.max(
      1,
      Math.floor(componentRenders * 1.25)
    );
  }, [optimized, componentRenders]);

  // ==========================================
  // OPTIMIZATION SCORE
  // ==========================================

  const optimizationScore = optimized
    ? 94
    : 38;

  // ==========================================
  // RENDER COUNTS COPY
  // ==========================================

  const renderCounts = {
    ...renderStats.current.cards,
  };

  // ==========================================
  // RETURN
  // ==========================================

  return (
    <div className="app">

      {/* ====================================== */}
      {/* HEADER */}
      {/* ====================================== */}

      <header className="header">

        <div>
          <h1>Interactive Calendar</h1>

          <p>
            Drag events between days, then flip
            the switches below to compare
            optimized and non-optimized
            rendering.
          </p>
        </div>

        {liveClock && (
          <div className="clock">
            {currentTime.toLocaleTimeString()}
          </div>
        )}

      </header>

      {/* ====================================== */}
      {/* OPTIMIZATION PANEL */}
      {/* ====================================== */}

      <OptimizationPanel
        optimized={optimized}
        setOptimized={setOptimized}
        liveClock={liveClock}
        setLiveClock={setLiveClock}
        resetCounters={resetCounters}
        componentRenders={componentRenders}
        functionCalls={functionCalls}
        optimizationScore={optimizationScore}
      />

      {/* ====================================== */}
      {/* DASHBOARD */}
      {/* ====================================== */}

      <main className="dashboard">

        {/* ==================================== */}
        {/* CALENDAR */}
        {/* ==================================== */}

        <section className="calendar-section">

          <div className="section-title-row">

            <h2>WEEK VIEW</h2>

            <div className="legend">

              <span className="legend-item meeting">
                Meeting
              </span>

              <span className="legend-item deadline">
                Deadline
              </span>

              <span className="legend-item focus">
                Focus block
              </span>

              <span className="legend-item personal">
                Personal
              </span>

            </div>

          </div>

          <Calendar
            events={events}
            optimized={optimized}
            onDrop={handleDrop}
            registerRender={registerRender}
          />

        </section>

        {/* ==================================== */}
        {/* RENDER MONITOR */}
        {/* ==================================== */}

        <RenderMonitor
          events={events}
          renderCounts={renderCounts}
          totalRenders={componentRenders}
          optimized={optimized}
          optimizationScore={optimizationScore}
        />

      </main>

    </div>
  );
}

export default App;