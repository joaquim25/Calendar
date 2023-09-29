import styled from "@emotion/styled";
import { AiOutlineDelete } from "react-icons/ai";

const NoEventsParagraph = styled.p`
  text-align: center;
  margin-top: 100px;
`;

const EventListContainer = styled.ul`
  border-top: 1px solid lightgrey;
  margin: 10px -16px 0 -16px;
  padding: 16px 0 0 0;
  overflow-y: scroll;
  overflow-x: hidden;

  /* ---------- Custom scrollbar ---------- */
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    margin-top: 16px;
    background: none;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(119, 168, 233, 0.6);
    border-radius: 6px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(119, 168, 233, 0.9);
  }
  /* -------- End custom scrollbar -------- */

  & li {
    cursor: pointer;
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: rgba(119, 168, 233, 0.3);
    color: rgba(0, 0, 0, 0.8);
    font-size: 0.8rem;
    padding: 8px 0 8px 20px;
    margin: 0 10px 10px 0;
    border-radius: 0 20px 20px 0;
    transition: all 0.2s;

    :hover {
      transform: scale(1.01);
      background-color: rgba(119, 168, 233, 0.5);
    }

    & p {
      margin: 0;
    }

    & span {
      display: block;
      color: black;
      font-size: 1rem;
      font-weight: 600;
    }

    & button {
      cursor: pointer;
      position: absolute;
      right: 10px;
      top: 15px;
      width: 30px;
      height: 30px;
      background: transparent;
      border: none;

      :hover {
        color: red;
      }

      & svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const EventList = ({ eventList, setEventList, showEvent, clearDays }) => {
  const handleEventClick = (e) => {
    const startDate = e.currentTarget.getAttribute("data-start");
    const endDate = e.currentTarget.getAttribute("data-end");
    showEvent(startDate, endDate);
  };

  const handleDeleteEvent = (e) => {
    const eventName = e.currentTarget.getAttribute("data-target");
    const updatedEventList = eventList.filter(
      (event) => event.key !== eventName
    );

    setEventList(updatedEventList);
    clearDays();
  };

  return (
    <EventListContainer>
      {eventList.length ? (
        eventList.map((event) => (
          <li key={event.key}>
            <p
              data-start={event.start}
              data-end={event.end}
              data-key={event.key}
              onClick={handleEventClick}
            >
              <span>{event.value.name}</span>
              {event.value.date}
            </p>
            <button data-target={event.key} onClick={handleDeleteEvent}>
              <AiOutlineDelete />
            </button>
          </li>
        ))
      ) : (
        <NoEventsParagraph>You have no events scheduled.</NoEventsParagraph>
      )}
    </EventListContainer>
  );
};

export default EventList;
