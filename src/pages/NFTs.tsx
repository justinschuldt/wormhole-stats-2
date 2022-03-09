import { PageProps } from "gatsby";
import { Box, } from "@mui/material";
import * as React from "react";
import Layout from "../components/Layout";
import { SEO } from "../components/SEO";
import PageHeader from "../components/PageHeader";
import NFTChains from "../components/ExplorerStats/NFTs/NFTChains";

interface ExplorerQueryValues {
  emitterChain: number;
  emitterAddress: string;
  sequence: string;
  txId: string;
}

const NFTPage = ({ location }: PageProps) => {

  const [emitterChain, setEmitterChain] =
    React.useState<ExplorerQueryValues["emitterChain"]>();
  const [emitterAddress, setEmitterAddress] =
    React.useState<ExplorerQueryValues["emitterAddress"]>();
  const [sequence, setSequence] =
    React.useState<ExplorerQueryValues["sequence"]>();
  const [txId, setTxId] = React.useState<ExplorerQueryValues["txId"]>();
  const [doneReadingQueryParams, setDoneReadingQueryParams] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    if (location.search) {
      // take searchparams from the URL and set the values in the form
      const searchParams = new URLSearchParams(location.search);

      const chain = searchParams.get("emitterChain");
      const address = searchParams.get("emitterAddress");
      const seq = searchParams.get("sequence");
      const tx = searchParams.get("txId");

      // if the search params are different form values, update state
      if (Number(chain) !== emitterChain) {
        setEmitterChain(Number(chain) || undefined);
      }
      if (address !== emitterAddress) {
        setEmitterAddress(address || undefined);
      }
      if (seq !== sequence) {
        setSequence(seq || undefined);
      }
      if (tx !== txId) {
        setTxId(tx || undefined);
      }
    } else {
      // clear state
      setEmitterChain(undefined);
      setEmitterAddress(undefined);
      setSequence(undefined);
      setTxId(undefined);
    }
    // be explicit about when it is ok to render
    setDoneReadingQueryParams(true);
  }, [location.search])
  return (
    <Layout>
      <SEO
        title="NFTs"
        description="Explore real-time movement of information and value around the Wormhole ecosystem."
        pathname={location.pathname}
      />

      <PageHeader headerText="Wormholed NFTs" subText="Amount and frequency of Wormholed NFTs" />

      <Box sx={{ maxWidth: 1220, mx: "auto", px: 3.75 }}>

        {doneReadingQueryParams && <>

          {!(emitterChain && emitterAddress && sequence) && // if there is no messageId query &&
            !txId && (                                      // if there is no transactionId query
              <NFTChains
                emitterChain={emitterChain}
                emitterAddress={emitterAddress}
              />
            )}

        </>}

      </Box>
    </Layout>
  );
};

export default NFTPage;