import { BsCalendarEventFill, BsSearch } from 'react-icons/bs';
import { useState, useEffect, useRef } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from 'next/router';
import moment from 'moment';
import { useDateRange } from 'ahmad/context/datePicker';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const { startDate, setStartDate, endDate, setEndDate } = useDateRange();
  const [showDate, setShowDate] = useState(false);
  const dateRangeRef = useRef(null);
  const router = useRouter();

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  useEffect(() => {
    if (startDate === endDate) {
    }
  }, [startDate, endDate]);

  useEffect(() => {
    const nextDay = new Date(startDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setEndDate(nextDay);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dateRangeRef.current && !dateRangeRef.current.contains(event.target)) {
        setShowDate(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  };

  return (
    <>
      <main className="flex relative justify-center mt-28">
        <div className="w-full mx-28 flex justify-center">
          <div className="w-full flex justify-center h-[500px] bg-black bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')] rounded">
            <div className="flex flex-col justify-center gap-y-4">
              <h2 className="text-center font-bold text-4xl text-white">Book your next trip</h2>
              <p className="text-white text-center text-xl">An arrangement you make to have a hotel room, tickets, etc. at a particular time in the future</p>
            </div>
          </div>
        </div>
        <div className="shadow-2xl flex gap-x-8 bg-white -bottom-12 absolute rounded-full">
          <div className=" w-full px-7 py-3 flex gap-x-8 justify-center items-center">
            <div className="flex gap-x-8">
              <div className="flex gap-x-3 items-start cursor-pointer" onClick={() => setShowDate(!showDate)}>
                <BsCalendarEventFill color="#3B82F6" className="mt-2" />
                <div className="flex flex-col">
                  <h2 className="font-normal text-[#222] text-lg">Check In</h2>
                  <p className="text-[#555555]">{moment(startDate).format('ddd, DD MMM')}</p>
                </div>
              </div>
              <div className="w-[1px] h-[60px] bg-[#E8E8E8]"></div>
              <div className="flex gap-x-3 items-start cursor-pointer" onClick={() => setShowDate(!showDate)}>
                <BsCalendarEventFill color="#3B82F6" className="mt-2" />
                <div className="flex flex-col">
                  <h2 className="font-normal text-[#222] text-lg">Check Out</h2>
                  <p className="text-[#555555]">{moment(endDate).format('ddd, DD MMM')}</p>
                </div>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault;
                router.push(`/hotel/?tgl_check_in=${moment(startDate).format('YYYY-MM-DD')}&tgl_check_out=${moment(endDate).format('YYYY-MM-DD')}`);
              }}
              disabled={startDate === endDate}
              className={`flex gap-x-3 items-center p-4 bg-blue-700 rounded-full ${startDate === endDate ? 'cursor-default' : ''}`}
            >
              <BsSearch color="#fff" />
              <p className="text-white">Search...</p>
            </button>
          </div>
        </div>
      </main>
      {showDate && (
        <div onMouseLeave={() => setShowDate(!showDate)} className="flex justify-center z-50 relative">
          <DateRangePicker
            editableDateInputs={true}
            shouldCloseOnSelect={false}
            staticRanges={[]}
            inputRanges={[]}
            className="absolute top-16"
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={['#2563EB']}
            onChange={handleSelect}
          />
        </div>
      )}
    </>
  );
};

export default Header;
