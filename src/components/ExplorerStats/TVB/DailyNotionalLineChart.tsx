import React, { useEffect, useState } from 'react';
import { NotionalTransferredToCumulative } from '../../../types/cloud-functions';


import { ResponsiveLine, Serie } from '@nivo/line'


import { makeDate, makeGroupName, chainColors, amountFormatter, usdFormatter, chainNameColors } from "../../../utils/explorer"

import { chainEnums, ChainID, ChainIDs, chainIDs } from '../../../utils/consts';
import { NFTBridgeSetup } from '@certusone/wormhole-sdk';
import { Typography } from '@mui/material';

interface DailyCountProps {
    daily: NotionalTransferredToCumulative["Daily"]
    lastFetched?: number
    title: string,
    emitterChain?: number,
    emitterAddress?: string
}


const DailyNotionalLineChart = (props: DailyCountProps) => {
    const [data, setData] = useState<Array<Serie>>([])
    const colors = [
        "hsl(9, 100%, 61%)",
        "hsl(30, 100%, 61%)",
        "hsl(54, 100%, 61%)",
        "hsl(82, 100%, 61%)",
        "hsl(114, 100%, 61%)",
        "hsl(176, 100%, 61%)",
        "hsl(224, 100%, 61%)",
        "hsl(270, 100%, 61%)",
        "hsl(320, 100%, 61%)",
        "hsl(360, 100%, 61%)",
    ]

    useEffect(() => {
        const sortedDays = Object.keys(props.daily).sort((a: string, b: string) => a > b ? 1 : 0)

        const datum = sortedDays.reduce<{ [groupKey: string]: Serie }>((accum, date) => {
            const chains = props.daily[date]
            const subKeyColors: { [key: string]: string } = {}

            return Object.keys(chains).sort((a, b) => a > b ? 1 : 0).reduce<{ [groupKey: string]: Serie }>((subAccum, chainId) => {
                if (props.emitterAddress && chainId === "*" || chainId === "56" || chainId === "0") {
                    // if this chart is for a single emitterAddress, no need for "all messages" line.
                    return subAccum
                }
                let group = ChainID[Number(chainId)]

                if (!group) {
                    return subAccum
                }

                if (!(group in subAccum)) {
                    // first time this group has been seen
                    subAccum[group] = { id: group, data: [] }
                    if (chainId in chainColors) {
                        subAccum[group].color = chainColors[chainId]
                    } else {

                        if (!(chainId in subKeyColors)) {
                            let len = Object.keys(subKeyColors).length
                            subKeyColors[chainId] = colors[len]
                        }
                        subAccum[group].color = subKeyColors[chainId]
                    }
                }
                let amount = chains[chainId]["*"]
                subAccum[group].data.push({
                    "y": amount.toFixed(2),
                    "x": date
                })
                return subAccum
            }, accum)
        }, {})

        setData(Object.values(datum))
    }, [props.daily, props.lastFetched, props.emitterChain, props.emitterAddress])


    return (
        <div style={{ flexGrow: 1, height: 530, marginBottom: 40, fontSize: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h3" style={{ marginLeft: 20, marginBottom: 40 }}>{props.title}</Typography>
            </div>
            <ResponsiveLine
                theme={{ textColor: "rgba(255, 255, 255, 0.85)", fontSize: 16, legends: { text: { fontSize: 16 } } }}
                colors={({ color }) => color}

                data={data}
                curve={"monotoneX"}
                margin={{ top: 10, right: 60, bottom: 60, left: 20 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', stacked: true, max: 'auto', min: 0 }}
                enableGridX={false}
                axisTop={null}
                axisBottom={{
                    format: (value: string) => {
                        let [year, month, day] = value.split("-")
                        if (Number(day) === 1) {
                            return `${month}/${day}`
                        }
                        return ""
                    }
                }}
                axisRight={{
                    tickPadding: 5,
                    tickRotation: 0,
                    format: (value) => amountFormatter(Number(value))
                }}
                axisLeft={null}
                pointSize={4}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                enableSlices={"x"}
                isInteractive={true}
                sliceTooltip={({ slice }) => {
                    return (
                        <div
                            style={{
                                background: '#010114',
                                padding: '9px 12px',
                                border: '1px solid rgba(255, 255, 255, 0.85)',
                                color: "rgba(255, 255, 255, 0.85)",
                                fontSize: 14
                            }}
                        >
                            <Typography variant="caption" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>{slice.points[0].data.xFormatted}</Typography>
                            {slice.points.map(point => (
                                <div
                                    key={point.id}
                                    style={{
                                        display: 'flex',
                                        padding: '3px 0',
                                    }}
                                >
                                    <div style={{ background: point.serieColor, height: 16, width: 16, }} />&nbsp;
                                    <span>{point.serieId}</span>&nbsp;-&nbsp;{usdFormatter.format(Number(point.data.y))}
                                </div>
                            ))}
                        </div>
                    )
                }}
            // enableArea={true}
            // areaOpacity={0.06}
            />
            <div
                style={{
                    display: 'flex',
                    justifyContent: "space-evenly",
                    width: '100%',
                    flexDirection: 'row-reverse',
                }}
            >
                {chainEnums.filter(c => c).map((chain) => <div key={chain} style={{ display: 'flex', alignItems: 'center', }}>
                    <div style={{ background: chainNameColors[chain], height: 16, width: 16, display: 'inline-block' }} />&nbsp;
                    <span>{chain}</span>

                </div>)}
            </div>
        </div>
    )
}

export default DailyNotionalLineChart
