import { memo, useRef } from "react";

function EventCard({
  event,
  registerRender,
}) {
  // Count actual function/component executions
  const renderCount = useRef(0);

  renderCount.current += 1;

  // Report the render
  registerRender(event.id);

  const handleDragStart = (e) => {
    e.dataTransfer.setData(
      "eventId",
      String(event.id)
    );
  };

  return (
    <div
      className={`event-card ${event.type}`}
      draggable
      onDragStart={handleDragStart}
    >
      <div className="event-time">
        {event.time}
      </div>

      <div className="event-title">
        {event.title}
      </div>
    </div>
  );
}

const MemoizedEventCard = memo(EventCard);

function EventCardWrapper({
  event,
  optimized,
  registerRender,
}) {
  if (optimized) {
    return (
      <MemoizedEventCard
        event={event}
        registerRender={registerRender}
      />
    );
  }

  return (
    <EventCard
      event={event}
      registerRender={registerRender}
    />
  );
}

export default EventCardWrapper;