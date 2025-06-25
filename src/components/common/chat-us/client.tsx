function ChatBubble() {
  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
      <div className="flex items-center gap-3 bg-[rgba(255,255,255,0.8)] hover:bg-[rgba(255,255,255,1)] text-[#204eab] p-3 md:p-5 rounded-lg md:rounded-xl shadow-xl transition-colors cursor-pointer group">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="w-5 h-5 md:w-6 md:h-6 bi bi-whatsapp transition-all duration-200 group-hover:text-[#25D366]"
          viewBox="0 0 16 16"
        >
          <path d="..." />
        </svg>
      </div>
    </div>
  );
}

export default ChatBubble;
