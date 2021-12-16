import moment from 'moment'

const LINEBREAK = '━'.repeat(75)

/**
 * Object for storing shuttle stops
 */
class Stop {
    constructor(name, departureTimes) {
        this.name = name
        this.departureTimes = departureTimes
    }
}


/**
 * Object for storing a bus/shuttle and its schedule
 */
class ShuttleSchedule {
    
    constructor() {

        console.log(LINEBREAK)

        this.currentTime = moment()

        /* SET TIME HERE FOR TESTING PURPOSES */
        ///this.currentTime.hour(4)
        //this.currentTime.minute(10)

        //Bus Schedule Array
        this.schedule = [
            ['Kline South',             'Kline',            '08:00', '08:45', '09:30', '10:30', '11:15', '13:00', '14:00', '15:00', '17:00', '18:00', '19:00', '20:00', '22:00', '23:00'],
            ['Gahagan South',           'Gahagan',          '08:01', '08:46', '09:31', '10:31', '11:16', '13:01', '14:01', '15:01', '17:01', '18:01', '19:01', '20:01', '22:01', '23:01'],
            ['Triangle South',          'Triangle',         '08:02', '08:47', '09:32', '10:32', '11:17', '13:02', '14:02', '15:02', '17:02', '18:02', '19:02', '20:02', '22:02', '23:02'],
            ['Red Hook South',          'Red Hook',         '08:10', '08:55', '09:40', '10:40', '11:25', '13:10', '14:10', '15:10', '17:10', '18:10', '19:10', '20:10', '22:10', '23:10'],
            ['MAT/UBS South',           'MAT/UBS',          '08:11', '08:56', '09:41', '10:41', '11:26', '13:11', '14:11', '15:11', '17:11', '18:11', '19:11', '20:11', '22:11'         ],
            ['Hannaford',               'Hannaford',        '13:26', '14:26', '15:26', '17:26', '18:26', '19:26', '20:26', '22:26'                                                      ],
            ['MAT/UBS North',           'MAT/UBS',          '08:13', '08:58', '09:43', '10:43', '11:28', '13:28', '14:28', '15:28', '17:28', '18:28', '19:28', '20:28', '22:28'         ],
            ['Red Hook North',          'Red Hook',         '08:15', '09:00', '09:45', '10:45', '11:30', '13:30', '14:30', '15:30', '17:30', '18:30', '19:30', '20:30', '22:30'         ],
            ['Triangle North',          'Triangle',         '08:21', '09:06', '09:51', '10:51', '11:36', '13:38', '14:38', '15:38', '17:38', '18:38', '19:38', '20:38', '22:38'         ],
            ['Gahagan North',           'Gahagan',          '08:22', '09:07', '09:52', '10:52', '11:37', '13:39', '14:39', '15:39', '17:39', '18:39', '19:39', '20:39', '22:39'         ],
            ['Kline North',             'Kline',            '08:25', '09:10', '09:55', '10:55', '11:40', '13:40', '14:40', '15:40', '17:40', '18:40', '19:40', '20:40', '22:40'         ],
            ['Robbins North',           'Robbins',          '08:26', '09:11', '09:56', '10:56', '11:41', '13:42', '14:42', '15:42', '17:42', '18:42', '19:42', '20:42', '22:42'         ],
            ['Campus Rd North',         'Campus Rd',        '08:27', '09:12', '09:57', '10:57', '11:42', '13:43', '14:43', '15:43', '17:43', '18:43', '19:43', '20:43', '22:43'         ],
            ['Tivoli Monument North',   'Tivoli Monument',  '08:30', '09:15', '10:00', '11:00', '11:45', '13:48', '14:48', '15:48', '17:48', '18:48', '19:48', '20:48', '22:48'         ],
            ['Tivoli',                  'Tivoli',           '07:50', '08:35', '09:20', '10:05', '11:05', '11:50', '13:50', '14:50', '15:50', '17:50', '18:50', '19:50', '20:50', '22:50'],
            ['Tivoli Monument South',   'Tivoli Monument',  '07:52', '08:36', '09:21', '10:06', '11:06', '11:52', '13:52', '14:52', '15:52', '17:52', '18:52', '19:52', '20:52', '22:52'],
            ['Campus Rd South',         'Campus Rd',        '07:56', '08:40', '09:25', '10:10', '11:10', '11:56', '13:56', '14:56', '15:56', '17:56', '18:56', '19:56', '20:56', '22:56'],
            ['Robbins South',           'Robbins',          '07:57', '08:41', '09:26', '10:11', '11:11', '11:57', '13:57', '14:57', '15:57', '17:57', '18:57', '19:57', '20:57', '22:57'],
            ['Ward Gate (South)',       'Ward Gate',        '07:58', '08:42', '09:27', '10:12', '11:12', '11:58', '13:58', '14:58', '15:58', '17:58', '18:58', '19:58', '20:58', '22:58']]


        let stopData = this.buildStops()
        this.stopLocations = stopData[0] // hashmap of location:  [Stop1] | [Stop1, Stop2]
        this.allStopsAndTimes = stopData[1] // array of ALL stop name/time pairs:  [ [name1, time1], [name2, time2], [name_n, time_n] ]

        let sortedStopsAndTimes = this.sortStopsAndTimes()
        this.sortedStops = sortedStopsAndTimes[0] // ALL stops sorted
        this.sortedTimes = sortedStopsAndTimes[1] // ALL departure times sorted

        console.log(`Bus object loaded at ${this.currentTime.format("h:mm:ss a")}`)

    }

    
    /** 
     * Load stop data from schedule file, then add each line as a stop using addStop 
     * 
     * @returns 
     */
     buildStops() {

        let stopLocations = []
        let allStopsAndTimes = []

        // get array of lines in schedule file
        for (let stop of this.schedule) {

            let name = stop[0]
            let location = stop[1]

            let departureTimes = stop.slice(2)
            departureTimes = departureTimes.map(time => moment(time, 'HH:mm')) // convert string format to time format

            // remove times that already happened
            departureTimes = departureTimes.filter(time => time.isAfter(this.currentTime))

            // for each departure, add time and corresponding stop name to instance array
            for (let time of departureTimes) allStopsAndTimes.push( [name, time] )

            let shuttleStop = new Stop(name, departureTimes)

            // add stop to hashmap of locations. if location already exists, add a new stop to existing location
            if (location in stopLocations) stopLocations[location].push(shuttleStop) 
            else stopLocations[location] = [shuttleStop]

        }

        // console.log(stopLocations)
        return [stopLocations, allStopsAndTimes]
    }

