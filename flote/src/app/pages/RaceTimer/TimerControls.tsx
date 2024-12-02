import { Button } from "@nextui-org/react";
import {renderTime, addTime, linkTime, unLinkTime, deleteTime} from "./timeListUtils.tsx";

export function TimerControls ({setTimes, counter, start, isStopped, pause, resume, reset}){
    if(isStopped){
        return(
                <div>
                <Button
                color="primary"
                size="lg"
                radius="sm"
                onPress={start}
                className="self-end w-32 m-6"
                >Start </Button>
                </div>
              )
    }
    return (
            <div>
            <Button
            color="primary"
            size="lg"
            radius="sm"
            onPress={pause}
            className="self-end w-32 m-6"
            >Pause </Button>

            <Button
            color="primary"
            size="lg"
            radius="sm"
            onPress={() => addTime(counter, setTimes)}
            className="self-end w-32 m-6"
            >Lap </Button>

            </div>


            )
}
