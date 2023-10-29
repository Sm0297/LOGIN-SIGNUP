import { useState, useEffect } from 'react';
import { useChatContext } from 'stream-chat-react';

const UserMember = () => {
    const { channel } = useChatContext();
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const getMembers = async () => {
            const members = await channel.getMembers();
            setMembers(members);
        };

        getMembers();
    }, [channel]);

    return (
        <div>
            <h3>Users in Channel</h3>
            <ul>
                {members.map((member) => (
                    <li key={member.user.id}>
                        <img src={member.user.image} alt={member.user.id} />
                        <span>{member.user.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserMember;
