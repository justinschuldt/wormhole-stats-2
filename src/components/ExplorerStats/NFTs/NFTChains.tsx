import { Box, Card, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNetworkContext } from "../../../contexts/NetworkContext";
import { ChainID } from "../../../utils/consts";

import StatCardLarge from "../StatCardLarge";
import { amountFormatter } from "../../../utils/explorer";

import binanceChainIcon from "../../../images/bsc.svg";
import ethereumIcon from "../../../images/eth.svg";
import solanaIcon from "../../../images/solana.svg";

import polygonIcon from "../../../images/polygon.svg";
import avalancheIcon from "../../../images/avalanche.svg";
import oasisIcon from "../../../images/oasis.svg";
import fantomIcon from "../../../images/fantom.svg"
import GridWithCards from "../../GridWithCards";
import { Totals } from "../../../types/cloud-functions";

import StatCardSmall from "../StatCardSmall";
import DailyCountLineChart from "../Messages/DailyCountLineChart";
import WeeklyCountColumnChart from "../Messages/WeeklyCountColumnChart";
import MonthlyCountColumnChart from "../Messages/MonthlyCountColumnChart";

type GroupBy = undefined | "chain" | "address";
type ForChain = undefined | StatsProps["emitterChain"];
type ForAddress = undefined | StatsProps["emitterAddress"];

interface StatsProps {
  emitterChain?: number;
  emitterAddress?: string;
}

