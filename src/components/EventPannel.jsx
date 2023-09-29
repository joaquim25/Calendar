import styled from "@emotion/styled";
import { useState } from "react";
import { TbCalendarPlus } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";

const EventContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 447px;
  background-color: rgb(240, 240, 240);
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  padding: 0.4rem 1rem 0 1rem;

  & h1 {
    font-size: 1.3rem;
    font-weight: 500;
    width: 100%;
    text-align: center;
    color: rgb(139, 120, 233);
  }
`;

const SubmitEventContainer = styled.div`
  position: relative;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;

  & input {
    box-sizing: border-box;
    width: 250px;
    height: 35px;
    outline: none;
    background-color: transparent;
    border: none;
    border-bottom: 2px solid rgb(41, 118, 220);
    padding: 10px 35px 0 15px;
  }

  & svg {
    position: absolute;
    right: -10px;
    top: 0;
    cursor: pointer;
    color: rgb(41, 118, 195);
    stroke-width: 1.2;
    width: 25px;
    height: 25px;
    padding: 5px 12px 5px 7px;
    transition: all 0.2s;

    :hover {
      color: rgb(35, 85, 192);
      transform: scale(1.05);
    }
  }
`;

const NoEventsParagraph = styled.p`
  text-align: center;
  margin-top: 100px;
`;

const EventList = styled.ul`
  border-top: 1px solid lightgrey;
  padding: 16px 0 0 0;
  margin: 10px -16px 0 -16px;
  overflow-y: scroll;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    margin-top: 16px;
    background: none;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgba(119, 168, 233, 0.6);
    border-radius: 6px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(119, 168, 233, 0.9);
  }
  /* no events paragraph*/

  & li {
    cursor: pointer;
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: rgba(119, 168, 233, 0.3);
    color: rgba(0, 0, 0, 0.8);
    font-size: 0.8rem;
    padding: 8px 0 8px 20px;
    margin-bottom: 10px;
    margin-right: 10px;
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
      font-size: 1rem;
      font-weight: 600;
      color: black;
      padding-right: 10px;
    }

    & button {
      cursor: pointer;
      position: absolute;
      right: 10px;
      top: calc(50% - 16px);
      width: 30px;
      height: 30px;
      background: transparent;
      border: none;

      :hover {
        color: red;
      }

      & svg {
        position: relative;
        top: 3px;
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const EventPannel = ({ startDate, endDate, clearDays, showEvent }) => {
  const [name, setName] = useState("");
  const [eventList, setEventList] = useState([]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    const inputValue =
      startDate && endDate
        ? `Start date: ${startDate.format(
            "DD-MMM-YY"
          )}, End date: ${endDate.format("DD-MMM-YY")}`
        : startDate
        ? `${startDate.format("DD-MMM-YY")}`
        : null;

    if (inputValue !== null && name !== "") {
      //check if name already exists in eventList
      const nameExists = eventList.some((event) => event.key === name);

      if (!nameExists) {
        // If not, add the event to the list
        setEventList([
          ...eventList,
          {
            key: name,
            value: {
              name: name,
              date: inputValue,
            },
            start: `${startDate.format("DD-MMMM-YYYY")}`,
            end: `${endDate.format("DD-MMMM-YYYY")}`,
          },
        ]);
        setName("");
        clearDays();
      } else {
        // TO-DO: If the name already exists, show an error message
        console.log("Event with the same name already exists.");
      }
    } else {
      // TO-DO: show an error to alert the user that no dates are entered
      console.log("No dates entered.");
    }
  };

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
    <EventContainer>
      <h1>Agenda</h1>
      <SubmitEventContainer>
        <input
          placeholder="Enter event name..."
          value={name}
          onChange={handleNameChange}
        />
        <TbCalendarPlus onClick={handleSubmit} />
      </SubmitEventContainer>
      <EventList>
        {eventList.length ? (
          eventList.map((event) => (
            <li>
              <p
                key={event.key}
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
      </EventList>
    </EventContainer>
  );
};

export default EventPannel;
