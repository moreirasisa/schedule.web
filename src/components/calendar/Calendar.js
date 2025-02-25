import { Wrapper, CalendarHead, SevenColGrid, HeadDays, CalendarBody, StyledDay, StyledAppointment, StyledHoliday } from './Styled'
import ArrowCircleLeftTwoToneIcon from '@mui/icons-material/ArrowCircleLeftTwoTone';
import ArrowCircleRightTwoToneIcon from '@mui/icons-material/ArrowCircleRightTwoTone';
import { MONTHS } from './const';
import { areDatesTheSame, getDateObj, getDaysInMonth, getSortedDays, range } from './utils';
import React, { useEffect, useState } from 'react';
import Modal from '../modal/Modal';

const getHolidays = async (setHolidays) => {
    const response = await fetch("http://localhost:5000/api/v1/holidays");
    const data = await response.json();
    setHolidays(data);
}

const createAppointment = async (appointmentData, setAppointments) => {
    const response = await fetch("http://localhost:5000/api/v1/appointment", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(appointmentData)
    });
    const data = await response.json();
    setAppointments(data);
}

const deleteAppointment = async (id, setAppointments) => {
    const response = await fetch(`http://localhost:5000/api/v1/appointment/${id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
    });
    const data = await response.json();
    setAppointments(data);
}

export const Calendar = ({ startingDate, appointmentsObj }) => {
    const [currentMonth, setCurrentMonth] = useState(startingDate.getMonth());
    const [currentYear, setCurrentYear] = useState(startingDate.getFullYear());
    const [holidays, setHolidays] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const DAYSINAMONTH = getDaysInMonth(currentMonth, currentYear);

    const nextMonth = () => {
        if (currentMonth < 11) {
            setCurrentMonth((prev) => prev + 1);
        } else {
            setCurrentMonth(0);
            setCurrentYear((prev) => prev + 1);
        }
    };

    const previousMonth = () => {
        if (currentMonth > 0) {
            setCurrentMonth((prev) => prev - 1);
        } else {
            setCurrentMonth(11);
            setCurrentYear((prev) => prev - 1);
        }
    }

    useEffect(() => {
        getHolidays(setHolidays);
    }, []);

    return (
        <Wrapper>
            <CalendarHead>
                <div onClick={previousMonth}>
                    <ArrowCircleLeftTwoToneIcon/>
                </div>
                <p>{MONTHS[currentMonth]} {currentYear}</p>
                <div onClick={nextMonth}>
                    <ArrowCircleRightTwoToneIcon/>
                </div>
            </CalendarHead>
            <SevenColGrid>
                {getSortedDays(currentMonth, currentYear).map((day) => (
                    <HeadDays>{day}</HeadDays>
                ))}
            </SevenColGrid>
            <CalendarBody fourCol = {DAYSINAMONTH}>
                {range(getDaysInMonth(currentMonth, currentYear)).map((day) => (
                    <StyledDay active={areDatesTheSame(new Date(), getDateObj(day, currentMonth, currentYear))}>
                        <p style={ {display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ marginLeft: '5px', marginTop: '5px' }}>
                                {day}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Modal/>
                            </div>
                        </p>
                        {
                            appointmentsObj.map((appointment) => (
                                areDatesTheSame(getDateObj(day, currentMonth, currentYear), new Date(appointment.date)) &&
                                <StyledAppointment>{appointment.name} | {appointment.startTime} - {appointment.endTime}</StyledAppointment>
                            ))
                        }
                        {
                            holidays.map((holiday) => (
                                areDatesTheSame(getDateObj(day, currentMonth, currentYear), new Date(holiday.date)) &&
                                <StyledHoliday>{holiday.name}</StyledHoliday>
                            ))
                        }
                    </StyledDay>
                ))}
            </CalendarBody>
        </Wrapper>
    )
}