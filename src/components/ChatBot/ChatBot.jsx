import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';
import { FiMessageCircle, FiX } from 'react-icons/fi';
import { IoSend } from 'react-icons/io5';
import { RiRobot2Line } from 'react-icons/ri';

import axiosInstance from '../../services/axiosInstance';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello! I am your AI-powered College Mate. Ask me anything about the college, your courses, or even general knowledge!", isBot: true }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { text: input, isBot: false };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await axiosInstance.post('/chatbot/query', { message: input });
            setMessages(prev => [...prev, { text: response.data.reply, isBot: true }]);
        } catch (error) {
            const errorMsg = error.response?.data?.reply || "I'm having trouble connecting to my brain right now. Please try again soon!";
            setMessages(prev => [...prev, { text: errorMsg, isBot: true }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chatbot-wrapper">
            {/* Floating Toggle Button */}
            {!isOpen && (
                <button 
                    className="chatbot-toggle"
                    onClick={() => setIsOpen(true)}
                    aria-label="Open Chat"
                >
                    <FiMessageCircle size={28} />
                    <div className="notification-dot"></div>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <div className="header-info">
                            <div className="bot-avatar">
                                <RiRobot2Line size={20} />
                            </div>
                            <div>
                                <h3>College AI Assistant</h3>
                                <span className="status">Always Online</span>
                            </div>
                        </div>
                        <div className="header-actions">
                            <button onClick={() => setIsOpen(false)} className="close-btn"><FiX size={20} /></button>
                        </div>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message-group ${msg.isBot ? 'bot' : 'user'}`}>
                                <div className="message-content">
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="message-group bot">
                                <div className="message-content typing">
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form className="chatbot-input" onSubmit={handleSend}>
                        <input 
                            type="text" 
                            placeholder="Ask me anything..." 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button type="submit" disabled={!input.trim() || isLoading}>
                            <IoSend size={18} />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatBot;
