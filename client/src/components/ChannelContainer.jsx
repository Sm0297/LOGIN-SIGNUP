import React, { useState } from 'react';
import { Channel, useChatContext, MessageTeam } from 'stream-chat-react';

import { ChannelInner, CreateChannel, EditChannel } from './';





const ChannelContainer = ({ isCreating, setIsCreating, isEditing, setIsEditing, createType,  }) => {
  
    const [pinsOpen, setPinsOpen] = useState(false);

    return (
        <div className="channel__container">
            
        </div>
    );
}

export default ChannelContainer;