import { Button } from "@nextui-org/react";
import {renderTime, addTime, linkTime, unLinkTime, deleteTime} from "./timeListUtils.tsx";
import {DNF_CODE, DNS_CODE, UNLINKED_CODE} from "./RaceTimer.tsx";

export function TimeLinker({boatIds, times, setTimes, linkingIndex, setLinkingIndex}){
    if(linkingIndex === -1)
        return <></>
    return <>
        <div className = "rounded-lg bg-white/90">
        <Button
                color="danger"
                size="lg"
                radius="sm"
                onPress={() => {
                    setLinkingIndex(-1);
                    }
                }
                className="self-end w-32 m-6"
                >close</Button>

        <h1>BoatIDs: </h1>
           <ul> {boatIds.map(boatId => renderBoat(boatId, setTimes, linkingIndex, setLinkingIndex))} </ul>
        </div>
    </>

}

function renderBoat(boatId, setTimes, linkingIndex, setLinkingIndex){
    return <li key = {boatId}>
        <p>{boatId}</p> 
        <Button
                color="warning"
                size="lg"
                radius="sm"
                onPress={() => {
                    linkTime(linkingIndex, boatId, setTimes);
                    setLinkingIndex(-1);
                    }
                }
                className="self-end w-32 m-6"
                >Mark With Time</Button>

         

    </li>

}
