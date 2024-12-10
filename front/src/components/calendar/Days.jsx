import styled from 'styled-components';
import Day from './Day.jsx';

const DaysContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: ${props => `repeat(${props.$weeks}, minmax(0,1fr))`}
    gap: 2px;
    flex: 1;
`;

const Days = ({ selectedDate, currentMonth, onDateClick }) => {
  const days = [];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    return { daysInMonth, startingDay };
  };
  const { daysInMonth, startingDay } = getDaysInMonth(currentMonth);

  const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0);
  const prevMonthDays = prevMonth.getDate();

  for (let i = startingDay - 1; i >= 0; i--) {
    const day = prevMonthDays - i;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, day);
    days.push({
      day,
      date,
      isOtherMonth: true,
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    days.push({
      day,
      date,
      isOtherMonth: false,
    });
  }

  const remainingDays = 35 - days.length;
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, day);
    days.push({
      day,
      date,
      isOtherMonth: true,
    });
  }

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