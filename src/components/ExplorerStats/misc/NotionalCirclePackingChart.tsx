import React, { useEffect, useState } from 'react';
import { NotionalTransferredToCumulative } from '../../../types/cloud-functions';
import { ResponsiveCirclePacking, CirclePacking } from '@nivo/circle-packing'
import { chainColors, usdFormatter } from "../../../utils/explorer"

import { ChainID } from '../../../utils/consts';
import { Typography } from '@mui/material';


interface DailyCountProps {
    allTime: NotionalTransferredToCumulative["AllTime"]
    lastFetched?: number
    title: string,
    emitterChain?: number,
    emitterAddress?: string
}
interface CirclePackingPoint {
    color: string
    symbol: string
    amount: number
    name: string
}
interface CirclePackingData {
    symbol: string
    name: string
    color: string
    children: Array<CirclePackingData | CirclePackingPoint>
}
const stringToColour = function (str: string) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
}

const NotionalCirclePackingChart = (props: DailyCountProps) => {

    const [data, setData] = useState<CirclePackingData>()
    const [zoomedId, setZoomedId] = useState<string | null>(null)

    useEffect(() => {

        // remove the all key/value
        const all = "*"
        const { [all]: _, ...chains } = props.allTime
        const datum = Object.keys(chains).reduce<CirclePackingData>((accum, chainId) => {
            if (chainId === "*" || chainId === "56" || chainId === "0") {
                return accum
            }

            const symbols = props.allTime[chainId]
            const chain = Object.keys(symbols).reduce<CirclePackingData>((subAccum, symbol) => {
                if (symbol == "*") {
                    return subAccum
                }

                subAccum.children.push({
                    symbol: symbol + '-' + chainId,
                    name: symbol,
                    color: stringToColour(symbol),
                    amount: symbols[symbol]
                })

                return subAccum
            }, {
                symbol: ChainID[Number(chainId)],
                name: ChainID[Number(chainId)],
                color: chainColors[chainId],
                children: []
            })

            accum.children.push(chain)
            return accum

        }, {
            name: "Wormhole",
            symbol: "Wormhole",
            color: "hsl(183, 100%, 61%)",
            children: []
        })
        console.log('circle data ', datum)
        setData(datum)
    }, [props.allTime, props.lastFetched, props.emitterChain, props.emitterAddress])


    return (
        <div style={{ flexGrow: 1, height: 800, width: '100%', display: 'flex', placeContent: 'center' }}>

            {data ? (
                <>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h3" style={{ marginLeft: 20 }}>{props.title}</Typography>
                    </div>
                    <CirclePacking
                        width={800}
                        height={800}
                        id='symbol'
                        value='amount'
                        padding={2}
                        labelsSkipRadius={16}

                        labelsFilter={label => label.node.height === 0}
                        labelTextColor={{
                            from: 'color',
                            modifiers: [['darker', 4]],
                        }}
                        label={(value) => {
                            let [symbol, chain] = value.id.split('-')
                            return symbol
                        }}
                        theme={{
                            // textColor: "rgba(255, 255, 255, 0.85)",
                            // fontSize: 16, legends: { text: { fontSize: 16 } },
                            // tooltip: {
                            //     container: {
                            //         // background: '#FFF',
                            //     },
                            // },
                        }}
                        inheritColorFromParent={true}
                        colors={["#010114", ...Object.values(chainColors)]}
                        colorBy={'id'}
                        enableLabels={true}
                        data={data}
                        // colors={(item) => {
                        //     console.log('item', item)
                        //     let [symbol, chain] = item.id.split('-')
                        //     if (ChainID[symbol as any]) {
                        //         return chainColors[ChainID[symbol as any]]
                        //     }
                        //     return (item?.color as any)
                        // }}
                        valueFormat={value => usdFormatter.format(value)}
                        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                        tooltip={({ id, value, color }) => {

                            let [name, _] = id.split('-')
                            if (name === "Wormhole") return <></>
                            return (
                                <div style={{
                                    background: '#010114',
                                    padding: '9px 12px',
                                    border: '1px solid rgba(255, 255, 255, 0.85)',
                                }}>
                                    <strong style={{ color }}>
                                        {name}: {usdFormatter.format(value)}
                                    </strong>
                                </div>
                            )
                        }}
                        zoomedId={zoomedId}
                        motionConfig="slow"
                        onClick={node => {
                            setZoomedId(zoomedId === node.id ? null : node.id)
                        }}
                    />
                </>
            ) : null
            }
        </div >
    )
}


export default NotionalCirclePackingChart
