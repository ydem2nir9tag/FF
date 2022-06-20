import { SvgIcon } from "@mui/material";
import * as React from "react";

const SvgLogo = (props) => {
    const styles = ".logo_svg__st0,.logo_svg__st1{fill:none;stroke:"+props.color+";stroke-width:2;stroke-miterlimit:10}.logo_svg__st1{stroke-width:4;}"

    return (
    <SvgIcon
        id="logo_svg__Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x={0}
        y={0}
        viewBox="0 0 40 24"
        style={{
        enableBackground: "new 0 0 40 24",
        }}
        xmlSpace="preserve"
        transform="scale(1.9)"
        sx={{paddingTop:"3px"}}
        {...props}
    >
    <style>{styles}</style>
    <path
        className="logo_svg__st1"
        d="M8.64 3.3v17.48M13.86 3.32V20.8M21.32 3.26v17.48M12.21 5.35l11.03-.1M12.12 18.84l11.03-.1"
    />
    <path
        className="logo_svg__st0"
        d="M25.73 3.3v7.88M29.2 4.3h-4.38M29.2 7.24h-4.38M30.82 3.3v7.88M34.29 4.3h-4.38M34.29 7.24h-4.38"
    />
  </SvgIcon>
    )
};

export default SvgLogo;