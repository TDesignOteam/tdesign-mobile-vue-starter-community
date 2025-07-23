export interface Message {
  time?: string;
  isMine?: boolean;
  message?: string;
  loading?: boolean;
}

export interface Info {
  title: string;
  img: string;
  count?: number;
  list: Message[];
}

export const MOCK_CHAT_DATA: Record<string, Info> = {
  Sean: {
    title: 'Sean',
    img: '/images/chat/avatar-Sean.png',
    count: 2,
    list: [
      {
        time: '2025年7月20日 12:12',
      },
      {
        message: '那明天准时见哦',
        isMine: false,
      },
      {
        message: '好的，我会记得的',
        isMine: true,
      },
      {
        time: '今天 13:39',
      },
      {
        message: '在吗？',
      },
      {
        message: '有个问题想咨询一下，关于TDesign组件库如何更好地使用',
      },
    ],

  },
  Mollymolly: {
    title: 'Mollymolly',
    img: '/images/chat/avatar-Mollymolly.png',
    list: [
      {
        time: '2025年7月20日 12:12',
      },
      {
        message: '好久不见，最近咋样？',
      },
    ],
  },
  Andrew: {
    title: 'Andrew',
    img: '/images/chat/avatar-Andrew.png',
    list: [
      {
        time: '2025年7月20日 12:12',
      },
      {
        message: '现在没空，晚点再联系你哈',
      },
    ],
  },
  Kingdom: {
    title: 'Kingdom',
    img: '/images/chat/avatar-Kingdom.png',
    list: [
      {
        time: '2025年7月20日 12:12',
      },
      {
        message: '真的吗？',
      },
    ],
  },
  Paige: {
    title: 'Paige',
    img: '/images/chat/avatar-Paige.png',
    list: [
      {
        time: '2025年7月20日 12:12',
      },
      {
        message: '此次要评审的首页和专区页改版的交互方案',
      },
    ],
  },
};

export const MOCK_RECEIVED_MESSAGE_LIST = [
  '收到',
  'OK',
  '你说的有点道理',
  '我再想想',
  '行吧',
  '等一分钟',
  'Roger That',
  '好的',
  '啥啊',
  '啥都不是',
  '还得是你',
  '世界和平',
];
