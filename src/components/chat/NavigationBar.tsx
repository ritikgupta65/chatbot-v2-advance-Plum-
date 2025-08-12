
import { useTheme } from '@/contexts/ThemeContext';
import { MessageCircle, Clock, HelpCircle, Home } from 'lucide-react';
import { ChatState } from '@/types/chat';

interface NavigationBarProps {
  currentView: ChatState;
  onNavigate: (view: ChatState) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ currentView, onNavigate }) => {
  const { theme } = useTheme();

  const navItems = [
    { id: 'welcome' as ChatState, icon: Home, label: 'Home' },
    { id: 'history' as ChatState, icon: MessageCircle, label: 'Chats' },
    { id: 'faq' as ChatState, icon: HelpCircle, label: 'FAQ' },
  ];

  return (
    <div className="bg-black/20 backdrop-blur-md border-t border-white/20 p-2">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center space-y-1 p-3 rounded-xl transition-all duration-300 min-w-[80px] hover:scale-105 ${
                isActive 
                  // ? `bg-gradient-to-r ${theme.primaryGradient} text-white shadow-lg border border-white/30` 
                  ? 'bg-blue-600/20 backdrop-blur-md border border-blue-400/20 text-white'

                  : 'text-gray-400 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationBar;
