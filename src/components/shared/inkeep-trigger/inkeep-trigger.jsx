'use client';

import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import closeIcon from './images/close.svg';
import SparksIcon from './images/sparks.inline.svg';

const InkeepCustomTrigger = dynamic(
  () => import('@inkeep/widgets').then((mod) => mod.InkeepCustomTrigger),
  { ssr: false }
);

const baseSettings = {
  apiKey: process.env.INKEEP_INTEGRATION_API_KEY,
  integrationId: process.env.INKEEP_INTEGRATION_ID,
  organizationId: process.env.INKEEP_ORGANIZATION_ID,
  primaryBrandColor: '#00E599',
  organizationDisplayName: 'Neon',
  customIcons: {
    close: { custom: closeIcon },
  },
};

const aiChatSettings = {
  botName: 'Neon AI',
  placeholder: 'How can I help you?',
  quickQuestionsLabel: 'Examples',
  quickQuestions: [
    'What’s Neon?',
    'How do I sign up for Neon?',
    'How to create a project?',
    'How to get started with the Neon API?',
  ],
  botAvatarSrcUrl: '/inkeep/images/example.svg',
  botAvatarDarkSrcUrl: '/inkeep/images/example.svg',
  userAvatarSrcUrl: '/inkeep/images/user.svg',
};

const InkeepTrigger = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, systemTheme } = useTheme();

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const inkeepCustomTriggerProps = {
    isOpen,
    onClose: handleClose,
    stylesheetUrls: ['/inkeep/css/inkeep-chat.css'],
    baseSettings: {
      ...baseSettings,
      colorMode: {
        forcedColorMode: theme === 'system' ? systemTheme : theme,
      },
    },
    aiChatSettings,
    modalSettings: {
      defaultView: 'AI_CHAT',
    },
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className={clsx(
          'chat-widget group flex items-center justify-center rounded border border-gray-new-90 bg-gradient-to-b from-white to-gray-new-98 pl-2 pr-3 hover:border-gray-new-70 focus:outline-none',
          'dark:border-gray-new-10 dark:from-[#1A1C1E] dark:to-[#0F1010] dark:hover:border-gray-new-20',
          'lg:absolute lg:right-4 lg:top-3 lg:items-center lg:space-x-1 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:text-secondary-8 lg:dark:text-green-45',
          className
        )}
        type="button"
        aria-label="Open Neon AI"
        onClick={handleClick}
      >
        <SparksIcon className="relative z-10 h-3 w-3" />
        <span
          className={clsx(
            'block text-[13px] font-medium leading-tight',
            'lg:border-b lg:border-secondary-8/50 lg:transition-colors lg:duration-200 lg:group-hover:border-transparent lg:dark:border-green-45/50'
          )}
        >
          <span className="block">Ask Neon AI</span>
          <span className="hidden text-gray-new-20 dark:text-gray-new-90 " aria-hidden>
            Ask Neon AI instead
          </span>
        </span>
      </button>
      <InkeepCustomTrigger {...inkeepCustomTriggerProps} />
    </>
  );
};

InkeepTrigger.propTypes = {
  className: PropTypes.string,
};

export default InkeepTrigger;
