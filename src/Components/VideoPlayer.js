import React, { useRef } from 'react';

const VideoPlayer = ({ videoUrl }) => {
    const videoRef = useRef(null);

    return (
        <div className="py-6 px-32 rounded-md">
            <video ref={videoRef} controls className='w-screen rounded-md'>
                <source src={videoUrl} type="video/mp4" />
            </video>
        </div>
    );
};

export default VideoPlayer;
