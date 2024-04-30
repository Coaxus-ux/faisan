import {parseISO, isWithinInterval} from 'date-fns';

export const compareDates = (date, filterDate) => {
    const startDate = filterDate.startDate
        ? new Date(filterDate.startDate.year, filterDate.startDate.month, filterDate.startDate.day)
        : '';
    const endDate = filterDate.endDate
        ? new Date(filterDate.endDate.year, filterDate.endDate.month, filterDate.endDate.day)
        : '';
    const parsedDate = parseISO(date);
    return isWithinInterval(parsedDate, {start: startDate, end: endDate});
}