import {useEffect, useState} from "react";

import "./styles/RemovalNotification.css"

const CompanyRemovalNotification = ({notificationMessage, setIsCompanyRemovalNotificationOpen}) => {

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
                setIsCompanyRemovalNotificationOpen(false);
            }, 300);
        }, 5000);

        return () => clearTimeout(timer);
    }, [setIsCompanyRemovalNotificationOpen]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            setIsCompanyRemovalNotificationOpen(false);
        }, 300);
    };

    if (!isVisible) return null;

    return (
        <div className="company-removal-notification">
            <div className="company-removal-content">

                <div className="removal-message">
                    <h4>Company Removed</h4>
                    <p>
                        <span className="company-name">{notificationMessage}</span>
                    </p>
                </div>

                <button
                    className="removal-close-btn"
                    onClick={handleClose}
                    aria-label="Close removal notification"
                >
                    ×
                </button>
            </div>

            <div className="removal-progress-track">
                <div className="removal-progress-fill"></div>
            </div>

            <div className="removal-dust-effect"></div>
        </div>
    );
};

export default CompanyRemovalNotification;