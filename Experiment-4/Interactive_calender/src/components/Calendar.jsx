import EventCard from "./EventCard";

const days = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

function DayColumn({
  day,
  events,
  optimized,
  onDrop,
  registerRender,
}) {
  const dayEvents = events.filter(
    (event) => event.day === day
  );

  return (
    <div
      className="day-column"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const eventId = Number(
          e.dataTransfer.getData("eventId")
        );

        if (eventId) {
          onDrop(eventId, day);
        }
      }}
    >
      <div className="day-header">
        {day}
      </div>

      <div className="day-events">
        {dayEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            optimized={optimized}
            registerRender={registerRender}
          />
        ))}
      </div>
    </div>
  );
}

function Calendar({
  events,
  optimized,
  onDrop,
  registerRender,
}) {
  return (
    <div className="calendar">
      {days.map((day) => (
        <DayColumn
          key={day}
          day={day}
          events={events}
          optimized={optimized}
          onDrop={onDrop}
          registerRender={registerRender}
        />
      ))}
    </div>
  );
}

export default Calendar;