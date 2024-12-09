import { socket } from "@src/socket";


export function clearAllBoats(boatIDs){
    boatIDs.map((boatID) => 
        markBoatDNF(boatID)
    ); 
}

export function updateBoatTime(boatID, time){
    //step 1 : get the boat 
    let updateData = { boatId: boatID, finishTime: time, dns: false } 
    socket.emit("updateBoat", updateData, (res) => {
            if(res.error){
                console.log(res.error);
            }
    }); 
   
}

export function markBoatDNF(boatID){
    let updateData = { boatId: boatID, finishTime: null, dns: false } 
    socket.emit("updateBoat", updateData, (res) => {
            if(res.error){
                console.log(res.error);
            }
    });
}

export function markBoatDNS(boatID){
    let updateData = { boatId: boatID, finishTime: null, dns: true } 
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

export function updateStartTime(){

}

export function updateEndTime(){

}
