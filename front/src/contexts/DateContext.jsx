import { createContext, useState } from 'react';

export const DateContext = createContext();

export const DateProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const formattedDate = selectedDate.toLocaleDateString('en-CA');

  return (
    <DateContext.Provider value={{ selectedDate, formattedDate, setSelectedDate }}>
      {children}
    </DateContext.Provider>
  );

};