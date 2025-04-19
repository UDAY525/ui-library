import './CheckStagerStyle.css'
import {useEffect, useRef, useState} from "react";
const CHECK_STAGE_STEPS = [
    {
        name: "Check Info",
        component: () => <div>Provide your contact details</div>,
    },
    {
        name: "Shipping Info",
        component: () => <div>Provide your shipping address</div>,
    },
    {
        name: "Payment",
        component: () => <div>Payment is completed</div>,
    },
    {
        name: "Delivered",
        component: () => <div>Order has been delivered</div>,
    },
]

const CheckerStage = () => {
    const [currentStage,setCurrentStage] = useState(0);

    const nextStageHandler = () => {
        setCurrentStage(prev => prev>=CHECK_STAGE_STEPS.length-1
            ? CHECK_STAGE_STEPS.length :prev+1)
    }

    const lineRef = useRef(null);
    const completionRef = useRef(null);

    useEffect(() => {
        const itemElements = document.querySelectorAll('.stageNumber');

        if(itemElements.length<2 || !lineRef.current) return;

        const firstItem = itemElements[0];
        const lastItem = itemElements[itemElements.length - 1];

        const firstRect = firstItem.getBoundingClientRect();
        const lastRect = lastItem.getBoundingClientRect();

        const firstCenter = firstRect.left + firstRect.width / 2;
        const lastCenter = lastRect.left + lastRect.width / 2;


        const trackerLine = lineRef.current;
        const completedLine = completionRef.current;
        trackerLine.style.width = `${lastCenter-firstCenter}px`;
        trackerLine.style.marginLeft = `${firstCenter-firstRect.left}px`;
        trackerLine.style.marginRight = `${lastRect.right-lastRect.center}px`;
        if(currentStage === CHECK_STAGE_STEPS.length) return;
        const currentItem = itemElements[currentStage];
        const currentItemRect = currentItem.getBoundingClientRect();
        const currentCenter = currentItemRect.left + currentItemRect.width / 2;
        completedLine.style.width = `${currentCenter - firstCenter}px`;
        console.log(currentItemRect, currentItemRect.left, currentItemRect.right);

    },[currentStage])

    return (<div>
        <h1>Check Stagger</h1>

        <div className='checker-stage'>
            {CHECK_STAGE_STEPS.map((item, index) => {
                const isCompleted = currentStage>index;
                const isActive = currentStage===index;
                return <div className='checkerItems' key={item.name}>
                    <p className={`stageNumber ${isCompleted ?'completed':isActive?'active':''}`}>{isCompleted ?  '\u2714':index + 1}</p>
                    <p>{item.name}</p>
                </div>
            })}
            <div className='connectingLine' ref={lineRef}>
                <div className='fillerLine' ref={completionRef}></div>
            </div>
        </div>

        {currentStage < CHECK_STAGE_STEPS.length ?
            <div className='currentContent'>
            {CHECK_STAGE_STEPS[currentStage].component()}</div>
            : <div className='currentContent'>Completed</div>
        }

        {currentStage<CHECK_STAGE_STEPS.length && <button onClick={nextStageHandler}>Next Stage</button>}
    </div>)
}

export default CheckerStage;