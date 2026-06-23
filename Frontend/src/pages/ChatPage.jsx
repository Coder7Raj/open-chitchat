import BorderAnimationContainer from "../components/BorderAnimationContainer.jsx";
import { useAuthStore } from "../store/useAuthStore.js";

export default function ChatPage() {
  const { logout } = useAuthStore();
  return (
    <div className="relative w-full max-w-6xl h-[800px]">
      <BorderAnimationContainer>
        {/* LEFT SIDE */}
        <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col">
          <ProfileHeader />
          <ActiveTabSwitch />

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {activeTab === "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>
      </BorderAnimationContainer>
    </div>
  );
}
