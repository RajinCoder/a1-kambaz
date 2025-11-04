import { useState, type MouseEvent } from "react";
export default function EventObject() {
  type EventPreview = { type: string; timeStamp: number; target: string };
  const [event, setEvent] = useState<EventPreview | null>(null);
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const target = (e.currentTarget as HTMLButtonElement).outerHTML;
    setEvent({ type: e.type, timeStamp: e.timeStamp, target });
  };
  return (
    <div>
      <h2>Event Object</h2>
      <button
        onClick={(e) => handleClick(e)}
        className="btn btn-primary"
        id="wd-display-event-obj-click"
      >
        Display Event Object
      </button>
      <pre>{JSON.stringify(event, null, 2)}</pre>
      <hr />
    </div>
  );
}
