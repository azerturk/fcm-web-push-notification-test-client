import React, { useState } from 'react';
import { requestPermission } from './firebase-init'; // Import the function

const NotificationButton: React.FC = () => {
    const [permission, setPermission] = useState<NotificationPermission>('default');

    const handleButtonClick = async () => {
        const permission = await requestPermission();
        setPermission(permission); // This will now work correctly
    };

    return (
        <div>
            <button onClick={handleButtonClick}>Enable Notifications</button>
            <p>Current permission: {permission}</p>
        </div>
    );
};

export default NotificationButton;
