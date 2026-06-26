import { Menu } from "lucide-react";
import ActiveTabSwitch from "../components/ActiveTabSwitch.jsx";
import BorderAnimationContainer from "../components/BorderAnimationContainer.jsx";
import ChatContainer from "../components/ChatContainer.jsx";
import ChatsList from "../components/ChatsList.jsx";
import ContactList from "../components/ContactList.jsx";
import NoConversationPlaceholder from "../components/NoChatHistoryPlaceholder.jsx";
import ProfileHeader from "../components/ProfileHeader.jsx";
import { useChatStore } from "../store/useChatStore.js";

export default function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="relative w-full max-w-6xl md:h-[800px]">
      <BorderAnimationContainer>
        {/* Mobile Drawer */}
        <div className="drawer md:hidden">
          <input
            id="mobile-sidebar"
            type="checkbox"
            className="drawer-toggle"
          />

          <div className="drawer-content flex flex-col flex-1">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-900">
              <label
                htmlFor="mobile-sidebar"
                className="btn btn-square btn-ghost"
              >
                <Menu size={22} />
              </label>

              <h2 className="font-semibold text-lg">OpenChitChat</h2>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
              {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
            </div>
          </div>

          <div className="drawer-side z-50">
            <label
              htmlFor="mobile-sidebar"
              className="drawer-overlay"
              aria-label="close sidebar"
            ></label>

            <div className="w-80 h-full bg-slate-800 flex flex-col">
              <ProfileHeader />
              <ActiveTabSwitch />

              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {activeTab === "chats" ? <ChatsList /> : <ContactList />}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex w-full h-full">
          {/* Left Sidebar */}
          <div className="md:w-72 lg:w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col border-r border-slate-700">
            <ProfileHeader />
            <ActiveTabSwitch />

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {activeTab === "chats" ? <ChatsList /> : <ContactList />}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
            {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
          </div>
        </div>
      </BorderAnimationContainer>
    </div>
  );
}
