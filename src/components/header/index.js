/** @jsxImportSource theme-ui */
import React from 'react';
import { Box } from 'theme-ui';

import styles from '../../styles';

const Header = () => {
    return (
        <header>
            <div
                sx={{
                    // height: '4em',
                    border: '1px solid black',
                    // padding: '1rem',
                    fontSize: '16px',
                    fontFamily: 'main'
            }}>
                <h1
                    sx={{
                        fontFamily: 'Work Sans',
                        fontSize: '2rem',
                        textAlign: 'center'
                    }}
                >
                    To do. The do it app!
                </h1>
                {/* <p>
                    The do it app!
                </p> */}
            </div>
        </header>
    )
};

export default Header;