import * as S from "./styles";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { CaretLeft, UploadSimple } from "@phosphor-icons/react";
import { useState, useRef } from "react";
export function AddCalendar() {
    const handleSave = () => {
        alert("Calendário adicionado com sucesso!");
    }
    const [fileName, setFileName] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
        setFileName(file.name);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };
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
                    <S.FileInputContainer>
                        <S.CustomButton onClick={handleButtonClick}>
                            <UploadSimple size={34} color="grey" style={{ margin: "10px" }} />
                            <span>Insira aqui o Calendário Acadêmico</span>
                        </S.CustomButton>
                        <S.HiddenInput
                            ref={fileInputRef}
                            type="file"
                            onChange={handleFileChange}
                        />
                        {fileName && <S.FileLabel><strong>Arquivo:</strong> {fileName}</S.FileLabel>}
                    </S.FileInputContainer>
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