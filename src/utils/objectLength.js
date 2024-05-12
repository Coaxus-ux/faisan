export const isEmpty = (object) => {
    return Object.entries(object).filter(([, data]) => data.value).length === 0;
};