import fs from 'fs';
import path from 'path';
import { Data } from './dataInterface.ts';

let data: Data = {
    users: [],
    decks: [],
    sessions: {}
};

// Use getData() to access the data
function getData() {
    return data;
}

// Use setData(newData) to set new data
function setData(newData: Data) {
    data = newData;
}

function saveDataToFile(data: Data) {
    const filePath = path.resolve('data.json');
    console.log("Saving data to:", filePath); // For Debug purposes

    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
}

// if there is data it will load
function loadDataFile() {
    if (!fs.existsSync('data.json')) {
        fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    }

    const loadedData = fs.readFileSync('data.json', 'utf-8');
    const newData = JSON.parse(loadedData);
    data = {
        users: newData.users,
        decks: newData.decks,
        sessions: newData.sessions
    };
    return data;
}

export {
    getData,
    setData,
    saveDataToFile,
    loadDataFile
};