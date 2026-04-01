import React from 'react';

const TypewriterHeading = ({ text, className = "" }) => {
    return (
        <div className={`inline-block overflow-hidden border-r-4 border-white whitespace-nowrap animate-typewriter ${className}`}>
            {text}
        </div>
    );
};

export default TypewriterHeading;
