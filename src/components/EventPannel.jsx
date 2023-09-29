import styled from "@emotion/styled";
import { useState } from "react";
import { TbCalendarPlus } from "react-icons/tb";
import EventList from "./EventList";

const EventContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 447px;
  padding: 0.4rem 1rem 0 1rem;
  border-radius: 5px;
  background-color: rgb(240, 240, 240);
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.4);

  & h1 {
    font-size: 1.3rem;
    font-weight: 500;
    color: rgb(139, 120, 233);
    text-align: center;
    user-select: none;
  }
`;

const SubmitEventContainer = styled.div`
  position: relative;
  margin: 0 auto;

  & input {
    box-sizing: border-box;
    width: 250px;
    height: 35px;
    padding: 10px 35px 0 15px;
    outline: none;
    border: none;
    background-color: transparent;
    border-bottom: 2px solid rgb(41, 118, 220);
  }

  & svg {
    cursor: pointer;
    position: absolute;
    right: -10px;
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

const ErrorContainer = styled.div`
  box-sizing: border-box;
  position: absolute;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.7);
  color: red;
  font-size: 0.7rem;
  text-align: center;
  width: 250px;
  padding: 0.2rem 1rem;
  border-radius: 0 0 20px 20px;
  transition: all 0.2s ease-in-out;
`;

const EventPannel = ({ startDate, endDate, clearDays, showEvent }) => {
  const [name, setName] = useState("");
  const [eventList, setEventList] = useState([]);
  const [error, setError] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    const inputValue =
      startDate && endDate
        ? `Start date: ${startDate.format(
            "DD-MMM-YY"
          )}, End date: ${endDate.format("DD-MMM-YY")}`
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
            start: startDate.format("DD-MMM-YY"),
            end: endDate.format("DD-MMM-YY"),
          },
        ]);
        setName("");
        clearDays();
      } else {
        setError("An event with the same name already exists.");

        setTimeout(() => {
          setError("");
        }, 2000);
      }
    } else if (inputValue === null) {
      setError("No dates entered.");

      setTimeout(() => {
        setError("");
      }, 2000);
    } else {
      setError("No event name entered.");

      setTimeout(() => {
        setError("");
      }, 2000);
    }
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
        {error && <ErrorContainer>{error}</ErrorContainer>}
      </SubmitEventContainer>
      <EventList
        clearDays={clearDays}
        eventList={eventList}
        setEventList={setEventList}
        showEvent={showEvent}
      />
    </EventContainer>
  );
};

export default EventPannel;
