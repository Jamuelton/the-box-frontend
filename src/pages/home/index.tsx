import {
  CalendarDots,
  ChatsCircle,
  Clock,
  FileText,
  FolderSimple,
  MapPinArea,
} from "@phosphor-icons/react";
import { Title } from "../../components/Title";
import { InfoCard } from "../../features/home/InfoCard";
import * as S from "./styles";

export function Home() {
  const infocardlist = [
    {
      text: "Fórum de Discussão",
      icon: <ChatsCircle size={32} color="#7fc7d9" />,
    },
    {
      text: "Horário dos laboratórios",
      icon: <Clock size={32} color="#7fc7d9" />,
    },
    {
      text: "Materiais de Apoio",
      icon: <FolderSimple size={32} color="#7fc7d9" />,
    },
    {
      text: "Documentações do curso",
      icon: <FileText size={32} color="#7fc7d9" />,
    },
    {
      text: "Calendário Acadêmico",
      icon: <CalendarDots size={32} color="#7fc7d9" />,
    },
    {
      text: "Comércio local",
      icon: <MapPinArea size={32} color="#7fc7d9" />,
    },
  ];

  return (
    <S.Container>
      <S.hearder>header</S.hearder>
      <S.Content>
        <Title text={"Pagina Inicial"} />
        <S.CardArea>
          {infocardlist.map((item, index) => (
            <InfoCard key={index} text={item.text} icon={item.icon} />
          ))}
        </S.CardArea>
      </S.Content>
    </S.Container>
  );
}
