import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelListContainer, ChannelContainer, Auth } from './components';

import './App.css';
import 'stream-chat-react/dist/css/index.css';

const cookies = new Cookies();

const apiKey = 'hbp5cyac9fpj';
const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);


if (authToken) {
    client.connectUser({
        id: cookies.get('userId'),
        name: cookies.get('username'),
        fullName: cookies.get('fullName'),
        image: cookies.get('avatarURL'),
        hashedPassword: cookies.get('hashedPassword'),
        phoneNumber: cookies.get('phoneNumber'),
    }, authToken)
}

const App = () => {
    const [createType, setCreateType] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDark, setIsDark] = useState(false);



   /* let theme = "team light";
    if (isDark) theme = "team dark";
    console.log(theme);
    console.log(isDark);*/

    if (!authToken) return <Auth />

    return (
        <div className="app__wrapper">
            <Chat client={client} >
                <ChannelListContainer
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                />
                <ChannelContainer
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    createType={createType}
                    isDark={isDark}
                    setIsDark={setIsDark}
                />
            </Chat>

        </div>
    );
}

export default App;