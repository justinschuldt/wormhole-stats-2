import { Box, IconButton, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "gatsby";

import React from "react";
import Discord from "../images/Discord.svg";
import shape from "../images/footer/shape.svg";
import Github from "../images/Github.svg";
import Medium from "../images/Medium.svg";
import Telegram from "../images/Telegram.svg";
import Twitter from "../images/Twitter.svg";
import {
  tvb,
  tvl,
  messages,
  nfts,
  blog,
  discord,
  docs,
  github,
  jobs,
  portal,
  telegram,
  twitter,
} from "../utils/urls";
import LogoLink from "./LogoLink";

const linkStyle = {
  display: "block",
  mr: { xs: 0, md: 7.5 },
  mb: 1.5,
  fontSize: 14,
  textUnderlineOffset: 6,
};
const linkActiveStyle = { textDecoration: "underline" };
const socialIcon = {
  "& img": {
    height: 24,
    width: 24,
  },
};

const Footer = () => (
  <>

    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          zIndex: -1,
          transform: { xs: "", md: "translate(-50%, 0%)" },
          background: `url(${shape})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: { xs: "center center", md: "right top -426px" },
          width: "100%",
          height: { xs: "100%", md: 540 },
          bottom: 0
        }}
      />
      <Box
        sx={{
          position: "absolute",
          zIndex: -2,
          top: '-30%',
          background: 'radial-gradient(closest-side at 50% 50%, #5189C8 0%, #5189C800 100%) ',
          transform: 'matrix(0.67, 0.74, -0.74, 0.67, 0, 0)',
          left: '-5%',
          width: 1136,
          height: 1489,
          pointerEvents: 'none',
          display: { xs: 'none', md: 'block' },
          opacity: 0.7,
        }}
      />
      <Box
        sx={{
          maxWidth: 1100,
          mx: "auto",
          pt: 21.5,
          pb: { xs: 6.5, md: 12 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: { xs: null, md: "wrap" },
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "center", md: "unset" },
            mx: 3.5,
            borderTop: "1px solid #585587",
            pt: 7,
          }}
        >
          <Box
            sx={{
              pl: { xs: 0, md: 2 },
              pb: 2,
              borderTop: { xs: "1px solid #585587", md: "none" },
              pt: { xs: 7, md: 0 },
              width: { xs: "100%", md: "auto" },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <LogoLink negMt />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              pl: { xs: 0, md: 2 },
              order: { xs: -2, md: 0 },
              textAlign: { xs: "center", md: "left" },
              mb: { xs: 7, md: 0 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Box>
                <Link
                  component={RouterLink}
                  to={tvb}
                  color="inherit"
                  underline="hover"
                  sx={linkStyle}
                  activeStyle={linkActiveStyle}
                >
                  TVB
                </Link>
                <Link
                  component={RouterLink}
                  to={tvl}
                  color="inherit"
                  underline="hover"
                  sx={linkStyle}
                  activeStyle={linkActiveStyle}
                >
                  TVL
                </Link>
                <Link
                  component={RouterLink}
                  to={messages}
                  color="inherit"
                  underline="hover"
                  sx={linkStyle}
                >
                  Messages
                </Link>
                <Link
                  component={RouterLink}
                  to={nfts}
                  color="inherit"
                  underline="hover"
                  sx={linkStyle}
                >
                  NFTs
                </Link>
              </Box>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              px: 2,
              order: { xs: -2, md: 0 },
              textAlign: { xs: "center", md: "left" },
              borderTop: { xs: "1px solid #585587", md: "none" },
              pt: { xs: 7, md: 0 },
              width: { xs: "100%", md: "auto" },
              mb: { xs: 7, md: 0 },
            }}
          >
            <Typography sx={{ mb: 3 }}>Let's be friends</Typography>
            <Box>
              <IconButton
                href={discord}
                target="_blank"
                rel="noopener noreferrer"
                sx={socialIcon}
              >
                <img src={Discord} alt="Discord" />
              </IconButton>
              <IconButton
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                sx={socialIcon}
              >
                <img src={Github} alt="Github" />
              </IconButton>
              <IconButton
                href={blog}
                target="_blank"
                rel="noopener noreferrer"
                sx={socialIcon}
              >
                <img src={Medium} alt="Medium" />
              </IconButton>
              <IconButton
                href={telegram}
                target="_blank"
                rel="noopener noreferrer"
                sx={socialIcon}
              >
                <img src={Telegram} alt="Telegram" />
              </IconButton>
              <IconButton
                href={twitter}
                target="_blank"
                rel="noopener noreferrer"
                sx={socialIcon}
              >
                <img src={Twitter} alt="Twitter" />
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              flexBasis: "100%",
              pt: { xs: 0, md: 8 },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography variant="body2">
              2022 &copy; Wormhole. All Rights Reserved.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>

  </>
);
export default Footer;
