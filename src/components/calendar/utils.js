import { DAYS } from "./const";

export const range = (end) => {
    const { result } = Array.from({ length: end }).reduce(
        ({ result, current }) => ({
            result: [...result, current],
            current: current + 1
        }),
        { result: [], current: 1}
    );
    return result;
}

export const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
}

export const getSortedDays = (month, year) => {
    const dayIndex = new Date(year, month, 1).getDay();
    return [...DAYS.slice(dayIndex), ...DAYS.slice(0, dayIndex)];
}

export const getDateObj = (day, month, year) => {
    return new Date(year, month, day);
}

export const areDatesTheSame = (firstDate, secondDate) => {
    return firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate();
}