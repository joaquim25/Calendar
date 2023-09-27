import styled from "@emotion/styled";
import { useState } from "react";
import { TbCalendarPlus } from "react-icons/tb";

const EventContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 500px;
  background-color: rgb(240, 240, 240);
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  padding: 0.4rem 1rem;

  & h1 {
    font-size: 1.3rem;
    font-weight: 500;
    width: 100%;
    text-align: center;
    color: rgb(139, 120, 233);
  }
`;

const SubmitEventContainer = styled.div`
  display: flex;
  gap: 10px;
  & input {
    flex-grow: 1;
  }

  & svg {
    cursor: pointer;
    color: rgb(139, 120, 233);
    stroke-width: 0.8;
    width: 30px;
    height: 30px;
  }
`;

const EventList = styled.ul`
  & li {
    color: black;
  }
`;

const EventPannel = ({ startDate, endDate }) => {
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
            value: `${name}: ${inputValue}`,
            start: startDate,
          },
        ]);
        setName("");
      } else {
        // TO-DO: If the name already exists, show an error message
        console.log("Event with the same name already exists.");
      }
    } else {
      // TO-DO: show an error to alert the user that no dates are entered
      console.log("No dates entered.");
    }
  };

  return (
    <EventContainer>
      <h1>Scheduled Events</h1>
      <SubmitEventContainer>
        <input
          placeholder="Enter Event Name"
          value={name}
          onChange={handleNameChange}
        />
        <TbCalendarPlus onClick={handleSubmit} />
      </SubmitEventContainer>
      <EventList>
        {eventList.map((event) => (
          <li key={event.key}>{event.value}</li>
        ))}
      </EventList>
    </EventContainer>
  );
};

export default EventPannel;
