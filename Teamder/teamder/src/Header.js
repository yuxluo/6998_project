import React from 'react'
import "./Header.css"
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import logo from "./Teamder_logo.png"
import { IconButton } from '@mui/material';
import { BrowserRouter as Router } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link, useNavigate } from "react-router-dom";

function Header({ backButton }) {
    let navigate = useNavigate();
    return (
        <div className="header">

            {backButton ? (
                <IconButton onClick={() => { navigate(backButton); }}>
                    <ArrowBackIosNewIcon fontSize="large" className="header__icon" />
                </IconButton>
            ) : (
                <Link to='/signout'>
                    <IconButton>
                        <PersonIcon className="header__icon" fontSize='large' />
                    </IconButton>
                </Link>
            )
            }
            <Link to="/">
                <img
                    className="header__logo"
                    src={logo}
                    alt="Teamder logo"
                />
            </Link>
            <Link to="/chat">
                <IconButton>
                    <ForumIcon className="header__icon" fontSize='large' />
                </IconButton>
            </Link>

        </div >
    )
}

export default Header
