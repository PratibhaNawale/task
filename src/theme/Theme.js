import React, { useEffect, useState } from 'react';
import { ReactComponent as Sun } from "../assets/Sun.svg";
import { ReactComponent as Moon } from "../assets/Moon.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { Box } from '@mui/material';

function Theme() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            setDarkMode();
        } else {
            setLightMode();
        }
    }, []);

    const setDarkMode = () => {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        setIsDarkMode(true);
    };

    const setLightMode = () => {
        document.body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        setIsDarkMode(false);
    };

    const toggleTheme = () => {
        if (isDarkMode) {
            setLightMode();
        } else {
            setDarkMode();
        }
    };

    return (
        <Box className='dark_mode'>
            <FontAwesomeIcon
                icon={isDarkMode ? faToggleOn : faToggleOff}
                onClick={toggleTheme}
                className='toggle-icon dark_mode_label'
            />
            {isDarkMode ? <Moon /> : <Sun />}
        </Box>
    );
}

export default Theme;
