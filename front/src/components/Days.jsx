import styled from 'styled-components';
import Day from './Day.jsx';

const DaysContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: ${props => `repeat(${props.$weeks}, minmax(0,1fr))`}
    gap: 2px;
    flex: 1;
`;

const Days = ({ days, selectedDate, onDateClick }) => {
  const weeks = Math.ceil(days.length / 7);
  
  return (
    <DaysContainer $weeks={weeks}>
      <Day
        days={days}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
      />
    </DaysContainer>
  );
};

export default Days;