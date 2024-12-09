import { useContext, useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import Days from '../components/Days.jsx';
import { DateContext } from '../contexts/DateContext.jsx';
import { TodoContext } from '../contexts/TodoContext.jsx';

const CalendarContainer = styled.div`
    flex: 2;
    min-width: 0;
    border: 2px solid #000;
    border-radius: 8px;
    padding: 20px;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const SelectedDateDisplay = styled.div`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
`;

const CalendarHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const MonthDisplay = styled.div`
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
`;

const ArrowButton = styled.button`
    border: none;
    background: none;
    font-size: 20px;
    cursor: pointer;
    padding: 5px 10px;
`;

const WeekdayHeader = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    margin-bottom: 10px;
    font-weight: bold;
    padding-bottom: 10px;
`;

const DatePickerOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: ${props => props.$show ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const DatePickerContainer = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    .react-datepicker {
        border: none;
    }

    .react-datepicker__header {
        background-color: white;
        border: none;
    }

    .react-datepicker__current-month {
        font-size: 1.2em;
        margin-bottom: 10px;
    }

    .react-datepicker__navigation {
        top: 15px;
    }

    .react-datepicker__day-name,
    .react-datepicker__day {
        display: none;
    }

    .react-datepicker__month-container {
        float: none;
    }
`;

const Calendar = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  const { selectedDate, setSelectedDate } = useContext(DateContext);
  const { todos } = useContext(TodoContext);

  const handleDateClick = (dateObj) => {
    setSelectedDate(dateObj.date);
    if (dateObj.isOtherMonth) setCurrentMonth(dateObj.date);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  return (
    <CalendarContainer>
      <SelectedDateDisplay>
        {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일
        ({todos.length}개의 약속)
      </SelectedDateDisplay>

      <CalendarHeader>
        <ArrowButton onClick={handlePrevMonth}>&lt;</ArrowButton>
        <MonthDisplay onClick={() => setShowDatePicker(true)}>
          {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
        </MonthDisplay>
        <ArrowButton onClick={handleNextMonth}>&gt;</ArrowButton>
      </CalendarHeader>

      <DatePickerOverlay $show={showDatePicker} onClick={() => setShowDatePicker(false)}>
        <DatePickerContainer onClick={e => e.stopPropagation()}>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setCurrentMonth(date);
              setShowDatePicker(false);
            }}
            inline
            locale={ko}
            showMonthYearPicker
            dateFormat="MM/yyyy"
          />
        </DatePickerContainer>
      </DatePickerOverlay>

      <WeekdayHeader>
        {weekdays.map(day => (
          <div key={day}>{day}</div>
        ))}
      </WeekdayHeader>

      <Days
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateClick={handleDateClick}
      />
    </CalendarContainer>
  );
};

export default Calendar;