import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, RotateCcw, Phone } from 'lucide-react';
import { ChatMessage, ChatOption, ChatFlowState } from './ChatbotTypes';
import { ChatMessageComponent } from './ChatMessage';
import { getFlowData, staticResponses } from './chatbotData';
import avatarClara from '@/assets/avatar-clara.png';

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentState, setCurrentState] = useState<ChatFlowState>('greeting');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addBotMessage = useCallback((content: string, options?: ChatOption[]) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: 'bot',
          content,
          options,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 600);
  }, []);

  const initializeChat = useCallback(() => {
    setMessages([]);
    setCurrentState('greeting');
    
    const greetingData = getFlowData('greeting');
    setTimeout(() => {
      setMessages([
        {
          id: '1',
          type: 'bot',
          content: greetingData.message,
          timestamp: new Date(),
        },
      ]);
      
      setTimeout(() => {
        const menuData = getFlowData('main-menu');
        setMessages((prev) => [
          ...prev,
          {
            id: '2',
            type: 'bot',
            content: menuData.message,
            options: menuData.options,
            timestamp: new Date(),
          },
        ]);
        setCurrentState('main-menu');
      }, 800);
    }, 400);
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeChat();
    }
  }, [isOpen, messages.length, initializeChat]);

  const handleOptionClick = (option: ChatOption) => {
    // Add user selection as message
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: 'user',
        content: `${option.icon} ${option.label}`,
        timestamp: new Date(),
      },
    ]);

    // Handle special actions
    if (option.action === 'advisor') {
      addBotMessage(staticResponses['advisor'], [
        { id: 'back', icon: '↩️', label: 'Volver al Menú Principal', action: 'main-menu' },
      ]);
      return;
    }

    if (option.action === 'product-detail') {
      addBotMessage(staticResponses['product-detail'], [
        { id: 'back', icon: '↩️', label: 'Volver al Menú Principal', action: 'main-menu' },
        { id: 'expert', icon: '🧑‍⚕️', label: 'Hablar con un experto', action: 'advisor' },
      ]);
      return;
    }

    // Navigate to next state
    const nextState = option.action as ChatFlowState;
    setCurrentState(nextState);
    const flowData = getFlowData(nextState);
    addBotMessage(flowData.message, flowData.options);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: 'user',
        content: inputValue,
        timestamp: new Date(),
      },
    ]);
    setInputValue('');

    const lowerCaseMessage = inputValue.toLowerCase();
    let botResponseContent = '';

    if (lowerCaseMessage.includes("vitamina c")) {
      botResponseContent = "La <a href='/products/vitamina-d3-k2' target='_blank' rel='noopener noreferrer'>vitamina D3 + K2</a> y el <a href='/products/zinc' target='_blank' rel='noopener noreferrer'>zinc</a> potencian el efecto de la vitamina C.";
    } else if (lowerCaseMessage.includes("articulaciones")) {
      botResponseContent = "Genial, tenemos <a href='/products/colageno' target='_blank' rel='noopener noreferrer'>colágeno</a>, <a href='/products/curcuma' target='_blank' rel='noopener noreferrer'>cúrcuma</a> y <a href='/products/magnesio' target='_blank' rel='noopener noreferrer'>magnesio</a> que funcionan muy bien juntos para las articulaciones.";
    } else {
      botResponseContent = 'Gracias por tu mensaje. Para darte la mejor atención, te recomiendo seleccionar una de las opciones del menú o contactar directamente con nuestros expertos.';
    }

    addBotMessage(botResponseContent,
      [
        { id: 'menu', icon: '📋', label: 'Ver Menú Principal', action: 'main-menu' },
        { id: 'advisor', icon: '🧑‍💻', label: 'Hablar con un Asesor', action: 'advisor' },
      ]
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetChat = () => {
    initializeChat();
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 group ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Abrir chat"
      >
        <div className="relative">
          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-full bg-secondary animate-pulse-ring" />
          
          {/* Button */}
          <div className="relative w-16 h-16 rounded-full gradient-primary shadow-chat flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <img
              src={avatarClara}
              alt="Clara"
              className="w-14 h-14 rounded-full object-cover border-2 border-primary-foreground/20"
            />
          </div>

          {/* Notification badge */}
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center animate-bounce-gentle">
            <MessageCircle className="w-3 h-3 text-accent-foreground" />
          </div>
        </div>
      </button>

      {/* Chat Panel */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] transition-all duration-300 ${
          isOpen
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }`}
      >
        <div className="bg-card rounded-2xl shadow-chat overflow-hidden flex flex-col h-[600px] max-h-[80vh] border border-border">
          {/* Header */}
          <div className="gradient-chat p-4 flex items-center gap-3">
            <div className="relative">
              <img
                src={avatarClara}
                alt="Clara"
                className="w-12 h-12 rounded-full object-cover border-2 border-primary-foreground/30"
              />
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-accent rounded-full border-2 border-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-primary-foreground font-semibold">Clara</h3>
              <p className="text-primary-foreground/70 text-sm">Asistente de Bienestar Natural</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={() => window.open("https://wa.me/XXXXXXXXXXX", "_blank")}
                className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors"
                aria-label="Contactar por WhatsApp"
              >
                <Phone className="w-5 h-5 text-primary-foreground" />
              </button>
              <button
                onClick={resetChat}
                className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors"
                aria-label="Reiniciar chat"
              >
                <RotateCcw className="w-5 h-5 text-primary-foreground" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors"
                aria-label="Cerrar chat"
              >
                <X className="w-5 h-5 text-primary-foreground" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-muted/30 to-background">
            {messages.map((message, index) => (
              <ChatMessageComponent
                key={message.id}
                message={message}
                onOptionClick={handleOptionClick}
                isLatest={index === messages.length - 1}
              />
            ))}

            {isTyping && (
              <div className="flex items-start gap-3 animate-fade-in-up">
                <img
                  src={avatarClara}
                  alt="Clara"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-secondary/30"
                />
                <div className="chat-bubble-bot flex gap-1.5 py-3">
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="p-2.5 rounded-xl gradient-cta text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-hover"
                aria-label="Enviar mensaje"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Vitásfera · 15 años de Bienestar Natural 🌿
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
