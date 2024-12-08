import { Button } from "@nextui-org/react";
import {renderTime, addTime, linkTime, unLinkTime, deleteTime} from "./timeListUtils.tsx";
import {DNF_CODE, DNS_CODE, UNLINKED_CODE} from "./RaceTimer.tsx";
import {getCounterStr} from "./timeListUtils.tsx";
export function TimeLinker({boatIds, times, setTimes, linkingIndex, setLinkingIndex}){
    if(linkingIndex === -1)
        return <></>

    return <>
        <div className="bg-slate-400/50 w-screen h-screen fixed flex items-center justify-center">
            <div className = "p-8 w-[50%] rounded-md bg-white flex flex-col max-h-[80%]">
                <div className = "flex flex-row flex-wrap justify-between">
                    <h1 className="text-2xl">Link Entry</h1>
                    <Button
                        color="danger"
                        size="lg"
                        radius="sm"
                        onPress={() => {
                            setLinkingIndex(-1);
                            }
                        }
                        className="self-end w-32"
                        >Cancel</Button>
                </div> 
                <h1 className="text-1xl m-3"> Time: {getCounterStr(times[linkingIndex][0])}</h1>
                <div className="grow my-5 justify-between p-5 bg-slate-100" > 
                    <input 
                        className={"grow border-none focus:outline-none py-4 pl-6 m-5"}
                        placeholder="Search For Boat ID">
                    </input>
                    <ul className="overflow-y-scroll"> {boatIds.map(boatId => renderBoat(boatId, setTimes, linkingIndex, setLinkingIndex))} </ul>
                </div>
            </div> 
        </div>
    </>

}

function renderBoat(boatId, setTimes, linkingIndex, setLinkingIndex){
    return <li className="flex flex-row items-center" key = {boatId}>
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
                >Select Boat</Button>

        <p>Boat ID: {boatId}</p> 
         

    </li>

}
