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
import { NotionalTransferred, NotionalTransferredToCumulative } from "../../../types/cloud-functions";
import { usdFormatter } from "../../../utils/explorer";
import StatCardSmall from "../StatCardSmall";
import WeeklyNotionalColumnChart from "./WeeklyNotionalColumnChart";
import DailyNotionalLineChart from "./DailyNotionalLineChart";
import MonthlyNotionalColumnChart from "./MonthlyNotionalColumnChart";

type GroupBy = undefined | "chain" | "address";
type ForChain = undefined | StatsProps["emitterChain"];
type ForAddress = undefined | StatsProps["emitterAddress"];

interface StatsProps {
  emitterChain?: number;
  emitterAddress?: string;
}

const TVBChains: React.FC<StatsProps> = ({
  emitterChain,
  emitterAddress,
}) => {
  const { activeNetwork } = useNetworkContext();
  const [notionalTransferred, setNotionalTransferred] =
    useState<NotionalTransferred>();
  const [notionalTransferredToCumulative, setNotionalTransferredToCumulative] =
    useState<NotionalTransferredToCumulative>();
  const [address, setAddress] = useState<StatsProps["emitterAddress"]>();
  const [chain, setChain] = useState<StatsProps["emitterChain"]>();
  const [pollInterval, setPollInterval] = useState<NodeJS.Timeout>();
  const [controller, setController] = useState<AbortController>(
    new AbortController()
  );

  const launchDate = new Date("2021-09-13T00:00:00.000+00:00");
  // calculate the time difference between now and the launch day
  const differenceInTime = new Date().getTime() - launchDate.getTime();
  // calculate the number of days, rounding up
  const daysSinceDataStart = Math.ceil(differenceInTime / (1000 * 3600 * 24));


  const fetchTransferred = (
    baseUrl: string,
    groupBy: GroupBy,
    forChain: ForChain,
    forAddress: ForAddress,
    signal: AbortSignal
  ) => {
    const transferredUrl = `${baseUrl}notionaltransferred`;
    let url = `${transferredUrl}?forPeriod=true&daily=true&numDays=${daysSinceDataStart}`; // &daily=true`
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

    return fetch(url, { signal }).then<NotionalTransferred>((res) => {
      if (res.ok) return res.json();
      // throw an error with specific message, rather than letting the json decoding throw.
      throw "failed fetching notional transferred";
    }).then((result) => {
      setNotionalTransferred(result);
    }, (error) => {
      if (error.name !== "AbortError") {
        //  handle errors here instead of a catch(), so that we don't swallow exceptions from components
        console.error("failed fetching transferred to. error: ", error);
      }
    });
  };

  const fetchTransferredToCumulative = (
    baseUrl: string,
    groupBy: GroupBy,
    forChain: ForChain,
    forAddress: ForAddress,
    signal: AbortSignal
  ) => {
    const transferredToUrl = `${baseUrl}notionaltransferredtocumulative`;
    let url = `${transferredToUrl}?allTime=true&daily=true&numDays=${daysSinceDataStart}`
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

    return fetch(url, { signal }).then<NotionalTransferredToCumulative>((res) => {
      if (res.ok) return res.json();
      // throw an error with specific message, rather than letting the json decoding throw.
      throw "failed fetching notional transferred to cumulative";
    }).then((result) => {
      setNotionalTransferredToCumulative(result);
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
      fetchTransferred(baseUrl, recentGroupBy, forChain, forAddress, signal),
      fetchTransferredToCumulative(
        baseUrl,
        recentGroupBy,
        forChain,
        forAddress,
        signal
      ),
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
      !notionalTransferred ||
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
    setNotionalTransferred(undefined);
    setNotionalTransferredToCumulative(undefined);

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
      {!notionalTransferred && notionalTransferredToCumulative ? (
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
            notionalTransferredToCumulative && notionalTransferredToCumulative.AllTime &&
            <div style={{ margin: '140px 0' }}>
              <StatCardLarge title="Total Value Bridged" label="Bridged through Wormhole" stat={usdFormatter.format(notionalTransferredToCumulative?.AllTime["*"]["*"])} />
            </div>
          }


          {!emitterChain && !emitterAddress ? (
            notionalTransferred && notionalTransferred.WithinPeriod ? (
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
                        label="Sent"
                        stat={amountFormatter(notionalTransferred?.WithinPeriod["1"]["*"]["*"], 2)}
                      />
                    ),
                    imgStyle: { height: 110 },
                  },
                  {
                    header: ChainID[2],
                    src: ethereumIcon,
                    description: (
                      <StatCardSmall
                        label="Sent"
                        stat={amountFormatter(notionalTransferred?.WithinPeriod["2"]["*"]["*"], 2)}
                      />
                    ),
                    imgStyle: { height: 110 },
                  },
                  {
                    header: ChainID[3],
                    src: terraIcon,
                    description: (
                      <StatCardSmall
                        label="Sent"
                        stat={amountFormatter(notionalTransferred?.WithinPeriod["3"]["*"]["*"], 2)}
                      />
                    ),
                    imgStyle: { height: 110 },
                  },
                  {
                    header: ChainID[4],
                    src: binanceChainIcon,
                    description: (
                      <StatCardSmall
                        label="Sent"
                        stat={amountFormatter(notionalTransferred?.WithinPeriod["4"]["*"]["*"], 2)}
                      />
                    ),
                    imgStyle: { height: 110 },
                  },
                  {
                    header: ChainID[5],
                    src: polygonIcon,
                    description: (
                      <StatCardSmall
                        label="Sent"
                        stat={amountFormatter(notionalTransferred?.WithinPeriod["5"]["*"]["*"], 2)}
                      />
                    ),
                    imgStyle: { height: 110 },
                  },
                  {
                    header: ChainID[6],
                    src: avalancheIcon,
                    description: (
                      <StatCardSmall
                        label="Sent"
                        stat={amountFormatter(notionalTransferred?.WithinPeriod["6"]["*"]["*"], 2)}
                      />
                    ),
                    imgStyle: { height: 110 },
                  },
                  {
                    header: ChainID[7],
                    src: oasisIcon,
                    description: (
                      <StatCardSmall
                        label="Sent"
                        stat={amountFormatter(notionalTransferred?.WithinPeriod["7"]["*"]["*"], 2)}
                      />
                    ),
                    imgStyle: { height: 110 },
                  }
                ].concat(
                  // check the we have transfer data before adding the fantom card
                  ("10" in notionalTransferred.WithinPeriod) &&
                    ("*" in notionalTransferred.WithinPeriod["10"]) &&
                    (notionalTransferred.WithinPeriod["10"]["*"]["*"] > 0) ?
                    [{
                      header: ChainID[10],
                      src: fantomIcon,
                      description: (
                        <StatCardSmall
                          label="Sent"
                          stat={amountFormatter(notionalTransferred?.WithinPeriod["10"]["*"]["*"], 2)}
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

          {notionalTransferred && notionalTransferred.Daily &&
            <Card
              sx={{
                backgroundColor: "rgba(255,255,255,.07)",
                backgroundImage: "none",
                borderRadius: "28px",
                padding: "24px",
              }}
              style={{ margin: '140px 0', padding: '100px 0' }}

            >
              <MonthlyNotionalColumnChart title="Monthly Volume by Chain" daily={notionalTransferred?.Daily} />
            </Card>
          }


          {notionalTransferred && notionalTransferred.Daily &&
            <Card
              sx={{
                backgroundColor: "rgba(255,255,255,.07)",
                backgroundImage: "none",
                borderRadius: "28px",
                padding: "24px",
              }}
              style={{ margin: '140px 0', padding: '100px 0' }}

            >
              <WeeklyNotionalColumnChart title="Weekly Volume by Chain" daily={notionalTransferred?.Daily} />
            </Card>
          }

          {notionalTransferredToCumulative && notionalTransferredToCumulative.Daily &&
            <Card
              sx={{
                backgroundColor: "rgba(255,255,255,.07)",
                backgroundImage: "none",
                borderRadius: "28px",
                padding: "24px",
              }}
              style={{ margin: '140px 0', padding: '100px 0' }}
            >
              <DailyNotionalLineChart title="Daily Volume by Chain" daily={notionalTransferredToCumulative?.Daily} />
            </Card>
          }

          {notionalTransferred && notionalTransferred.Daily &&
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
                  {`https://europe-west3-wormhole-315720.cloudfunctions.net/mainnet-notionaltransferred?forPeriod=true&daily=true&numDays=${daysSinceDataStart}`}
                </li>
                <li>
                  {`https://europe-west3-wormhole-315720.cloudfunctions.net/mainnet-notionaltransferredtocumulative?allTime=true&daily=true&numDays=${daysSinceDataStart}`}
                </li>
              </ul>

            </Card>
          }
        </>
      )}
    </>
  );
};

export default TVBChains;
