import {ShuttleSchedule} from './timeLog.js'
// import BusList from './BusSchedule.js'
// import moment from 'moment'
// import fs from 'fs'
//praise santa
let shuttle = new ShuttleSchedule('schedule.csv')

export default async function DisplayItinerary(origin, destination) {
    // here
    console.log('here');
    console.log(origin);
    console.log(destination);
    let timeLeft = shuttle.query(origin, destination);
    console.log('return');
    console.log(timeLeft[0]); //time till the best shuttle leaves
    console.log(timeLeft[1]); //origin
    console.log(timeLeft[2]); //destination
    return (
        timeLeft
    )
}

DisplayItinerary('Red Hook', 'Gahagan');
//bug --- RH -> Hannaford