import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Send, Phone, Paperclip } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  isConnected: boolean;
  startCall: () => void;
  stopCall: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  disabled,
  isConnected,
  startCall,
  stopCall,
}) => {
  const [message, setMessage] = useState('');
  const { theme } = useTheme();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCallClick = () => {
    if (isConnected) {
      stopCall();
    } else {
      startCall();
    }
  };

  // const handleAttachmentClick = () => {
  //   console.log('Attachment button clicked');
  // };


const fileInputRef = useRef<HTMLInputElement>(null);

const handleAttachmentClick = () => {
  fileInputRef.current?.click();
};

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      onSendMessage(`<img src="${base64}" alt="uploaded" class="max-w-[100px] max-h-[100px] rounded-lg" />`);
    };
    reader.readAsDataURL(file);
  }
};



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <div className="p-4 bg-slate-700/50 backdrop-blur-md border-t border-slate-600/50">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative w-full">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={disabled}
            className="w-full p-4 pr-32 bg-slate-600/50 backdrop-blur-md border border-slate-500/50 rounded-xl text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-1 focus:ring-slate-400/50 focus:border-slate-400/50 transition-all duration-200 min-h-[56px] max-h-32 scrollbar-hide"
            rows={1}
          />
          
          {/* Buttons inside the input */}
          <div className="absolute right-2 bottom-2 flex items-center space-x-1">
            <button
              type="button"
              onClick={handleCallClick}
              className={`p-2 rounded-full border transition-all duration-300 hover:scale-110 ${
                isConnected 
                  ? 'bg-red-500 hover:bg-red-600 border-red-400/50 text-white' 
                  : 'bg-slate-600/50 hover:bg-slate-500/50 border-slate-500/50 text-white hover:border-slate-400/50'
              }`}
              
            >
              <Phone className="w-3 h-3" />
            </button>

            <button
              type="button"
              onClick={handleAttachmentClick}
              className="p-2 rounded-full bg-slate-600/50 hover:bg-slate-500/50 border border-slate-500/50 hover:border-slate-400/50 transition-all duration-300 text-white hover:scale-110"
            >
              <Paperclip className="w-3 h-3" />


<input
  type="file"
  accept="image/*"
  ref={fileInputRef}
  onChange={handleFileChange}
  style={{ display: 'none' }}
/>

            </button>

           <button
  type="submit"
  disabled={!message.trim() || disabled}
  className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
    message.trim() && !disabled
      ? 'bg-pink-600/20 backdrop-blur-md border border-pink-400/20 text-white'
      : 'bg-slate-600/50 text-gray-400 cursor-not-allowed border border-slate-500/50'
  }`}
>
  <Send className="w-3 h-3" />
</button>

          </div>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;