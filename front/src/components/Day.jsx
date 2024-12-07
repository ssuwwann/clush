import styled from 'styled-components';

const DayCell = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid #eee;
    display: flex;
    flex-direction: column; // 태그와 날짜를 세로로 배치
    align-items: center;
    justify-content: center;
    gap: 4px; // 태그와 날짜 사이 간격
    cursor: pointer;
    background-color: ${props => props.$isSelected ? '#000' : 'transparent'};
    color: ${props => props.$isSelected ? '#fff' : props.$isOtherMonth ? '#ccc' : '#000'};
    position: relative; // 태그의 절대 위치 기준점

    &:hover {
        background-color: ${props => props.$isSelected ? '#000' : '#d4e3f1'};
    }

    ${props => props.$isToday && `
        background:#D4E3F1FF;
        font-weight: bold;
    `}
`;

const Tag = styled.span`
    position: absolute;
    top: 2px;
    font-size: 0.7em;
    background-color: ${props => props.type === 'today' ? '#000' : props.type === 'selected' ? '#fff' : '#000'};
    color: ${props => props.type === 'selected' ? '#000' : '#fff'};
    padding: 2px 6px;
    border-radius: 10px;
    border: ${props => props.type === 'selected' ? '1px solid #000' : 'none'};
`;


const Day = ({ days, selectedDate, onDateClick }) => {
  return (
    <>
      {days.map(dateObj => {
        const isToday =
          new Date().getDate() === dateObj.day &&
          new Date().getMonth() === dateObj.date.getMonth() &&
          new Date().getFullYear() === dateObj.date.getFullYear();

        return (
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
            {isToday && <Tag type="today">오늘</Tag>}
            {selectedDate.getDate() === dateObj.day &&
              selectedDate.getMonth() === dateObj.date.getMonth() &&
              selectedDate.getFullYear() === dateObj.date.getFullYear() && <Tag type="selected">선택됨</Tag>}
            {dateObj.day}
          </DayCell>
        );
      })}
    </>
  );
};

export default Day;