import styled from 'styled-components';

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(5, 1fr);
    border-top: 1px solid #eee;
`;

const DayCell = styled.div`
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;

    &:nth-child(7n) {
        border-right: none;
    }

    ${props => props.$isToday && `
        background-color: #007bff;
        color: white;
    `}
    ${props => props.$isSelected && `
        background-color: #000;
        color: white;
    `}
    ${props => props.$isOtherMonth && `
        color: #ccc;
    `}
    &:hover {
        background-color: ${props => !props.isSelected && '#f0f0f0'};
    }
`;


const DaysGrid = ({ days, selectedDate, onDateClick }) => {
  return (
    <GridContainer>
      {days.map(dateObj => (
        <DayCell
          key={dateObj.date.getTime()}
          $isOtherMonth={dateObj.isOtherMonth}
          $isSelected={
            selectedDate.getDate() === dateObj.day &&
            selectedDate.getMonth() === dateObj.date.getMonth() &&
            selectedDate.getFullYear() === dateObj.date.getFullYear()
          }
          $isToday={
            new Date().getDate() === dateObj.day &&
            new Date().getMonth() === dateObj.date.getMonth() &&
            new Date().getFullYear() === dateObj.date.getFullYear()
          }
          onClick={() => onDateClick(dateObj)}
        >
          {dateObj.day}
        </DayCell>
      ))}
    </GridContainer>
  );
};

export default DaysGrid;