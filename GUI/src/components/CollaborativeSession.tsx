import React, { useState, useEffect } from 'react';
import { Users, MessageSquare, Share2, Mic, Video, FileText, Settings, X } from 'lucide-react';

interface User {
  id: string;
  name: string;
  avatar: string;
  role: 'host' | 'participant';
  status: 'online' | 'away' | 'offline';
}

interface Message {
  id: string;
  user: User;
  content: string;
  timestamp: Date;
  type: 'text' | 'search' | 'result';
}

interface CollaborativeSessionProps {
  sessionId: string;
  onClose: () => void;
}

const CollaborativeSession: React.FC<CollaborativeSessionProps> = ({
  sessionId,
  onClose
}) => {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?img=1',
      role: 'host',
      status: 'online'
    },
    {
      id: '2',
      name: 'Jane Smith',
      avatar: 'https://i.pravatar.cc/150?img=2',
      role: 'participant',
      status: 'online'
    }
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      user: users[0],
      content: 'Welcome to the collaborative search session!',
      timestamp: new Date(),
      type: 'text'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      user: users[0],
      content: newMessage,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-6xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-500" />
            <h2 className="text-xl font-semibold">Collaborative Session</h2>
            <span className="text-sm text-gray-500">ID: {sessionId}</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 flex">
          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Video/Audio Area */}
            <div className="flex-1 p-4 grid grid-cols-2 gap-4">
              {users.map(user => (
                <div
                  key={user.id}
                  className="glass-effect rounded-xl p-4 flex items-center gap-4"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.role}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Area */}
            <div className="h-64 border-t">
              <div className="h-full flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map(message => (
                    <div
                      key={message.id}
                      className={`flex gap-2 ${
                        message.user.id === users[0].id ? 'justify-end' : ''
                      }`}
                    >
                      {message.user.id !== users[0].id && (
                        <img
                          src={message.user.avatar}
                          alt={message.user.name}
                          className="w-8 h-8 rounded-full"
                        />
                      )}
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.user.id === users[0].id
                            ? 'bg-indigo-500 text-white'
                            : 'glass-effect'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{message.user.name}</span>
                          <span className="text-xs opacity-75">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <p>{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 glass-effect p-2 rounded-lg"
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <button
                      onClick={sendMessage}
                      className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-64 border-l p-4 space-y-4">
            {/* Participants */}
            <div>
              <h3 className="font-medium mb-2">Participants</h3>
              <div className="space-y-2">
                {users.map(user => (
                  <div
                    key={user.id}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-2">
              <button
                onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                className={`w-full flex items-center gap-2 p-2 rounded-lg ${
                  isAudioEnabled
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                <Mic className="w-4 h-4" />
                <span>Audio</span>
              </button>
              <button
                onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                className={`w-full flex items-center gap-2 p-2 rounded-lg ${
                  isVideoEnabled
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>Video</span>
              </button>
              <button
                onClick={() => setIsScreenSharing(!isScreenSharing)}
                className={`w-full flex items-center gap-2 p-2 rounded-lg ${
                  isScreenSharing
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                <Share2 className="w-4 h-4" />
                <span>Share Screen</span>
              </button>
            </div>

            {/* Session Info */}
            <div className="pt-4 border-t">
              <h3 className="font-medium mb-2">Session Info</h3>
              <div className="space-y-2 text-sm">
                <p>Started: {new Date().toLocaleString()}</p>
                <p>Duration: 00:15:30</p>
                <p>Participants: {users.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaborativeSession; 