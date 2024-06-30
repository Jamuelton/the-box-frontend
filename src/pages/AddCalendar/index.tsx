import * as S from "./styles";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useNavigate } from "react-router-dom";
import { CaretLeft} from "@phosphor-icons/react";
export function AddCalendar() {
    const handleSave = () => {
        alert("Calendário adicionado com sucesso!");
    }

    const navigate = useNavigate();
  return (
        <S.Container >
            <S.Div>
                <Button
                    color="#7FC7D9"
                    secondColor="#070F2B"
                    icon={<CaretLeft size={24} color="#fff"/> }
                    shape="circle"
                    size="middle"
                    buttonFunction={() => navigate("/academic-calendar")}
                />      
            </S.Div>
          <S.Content>
            <S.Header>
              <S.Title>Cadastrar Calendário Acadêmico</S.Title>
            </S.Header>
            <S.FormGroup>
                <Input label="Calendário acadêmico" type="file" placeHolder="Insira o calendário acadêmico"/>
            </S.FormGroup>
            <S.ButtonDiv>
              <Button
                color="#070F2B"
                secondColor="#7FC7D9"
                label="Adicionar"
                shape="round"
                size="small"
                buttonFunction={handleSave}
              />
            </S.ButtonDiv>
          </S.Content>
        </S.Container>
  );
}

export default AddCalendar;