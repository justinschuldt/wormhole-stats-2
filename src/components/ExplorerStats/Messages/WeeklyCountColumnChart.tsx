import React, { useEffect, useState } from 'react';
import { Totals } from '../../../types/cloud-functions';
import { ResponsiveBar, BarDatum } from '@nivo/bar'
import { amountFormatter, chainIdColors, chainNameColors, } from "../../../utils/explorer"

import { chainEnums } from '../../../utils/consts';
import { Typography } from '@mui/material';


const week = 7 * 24 * 60 * 60 * 1000;
const day = 24 * 60 * 60 * 1000;

function startOfWeek(dt: Date): Date {
    const weekday = dt.getDay();
    return new Date(dt.getTime() - Math.abs(0 - weekday) * day);
}
const launchDate = new Date("2021-09-13T00:00:00.000+00:00")
const startOfLaunchWeek = startOfWeek(launchDate).getTime()
function weeksBetween(d2: Date) {

    return Math.ceil((startOfWeek(d2).getTime() - startOfLaunchWeek) / week);
}

interface DailyCountProps {
    daily: Totals["DailyTotals"]
    title: string

}

const WeeklyCountColumnChart = (props: DailyCountProps) => {
    const [data, setData] = useState<Array<BarDatum>>([])

    useEffect(() => {

        const datum = Object.keys(props.daily).reduce<Array<BarDatum>>((accum, date) => {

            const chains = props.daily[date]
            const week = weeksBetween(new Date(date + "T00:00:00.000+00:00"))

            accum[week] = Object.keys(chains).reduce<BarDatum>((subAccum, chain) => {
                if (chain === "*" || chain === "56" || chain === "0") {
                    return subAccum
                }

                const group = chainEnums[Number(chain)]

                const todayAmount = chains[chain]

                return {
                    ...subAccum,
                    [group]: todayAmount
                }

            }, accum[week] ? { ...accum[week] } : { week })
            return accum
        }, [])

        setData(datum)
    }, [props.daily])


    const keys = chainEnums.filter(c => c)

    return (
        <div style={{ height: 530, minWidth: 400, flex: '1', marginBottom: 40 }}>
            <Typography variant="h3" style={{ marginBottom: 60, marginLeft: 30 }}>{props.title}</Typography>

            <ResponsiveBar
                theme={{
                    textColor: "rgba(255, 255, 255, 0.85)", fontSize: 12,
                    labels: {
                        text: { color: 'rgba(0, 0, 0, 0.85)', fontSize: 12, fontWeight: 500 },
                    },
                    axis: {
                        legend: { text: { fontWeight: 500, fontSize: 8 } }
                    }
                }}
                data={data}
                keys={keys}
                colors={chainIdColors.slice(1)}
                groupMode="stacked"
                indexBy="week"
                margin={{
                    top: 10,
                    right: 60,
                    bottom: 60,
                    left: 20,
                }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisTop={null}
                axisLeft={null}
                axisRight={{
                    format: (value) => amountFormatter(Number(value), 0)
                }}
                axisBottom={{
                    format: (value) => {
                        if (data[data.length - 1].week === value) {
                            return value + " - " + new Date().getDate() + " days"
                        }
                        return value
                    }
                }}
                label={({ value }) => {
                    if (!value) return ""
                    return String(amountFormatter(value, 0))
                }}
                labelSkipWidth={20}
                labelSkipHeight={16}
                labelTextColor={"rgba(0, 0, 0, 0.85)"}

                tooltip={(data) => {
                    let { id, value, indexValue } = data

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
                                <span>{value} messages</span>
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

export default WeeklyCountColumnChart
