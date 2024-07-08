import { ChatCircleDots, PaperPlaneTilt } from "@phosphor-icons/react";
import * as S from "./styles";
import { useState } from "react";
import { Input } from "../Input";
import { useLocation } from "react-router-dom";
import { SendMesageBot } from "../../services/ChatServices";

interface Message {
  sender: string;
  text: string | Array<{ [key: string]: string }>;
}

export const ChatBot = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const path = useLocation().pathname;

  const [query, setQuery] = useState<string>("");
  const [messages, setMessages] = useState<
    Array<{ sender: string; text: string | Array<Message> }>
  >([{ sender: "bot", text: "Como poderia te ajudar hoje?" }]);

  const handleChangeQuery = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setQuery(value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const AskBot = async () => {
    if (query.trim() !== "") {
      const userMessage = { sender: "user", text: query };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const response = await SendMesageBot(query);
      if (response?.status === 200) {
        const responseData = response.data.response;
        let botMessage;

        if (Array.isArray(responseData)) {
          botMessage = { sender: "bot", text: responseData };
        } else {
          botMessage = { sender: "bot", text: String(responseData) };
        }

        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }

      setQuery("");
    }
  };

  if (path === "/login" || path === "/register") {
    return null;
  }

  return (
    <S.Container>
      <S.OpenChatButton
        icon={<ChatCircleDots size={20} />}
        onClick={showModal}
      />
      <S.Chat
        title="ChatBot"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <>
            <Input
              placeHolder="Pergunte algo"
              inputFunction={handleChangeQuery}
              value={query}
            />
            <PaperPlaneTilt size={24} weight="fill" onClick={AskBot} />
          </>
        }
      >
        <S.ChatContent>
          {messages.map((message, index) => (
            <S.Message key={index} sender={message.sender}>
              <label>{message.sender === "bot" ? "Bot" : "Você"}</label>
              {Array.isArray(message.text) ? (
                message.text.map((item, subIndex) => (
                  <div key={subIndex}>
                    {Object.entries(item).map(([key, value]) => (
                      <p key={key}>
                        <strong>{key}:</strong> {value}
                      </p>
                    ))}
                  </div>
                ))
              ) : (
                <p>{message.text}</p>
              )}
            </S.Message>
          ))}
        </S.ChatContent>
      </S.Chat>
    </S.Container>
  );
};
