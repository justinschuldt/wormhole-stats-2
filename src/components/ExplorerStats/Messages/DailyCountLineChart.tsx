import React, { useEffect, useState } from 'react';
import { Totals } from '../../../types/cloud-functions';
import { ResponsiveLine, Serie } from '@nivo/line'
import { makeDate, chainColors, chainNameColors } from "../../../utils/explorer"
import { chainEnums, ChainID, } from '../../../utils/consts';
import { Typography } from '@mui/material';


interface DailyCountProps {
    daily: Totals["DailyTotals"]
    lastFetched?: number
    title: string,
    emitterChain?: number,
    emitterAddress?: string
}

const DailyCountLineChart = (props: DailyCountProps) => {

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
        const chainsDaily: { [chainId: string]: Array<number> } = {}
        const datum = Object.keys(props.daily).reduce<{ [groupKey: string]: Serie }>((accum, key) => {
            const vals = props.daily[key]
            const subKeyColors: { [key: string]: string } = {}

            return Object.keys(vals).reduce<{ [groupKey: string]: Serie }>((subAccum, subKey) => {
                if (subKey === "*") {
                    return accum
                }
                if (props.emitterAddress && subKey === "*" || subKey === "56" || subKey === "0") {
                    // if this chart is for a single emitterAddress, no need for "all messages" line.
                    return subAccum
                }


                const group = ChainID[Number(subKey)]
                const todayAmount = vals[subKey]
                const prev = chainsDaily[subKey] ? chainsDaily[subKey][chainsDaily[subKey].length - 1] : 0
                const newAmount = Number(prev) + todayAmount

                chainsDaily[subKey] = [...chainsDaily[subKey] || [], newAmount]

                if (!(group in subAccum)) {
                    // first time this group has been seen
                    subAccum[group] = { id: group, data: [] }
                    if (subKey in chainColors) {
                        subAccum[group].color = chainColors[subKey]
                    } else {

                        if (!(subKey in subKeyColors)) {
                            let len = Object.keys(subKeyColors).length
                            subKeyColors[subKey] = colors[len]
                        }
                        subAccum[group].color = subKeyColors[subKey]
                    }
                }

                subAccum[group].data.push({
                    "y": newAmount,  // vals[subKey],
                    "x": key
                })
                return subAccum
            }, accum)
        }, {})

        setData(Object.values(datum))
    }, [props.daily, props.lastFetched, props.emitterChain, props.emitterAddress])

    return (
        <div style={{ flexGrow: 1, height: 530, marginBottom: 40 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h3" style={{ marginBottom: 60, marginLeft: 30 }}>{props.title}</Typography>

            </div>
            <ResponsiveLine
                theme={{ textColor: "rgba(255, 255, 255, 0.85)", fontSize: 12, legends: { text: { fontSize: 16 } } }}
                colors={({ color }) => color}
                data={data}
                curve={"monotoneX"}
                margin={{ top: 10, right: 60, bottom: 60, left: 20 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', max: 'auto', min: 'auto', stacked: true }}
                enableGridX={false}
                axisTop={null}
                axisLeft={null}
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
                }}
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
                                    <span>{point.serieId}</span>&nbsp;-&nbsp;{point.data.yFormatted}
                                </div>
                            ))}
                        </div>
                    )
                }}
            // enableArea={true}
            // defs={[
            //     {
            //         id: 'gradientA',
            //         type: 'linearGradient',
            //         colors: [
            //             { offset: 0, color: 'inherit', opacity: 0.5 },
            //             { offset: 100, color: 'inherit', opacity: 0.5 },
            //         ]
            //     }]}
            // fill={[{ match: '*', id: 'gradientA' }]}
            />
            <div
                style={{
                    display: 'flex',
                    justifyContent: "space-evenly",
                    width: '100%',
                }}
            >
                {chainEnums.filter(c => c).map((chain) => <div key={chain} style={{ display: 'flex', alignContent: 'center' }}>
                    <div style={{ background: chainNameColors[chain], height: 16, width: 16, display: 'inline-block' }} />&nbsp;
                    <span>{chain}</span>

                </div>)}
            </div>
        </div>
    )
}

export default DailyCountLineChart
