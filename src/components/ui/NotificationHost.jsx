import { useNotifications } from '../../context/NotificationContext';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

// Single notification item
const Notification = ({ notification, onRemove }) => {
  const { id, message, type } = notification;

  const icons = {
    success: <CheckCircle className="text-green-500" />,
    error: <AlertCircle className="text-red-500" />,
    info: <AlertCircle className="text-blue-500" />,
  };

  return (
    <div 
      className="animate-slide-in-out bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto flex items-start p-4 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex-shrink-0">
        {icons[type] || icons.info}
      </div>
      <div className="ml-3 w-0 flex-1 pt-0.5">
        <p className="text-sm font-medium text-gray-900 dark:text-white">{message}</p>
      </div>
      <div className="ml-4 flex-shrink-0 flex">
        <button
          onClick={() => onRemove(id)}
          className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

// Host container for all notifications
const NotificationHost = () => {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="fixed top-4 right-4 z-[9999] w-full max-w-sm space-y-3 pointer-events-none">
      {notifications.map(n => (
        <Notification 
          key={n.id} 
          notification={n} 
          onRemove={removeNotification} 
        />
      ))}
    </div>
  );
};

export default NotificationHost;