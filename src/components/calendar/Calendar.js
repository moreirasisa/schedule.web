import { Wrapper, CalendarHead, SevenColGrid, HeadDays, CalendarBody, StyledDay, StyledAppointment } from './Styled'
import ArrowCircleLeftTwoToneIcon from '@mui/icons-material/ArrowCircleLeftTwoTone';
import ArrowCircleRightTwoToneIcon from '@mui/icons-material/ArrowCircleRightTwoTone';
import { MONTHS } from './const';
import { areDatesTheSame, getDateObj, getDaysInMonth, getSortedDays, range } from './utils';
import { useEffect, useState } from 'react';

const getAppointments = async (setAppointments) => {
    const response = await fetch("http://localhost:5000/api/v1/appointment");
    const data = await response.json()
    setAppointments(data);
    console.log("Appointments:", data)
}

export const Calendar = ({ startingDate, appointmentsObj }) => {
    const [currentMonth, setCurrentMonth] = useState(startingDate.getMonth());
    const [currentYear, setCurrentYear] = useState(startingDate.getFullYear());
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
        getAppointments(setAppointments);
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
                        <p>{day}</p>
                        {
                            appointmentsObj.map((appointment) => (
                                areDatesTheSame(getDateObj(day, currentMonth, currentYear), appointment.date) &&
                                <StyledAppointment>{appointment.title}</StyledAppointment>
                            ))
                        }
                    </StyledDay>
                ))}
            </CalendarBody>
        </Wrapper>
    )
}