const NFTChains: React.FC<StatsProps> = ({
  emitterChain,
  emitterAddress,
}) => {
  const { activeNetwork } = useNetworkContext();
  const [nfts, setNFTs] = useState<Totals>();
  const [address, setAddress] = useState<StatsProps["emitterAddress"]>();
  const [chain, setChain] = useState<StatsProps["emitterChain"]>();
  const [pollInterval, setPollInterval] = useState<NodeJS.Timeout>();
  const [controller, setController] = useState<AbortController>(
    new AbortController()
  );


  const fetchNFTs = (
    baseUrl: string,
    groupBy: GroupBy,
    forChain: ForChain,
    forAddress: ForAddress,
    signal: AbortSignal
  ) => {
    const totalsUrl = `${baseUrl}nfts`;
    let url = `${totalsUrl}?`
    if (groupBy) {
      url = `${url}&groupBy=${groupBy}`;
    }
    if (forChain) {
      url = `${url}&forChain=${forChain}`;
    }
    if (forAddress) {
      url = `${url}&forAddress=${forAddress}`;
    }

    return fetch(url, { signal }).then<Totals>((res) => {
      if (res.ok) return res.json();
      // throw an error with specific message, rather than letting the json decoding throw.
      throw "failed fetching NFTs";
    }).then((result) => {
      setNFTs(result);
    }, (error) => {
      if (error.name !== "AbortError") {
        //  handle errors here instead of a catch(), so that we don't swallow exceptions from components
        console.error("failed fetching nfts. error: ", error);
      }
    });
  };


  const getData = (props: StatsProps, baseUrl: string, signal: AbortSignal) => {
    let forChain: ForChain = undefined;
    let forAddress: ForAddress = undefined;
    let totalsGroupBy: GroupBy = "chain";
    if (props.emitterChain) {
      forChain = props.emitterChain;
      totalsGroupBy = "address";
    }
    if (props.emitterChain && props.emitterAddress) {
      forAddress = props.emitterAddress;
    }
    return Promise.all([
      fetchNFTs(baseUrl, totalsGroupBy, forChain, forAddress, signal),
    ]);
  };

  const pollingController = (
    emitterChain: StatsProps["emitterChain"],
    emitterAddress: StatsProps["emitterAddress"],
    baseUrl: string
  ) => {
    // clear any ongoing intervals
    if (pollInterval) {
      clearInterval(pollInterval);
      setPollInterval(undefined);
    }
    // abort any in-flight requests
    controller.abort();
    // create a new controller for the new fetches, add it to state
    const newController = new AbortController();
    setController(newController);
    // create a signal for requests
    const { signal } = newController;
    // start polling
    let interval = setInterval(() => {
      getData({ emitterChain, emitterAddress }, baseUrl, signal);
    }, 90000);
    setPollInterval(interval);
  };

  useEffect(() => {
    // getData if first load (no totals or recents), or emitterAddress/emitterChain changed.
    if (
      !nfts ||
      emitterAddress !== address ||
      emitterChain !== chain
    ) {
      getData(
        { emitterChain, emitterAddress },
        activeNetwork.endpoints.bigtableFunctionsBase,
        new AbortController().signal
      );
    }
    controller.abort();
    setNFTs(undefined);


    pollingController(
      emitterChain,
      emitterAddress,
      activeNetwork.endpoints.bigtableFunctionsBase
    );
    // hold chain & address in state to detect changes
    setChain(emitterChain);
    setAddress(emitterAddress);
  }, [
    emitterChain,
    emitterAddress,
    activeNetwork.endpoints.bigtableFunctionsBase,
  ]);

  useEffect(() => {
    return function cleanup() {
      controller.abort();
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [pollInterval, activeNetwork.endpoints.bigtableFunctionsBase]);


  return (
    <>
      {!nfts ? (
        <Card
          sx={{
            backgroundColor: "rgba(255,255,255,.07)",
            backgroundImage: "none",
            borderRadius: "28px",
            padding: "24px",
            textAlign: "center",
            mt: 5,
          }}
        >
          <CircularProgress />
        </Card>
      ) : (
        <>

          {!emitterChain && !emitterAddress &&
            nfts && nfts.TotalCount &&
            <div style={{ margin: '140px 0' }}>
              <StatCardLarge title="NFTs Bridged" label="Transferred by Wormhole" stat={amountFormatter(nfts.TotalCount["*"])} />
            </div>
          }


          {!emitterChain && !emitterAddress ? (
            nfts && nfts.TotalCount ? (
              <GridWithCards
                spacing={3}
                sm={6}
                md={3}
                cardPaddingTop={3}
                imgAlignMd="center"
                imgOffsetRightMd="0px"
                imgOffsetTopXs="0px"
                imgOffsetTopMd="-36px"
                imgOffsetTopMdHover="-52px"
                imgPaddingBottomXs={3}
                headerTextAlign="center"
                data={[
                  {
                    header: ChainID[1],
                    src: solanaIcon,
                    description: (
                      <StatCardSmall
                        label="Bridged"
                        stat={amountFormatter(nfts.TotalCount["1"] || 0)}
                      />
                    ),
                    imgStyle: { height: 110 },
                  },
                  {
                    header: ChainID[2],
                    src: ethereumIcon,
                    description: (
                      <StatCardSmall
                        label="Bridged"
                        stat={amountFormatter(nfts.TotalCount["2"] || 0)}
                      />
                    ),
                    imgStyle: { height: 110 },
                  },
                  {
                    header: ChainID[4],
                    src: binanceChainIcon,
                    description: (
                      <StatCardSmall
                        label="Bridged"
                        stat={amountFormatter(nfts.TotalCount["4"] || 0)}
                      />
                    ),
                    imgStyle: { height: 110 },
                  },
                  {
                    header: ChainID[5],
                    src: polygonIcon,
                    description: (
                      <StatCardSmall
                        label="Bridged"
                        stat={amountFormatter(nfts.TotalCount["5"] || 0)}
                      />
                    ),
                    imgStyle: { height: 110 },
                  },
                  {
                    header: ChainID[6],
                    src: avalancheIcon,

                    description: (
                      <StatCardSmall
                        label="Bridged"
                        stat={amountFormatter(nfts.TotalCount["6"] || 0)}
                      />
                    ),
                    imgStyle: { height: 110 },
                  },
                  {
                    header: ChainID[7],
                    src: oasisIcon,
                    description: (
                      <StatCardSmall
                        label="Bridged"
                        stat={amountFormatter(nfts.TotalCount["7"] || 0)}
                      />
                    ),
                    imgStyle: { height: 110 },
                  }
                ].concat(
                  // check the we have transfer data before adding the fantom card
                  ("10" in nfts.TotalCount) &&
                    (nfts.TotalCount["10"] > 0) ?
                    [{
                      header: ChainID[10],
                      src: fantomIcon,
                      description: (
                        <StatCardSmall
                          label="Bridged"
                          stat={amountFormatter(nfts.TotalCount["10"] || 0)}
                        />
                      ),
                      imgStyle: { height: 110 },
                    }] : []
                )}
              />
            ) : (
              <Box
                sx={{
                  padding: "24px",
                  textAlign: "center",
                }}
              >
                <CircularProgress />
              </Box>
            )
          ) : null}

          {nfts && nfts.DailyTotals &&
            <Card
              sx={{
                backgroundColor: "rgba(255,255,255,.07)",
                backgroundImage: "none",
                borderRadius: "28px",
                padding: "24px",
              }}
              style={{ margin: '140px 0', padding: '100px 0' }}

            >
              <MonthlyCountColumnChart title="Monthly Messages by Chain" daily={nfts.DailyTotals} />
            </Card>
          }


          {nfts && nfts.DailyTotals &&
            <Card
              sx={{
                backgroundColor: "rgba(255,255,255,.07)",
                backgroundImage: "none",
                borderRadius: "28px",
                padding: "24px",
              }}
              style={{ margin: '140px 0', padding: '100px 0' }}

            >
              <WeeklyCountColumnChart title="Weekly Messages by Chain" daily={nfts.DailyTotals} />
            </Card>
          }

          {nfts && nfts.DailyTotals &&
            <Card
              sx={{
                backgroundColor: "rgba(255,255,255,.07)",
                backgroundImage: "none",
                borderRadius: "28px",
                padding: "24px",
              }}
              style={{ margin: '140px 0', padding: '100px 0' }}
            >
              <DailyCountLineChart title="Daily Messages by Chain" daily={nfts.DailyTotals} />
            </Card>
          }

          {nfts && nfts.DailyTotals &&
            <Card
              sx={{
                backgroundColor: "rgba(255,255,255,.07)",
                backgroundImage: "none",
                borderRadius: "28px",
                padding: "24px",
              }}
              style={{ margin: '140px 0', padding: '60px' }}
            >
              <div>This data comes from the following endpoints:</div>
              <ul>
                <li>
                  https://europe-west3-wormhole-315720.cloudfunctions.net/mainnet-nfts
                </li>
              </ul>

            </Card>
          }
        </>
      )}
    </>
  );
};

export default NFTChains;
