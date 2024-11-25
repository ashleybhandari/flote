import React from 'react';
import { useState } from 'react';
import { useCounter, useTimer } from 'react-timing-hooks';
import {Race} from "../../../models/Race.tsx";
import {Boat} from "../../../models/Boat.tsx";
import {TimeLinker} from "./TimeLinker.tsx"
import Background from "@atoms/Background";
import { Button } from "@nextui-org/react";
import Logo from "@atoms/Logo";
import SearchBar from "@atoms/SearchBar";
import {renderTime, addTime, linkTime, unLinkTime, deleteTime} from "./timeListUtils.tsx";
import {TimerControls} from "./TimerControls.tsx";



export default function RaceTimer(){
    const [counter, { start, isStopped, pause, resume, reset }] = useTimer(0);
    const [times, setTimes] = useState([]);
    const [linkingIndex, setLinkingIndex] = useState(-1);
    const [boatIds, setBoatIds] = useState(["boat ID 1", "abcdefg", "foo", "Red October"]); 
    

    return <>
    <Background className="bg-gradient-to-b from-slate-800">
        <div className = "rounded-lg bg-white/90">
            <p>seconds elapsed: {counter}</p>
            <TimerControls setTimes = {setTimes} counter = {counter} start = {start} isStopped = {isStopped} pause = {pause} resume = {resume}  reset = {reset} />
        </div>
        <div className = "rounded-lg bg-white/90">
            <ul> {times.map((time, index) => renderTime(time, index, setTimes, linkingIndex, setLinkingIndex))}</ul>
        </div>
        
        <div className = "rounded-lg bg-white/90">
            <TimeLinker boatIds = {boatIds} times = {times} setTimes = {setTimes} linkingIndex = {linkingIndex} setLinkingIndex = {setLinkingIndex}/>
        </div>
    </Background>
    </>

}
