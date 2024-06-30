import { MenuProps, Upload, UploadFile } from "antd";
import { FilterButton } from "../../components/FilterButton";
import { OrdenationButton } from "../../components/OrdenationButton";
import { SearchInput } from "../../components/Search";
import { Title } from "../../components/Title";
import * as S from "./styles";
import { List, Paperclip, Upload as UP, XCircle } from "@phosphor-icons/react";
import { Card } from "../../components/Card/Index";
import { useState } from "react";
import { UploadProps } from "antd/lib";
import {
  errorNotification,
  successNotification,
} from "../../components/Notification";
import { Input } from "../../components/Input";
import { useData } from "../../config/data/UseData";

export function Material() {
  const [attachModal, setAttachModal] = useState<boolean>(false);
  const [modalFiltro, setModalFiltro] = useState<boolean>(false);
  const [hamburguer, setHamburguer] = useState<boolean>(false);
  const [archiveName, setArchiveName] = useState<string>();
  const [archiveDescription, setArchiveDescription] = useState<string>();
  const [file, setFile] = useState<UploadFile>();
  const { userInfo } = useData();
  const userProfile = userInfo?.profile;

  const ordenationItems: MenuProps["items"] = [
    {
      key: 1,
      label: "Postados Recentemente",
    },
    {
      type: "divider",
    },
    {
      key: 2,
      label: "Quantidade de Replys",
    },
    {
      type: "divider",
    },
    {
      key: 3,
      label: "Quantidade de Curtidas",
    },
  ];

  const items: MenuProps["items"] = [
    {
      key: 1,
      label: "Filtros",
      onClick: () => {
        setModalFiltro(!modalFiltro);
      },
    },
    {
      type: "divider",
    },
    {
      key: 2,
      type: "group",
      label: "Ordenar",
      children: [
        {
          key: "2-1",
          label: "Postados Recentemente",
        },
        {
          key: "2-2",
          label: "Quantidade de Replys",
        },
        {
          key: "2-3",
          label: "Quantidade de Curtidas",
        },
      ],
    },
  ];

  const { Dragger } = Upload;

  const props: UploadProps = {
    name: "file",
    multiple: false,
    beforeUpload(file) {
      const isPDF = file.type === "application/pdf";
      if (!isPDF) {
        errorNotification("You can only upload PDF file!");
      }
      return false;
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
        console.log("not done");
      }
      if (status === "done") {
        successNotification(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        errorNotification(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  return (
    <S.Container>
      <S.TitleArea>
        <Title text="Material de Apoio"></Title>
      </S.TitleArea>
      <S.ButtonsArea>
        <S.AttachButton onClick={() => setAttachModal(!attachModal)}>
          Anexar Material <Paperclip size={24} weight="bold" />
        </S.AttachButton>
        <S.AttachButtonIcon onClick={() => setAttachModal(!attachModal)}>
          <Paperclip size={20} weight="bold" />
        </S.AttachButtonIcon>
        <span>
          <SearchInput />
          <S.hamburguerButtons>
            <OrdenationButton
              items={ordenationItems}
              placement="bottomRight"
            ></OrdenationButton>
            <FilterButton
              buttonFunction={() => setModalFiltro(!modalFiltro)}
            ></FilterButton>
          </S.hamburguerButtons>
          <S.hamburguerSection menu={{ items }}>
            <List size={30} onClick={() => setHamburguer(!hamburguer)} />
          </S.hamburguerSection>
        </span>
      </S.ButtonsArea>
      <S.CardArea>
        <Card
          extend={true}
          title="Material de Apoio"
          content="Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum"
          download={true}
          edit={userProfile == "SUPER_USER"}
          editFunction={() => setAttachModal(true)}
        ></Card>
        <Card
          extend={true}
          title="Material de Apoio"
          content="Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum"
          rateCard={false}
        ></Card>
        <Card
          extend={true}
          title="Material de Apoio"
          content="Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum"
          rateCard={false}
        ></Card>
      </S.CardArea>
      <S.ModalFilterArea
        open={modalFiltro}
        onCancel={() => setModalFiltro(false)}
        footer={<S.ModalButton>Aplicar</S.ModalButton>}
        title="Filtros"
        centered
        closeIcon={<XCircle size={22} weight="bold" color="#23335e" />}
      >
        <S.ModalFilterContent>
          <h3>Categorias</h3>
          <div>
            <S.CheckboxArea>Checkbox</S.CheckboxArea>
            <S.CheckboxArea>Checkbox</S.CheckboxArea>
            <S.CheckboxArea>Checkbox</S.CheckboxArea>
          </div>
        </S.ModalFilterContent>
      </S.ModalFilterArea>
      <S.AttachModal
        open={attachModal}
        onCancel={() => setAttachModal(false)}
        title="Anexar Material de apoio"
        closeIcon={<XCircle size={22} weight="bold" color="#23335e" />}
        footer={
          <S.ModalFooter>
            <S.ModalCancelBtn onClick={() => setAttachModal(false)}>
              Cancelar
            </S.ModalCancelBtn>
            <S.ModalOkBtn>Publicar</S.ModalOkBtn>
          </S.ModalFooter>
        }
        width={800}
      >
        <S.AttachModalContent>
          <S.uploadAttach>
            <label>Arquivo*</label>
            <Dragger {...props}>
              <UP size={68} weight="fill" />
              <p className="ant-upload-text">
                Arraste ou clique no ícone para selecionar um arquivo
              </p>
            </Dragger>
          </S.uploadAttach>
          <Input
            label="Nome do Arquivo*"
            value={archiveName}
            inputFunction={(e) => setArchiveName(e)}
          ></Input>
          <Input
            label="Descrição do Arquivo*"
            placeHolder="Escreva algo..."
          ></Input>
        </S.AttachModalContent>
      </S.AttachModal>
    </S.Container>
  );
}
