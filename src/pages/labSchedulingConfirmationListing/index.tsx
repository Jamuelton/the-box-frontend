import ScheduleConfirmation from "../../components/ScheduleConfirmation/index";
import * as S from "./styles";
import { Title } from "../../components/Title";
import { useEffect, useState } from "react";
import { useData } from "../../config/data/UseData";
import { useNavigate } from "react-router-dom";

function LabSchedulingConfirmationListing() {
  const { userInfo } = useData();
  const navigate = useNavigate();
  const [lab, setLab] = useState<string>("windows");

  const handleLabClick = (value: string) => {
    setLab(value);
  };

  const getLabScheduleRequests = () => {
    // adicionar o request aqui
  };

  useEffect(() => {
    getLabScheduleRequests();
  }, [lab]);

  // Teste, apagar quando for integrar
  const schedules = [
    {
      title: "Titulo 1",
      begginsAt: new Date("2024-06-30T10:00:00"),
      endsAt: new Date("2024-06-30T12:00:00"),
      owner: "João",
    },
    {
      title: "Titulo 2",
      begginsAt: new Date("2024-07-01T11:00:00"),
      endsAt: new Date("2024-07-01T13:00:00"),
      owner: "Maria",
    },
    {
      title: "Titulo 3",
      begginsAt: new Date("2024-07-02T09:00:00"),
      endsAt: new Date("2024-07-02T11:00:00"),
      owner: "Carlos",
    },
  ];

  if (userInfo?.profile == "USER") {
    navigate("/");
  }

  return (
    <S.Container>
      <S.TitleContainer>
        <Title text={"Agendamento de horários dos laboratórios"} />
      </S.TitleContainer>
      <S.CustomSpan>
        <S.CustomButton
          lab={lab == "linux"}
          onClick={() => {
            handleLabClick("linux");
          }}
        >
          Linux
        </S.CustomButton>

        <S.CustomButton
          lab={lab == "windows"}
          onClick={() => {
            handleLabClick("windows");
          }}
        >
          Windows
        </S.CustomButton>
      </S.CustomSpan>

      <S.ConfirmationContainer>
        {schedules.map((schedule, index) => (
          <ScheduleConfirmation key={index} schedule={schedule} />
        ))}
      </S.ConfirmationContainer>
    </S.Container>
  );
}

export default LabSchedulingConfirmationListing;
