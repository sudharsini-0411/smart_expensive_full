import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import video1 from '../assets/videos/14251158_1920_1080_30fps.mp4';
import video2 from '../assets/videos/14863296_1920_1080_30fps.mp4';
import video3 from '../assets/videos/14864253_1920_1080_30fps.mp4';
import video4 from '../assets/videos/6961824-uhd_3840_2160_30fps.mp4';

const videos = [video2, video3, video4]; // Pool for other pages

const VideoBackground = () => {
    const location = useLocation();
    const [currentVideo, setCurrentVideo] = useState(video1);

    useEffect(() => {
        switch (location.pathname) {
            case '/':
            case '/about':
                setCurrentVideo(video1);
                break;
            case '/login':
            case '/register':
            case '/profile':
            case '/logout':
                setCurrentVideo(video2);
                break;
            case '/dashboard':
            case '/budgets':
            case '/reports':
                setCurrentVideo(video3);
                break;
            case '/transactions':
            case '/add-expense':
            case '/expense-list':
            case '/add-income':
            case '/notifications':
                setCurrentVideo(video4);
                break;
            default:
                // For other pages (like Profile, Settings), pick one of the business-like ones or random
                setCurrentVideo(video3);
                break;
        }
    }, [location.pathname]);

    return (
        <React.Fragment>
            <video
                className="video-background"
                autoPlay
                loop
                muted
                playsInline
                key={currentVideo} // Force re-render on video change
            >
                <source src={currentVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="overlay"></div>
        </React.Fragment>
    );
};

export default VideoBackground;
