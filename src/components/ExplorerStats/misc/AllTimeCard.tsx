import React, { useState, useEffect } from 'react'

import { Card, Typography } from "@mui/material";

import {
    AddressesTransferredToCumulative,
    NotionalTransferred,
    NotionalTransferredToCumulative,
    Totals
} from "../../../types/cloud-functions";
import { usdFormatter } from '../../../utils/explorer';


interface AllTimeCardProps {
    title: string
    label: string
    dataKey: "*" | "1" | "2" | "3" | "4" | "5"
    messages?: Totals
    nfts?: Totals
    totalDays: number
    notionalTransferred?: NotionalTransferred
    notionalTransferredToCumulative?: NotionalTransferredToCumulative
    addressesTransferredTo?: AddressesTransferredToCumulative
}

const AllTimeCard: React.FC<AllTimeCardProps> = ({ title, label, dataKey, messages, nfts, totalDays, notionalTransferred, notionalTransferredToCumulative, addressesTransferredTo }) => {

    const [totalNotional, setTotalNotional] = useState<number>()
    const [totalMessages, setTotalMessages] = useState<number>()
    const [numAddresses, setNumAddresses] = useState<number>()
    const [numNFTs, setNumNFTs] = useState<number>()
    const [animate, setAnimate] = useState<boolean>(false)

    useEffect(() => {

        // hold values from props in state, so that we can detect changes and add animation class
        setTotalNotional(notionalTransferredToCumulative?.AllTime[dataKey]["*"])
        setTotalMessages(messages?.TotalCount[dataKey])
        setNumAddresses(addressesTransferredTo?.AllTimeCounts[dataKey])
        setNumNFTs(nfts?.TotalCount[dataKey])

        // TODO - animate state updates for all the values of this component

        let timeout: NodeJS.Timeout
        if (messages?.LastDayCount[dataKey] && totalMessages !== messages?.LastDayCount[dataKey]) {
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
    }, [messages?.TotalCount[dataKey], notionalTransferredToCumulative?.AllTime[dataKey], nfts?.TotalCount[dataKey], addressesTransferredTo?.AllTimeCounts[dataKey], dataKey, totalMessages, totalNotional, numAddresses, numNFTs])



    // styles
    const border = '1px solid #303030'
    const flexColumnCentered = { display: 'flex', flexDirection: "column" as any, justifyContent: "flex-start", alignItems: 'center' }
    const labelStyle = {}
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

            <div >
                <div style={{ ...flexColumnCentered, flexDirection: 'row', gap: 6, padding: '2vw 3vw 0 3vw' }}>
                    <Typography variant='h2' style={{ display: 'block', color: 'white' }}>{title}</Typography>
                </div>
                <div style={{ alignSelf: 'center', width: '100%', padding: '2vw 3vw' }}>
                    <div>
                        {totalNotional &&
                            <div style={{ ...flexColumnCentered, alignItems: "flex-start", }}>

                                <svg viewBox="0 0 128 18" style={{ width: '100%', marginBottom: '2em', fill: 'white' }}>
                                    <text x="0" y="15">{usdFormatter.format(totalNotional)}</text>
                                </svg>
                                <div style={{ alignSelf: 'flex-end' }}><Typography variant="subtitle1" style={{ fontSize: '2vw' }}>{label}</Typography></div>
                            </div>
                        }
                    </div>
                </div>
                <div>
                    <div>
                        {!!totalMessages &&
                            <div style={flexColumnCentered}>
                                <div><Typography className={animate ? "highlight-new-val" : ""} style={{ fontSize: '6vw' }}>{totalMessages.toLocaleString()}</Typography></div>
                                <div style={labelStyle}><Typography variant="h4" style={{ fontSize: '2vw' }}>messages processed</Typography></div>
                            </div>
                        }
                    </div>
                    <div>
                        {!!numAddresses &&
                            <div style={{ ...flexColumnCentered, borderLeft: border, borderRight: border }}>
                                <div><Typography style={{ fontSize: '6vw' }}>{numAddresses.toLocaleString()}</Typography></div>
                                <div style={labelStyle}><Typography variant="h4" style={{ fontSize: '2vw' }}>unique addresses</Typography></div>
                            </div>
                        }
                    </div>
                    <div>
                        {!!numNFTs &&
                            <div style={flexColumnCentered}>
                                <div><Typography style={{ fontSize: '6vw' }}>{numNFTs.toLocaleString()}</Typography></div>
                                <div style={labelStyle}><Typography variant="h4" style={{ fontSize: '2vw' }}>NFTs bridged</Typography></div>
                            </div>
                        }
                    </div>

                </div>
            </div>
        </Card>
    )
}

export default AllTimeCard
