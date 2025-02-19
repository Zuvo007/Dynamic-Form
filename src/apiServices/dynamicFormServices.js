const simulateDelay = (data, delay = 1000) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, delay);
    });
};

const getLocalStorageData = (key, defaultValue = [{}]) => {
    const savedData = localStorage.getItem(key);
    const data = savedData ? JSON.parse(savedData) : defaultValue;
    return simulateDelay(data);
};

const setLocalStorageData = (key, data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            localStorage.setItem(key, JSON.stringify(data));
            resolve();
        }, 1000);
    });
};

export { getLocalStorageData, setLocalStorageData };
