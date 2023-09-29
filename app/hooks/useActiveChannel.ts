import { Channel, Members } from 'pusher-js';
import { useEffect, useState } from 'react';
import { pusherClient } from '../libs/pusher';
import useActiveList from './useActiveList';

// 此钩子将在app根组件执行
const useActiveChannel = () => {
  const { set, add, remove } = useActiveList();
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

  useEffect(() => {
    let channel = activeChannel;

    // 订阅用户上线
    if (!channel) {
      channel = pusherClient.subscribe('presence-messenger');
      setActiveChannel(channel);
    }

    // 当订阅事件成功执行时，将成员id添加至状态管理器
    // in ConversationList.tsx -> 44 line: pusherClient.subscribe(pusherKey);
    channel.bind('pusher:subscription_succeeded', (members: Members) => {
      const initialMembers: string[] = [];

      members.each((member: Record<string, any>) =>
        initialMembers.push(member.id)
      );
      set(initialMembers);
    });

    channel.bind('pusher:member_added', (member: Record<string, any>) => {
      add(member.id);
    });

    channel.bind('pusher:member_removed', (member: Record<string, any>) => {
      remove(member.id);
    });

    return () => {
      if (activeChannel) {
        pusherClient.unsubscribe('presence-messenger');
        setActiveChannel(null);
      }
    };
  }, [activeChannel, set, add, remove]);
};

export default useActiveChannel;
