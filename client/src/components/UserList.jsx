import React, { useEffect, useState } from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';



const ListContainer = ({ children }) => {
    return (
        <div className="user-list__container">
            <div className="user-list__header">
                <p>User</p>
                <p>Last Active</p>
                <p>Invite</p>
            </div>
            {children}
        </div>
    )
}

const UserItem = ({ index, user, setSelectedUsers }) => {
    const [selected, setSelected] = useState(false)

    //demo
    //let dateString = user.last_active.substr(8, 2);
    //let timeString = user.last_active.substr(11,8);
    //let [hour, minute, second] = timeString.split(":").map(Number);

    //let now = new Date();
    //let difference;
    //if (now.getDate() > dateString) { console.log("Yesterday"); difference = "Yesterday" }
    //else {
    //    let specificTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, second);

    //    let differenceInMilliseconds = now - specificTime;
    //    let differenceInMinutes = Math.round(differenceInMilliseconds / (1000 * 60));

    //    if (differenceInMinutes >= 60) {
    //        let differenceInHours = Math.round(differenceInMinutes / 60);
    //        console.log(`The difference is: ${differenceInHours} hours`);
    //        difference = differenceInHours +" hours ago";
    //    } else {
    //        console.log(`The difference is: ${differenceInMinutes} minutes`);
    //        difference = differenceInMinutes + "minutes ago";
    //    }

    //}
    //demo end

    const getLastActive = (i) => {
        switch (i) {
            case 0:
                return '12 min ago';
            case 1:
                return '27 min ago';
            case 2:
                return '6 hours ago';
            case 3:
                return '14 hours ago';
            case 4:
                return 'Yesterday';
            default:
                return 'Yesterday';
        }
    };

    const handleSelect = () => {
        if (selected) {
            setSelectedUsers((prevUsers) => prevUsers.filter((prevUser) => prevUser !== user.id))
        } else {
            setSelectedUsers((prevUsers) => [...prevUsers, user.id])
        }

        setSelected((prevSelected) => !prevSelected)
        console.log(user.last_active)
    }


    return (
        <div className="user-item__wrapper" onClick={handleSelect}>
            <div className="user-item__name-wrapper">
                <Avatar image={user.image} name={user.fullName || user.id} size={32} />
                <p className="user-item__name">{user.fullName || user.id}</p>
                
            </div>
            {/*<div className="user-item__name-wrapper">*/}
            {/*    <p className="user-item__name">{difference}</p>*/}
            {/*</div>*/}
            <p className='user-item__last-active'>{getLastActive(index)}</p>
            
        </div>
    )
}



const UserList = ({ setSelectedUsers, filters }) => {
    const { client } = useChatContext();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listEmpty, setListEmpty] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            if (loading) return;

            setLoading(true);

            try {
                const response = await client.queryUsers(
                    { id: { $ne: client.userID } },
                    { id: 1 },
                    { limit: 8 }
                );

                if (response.users.length) {
                    setUsers(response.users);
                } else {
                    setListEmpty(true);
                }
            } catch (error) {
                setError(true);
            }
            setLoading(false);
        }

        if (client) getUsers()
    }, [filters]);


    if (error) {
        return (
            <ListContainer>
                <div className="user-list__message">
                    Error loading, please refresh and try again.
                </div>
            </ListContainer>
        )
    }

    if (listEmpty) {
        return (
            <ListContainer>
                <div className="user-list__message">
                    No users found.
                </div>
            </ListContainer>
        )
    }


    return (
        <ListContainer>
            {loading ? <div className="user-list__message">
                Loading users...
            </div> : (
                    users?.map((user, i) => (
                        <UserItem index={i} key={user.id} user={user} setSelectedUsers={setSelectedUsers} />
                ))
            )}
        </ListContainer>
    )
}

export default UserList;