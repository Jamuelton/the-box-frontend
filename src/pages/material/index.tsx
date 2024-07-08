import { CheckboxProps, MenuProps, Upload } from "antd";
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
  warningNotification,
} from "../../components/Notification";
import { Input } from "../../components/Input";
import { useData } from "../../config/data/UseData";
import { postMaterial, putURL } from "../../services/MaterialServices";
import { useAuth } from "../../config/auth/UseAuth";
import { RcFile } from "antd/es/upload";
import {
  CategoryMaterialEnum,
  // CategoryMaterialEnum,
  MaterialInterface,
} from "../../services/Types/materialTypes";
import { MaterialSchema } from "../../services/MaterialServices/materialSchema";
import { ZodError } from "zod";

export function Material() {
  const [attachModal, setAttachModal] = useState<boolean>(false);
  const [modalFiltro, setModalFiltro] = useState<boolean>(false);
  const [hamburguer, setHamburguer] = useState<boolean>(false);
  const [archiveName, setArchiveName] = useState<string>();
  const [archiveDescription, setArchiveDescription] = useState<string>();
  const [fileUrl, setFileUrl] = useState<string>();
  const [category, setCategory] = useState<CategoryMaterialEnum>();

  const { Dragger } = Upload;
  const { userInfo } = useData();
  const { userId } = useData();
  const { token } = useAuth();
  const userProfile = userInfo?.profile;

  interface ErrorInterface {
    errorShow?: boolean;
    errorText?: string;
    status?: "" | "warning" | "error" | undefined;
  }
  const [errorTitle, setErrorTitle] = useState<ErrorInterface>({
    errorShow: false,
    errorText: "",
    status: "",
  });
  const [errorDescription, setErrorDescription] = useState<ErrorInterface>({
    errorShow: false,
    errorText: "",
    status: "",
  });

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
    try {
      MaterialSchema.shape.description.parse(value);
      setErrorDescription({ errorShow: false });
    } catch (error) {
      setErrorDescription({
        errorShow: true,
        errorText: "Insira um título válido (1, 100)",
        status: "error",
      });
    }
    setArchiveDescription(value);
  };

  const handleName = (e: { target: { value: string } }) => {
    const { value } = e.target;
    try {
      MaterialSchema.shape.title.parse(value);
      setErrorTitle({ errorShow: false });
    } catch (error) {
      setErrorTitle({
        errorShow: true,
        errorText: "Insira uma descrição válido (1, 500)",
        status: "error",
      });
    }
    setArchiveName(value);
  };

  const handlePostMaterial = async () => {
    try {
      if (userId) {
        const archiveData: MaterialInterface = {
          title: archiveName,
          url: fileUrl,
          description: archiveDescription,
          user_id: parseInt(userId),
          category: "BAREMA",
        };
        MaterialSchema.parse(archiveData);
        const response = await postMaterial(archiveData, token);
        if (response?.status == 200) {
          successNotification("Material publicado com sucesso");
          setFileUrl(undefined);
          setArchiveDescription(undefined);
          setArchiveName(undefined);
          setAttachModal(false);
        }
        if (response?.status == 400) {
          errorNotification("Não foi possível criar material");
        }
      }
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error.issues);
        errorNotification(error.issues[0].message);
      }
    }
  };

  const urlPut = async (file: RcFile) => {
    const url = await putURL(token, file.type.split("/")[1]);
    const splitUrl = url?.data.url;
    setFileUrl(splitUrl.split("?")[0]);
  };

  const props: UploadProps = {
    name: "file",
    multiple: false,
    beforeUpload(file) {
      if (fileUrl) {
        warningNotification("Você só pode anexar um arquivo");
        return true;
      } else {
        urlPut(file);
        return false;
      }
    },
  };

  const handleCheckbox: CheckboxProps["onChange"] = (e) => {
    console.log(e.target.value);
    setCategory(e.target.value);
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
            <S.CheckboxArea
              onChange={handleCheckbox}
              value="BAREMA"
              checked={category?.toString() == "BAREMA"}
            >
              Barema
            </S.CheckboxArea>
            <S.CheckboxArea
              onChange={handleCheckbox}
              value="REQUERIMENTO"
              checked={category?.toString() == "REQUERIMENTO"}
            >
              Requerimento
            </S.CheckboxArea>
            <S.CheckboxArea
              onChange={handleCheckbox}
              value="EDITAIS"
              checked={category?.toString() == "EDITAIS"}
            >
              Editais
            </S.CheckboxArea>
            <S.CheckboxArea
              onChange={handleCheckbox}
              value="EDITAIS_DE_BOLSA"
              checked={category?.toString() == "EDITAIS_DE_BOLSA"}
            >
              Editais de Bolsa
            </S.CheckboxArea>
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
            <S.ModalOkBtn onClick={() => handlePostMaterial()}>
              Publicar
            </S.ModalOkBtn>
          </S.ModalFooter>
        }
        width={800}
      >
        <S.AttachModalContent>
          <S.uploadAttach>
            <S.Archivelabel>Arquivo*</S.Archivelabel>
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
            errorShow={errorTitle.errorShow}
            errorText={errorTitle.errorText}
          ></Input>
          <Input
            label="Descrição do Arquivo*"
            placeHolder="Escreva algo..."
            inputFunction={handleDescription}
            value={archiveDescription}
            errorShow={errorDescription.errorShow}
            errorText={errorDescription.errorText}
          ></Input>
        </S.AttachModalContent>
      </S.AttachModal>
    </S.Container>
  );
}
