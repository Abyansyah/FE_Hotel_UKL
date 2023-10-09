import React, { createContext, useContext, useState } from 'react';

const DateRangeContext = createContext();

export function DateRangeProvider({ children }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return <DateRangeContext.Provider value={{ startDate, setStartDate, endDate, setEndDate }}>{children}</DateRangeContext.Provider>;
}

export function useDateRange() {
  return useContext(DateRangeContext);
}
