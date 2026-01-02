import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from '@/components/ui/sheet';
import { MessageSquareText, Send, X, MessageCircle, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea'; // Importar el componente Textarea
import { FAQ_DATA, FAQItem } from '@/lib/faqs'; // Importar FAQ_DATA

interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, text: '¡Hola! Soy tu asistente virtual de Vitasfera. ¿En qué puedo ayudarte hoy?', sender: 'bot' },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // Función para obtener la respuesta del bot
  const getBotResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();

    // Lógica para upselling y cross-selling con enlaces a productos
    if (lowerCaseMessage.includes("vitamina c")) {
      return "La <a href='/products/vitamina-d3-k2' target='_blank' rel='noopener noreferrer'>vitamina D3 + K2</a> y el <a href='/products/zinc' target='_blank' rel='noopener noreferrer'>zinc</a> potencian el efecto de la vitamina C.";
    }
    if (lowerCaseMessage.includes("articulaciones")) {
      return "Genial, tenemos <a href='/products/colageno' target='_blank' rel='noopener noreferrer'>colágeno</a>, <a href='/products/curcuma' target='_blank' rel='noopener noreferrer'>cúrcuma</a> y <a href='/products/magnesio' target='_blank' rel='noopener noreferrer'>magnesio</a> que funcionan muy bien juntos para las articulaciones.";
    }

    // Buscar coincidencias en las FAQ
    for (const category of FAQ_DATA) {
      for (const faq of category.faqs) {
        if (faq.question.toLowerCase().includes(lowerCaseMessage)) {
          return faq.answer;
        }
      }
    }

    // Respuestas por defecto
    if (lowerCaseMessage.includes("hola") || lowerCaseMessage.includes("saludo")) {
      return "¡Hola! ¿Cómo puedo ayudarte?";
    }
    if (lowerCaseMessage.includes("gracias")) {
      return "De nada. Estoy aquí para ayudarte.";
    }

    return "Lo siento, no pude encontrar una respuesta a eso. ¿Hay algo más en lo que pueda ayudarte?";
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newUserMessage: ChatMessage = { id: messages.length + 1, text: inputMessage, sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, newUserMessage]);

      const botResponseText = getBotResponse(inputMessage);
      const newBotMessage: ChatMessage = { id: messages.length + 2, text: botResponseText, sender: 'bot' };

      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, newBotMessage]);
      }, 500);

      setInputMessage('');
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg bg-primary hover:bg-primary/90 z-50"
        >
          <MessageSquareText className="h-7 w-7" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[350px] sm:w-[400px] flex flex-col h-full bg-background p-0 border-l border-border-primary shadow-xl">
        <SheetHeader className="bg-primary text-primary-foreground p-4 flex-row items-center justify-between shadow-md">
          <SheetTitle className="text-xl font-bold">Asistente Vitasfera</SheetTitle>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-primary/80"
            onClick={() => window.open("https://wa.me/XXXXXXXXXXX", "_blank")}
          >
              <Phone className="h-5 w-5" />
          </Button>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80">
              <X className="h-5 w-5" />
            </Button>
          </SheetClose>
        </SheetHeader>
        <ScrollArea className="flex-1 p-4 bg-muted/10">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-xl shadow-sm ${message.sender === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-secondary/20 text-foreground rounded-bl-none'}`}
                >
                  <span dangerouslySetInnerHTML={{ __html: message.text }} />
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <SheetFooter className="p-2 border-t bg-card shadow-lg">
          <div className="relative flex w-full items-center justify-center">
            <Textarea
              placeholder="Escribe tu mensaje..."
              className="mr-2 min-h-[40px] max-h-[100px] w-full resize-none pr-10 rounded-full border-border-secondary focus-visible:ring-primary"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button onClick={handleSendMessage} size="icon" className="absolute right-6 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 rounded-full h-10 w-10">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Chatbot;
