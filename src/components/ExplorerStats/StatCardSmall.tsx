import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

interface StatCardSmallProps {
  label: string
  stat: string
}

const StatCardSmall: React.FC<StatCardSmallProps> = (props) => {
  const [stat, setStat] = useState<string>();
  const [animate, setAnimate] = useState<boolean>(false);

  useEffect(() => {
    // hold stat value in state, so that we can detect changes and add animation class

    let timeout: NodeJS.Timeout;
    if (stat !== props.stat) {
      setStat(props.stat)
      setAnimate(true);
      timeout = setTimeout(() => {
        setAnimate(false);
      }, 2000);
    }
    return function cleanup() {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [props.stat]);

  const centerStyles: any = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
  };

  return (
    <>
      <div style={{ ...centerStyles, gap: 8 }}>
        <div style={centerStyles}>
          <div>
            <Typography
              variant="h2"
              className={animate ? "highlight-new-val" : ""}
            >
              {stat}
            </Typography>
          </div>
          <div style={{ alignSelf: 'flex-end' }}>
            <Typography variant="h5">{props.label}</Typography>
          </div>
        </div>


      </div>
    </>
  );
};

export default StatCardSmall;
