import React, { useState } from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';


import HospitalIcon from '../assets/hospital.png'
import LogoutIcon from '../assets/logout.png'

const cookies = new Cookies();

const SideBar = ({ logout, setToggleContainer }) => (
    <div className="channel-list__sidebar">
        <div className="channel-list__sidebar__icon1" onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}>
            <div className="icon1__inner" >
                <img src={HospitalIcon} alt="Hospital" width="30" />
            </div>
        </div>
        <div className="channel-list__sidebar__icon2">
            <div className="icon1__inner" onClick={logout}>
                <img src={LogoutIcon} alt="Logout" width="30" />
            </div>
        </div>
    </div>
);

const CompanyHeader = () => (
    <div className="channel-list__header">
        <p className="channel-list__header__text">WELCOME </p>
    </div>
)





const ChannelListContent = ({ isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer }) => {
    const { client } = useChatContext();

    const logout = () => {
        cookies.remove("token");
        cookies.remove('userId');
        cookies.remove('username');
        cookies.remove('fullName');
        cookies.remove('avatarURL');
        cookies.remove('hashedPassword');
        cookies.remove('phoneNumber');

        window.location.reload();
    }

    const filters = { members: { $in: [client.userID] } };

    return (
        <>
            <SideBar logout={logout} setToggleContainer={setToggleContainer} />
            <div className="channel-list__list__wrapper">
                <CompanyHeader />
                
                
            </div>
        </>
    );
}

const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing }) => {
    const [toggleContainer, setToggleContainer] = useState(false);

    const SideBar2 = ({ logout }) => (
        <div className="channel-list__sidebar demoSideBar">
            <div className="channel-list__sidebar__icon1">
                <div className="icon1__inner" onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}>
                    <img src={HospitalIcon} alt="Hospital" width="30" />
                </div>
            </div>
            <div className="channel-list__sidebar__icon2">
                <div className="icon1__inner" onClick={logout}>
                    <img src={LogoutIcon} alt="Logout" width="30" />
                </div>
            </div>
        </div>
    );

    const logout = () => {
        cookies.remove("token");
        cookies.remove('userId');
        cookies.remove('username');
        cookies.remove('fullName');
        cookies.remove('avatarURL');
        cookies.remove('hashedPassword');
        cookies.remove('phoneNumber');

        window.location.reload();
    }

    return (
        <>
            <SideBar2 logout={logout} setToggleContainer={setToggleContainer} />
            <div className="channel-list__container">
                <ChannelListContent
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                />
            </div>

            <div className="channel-list__container-responsive"
                style={{ left: toggleContainer ? "0%" : "-100%", backgroundColor: "#005fff" }}
            >
             
            </div>
        </>
    )

}

export default ChannelListContainer;
