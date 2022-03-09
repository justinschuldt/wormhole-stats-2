import React, { useEffect, useState } from 'react';
import { NotionalTransferred } from '../../../types/cloud-functions';


import { ResponsiveChord, Chord } from '@nivo/chord'

import { chainColors, usdFormatter } from "../../../utils/explorer"
import { Typography } from '@mui/material';
import { chainEnums } from '../../../utils/consts';

interface DailyCountProps {
    withinPeriod: NotionalTransferred["WithinPeriod"]
    lastFetched?: number
    title: string,
    emitterChain?: number,
    emitterAddress?: string
}

type Points = Array<number>
type ChordData = Array<Points>
const NotionalChordChart = (props: DailyCountProps) => {

    const [data, setData] = useState<ChordData>([])


    useEffect(() => {

        const datum = Object.keys(props.withinPeriod).reduce<number[][]>((accum, leavingChainId) => {
            const destChains = props.withinPeriod[leavingChainId]
            if (leavingChainId === "*" || leavingChainId === "56" || leavingChainId === "0") {
                return accum
            }

            let leavingChainIndex = Number(leavingChainId) - 1
            return Object.keys(destChains).reduce<number[][]>((subAccum, destChainId) => {
                if (destChainId === "*" || destChainId === "56" || destChainId === "0") {
                    return subAccum
                }

                let destChainIndex = Number(destChainId) - 1
                if (!subAccum[destChainIndex]) {

                    subAccum[destChainIndex] = []
                }

                let destSymbols = destChains[destChainId] || { "*": 0 }
                subAccum[destChainIndex][leavingChainIndex] = destSymbols["*"]

                return subAccum
            }, accum)
        }, [])
        console.log('chord data ', datum)
        setData(datum)
    }, [props.withinPeriod, props.lastFetched, props.emitterChain, props.emitterAddress])

    const ArcTooltip = (data: any) => {
        let { arc } = data
        return (
            <div style={{
                background: '#010114',
                padding: '9px 12px',
                border: '1px solid rgba(255, 255, 255, 0.85)',
            }}>
                <strong style={{ color: arc.color }}>
                    {arc.label}
                </strong>
            </div>
        )
    }

    const RibbonTooltip = (data: any) => {
        let { ribbon } = data
        let netChange = 0
        let benefactor
        if (ribbon.source.value > ribbon.target.value) {
            netChange = ribbon.source.value - ribbon.target.value
            benefactor = <strong style={{ color: ribbon.source.color }}>{ribbon.source.id}</strong>
        } else if (ribbon.source.value < ribbon.target.value) {
            netChange = ribbon.target.value - ribbon.source.value
            benefactor = <strong style={{ color: ribbon.target.color }}>{ribbon.target.id}</strong>
        }

        return (< div style={{
            background: '#010114',
            padding: '9px 12px',
            border: '1px solid rgba(255, 255, 255, 0.85)',
        }}>
            <div style={{ display: 'flex', padding: '3px 0', }}>

                <strong style={{ color: ribbon.source.color }}>
                    {ribbon.source.id}
                </strong>
                &nbsp;to&nbsp;
                <strong style={{ color: ribbon.target.color }}>
                    {ribbon.target.id}
                </strong>
                :&nbsp;{usdFormatter.format(ribbon.target.value)}
            </div>
            <div style={{ display: 'flex', padding: '3px 0', }} >
                <strong style={{ color: ribbon.target.color }}>
                    {ribbon.target.id}
                </strong>
                &nbsp;to&nbsp;
                <strong style={{ color: ribbon.source.color }}>
                    {ribbon.source.id}
                </strong>
                :&nbsp;{usdFormatter.format(ribbon.source.value)}
            </div>
            {netChange && benefactor &&
                <div style={{ display: 'flex', padding: '3px 0', }} >
                    Net&nbsp;change:&nbsp;+{usdFormatter.format(netChange)}&nbsp;to&nbsp;{benefactor}
                </div>
            }
        </div >)
    }

    return (
        <div style={{ flexGrow: 1, height: 800, width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h3" style={{ marginLeft: 20 }}>{props.title}</Typography>

            </div>
            {data && data[0] && data[0][0] && <Chord

                width={800}
                height={800}
                keys={chainEnums.filter(c => c)}
                theme={{
                    fontSize: 16,
                    legends: {
                        text: { fontSize: 16 }
                    }
                }}
                colors={Object.values(chainColors)}
                data={data}
                valueFormat={value => usdFormatter.format(value)}

                margin={{ top: 80, right: 20, bottom: 20, left: 20 }}
                arcTooltip={ArcTooltip}
                ribbonTooltip={RibbonTooltip}
                innerRadiusRatio={0.96}
                innerRadiusOffset={0.02}
                arcOpacity={1}
                arcBorderWidth={1}
                arcBorderColor={{ from: 'color', modifiers: [['darker', 0.4]] }}
                padAngle={0.12}
                ribbonOpacity={0.7}
                ribbonBorderWidth={1}
                ribbonBorderColor={{ from: 'color', modifiers: [['darker', 0.4]] }}
                enableLabel={true}
                label={(e) => e.id} // + " - " + usdFormatter.format(e.value) }
                labelRotation={-120}
                isInteractive={true}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1]] }}
                // arcHoverOpacity={1}
                // arcHoverOthersOpacity={0.25}
                // ribbonHoverOpacity={0.85}
                // ribbonHoverOthersOpacity={0.25}
                animate={true}
                // motionStiffness={90}
                // motionDamping={7}
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: 70,
                        itemWidth: 80,
                        itemHeight: 14,
                        itemsSpacing: 0,
                        itemTextColor: '#999',
                        itemDirection: 'left-to-right',
                        symbolSize: 12,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000'
                                }
                            }
                        ]
                    }
                ]}
                layers={['ribbons', 'arcs', 'labels', 'legends']}
            />}
        </div>
    )
}

export default NotionalChordChart
