import React, {Component} from 'react'
import {ShuttleSchedule} from './timeLog.js'
import { RiLandscapeLine } from "react-icons/ri";
import { RiBarricadeFill } from "react-icons/ri";
import { RiCommunityLine } from "react-icons/ri";
import { RiHome3Line } from "react-icons/ri";
import { RiPencilRuler2Line } from "react-icons/ri";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { RiBusFill } from "react-icons/ri";
import { RiBuilding4Line } from "react-icons/ri";
import { RiVipCrownLine } from "react-icons/ri";
import { RiHandHeartLine } from "react-icons/ri";
import { RiAncientGateLine } from "react-icons/ri";
//Kline
// import {GiForkKnifeSpoon } from 'react-icons/gi';
class BusList extends Component {

    constructor(stops) {
        super(stops);
        this.state = {
            stops: ['Gahagan', 'Triangle', 'Tivoli', 'Red Hook', 'MAT/UBS', 'Hannaford', 'Kline','Campus Rd', 'Tivoli Monument', 'Robbins', 'Ward Gate' ],
            stopsCol1: ['Gahagan', 'Triangle', 'Tivoli', 'Red Hook', 'MAT/UBS', 'Hannaford'],
            stopsCol2: ['Kline', 'Campus Rd', 'Tivoli Monument', 'Robbins', 'Ward Gate'],
            origin: null,
            destination: null,
            results: null,
            originResults: null,
            iconHere: [<RiLandscapeLine size={200} gridArea='Gahagan'/> , <RiBarricadeFill size={200} gridArea='Triangle'/>, <RiCommunityLine size={200} gridArea='Tivoli'/>, <RiHome3Line size={200} gridArea='Red Hook'/>, <RiPencilRuler2Line size={200} gridArea='MAT/UBS'/>, <RiShoppingCart2Fill size={200} gridArea='Hannford'/>, <RiBusFill size={200} gridArea='Kline'/>, <RiBuilding4Line size={200} gridArea='Campus'/>, <RiVipCrownLine size={200} gridArea='Monument'/>, <RiHandHeartLine size={200} gridArea='Robbins'/>, <RiAncientGateLine size={200} gridArea='Ward Gate'/> ]

        }
    }

    handleClick(stop) {
        let object = document.getElementById(stop);
        if (this.state.origin === null) {
            this.setState({origin: stop});
            this.resetButtonColor('rgb(109, 222, 139)');
            object.style.backgroundColor = 'rgb(109, 222, 139)';
        } else {
            if (stop === this.state.origin && this.state.destination === null) {
                this.setState({origin: null},{iconHere:null});             
                this.resetButtonColor('rgb(109, 222, 139)');
                return;
            }
            if (stop === this.state.origin) return;
            this.resetButtonColor('rgb(189, 81, 81)');
            object.style.backgroundColor = 'rgb(189, 81, 81)';
            this.setState({destination: stop});
        }
    }

    resetStops() {
        this.setState({origin: null});
        this.setState({destination: null});
        this.setState({results: null});
        this.setState({originResults: null})
        console.log(this.state.results);
        for (let stop in this.state.stops){
            const object = document.getElementById(this.state.stops[stop])
            object.style.backgroundColor = 'white';  
        }
    }

    resetButtonColor(color) {
        
        for (let stop in this.state.stops) {
            const object = document.getElementById(this.state.stops[stop]);
            if (object.style.backgroundColor === color) {
                object.style.backgroundColor = 'white';
            }
        }
    }

    createStopsCol1(style) {
            const renderKeys = () => {
                 return this.state.stopsCol1.map((stop) => {
                     return <><li> <center> <button className = 'button' id = {stop} style={style} onClick = {() =>this.handleClick(stop)}>{stop}</button> </center></li> </>
                   })                 
               };
        
               return (
                   <div>
                       {renderKeys()}
                   </div>
               )
        };
    
        createStopsCol2(style) {
            const renderKeys = () => {
                 return this.state.stopsCol2.map((stop) => {
                     return <><li> <center> <button className = 'button' id = {stop} style={style} onClick = {() =>this.handleClick(stop)}>{stop}</button> </center></li> </>
                   })                 
               };
        
               return (
                   <div>
                       {renderKeys()}
                   </div>
               )
        };
    
    renderResults(origin, destination) {
        if (origin !== null && destination !== null) {
            let shuttle = new ShuttleSchedule()
            const data = shuttle.query(origin, destination)
            console.log('******************************************')
            console.log(data[0]);
            console.log('******************************************')

            const returnData = data[0].map((elem) => 
                <li>{elem}</li>
            );

            let originArray = [];
            for (let item in data) {
                let temp = data[item][3];
                temp = temp.split('at:');
                originArray.push(temp[1]);
            }
            console.log(originArray);
            const originData = originArray.map((elem) => 
                <center><li>{elem}</li></center>
            );
            this.setState({results: returnData});
            this.setState({originResults: originData});
        } else {
            this.setState({results: <center><li>Please enter an origin and destination</li></center>});
        }
    }

    render() {
        const btn = {
            fontSize: "100%",
            background: "#FFFFFF",
            border: "1px solid #000000",
            width:'100px',
            height:'50px',
            borderRadius: "4px",
            padding: "0.5rem 1rem",
            transition: "500ms"
        }
        const resetBtn = {
            fontSize: "100%",
            background: "#FFFFFF",
            border: "1px solid #000000",
            width:'100px',
            height:'50px',
            borderRadius: "50%",
            padding: "0.5rem 1rem",
            transition: "500ms",
        }

        const btnFlex={
            display:'grid',
            gridTemplateColumns: '1fr 1fr',
            marginTop:'100px',
            fontSize: "100%",
            background: "#FFFFFF",
            border: "1px solid #000000",
            boxSizing: "border-box",
            borderRadius: "4px",
            padding: "0.5rem 1rem",
            transition: "500ms"
        }
        
        const font = {
            backgroundColor: '#B80000',
        }
        
        const originStyle = {
            marginTop: '25%',
            marginLeft: '25%'
        }

        const destinationStyle = {
            marginTop: '25%',
            marginRight: '25%'
        }
        return ( 
            <>
            <div style = {font}>
            <div className = 'Banner'>
                <center><h1>Bard Shuttle App</h1></center>
                <center><br /> <br /><h2>Select Origin and Destination</h2></center>
            </div> 
            <br /> <br />
            <div className = 'buttonsDisplay' >
                <center><div style = {originStyle}>{this.state.iconHere[this.state.stops.indexOf(this.state.origin)]}</div></center>
                <ul>
                 {this.createStopsCol1(btn)}
                </ul>
                <ul>
                    {this.createStopsCol2(btn)}
                </ul>
                <center><div style={destinationStyle}>{this.state.iconHere[this.state.stops.indexOf(this.state.destination)]}</div></center>
            </div>
            <br></br>
            <div className = 'submit_reset'>
            <div className='reset'><center><button style={resetBtn} onClick = {()=> this.resetStops()}>Reset</button></center></div>
                
                <div className='submit'><center><button style={resetBtn} onClick = {() => this.renderResults(this.state.origin, this.state.destination)}>Submit</button></center></div>
            </div>
                <div className = 'footerInfo'> 
                    <div>
                        <h2><center>Next Available Trip:</center></h2>         
                        <ul className = 'tripResults'>
                            {this.state.results}
                        </ul>
                    </div>
                    <div>
                        <h2><center>{this.state.origin} Schedule:</center></h2>
                        <ul className = 'schedule'>
                            {this.state.originResults}
                        </ul>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default BusList;