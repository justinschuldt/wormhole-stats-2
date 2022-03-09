
import { PageProps } from "gatsby";
import { Box, } from "@mui/material";
import * as React from "react";

import HeroText from "../components/HeroText";
import Layout from "../components/Layout";
import NetworkSelect from "../components/NetworkSelect";
import shape1 from "../images/index/shape1.svg";
import { SEO } from "../components/SEO";
import shapes from "../images/shape.png";


const PageHeader = (
    { headerText, subText }:
        { headerText: string, subText: string }) =>
    <>
        <Box sx={{ position: "relative", marginTop: 17 }}>
            <Box
                sx={{
                    position: "absolute",
                    zIndex: -2,
                    bottom: '-220px',
                    left: '20%',
                    background: 'radial-gradient(closest-side at 50% 50%, #5189C8 0%, #5189C800 100%) ',
                    transform: 'matrix(-0.19, 0.98, -0.98, -0.19, 0, 0)',
                    width: 1609,
                    height: 1264,
                    pointerEvents: 'none',
                    opacity: 0.7,
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    zIndex: -1,
                    transform: "translate(0px, -25%) scaleX(-1)",
                    background: `url(${shape1})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "top -540px center",
                    backgroundSize: "2070px 1155px",
                    width: "100%",
                    height: 1155,
                }}
            />
            <HeroText
                heroSpans={[headerText]}
                subtitleText={[subText]}
            />
        </Box>
        <Box sx={{ position: 'relative' }}>
            <Box
                sx={{
                    position: "absolute",
                    zIndex: -2,
                    top: '0',
                    background: 'radial-gradient(closest-side at 50% 50%, #5189C8 0%, #5189C800 100%) ',
                    transform: 'matrix(-0.67, 0.74, -0.74, -0.67, 0, 0)',
                    left: '70%',
                    width: 1077,
                    height: 1329,
                    pointerEvents: 'none',
                    opacity: 0.64,
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    zIndex: -1,
                    background: `url(${shapes})`,
                    backgroundSize: 'contain',
                    top: '0',
                    left: "85%",
                    transform: 'scaleX(-1)',
                    width: 1227,
                    height: 1018,
                    pointerEvents: 'none',
                    display: { xs: 'none', md: 'block' },
                }}
            />
            <Box sx={{ maxWidth: 1220, mx: "auto", mt: 30, px: 3.75 }}>
                <Box
                    sx={{
                        px: 4,
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                    }}
                >
                    <Box sx={{ flexGrow: 1 }} />
                    <NetworkSelect />
                </Box>
            </Box>
        </Box>
    </>

export default PageHeader
