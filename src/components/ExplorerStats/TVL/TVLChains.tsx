import { Box, Card, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNetworkContext } from "../../../contexts/NetworkContext";
import { ChainID } from "../../../utils/consts";


import StatCardLarge from "../StatCardLarge";
import { amountFormatter } from "../../../utils/explorer";


import binanceChainIcon from "../../../images/bsc.svg";
import ethereumIcon from "../../../images/eth.svg";
import solanaIcon from "../../../images/solana.svg";
import terraIcon from "../../../images/terra.svg";
import polygonIcon from "../../../images/polygon.svg";
import avalancheIcon from "../../../images/avalanche.svg";
import oasisIcon from "../../../images/oasis.svg";
import fantomIcon from "../../../images/fantom.svg"
import GridWithCards from "../../GridWithCards";
import {
  NotionalTvl,
  NotionalTvlCumulative,
} from "../../../types/cloud-functions";
import { usdFormatter } from "../../../utils/explorer";
import StatCardSmall from "../StatCardSmall";
import WeeklyTVLColumnChart from "./WeeklyTVLColumnChart";
import DailyTVLLineChart from "./DailyTVLLineChart";
import MonthlyTVLColumnChart from "./MonthlyTVLColumnChart";

type GroupBy = undefined | "chain" | "address";
type ForChain = undefined | StatsProps["emitterChain"];
type ForAddress = undefined | StatsProps["emitterAddress"];

interface StatsProps {
  emitterChain?: number;
  emitterAddress?: string;
}

