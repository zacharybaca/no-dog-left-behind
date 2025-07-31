import { useWidgetOptions } from '../../hooks/useWidgetOptions'
import './date-widget.css'

const DateWidget = () => {
  const { currentDate, currentTime, dayGreeting, isExpanded, showCalendar, MOCK_EVENTS, toggleCalendarOptions, toggleDateOptions } = useWidgetOptions()


  return (
    <div className="date-widget-container">
      <div className="date-widget-top">
        <button onClick={toggleDateOptions} className="date-widget-toggle">
          {isExpanded ? '–' : '+'}
        </button>
        <button onClick={toggleCalendarOptions} className="date-widget-calendar-btn" title="Show Calendar">
          📅
        </button>
      </div>

      {isExpanded ? (
        <div className="date-info-container">
          <div className="date-widget-greeting">{dayGreeting}</div>
          <div className="date-widget-date">{currentDate}</div>
          <div className="date-widget-time">{currentTime}</div>
        </div>
      ) : ""}

      {showCalendar ? (
        <div className="date-widget-calendar">
          <h4>Upcoming Events</h4>
          <ul>
            {MOCK_EVENTS.map((event) => (
              <li key={event.date}>
                <strong>{new Date(event.date).toLocaleDateString()}</strong> — {event.title}
              </li>
            ))}
          </ul>
        </div>
      ) : ""}
    </div>
  )
}

export default DateWidget
