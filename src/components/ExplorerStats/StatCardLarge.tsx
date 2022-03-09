import React, { useState, useEffect } from 'react'

import { Card, Typography } from "@mui/material";

interface StatCardLargeProps {
    title: string
    label: string
    stat: string
}

const StatCardLarge: React.FC<StatCardLargeProps> = (props) => {
    const [stat, setStat] = useState<string>()
    const [animate, setAnimate] = useState<boolean>(false)

    useEffect(() => {
        let timeout: NodeJS.Timeout
        if (stat !== props.stat) {
            setStat(props.stat)
            setAnimate(true)
            timeout = setTimeout(() => {
                setAnimate(false)
            }, 2000)
        }
        return function cleanup() {
            if (timeout) {
                clearTimeout(timeout)
            }
        }
    }, [props.stat])


    const flexColumnCentered = { display: 'flex', flexDirection: "column" as any, justifyContent: "flex-start", alignItems: 'center' }

    return (

        <Card
            sx={{
                backgroundColor: "rgba(255,255,255,.07)",
                backgroundImage: "none",
                backdropFilter: 'blur(21px)',
                height: "100%",
                overflow: "visible",
                borderRadius: "28px",
            }}
        >
            <div>
                <div style={{ ...flexColumnCentered, flexDirection: 'row', gap: 6, padding: '2vw 3vw 0 3vw' }}>
                    <Typography variant='h2' style={{ display: 'block', color: 'white' }}>{props.title}</Typography>
                </div>
                <div style={{ alignSelf: 'center', width: '100%', padding: '2vw 3vw' }}>
                    <div>
                        {stat &&
                            <div style={{ ...flexColumnCentered, alignItems: "flex-start", }}>

                                <svg viewBox="0 0 132 18"
                                    style={{ width: '100%', marginBottom: '2em', fill: 'white' }}
                                    className={animate ? "highlight-new-val" : ""}
                                >
                                    <text x="0" y="15">{stat}</text>
                                </svg>
                                <div style={{ alignSelf: 'flex-end' }}>
                                    <Typography variant="subtitle1" style={{ fontSize: '2vw' }}>{props.label}</Typography>
                                </div>
                            </div>
                        }
                    </div>
                </div>

            </div>
        </Card>
    )
}

export default StatCardLarge
