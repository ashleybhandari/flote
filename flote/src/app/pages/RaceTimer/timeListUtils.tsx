import { Button } from "@nextui-org/react";


export function renderTime(time, index, setTimes, linkingIndex, setLinkingIndex){
    if(time[1] == null){
        return (<li key={index}>{time[0]} 
                <Button
                color="danger"
                size="lg"
                radius="sm"
                onPress={() => deleteTime(index, setTimes)}
                className="self-end w-32 m-6"
                >Delete </Button>

                <Button
                color="primary"
                size="lg"
                radius="sm"
                onPress={() => {
                    if(linkingIndex === -1)
                        setLinkingIndex(index);
                    }}
                className="self-end w-32 m-6"
                >Link Boat </Button>

        </li>)
    }
    return (<li key={index}>{time[0]}, {time[1]}
                <Button
                color="warning"
                size="lg"
                radius="sm"
                onPress={() => unLinkTime(index, setTimes)}
                className="self-end w-32 m-6"
                >unLink</Button>

                <Button
                color="danger"
                size="lg"
                radius="sm"
                onPress={() => deleteTime(index, setTimes)}
                className="self-end w-32 m-6"
                >Delete </Button>
    </li>)
}

export function addTime(count: number, setTimes){
    setTimes( (times) => {
            return [...times, [count, null]];
            });
}

//links an entire to a boat
export function linkTime(index: number, boatRaceId: string, setTimes){
    setTimes((times)=>{
            const list = times.map( (time, i) => {
                    if(index === i)
                    time[1] = boatRaceId;
                    return time;
                    });
            return list;
            });
}

export function unLinkTime(index: number, setTimes){
    setTimes((times)=>{
            return times.map((time, i) => {
                    if(index === i){
                        time[1] = null;
                    }
                    return time;
                    });
            });
}

export function deleteTime(index: number, setTimes){
    setTimes((times) => {
            return times.filter((item, i) => i !== index);
    });
}