    /**
     * Sort all departure times with their corresponding stop names.
     * 
     * @returns {[String[], Moment[]]} [Sorted stop names array, sorted departure times array]
     */
    sortStopsAndTimes() {

        // sort  [ [name1, time1], [name2, time2], [name_n, time_n] ]  IN ORDER OF time_n IN ascending order
        let sortedStopAndTimes = this.allStopsAndTimes.sort(function(a, b) {
            return ((a[1] < b[1]) ? -1 : ((a[1] === b[1]) ? 0 : 1))
        })

        // split sorted stop names and departure times into 2 different arrays
        let sortedStops = []
        let sortedTimes = []
        
        for (let i = 0; i < sortedStopAndTimes.length; i++) {
            sortedStops.push(sortedStopAndTimes[i][0])
            sortedTimes.push(sortedStopAndTimes[i][1])
        }
        
        return [sortedStops, sortedTimes]

    }


    /**
     * Shows user how to get from stop A to stop B
     * 
     * @param {string} originLoc Where the user is leaving from (stop A)
     * @param {string} destinationLoc Where the user would like to go (stop B)
     */
    query(originLoc, destinationLoc) {

        console.log('origin:',       originLoc      )
        console.log('destination:',  destinationLoc )
        console.log(LINEBREAK)

        let originIndex
        let destinationIndex

        let routeOptions = []

        for (let i = 0; i < this.sortedStops.length; i++) {
            // let qTime = this.sortedTimes[i] // e.g. Triangle North
            let qStop = this.sortedStops[i]

            if (this.stopAtLocation(qStop, originLoc)) {
                // process.stdout.write('o')
                originIndex = i
            }

            if (this.stopAtLocation(qStop, destinationLoc)) {
                // process.stdout.write('d')
                if (originIndex) {
                    destinationIndex = i
                    routeOptions.push( [originIndex, destinationIndex] )
                    
                    originIndex = undefined
                    destinationIndex = undefined
                }
                
            }

        }

        let queryData = []

        // console.log(routeOptions)
        for (let route of routeOptions) {
            let oTime = route[0]
            let dTime = route[1]
            let q = this.printRouteData(oTime, dTime)
            queryData.push(q)

        }

        // console.log(this.stopLocations)

        return queryData

    }

