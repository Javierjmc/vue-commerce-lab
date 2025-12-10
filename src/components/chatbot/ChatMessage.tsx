import { ChatMessage as ChatMessageType, ChatOption } from './ChatbotTypes';
import avatarClara from '@/assets/avatar-clara.png';

interface ChatMessageProps {
  message: ChatMessageType;
  onOptionClick?: (option: ChatOption) => void;
  isLatest?: boolean;
}

export function ChatMessageComponent({ message, onOptionClick, isLatest }: ChatMessageProps) {
  const isBot = message.type === 'bot';

  return (
    <div
      className={`flex gap-3 ${isBot ? 'items-start' : 'items-end justify-end'} ${
        isLatest ? 'animate-fade-in-up' : ''
      }`}
    >
      {isBot && (
        <img
          src={avatarClara}
          alt="Clara - Asistente Vitásfera"
          className="w-9 h-9 rounded-full object-cover flex-shrink-0 ring-2 ring-secondary/30"
        />
      )}
      
      <div className={`flex flex-col gap-2 ${isBot ? 'max-w-[85%]' : 'max-w-[75%]'}`}>
        <div className={isBot ? 'chat-bubble-bot' : 'chat-bubble-user'}>
          <p className="text-sm leading-relaxed whitespace-pre-line" dangerouslySetInnerHTML={{ __html: message.content }}></p>
        </div>

        {isBot && message.options && message.options.length > 0 && (
          <div className="flex flex-col gap-2 mt-1">
            {message.options.map((option) => (
              <button
                key={option.id}
                onClick={() => onOptionClick?.(option)}
                className="chat-option"
              >
                <span className="text-lg">{option.icon}</span>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
