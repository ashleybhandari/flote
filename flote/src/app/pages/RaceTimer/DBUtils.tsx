import { socket } from "@src/socket";
import {DNF_CODE, DNS_CODE, UNLAPPED_CODE} from "./RaceTimer.tsx";

export function startRace(raceID, boatIDs){
    clearAllBoats(boatIDs);
    updateStartTime(raceID, boatIDs);
}

export function clearAllBoats(boatIDs){
    boatIDs.map((boatID) => 
        markBoatUnLapped(boatID)
    ); 
}

export function updateBoatTime(boatID, time){
    //step 1 : get the boat 
    if(time === UNLAPPED_CODE){
        markBoatUnLapped(boatID);
        return;
    }

    if(time === DNS_CODE){
        markBoatDNS(boatID);
        return;
    }

    let updateData = { boatId: boatID, finishTime: time, dns: false } 
    socket.emit("updateBoat", updateData, (res) => {
            if(res.error){
                console.log(res.error);
            }
    }); 
   
}

export function markBoatUnLapped(boatID){
    let updateData = { boatId: boatID, finishTime: null, dns: false } 
    socket.emit("updateBoat", updateData, (res) => {
            if(res.error){
                console.log(res.error);
            }
    });
}

export function markBoatDNS(boatID){
    let updateData = { boatId: boatID, finishTime: -3, dns: true } 
    socket.emit("updateBoat", updateData, (res) => {
            if(res.error){
                console.log(res.error);
            }
    });
}

export function getBoatIDs(raceID, setBoatIDs, setBoatDBIds){
    let update = (res) => {
        if(res.error){
            return; 
        }
        //res.data.boats 
        //sets boats to be the raceID's boats
        setBoatDBIds((boatIDs) => {return res.data.boats.map((boat) => boat._id)}); 
        setBoatIDs((boatIDs) => {return res.data.boats.map((boat) => boat.registrationId)}); 
    }

    socket.emit("getRaceById",
        raceID,
        update
    ); 
}

export function hasStartTime(raceID, setAlreadyRec){
    let update = (res) => {
        if(res.error){
            return; 
        }
        setAlreadyRec((alreadyRec) => (res.startTime !== undefined && res.startTime !== -1));
    }

    socket.emit("getRaceById",
        raceID,
        update
    ); 
}
export function updateStartTime(raceID, startTime){
}

export function updateEndTime(){

}