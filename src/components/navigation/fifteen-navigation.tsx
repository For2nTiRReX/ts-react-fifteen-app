import React from 'react';
import { Link } from 'react-router-dom';
import { fifteenRoutes } from '../../configs'

const FifteenNavigation = () => {
    return (
        <nav className="nav main-navigation">
            <ul>
                {Object.keys(fifteenRoutes).map((key: any) => {
                    const route: any = fifteenRoutes[key];
                    return route.displayInNav ? (
                        <li key={key}>
                            <Link to={route.path} className="nav-link">{route.label}</Link>
                        </li>
                    ) : '';
                })}
            </ul>
        </nav>
    );
}

export default FifteenNavigation;