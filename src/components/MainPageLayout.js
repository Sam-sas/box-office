import React from 'react';
import Navigation from './Navigation';
import Title from './Title';

export default function MainPageLayout({ children }) {
    return (
        <>
            <div>
                <Title title="Box Office" subtitle="Are you looking for a movie or an actor?" />
                <Navigation />
            </div>
            {children}
        </>
       
      );
}
