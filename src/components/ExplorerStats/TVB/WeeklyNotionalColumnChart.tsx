import React, { useContext, useEffect, useState } from 'react';
import { ResponsiveBar, BarDatum } from '@nivo/bar'
import { amountFormatter, usdFormatter, chainColors, chainNameColors, } from "../../../utils/explorer"
import { NotionalTransferred, } from '../../../types/cloud-functions';
import { chainEnums, } from '../../../utils/consts';
import { Typography } from '@mui/material';


const week = 7 * 24 * 60 * 60 * 1000;
const day = 24 * 60 * 60 * 1000;

const launchDate = new Date("2021-09-13T00:00:00.000+00:00")

function startOfWeek(dt: Date): Date {
    const weekday = dt.getDay();
    return new Date(dt.getTime() - Math.abs(0 - weekday) * day);
}
const startOfLaunchWeek = startOfWeek(launchDate).getTime()
function weeksBetween(d2: Date) {
    return Math.ceil((startOfWeek(d2).getTime() - startOfLaunchWeek) / week);
}

interface DailyCountProps {
    daily: NotionalTransferred["Daily"]
    title?: string
}

const WeeklyNotionalColumnChart = (props: DailyCountProps) => {
    const [barData, setBarData] = useState<Array<BarDatum>>([])

    useEffect(() => {
        const data = Object.entries(props.daily).reduce<Array<BarDatum>>((accum, [date, chains]) => {

            const week = weeksBetween(new Date(date + "T00:00:00.000+00:00"))

            if (week < 0) {
                return accum
            }
            accum[week] = Object.entries(chains).reduce<BarDatum>((subAccum, [chain, dest]) => {
                if (chain === "*" || chain === "56" || chain === "0") {

                    return subAccum
                }
                const group = chainEnums[Number(chain)]

                const tokens = dest["*"] || { "*": 0 }

                const todayAmount = tokens["*"]

                const prev = (subAccum[group] || 0)
                const newAmount = Number(prev) + todayAmount
                return {
                    ...subAccum,
                    [group]: newAmount
                }
            }, accum[week] ? { ...accum[week] } : { week })

            return accum
        }, [])


        setBarData(data)

    }, [props.daily])

    const keys = chainEnums.filter(c => c)

    return (
        <div style={{ height: 530, minWidth: 400, flex: '1', marginBottom: 40, fontSize: 16 }}>
            <Typography variant="h3" style={{ marginLeft: 20, marginBottom: 40 }}>{props.title || "Transfers (Notional USD)"}</Typography>

            <ResponsiveBar
                theme={{
                    textColor: "rgba(255, 255, 255, 0.85)", fontSize: 14,
                    labels: {
                        text: { color: 'rgba(0, 0, 0, 0.95)', fontSize: 14, fontWeight: 600 },
                    },
                    axis: {
                        legend: { text: { fontWeight: 500 } }
                    }
                }}
                colors={Object.values(chainColors)}
                data={barData}
                keys={keys}
                enableLabel={false}
                label={({ value }) => {
                    if (!value) return ""
                    return String(amountFormatter(value))
                }}
                labelSkipHeight={16}
                labelTextColor={"rgba(0, 0, 0, 0.85)"}
                groupMode="stacked"
                indexBy="week"
                margin={{
                    top: 10,
                    right: 60,
                    bottom: 60,
                    left: 20,
                }}
                padding={0.3}
                valueScale={{ type: 'linear', max: 'auto', min: 0 }}
                indexScale={{ type: 'band', round: true }}
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisTop={null}
                axisRight={{
                    format: (value) => amountFormatter(Number(value))
                }}
                axisLeft={null}
                axisBottom={{
                    format: (value) => {
                        if (barData.length - 1 === Number(value)) {
                            return "Today"
                        }
                        if (Number(value) % 2 === 0) {
                            return ""
                        }
                        return `Week ${value}`

                    }
                }}
                tooltip={(data) => {
                    let { id, value, indexValue, } = data
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
                            <Typography variant="caption" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>{id} - Week {String(indexValue)}</Typography>
                            <div
                                style={{
                                    display: 'flex',
                                    padding: '3px 0',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                {usdFormatter.format(Number(value))} sent
                            </div>
                        </div>
                    )
                }}
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

export default WeeklyNotionalColumnChart