const TVLChains: React.FC<StatsProps> = ({
  emitterChain,
  emitterAddress,
}) => {
  const { activeNetwork } = useNetworkContext();
  const [notionalTvl, setNotionalTvl] =
    useState<NotionalTvl>();
  const [notionalTvlCumulative, setNotionalTvlCumulative] =
    useState<NotionalTvlCumulative>();
  const [address, setAddress] = useState<StatsProps["emitterAddress"]>();
  const [chain, setChain] = useState<StatsProps["emitterChain"]>();
  const [pollInterval, setPollInterval] = useState<NodeJS.Timeout>();
  const [controller, setController] = useState<AbortController>(
    new AbortController()
  );

  const fetchTvl = (
    baseUrl: string,
    groupBy: GroupBy,
    forChain: ForChain,
    forAddress: ForAddress,
    signal: AbortSignal
  ) => {
    const transferredUrl = `${baseUrl}notionaltvl`;
    let url = `${transferredUrl}?`
    if (groupBy) {
      url = `${url}&groupBy=${groupBy}`;
    }
    if (forChain) {
      url = `${url}&forChain=${forChain}`;
    }
    if (forAddress) {
      url = `${url}&forAddress=${forAddress}`;
    }
    if (groupBy === "address" || forChain || forAddress) {
      return Promise.resolve();
    }

    return fetch(url, { signal }).then<NotionalTvl>((res) => {
      if (res.ok) return res.json();
      // throw an error with specific message, rather than letting the json decoding throw.
      throw "failed fetching notional tvl";
    }).then((result) => {
      setNotionalTvl(result);
    }, (error) => {
      if (error.name !== "AbortError") {
        //  handle errors here instead of a catch(), so that we don't swallow exceptions from components
        console.error("failed fetching transferred to. error: ", error);
      }
    });
  };



  const fetchTvlCumulative = (
    baseUrl: string,
    groupBy: GroupBy,
    forChain: ForChain,
    forAddress: ForAddress,
    signal: AbortSignal
  ) => {
    const transferredToUrl = `${baseUrl}notionaltvlcumulative`;
    let url = `${transferredToUrl}?daily=true`
    if (groupBy) {
      url = `${url}&groupBy=${groupBy}`;
    }
    if (forChain) {
      url = `${url}&forChain=${forChain}`;
    }
    if (forAddress) {
      url = `${url}&forAddress=${forAddress}`;
    }
    if (groupBy === "address" || forChain || forAddress) {
      return Promise.resolve();
    }

    return fetch(url, { signal }).then<NotionalTvlCumulative>((res) => {
      if (res.ok) return res.json();
      // throw an error with specific message, rather than letting the json decoding throw.
      throw "failed fetching notional tvl cumulative";
    }).then((result) => {
      setNotionalTvlCumulative(result);
    }, (error) => {
      if (error.name !== "AbortError") {
        //  handle errors here instead of a catch(), so that we don't swallow exceptions from components
        console.error("failed fetching transferred to. error: ", error);
      }
    });
  };

  const getData = (props: StatsProps, baseUrl: string, signal: AbortSignal) => {
    let forChain: ForChain = undefined;
    let forAddress: ForAddress = undefined;
    let recentGroupBy: GroupBy = undefined;
    if (props.emitterChain) {
      forChain = props.emitterChain;
      recentGroupBy = "address";
    }
    if (props.emitterChain && props.emitterAddress) {
      forAddress = props.emitterAddress;
    }
    return Promise.all([
      fetchTvl(baseUrl, recentGroupBy, forChain, forAddress, signal),
      fetchTvlCumulative(baseUrl, recentGroupBy, forChain, forAddress, signal),
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
      !notionalTvl ||
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
    setNotionalTvl(undefined);
    setNotionalTvlCumulative(undefined)


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
      {!notionalTvlCumulative && !notionalTvl ? (
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
            notionalTvl && notionalTvl.AllTime &&
            <div style={{ margin: '140px 0' }}>
              <StatCardLarge title="Total Value Locked" label="Locked in Wormhole" stat={usdFormatter.format(notionalTvl?.AllTime["*"]["*"].Notional)} />
            </div>
          }


          {!emitterChain && !emitterAddress ? (
            notionalTvl && notionalTvl.AllTime ? (
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
                        label="Locked"
                        stat={amountFormatter(notionalTvl?.AllTime["1"]["*"].Notional, 2)}
                      />
                    ),
                    imgStyle: { height: 110 },
                  },
                  {
                    header: ChainID[2],
                    src: ethereumIcon,
                    description: (
                      <StatCardSmall
                        label="Locked"
                        stat={amountFormatter(notionalTvl?.AllTime["2"]["*"].Notional, 2)}
                      />
                    ),
                    imgStyle: { height: 110 },
                  },
                  {
                    header: ChainID[3],
                    src: terraIcon,
                    description: (
                      <StatCardSmall
                        label="Locked"
                        stat={amountFormatter(notionalTvl?.AllTime["3"]["*"].Notional, 2)}
                      />
                    ),
                    imgStyle: { height: 110 },
                  },
                  {
                    header: ChainID[4],
                    src: binanceChainIcon,
                    description: (
                      <StatCardSmall
                        label="Locked"
                        stat={amountFormatter(notionalTvl?.AllTime["4"]["*"].Notional, 2)}
                      />
                    ),
                    imgStyle: { height: 110 },
                  },
                  {
                    header: ChainID[5],
                    src: polygonIcon,
                    description: (
                      <StatCardSmall
                        label="Locked"
                        stat={amountFormatter(notionalTvl?.AllTime["5"]["*"].Notional, 2)}
                      />
                    ),
                    imgStyle: { height: 110 },
                  },
                  {
                    header: ChainID[6],
                    src: avalancheIcon,
                    description: (
                      <StatCardSmall
                        label="Locked"
                        stat={amountFormatter(notionalTvl?.AllTime["6"]["*"].Notional, 2)}
                      />
                    ),
                    imgStyle: { height: 110 },
                  },
                  {
                    header: ChainID[7],
                    src: oasisIcon,
                    description: (
                      <StatCardSmall
                        label="Locked"
                        stat={amountFormatter(notionalTvl?.AllTime["7"]["*"].Notional, 2)}
                      />
                    ),
                    imgStyle: { height: 110 },
                  }
                ].concat(
                  // check the we have transfer data before adding the fantom card
                  ("10" in notionalTvl.AllTime) &&
                    ("*" in notionalTvl.AllTime["10"]) ?
                    [{
                      header: ChainID[10],
                      src: fantomIcon,
                      description: (
                        <StatCardSmall
                          label="Locke"
                          stat={amountFormatter(notionalTvl?.AllTime["10"]["*"].Notional, 2)}
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

          {notionalTvlCumulative && notionalTvlCumulative.DailyLocked &&
            <Card
              sx={{
                backgroundColor: "rgba(255,255,255,.07)",
                backgroundImage: "none",
                borderRadius: "28px",
                padding: "24px",
              }}
              style={{ margin: '140px 0', padding: '100px 0' }}
            >
              <MonthlyTVLColumnChart title="Monthly TVL by Chain" daily={notionalTvlCumulative.DailyLocked} />
            </Card>
          }


          {notionalTvlCumulative && notionalTvlCumulative.DailyLocked &&
            <Card
              sx={{
                backgroundColor: "rgba(255,255,255,.07)",
                backgroundImage: "none",
                borderRadius: "28px",
                padding: "24px",
              }}
              style={{ margin: '140px 0', padding: '100px 0' }}
            >
              <WeeklyTVLColumnChart title="Weekly TVL by Chain" daily={notionalTvlCumulative.DailyLocked} />
            </Card>
          }

          {notionalTvlCumulative && notionalTvlCumulative.DailyLocked &&
            <Card
              sx={{
                backgroundColor: "rgba(255,255,255,.07)",
                backgroundImage: "none",
                borderRadius: "28px",
                padding: "24px",
              }}
              style={{ margin: '140px 0', padding: '100px 0' }}
            >
              <DailyTVLLineChart title="Daily TVL by Chain" daily={notionalTvlCumulative.DailyLocked} />
            </Card>
          }
          {notionalTvlCumulative && notionalTvlCumulative.DailyLocked &&
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
                  https://europe-west3-wormhole-315720.cloudfunctions.net/mainnet-notionaltvl
                </li>
                <li>
                  https://europe-west3-wormhole-315720.cloudfunctions.net/mainnet-notionaltvlcumulative?daily=true
                </li>
              </ul>
            </Card>
          }
        </>
      )}
    </>
  );
};

export default TVLChains;