    stopAtLocation(name, location) {

        for (let stop of this.stopLocations[location]) {
            if (name === stop.name) {
                return true
            }
        }
        return false
    }

    printRouteData(originIndex, destinationIndex) {
        let originStop = this.sortedStops[originIndex]
        let originTime = this.sortedTimes[originIndex]

        let destinationStop = this.sortedStops[destinationIndex]
        let destinationTime = this.sortedTimes[destinationIndex]

        let timeLeft = this.currentTime.to(originTime, true)
        let tripLength = originTime.to(destinationTime, true)

        // array of all (stops & departure times) from origin -> destination
        let journeyStops = this.sortedStops.slice(originIndex, destinationIndex+1)
        let journeyStopTimes = this.sortedTimes.slice(originIndex, destinationIndex+1)

        let itinerary = []
        let destinationLoc

        console.log(this.currentTime.format('MMMM Do, YYYY @ LTS (dddd)'))

        console.log(`${originStop} -> ${destinationStop}`)
        console.log(`The shuttle leaves ${originTime.format('h:mm a')}. You have ${timeLeft} to spare!`)
        // console.log(`The trip takes ${tripLength}`)
        // console.log(`Get off quickly, the shuttle leaves ${destinationStop} at ${destinationTime.format('h:mm a')}`)

        for (let i = 0; i < journeyStops.length; i++) {
            if (i+1 == journeyStops.length) {
                // console.log(`You have arrived at ${journeyStops[i]}`)
                destinationLoc = journeyStops[i]
            } else {
                // console.log(`${journeyStopTimes[i].format('h:mm a')} : ${journeyStops[i]}`)
                itinerary.push( [journeyStops[i], ': ',journeyStopTimes[i].format('h:mm a'), ] )
            }
        }

        console.log(`Itinerary:`)
        console.log(itinerary)
        console.log(destinationLoc)

        /*
        returned array:
        [0]    Current time of request
        [1]    Origin
        [2]    Destination
        [3]    Time Shuttle Leaves Origin
        [4]    Amount of Time UNTIL that shuttle leaves
        [5]    Itinerary in Array format [[time 1: loc 1], [time 2: loc 2]...[time n: loc n]]
        [6]    Arrival location (without arrival time since it tends to be inaccurate)

        */
        

        console.log(LINEBREAK)
        return ["Current time: " + this.currentTime.format('h:mm a'), "Leaving from: " + originStop,"Heading to: " + destinationStop,"Shuttle leaves at: " + originTime.format('h:mm a'),"Time until arrival: " + timeLeft, "Itinerary:"].concat(itinerary).concat("Final destination: " + destinationLoc)
    }
}







// console.clear()

// let shuttle = new ShuttleSchedule('schedule.csv')

// let test = shuttle.query('Robbins', 'Kline')
// console.log(test)
export {ShuttleSchedule};
// what time does bus leave from origin
// how much time until that departure
// the stops on that route
// how long trip takes
// times of the stops on the route
// next two options if they miss that shuttle