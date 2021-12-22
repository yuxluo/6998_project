import React from 'react'
import "./SwipeButtons.css"
import { Link } from "react-router-dom";

import ExposureIcon from '@mui/icons-material/Exposure';
import EditIcon from '@mui/icons-material/Edit';
import StarRateIcon from '@mui/icons-material/StarRate';
import GetAppIcon from '@mui/icons-material/GetApp';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import IconButton from '@mui/material/IconButton';

const SwipeButtons = () => {
    return (
        <div className="swipeButtons">
            <Link to={"/PoolInteraction"}>
                <IconButton className="swipeButtons__repeat">
                    <ExposureIcon fontSize="large" />
                </IconButton>
            </Link>
            <Link to={"/PutUserInfo"}>
                <IconButton className="swipeButtons__left">
                    <EditIcon fontSize="large" />
                </IconButton>
            </Link>
            <IconButton className="swipeButtons__star">
                <StarRateIcon fontSize="large" />
            </IconButton>
            <Link to={"/GetUserInfo"}>
                <IconButton className="swipeButtons__right">
                    <GetAppIcon fontSize="large" />
                </IconButton>
            </Link>
            <IconButton className="swipeButtons__lightning">
                <FlashOnIcon fontSize="large" />
            </IconButton>
        </div>
    )
}

export default SwipeButtons
