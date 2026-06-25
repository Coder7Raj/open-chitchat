import { XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useChatStore } from "../store/useChatStore.js";

export default function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const [now, setNow] = useState(Date.now());

  const isOnline = onlineUsers.includes(selectedUser._id.toString());

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };

    window.addEventListener("keydown", handleEscKey);

    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  // Update every minute so "1m ago" becomes "2m ago", etc.
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const formatLastSeen = (lastSeen, currentTime) => {
    if (!lastSeen) return "Offline";

    const diff = currentTime - new Date(lastSeen).getTime();

    const mins = Math.floor(diff / 60000);

    if (mins < 1) return "Last seen just now";
    if (mins < 60) return `Last seen ${mins}m ago`;

    const hours = Math.floor(mins / 60);

    if (hours < 24) return `Last seen ${hours}h ago`;

    const days = Math.floor(hours / 24);

    return `Last seen ${days}d ago`;
  };

  return (
    <div
      className="flex justify-between items-center bg-slate-800/50 border-b
      border-slate-700/50 max-h-[84px] px-6 flex-1"
    >
      <div className="flex items-center space-x-3">
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-12 rounded-full">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.username}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/avatar.png";
              }}
            />
          </div>
        </div>

        <div>
          <h3 className="text-slate-200 font-medium">
            {selectedUser.username}
          </h3>

          <p className="text-sm text-slate-400">
            {isOnline ? "Online" : formatLastSeen(selectedUser.lastSeen, now)}
          </p>
        </div>
      </div>

      <button onClick={() => setSelectedUser(null)}>
        <XIcon className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer" />
      </button>
    </div>
  );
}
