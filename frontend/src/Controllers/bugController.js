import bugModel from '../Models/BugModel'

export const retrieveBugs = () => {
    let data = [];
    
    data.push(new bugModel({
        _id: 23456789,
        name: 'Crash on load',
        details: 'Crash after 3 seconds',
        steps: 'Open app and it will crash',
        version: 'V2.0',
        priority: 1,
        assigned: 'Dongha Kang',
        creator: 'test',
        time: '18:20'
    }));
    
    data.push(new bugModel({
        _id: 34567890,
        name: 'Will not load',
        details: 'Crash after 3 seconds',
        steps: 'Open app and it will crash',
        version: 'V2.0',
        priority: 3,
        assigned: 'Dongha Kang',
        creator: 'test',
        time: '18:34'
    }));

    let sorted = data.sort((a, b) => { return a.priority - b.priority; })
    return sorted;
}
