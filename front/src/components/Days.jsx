import styled from 'styled-components';
import Day from './Day.jsx';

const DaysContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(5, minmax(0, 1fr)); // 5주를 동일한 비율로
    gap: 2px;
    flex: 1;
`;

const Days = ({ days, selectedDate, onDateClick }) => {
  return (
    <DaysContainer>
      <Day
        days={days}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
      />
    </DaysContainer>
  );
};

export default Days;