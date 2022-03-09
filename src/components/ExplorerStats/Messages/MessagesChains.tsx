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
import { Totals } from "../../../types/cloud-functions";
import StatCardSmall from "../StatCardSmall";
import DailyCountLineChart from "./DailyCountLineChart";
import WeeklyCountColumnChart from "./WeeklyCountColumnChart";
import MonthlyCountColumnChart from "./MonthlyCountColumnChart";

type GroupBy = undefined | "chain" | "address";
type ForChain = undefined | StatsProps["emitterChain"];
type ForAddress = undefined | StatsProps["emitterAddress"];

interface StatsProps {
  emitterChain?: number;
  emitterAddress?: string;
}

const MessagesChains: React.FC<StatsProps> = ({
  emitterChain,
  emitterAddress,
}) => {
  const { activeNetwork } = useNetworkContext();
  const [totalsSinceStart, setTotalsSinceStart] = useState<Totals>();
  const [address, setAddress] = useState<StatsProps["emitterAddress"]>();
  const [chain, setChain] = useState<StatsProps["emitterChain"]>();
  const [pollInterval, setPollInterval] = useState<NodeJS.Timeout>();
  const [controller, setController] = useState<AbortController>(
    new AbortController()
  );



  const fetchTotalsSinceStart = (
    baseUrl: string,
    groupBy: GroupBy,
    forChain: ForChain,
    forAddress: ForAddress,
    signal: AbortSignal
  ) => {
    const totalsUrl = `${baseUrl}totals`;
    let url = `${totalsUrl}?` // no "numDays" will return all days
    if (groupBy) {
      url = `${url}&groupBy=${groupBy}`;
    }
    if (forChain) {
      url = `${url}&forChain=${forChain}`;
    }
    if (forAddress) {
      url = `${url}&forAddress=${forAddress}`;
    }

    return fetch(url, { signal })
      .then<Totals>((res) => {
        if (res.ok) return res.json();
        // throw an error with specific message, rather than letting the json decoding throw.
        throw "failed fetching Totals";
      })
      .then((result) => {
        setTotalsSinceStart(result);
      }, (error) => {
        if (error.name !== "AbortError") {
          //  handle errors here instead of a catch(), so that we don't swallow exceptions from components
          console.error("failed fetching totals. error: ", error);
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
      fetchTotalsSinceStart(baseUrl, totalsGroupBy, forChain, forAddress, signal),
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
      !totalsSinceStart ||
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
    setTotalsSinceStart(undefined);

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
      {!totalsSinceStart ? (
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
            totalsSinceStart && totalsSinceStart.TotalCount &&
            <div style={{ margin: '140px 0' }}>
              <StatCardLarge title="User Interactions" label="Messages Observed by Wormhole" stat={amountFormatter(totalsSinceStart.TotalCount["*"])} />
            </div>
          }


          {!emitterChain && !emitterAddress ? (
            totalsSinceStart && totalsSinceStart.TotalCount ? (
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
                        stat={amountFormatter(totalsSinceStart.TotalCount["1"])}
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
                        stat={amountFormatter(totalsSinceStart.TotalCount["2"])}
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
                        stat={amountFormatter(totalsSinceStart.TotalCount["3"])}
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
                        stat={amountFormatter(totalsSinceStart.TotalCount["4"])}
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
                        stat={amountFormatter(totalsSinceStart.TotalCount["5"])}
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
                        stat={amountFormatter(totalsSinceStart.TotalCount["6"])}
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
                        stat={amountFormatter(totalsSinceStart.TotalCount["7"])}
                      />
                    ),
                    imgStyle: { height: 110 },
                  }
                ].concat(
                  // check the we have transfer data before adding the fantom card
                  ("10" in totalsSinceStart.TotalCount) &&
                    (totalsSinceStart.TotalCount["10"] > 0) ?
                    [{
                      header: ChainID[10],
                      src: fantomIcon,
                      description: (
                        <StatCardSmall
                          label="Sent"
                          stat={amountFormatter(totalsSinceStart.TotalCount["10"])}
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

          {totalsSinceStart && totalsSinceStart.DailyTotals &&
            <Card
              sx={{
                backgroundColor: "rgba(255,255,255,.07)",
                backgroundImage: "none",
                borderRadius: "28px",
                padding: "24px",
              }}
              style={{ margin: '140px 0', padding: '100px 0' }}

            >
              <MonthlyCountColumnChart title="Monthly Messages by Chain" daily={totalsSinceStart.DailyTotals} />
            </Card>
          }


          {totalsSinceStart && totalsSinceStart.DailyTotals &&
            <Card
              sx={{
                backgroundColor: "rgba(255,255,255,.07)",
                backgroundImage: "none",
                borderRadius: "28px",
                padding: "24px",
              }}
              style={{ margin: '140px 0', padding: '100px 0' }}

            >
              <WeeklyCountColumnChart title="Weekly Messages by Chain" daily={totalsSinceStart.DailyTotals} />
            </Card>
          }

          {totalsSinceStart && totalsSinceStart.DailyTotals &&
            <Card
              sx={{
                backgroundColor: "rgba(255,255,255,.07)",
                backgroundImage: "none",
                borderRadius: "28px",
                padding: "24px",
              }}
              style={{ margin: '140px 0', padding: '100px 0' }}
            >
              <DailyCountLineChart title="Daily Messages by Chain" daily={totalsSinceStart.DailyTotals} />
            </Card>
          }

          {totalsSinceStart && totalsSinceStart.DailyTotals &&
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
                  https://europe-west3-wormhole-315720.cloudfunctions.net/mainnet-totals
                </li>
              </ul>
            </Card>
          }
        </>
      )}
    </>
  );
};

export default MessagesChains;
