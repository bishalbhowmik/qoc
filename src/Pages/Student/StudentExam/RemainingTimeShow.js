import React, { useState } from 'react'
import { connect } from 'react-redux'

export const RemainingTimeShow = (props) => {

    const [remainingTime, setRemainingTime] = useState('')

    // useEffect(() => {


    // }, [props])


    setInterval(() => {
        let now = new Date();
        let end = new Date(props.state);

        // Convert to local time in "Asia/Dhaka" timezone
        now.toLocaleString("en-US", { timeZone: "Asia/Dhaka" });
        end.toLocaleString("en-US", { timeZone: "Asia/Dhaka" });

        let timeDifference = end - now;

        let seconds = Math.floor((timeDifference / 1000) % 60);
        let minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
        let hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);

        setRemainingTime(`${hours} hours, ${minutes} minutes, ${seconds} seconds`)

        // return `${hours} hours, ${minutes} minutes, ${seconds} seconds`

    }, 1000)

    return (
        <div>
            <div className='font-bold text-center mb-10 text-xl text-red-800'>Time Remaining: {remainingTime}</div>
        </div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(RemainingTimeShow)