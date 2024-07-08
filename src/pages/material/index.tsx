import React, { useState } from "react";
import { MenuProps, Upload } from "antd";
import { FilterButton } from "../../components/FilterButton";
import { OrdenationButton } from "../../components/OrdenationButton";
import { SearchInput } from "../../components/Search";
import { Title } from "../../components/Title";
import * as S from "./styles";
import { List, Paperclip, Upload as UP, XCircle } from "@phosphor-icons/react";
import { Card } from "../../components/Card/Index";
import {
  errorNotification,
  successNotification,
} from "../../components/Notification";
import { Input } from "../../components/Input";
import { useData } from "../../config/data/UseData";
import Cookies from 'js-cookie';

export function Material() {
  const [attachModal, setAttachModal] = useState<boolean>(false);
  const [modalFiltro, setModalFiltro] = useState<boolean>(false);
  const [hamburguer, setHamburguer] = useState<boolean>(false);
  const [archiveName, setArchiveName] = useState<string>();
  const [archiveDescription, setArchiveDescription] = useState<string>();
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
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

  const handleDescription = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setArchiveDescription(value);
  };

  const handleName = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setArchiveName(value);
  };

  const { Dragger } = Upload;

  const getSignedUrl = async (fileType: string) => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`http://localhost:3000/materialUploadUrl?fileType=${fileType}`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to get signed URL');
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Error fetching signed URL:', error);
      errorNotification('Error fetching signed URL');
    }
  };

  const uploadToS3 = async (file: File, signedUrl: string) => {
    try {
      const response = await fetch(signedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type
        }
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      successNotification(`${file.name} file uploaded successfully.`);
      setFileUrl(signedUrl.split('?')[0]);
    } catch (error) {
      console.error('Error uploading file:', error);
      errorNotification('File upload failed');
    }
  };

  const handleSubmit = async () => {
    if (!fileUrl || !archiveName || !archiveDescription) {
      errorNotification('All fields are required.');
      return;
    }

    const token = Cookies.get('token');
    if (!token) {
      errorNotification('No token found');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/materialDidatico', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: archiveName,
          description: archiveDescription,
          fileUrl: fileUrl
        })
      });
      console.log(response)
      if (!response.ok) {
        throw new Error('Failed to submit material');
      }

      successNotification('Material submitted successfully.');
      setAttachModal(false); // Fechar o modal após o envio
    } catch (error) {
      console.error('Error submitting material:', error);
      errorNotification('Failed to submit material');
    }
  };

  const props = {
    name: "file",
    multiple: false,
    beforeUpload: async (file) => {
      const isSupportedFileType = ["application/pdf", "image/webp", "image/png", "image/jpeg", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/epub+zip"].includes(file.type);
      if (!isSupportedFileType) {
        errorNotification("Unsupported file type!");
        return false;
      }
      
      const signedUrl = await getSignedUrl(file.type.split('/').pop());
      if (signedUrl) {
        await uploadToS3(file, signedUrl);
      }
      return false;
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        setFile(info.file.originFileObj);
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
          download={true}
          edit={userProfile == "SUPER_USER"}
          editFunction={() => setAttachModal(true)}
        ></Card>
        <Card
          extend={true}
          title="Material de Apoio"
          content="Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum"
          download={true}
          edit={userProfile == "SUPER_USER"}
          editFunction={() => setAttachModal(true)}
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
            <S.ModalOkBtn onClick={handleSubmit}>Publicar</S.ModalOkBtn>
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
            inputFunction={handleName}
          ></Input>
          <Input
            label="Descrição do Arquivo*"
            placeHolder="Escreva algo..."
            inputFunction={handleDescription}
            value={archiveDescription}
          ></Input>
        </S.AttachModalContent>
      </S.AttachModal>
    </S.Container>
  );
}
