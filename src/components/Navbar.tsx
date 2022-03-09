import { AppBar, Box, Link, Toolbar } from "@mui/material";
import { Link as RouterLink } from "gatsby";
import React from "react";
import { tvb, tvl, messages, nfts } from "../utils/urls";
import LogoLink from "./LogoLink";

const linkStyle = { ml: 3, textUnderlineOffset: 6 };
const linkActiveStyle = { textDecoration: "underline" };

const NavBar = () => (
  <>
    <AppBar
      position="static"
      sx={{ backgroundColor: "transparent" }}
      elevation={0}
    >
      <Toolbar disableGutters sx={{ mt: 2, mx: 4 }}>
        <LogoLink />
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "block" } }}>
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
          <Link href={tvl} color="inherit" underline="hover" sx={linkStyle}>
            TVL
          </Link>
          <Link
            component={RouterLink}
            to={messages}
            color="inherit"
            underline="hover"
            sx={linkStyle}
            activeStyle={linkActiveStyle}
          >
            Messages
          </Link>
          <Link href={nfts} color="inherit" underline="hover" sx={linkStyle}>
            NFTs
          </Link>
        </Box>
        {/* <Box sx={{ display: "flex", ml: 8 }}>
        <img src={hamburger} alt="menu" />
      </Box> */}
      </Toolbar>
    </AppBar>

  </>
);
export default NavBar;
