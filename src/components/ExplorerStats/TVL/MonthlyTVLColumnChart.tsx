import React, { useEffect, useState } from 'react';
import { ResponsiveBar, BarDatum } from '@nivo/bar'
import { amountFormatter, usdFormatter, chainIdColors, chainNameColors, } from "../../../utils/explorer"
import { NotionalTvlCumulative } from '../../../types/cloud-functions';
import { chainEnums, } from '../../../utils/consts';
import { Typography } from '@mui/material';

const launchDate = new Date("2021-09-13T00:00:00.000+00:00")

function monthsSince(d2: Date) {
    const startMon = launchDate.getMonth() + 1
    const startYear = launchDate.getFullYear()
    const monthNum = d2.getMonth() + 1
    const year = d2.getFullYear();
    const yearDiff = year - startYear
    const months = (yearDiff * 12) + monthNum
    const monthDiff = months - startMon
    return monthDiff
}

interface DailyCountProps {
    daily: NotionalTvlCumulative["DailyLocked"]
    title?: string
}


const MonthlyTVLColumnChart = (props: DailyCountProps) => {

    const [barData, setBarData] = useState<Array<BarDatum>>([])

    useEffect(() => {
        const data = Object.entries(props.daily).reduce<Array<BarDatum>>((accum, [date, chains]) => {

            const month = monthsSince(new Date(date + "T00:00:00.000+00:00"))
            const d = new Date(date)
            const monthStr = `${d.getMonth() + 1}/${String(d.getFullYear()).slice(-2)}`

            if (month < 0) {
                return accum
            }
            accum[month] = Object.entries(chains).reduce<BarDatum>((subAccum, [chain, dest]) => {
                if (chain === "*" || chain === "56" || chain === "0") {
                    return subAccum
                }
                const group = chainEnums[Number(chain)]

                const tokens = dest["*"]

                const todayAmount = tokens.Notional

                return {
                    ...subAccum,
                    [group]: todayAmount
                }
            }, accum[month] ? { ...accum[month] } : { monthStr })

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
                        text: { color: 'rgba(0, 0, 0, 0.95)', fontSize: 18, fontWeight: 500 },
                    },
                    axis: {
                        legend: { text: { fontWeight: 500 } }
                    }
                }}
                colors={chainIdColors.slice(1)}
                data={barData}
                keys={keys}
                enableLabel={true}
                label={({ value }) => {
                    if (!value) return ""
                    return String(amountFormatter(value, 2))
                }}
                labelSkipHeight={16}
                labelTextColor={"rgba(0, 0, 0, 0.85)"}
                groupMode="stacked"
                indexBy="monthStr"
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
                        if (barData[barData.length - 1].monthStr === value) {
                            return value + " (" + new Date().getDate() + " days)"
                        }
                        return value
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
                            <Typography variant="caption" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>{id} {String(indexValue)}</Typography>
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

export default MonthlyTVLColumnChart
