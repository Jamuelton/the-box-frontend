import { CheckboxProps, MenuProps, Upload } from "antd";
import { FilterButton } from "../../components/FilterButton";
import { OrdenationButton } from "../../components/OrdenationButton";
import { SearchInput } from "../../components/Search";
import { Title } from "../../components/Title";
import * as S from "./styles";
import { List, Paperclip, Upload as UP, XCircle } from "@phosphor-icons/react";
import { Card } from "../../components/Card/Index";
import { useEffect, useState } from "react";
import { UploadProps } from "antd/lib";
import {
  errorNotification,
  successNotification,
} from "../../components/Notification";
import { Input } from "../../components/Input";
import { useData } from "../../config/data/UseData";
import {
  getMaterial,
  postMaterial,
  putURL,
} from "../../services/MaterialServices";
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
  const [archiveCategory, setArchiveCategory] =
    useState<CategoryMaterialEnum>();
  const [file, setFile] = useState<RcFile>();
  const [fileUrl, setFileUrl] = useState<string>();
  const [category, setCategory] = useState<CategoryMaterialEnum>();
  const [materials, setMaterials] = useState<MaterialInterface[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [order, setOrder] = useState<string>("desc");

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
      onClick: () => {
        setOrder("desc");
      },
    },
    {
      type: "divider",
    },
    {
      key: 2,
      label: "Postados Primeiro",
      onClick: () => {
        setOrder("asc");
      },
    },
    {
      type: "divider",
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
          onClick: () => {
            setOrder("desc");
            handleGetMaterial();
          },
        },
        {
          key: "2-2",
          label: "Postados Primeiro",
          onClick: () => {
            setOrder("asc");
            handleGetMaterial();
          },
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

  const handleSelectChange = (value: unknown) => {
    if (
      Object.values(CategoryMaterialEnum).includes(
        value as CategoryMaterialEnum
      )
    ) {
      setArchiveCategory(value as CategoryMaterialEnum);
    }
  };

  const handleCategoryFilter = () => {
    setModalFiltro(false);
    handleGetMaterial();
  };

  const handleCleanFilter = () => {
    setCategory(undefined);
    setModalFiltro(false);
  };

  const handleGetMaterial = async () => {
    try {
      const response = await getMaterial(token, order, category);
      if (response?.status == 200) {
        console.log(response);
        setMaterials(response.data.materials);
      }
      if (response?.status == 400) {
        errorNotification("Não foi possível encontrar materiais");
      }
    } catch (error) {
      if (error instanceof ZodError) {
        errorNotification(error.issues[0].message);
      }
    }
  };

  const handlePostMaterial = async () => {
    try {
      if (userId) {
        const urlfile = await urlPut();

        const archiveData: MaterialInterface = {
          title: archiveName,
          url: urlfile[0],
          description: archiveDescription,
          user_id: parseInt(userId),
          category: archiveCategory,
        };
        MaterialSchema.parse(archiveData);
        const response = await postMaterial(archiveData, token);
        if (response?.status == 200) {
          successNotification("Material publicado com sucesso");
          setFileUrl(undefined);
          setArchiveDescription(undefined);
          setArchiveName(undefined);
          setAttachModal(false);
          handleGetMaterial();
        }
        if (response?.status == 400) {
          errorNotification("Não foi possível criar material");
        }
      }
    } catch (error) {
      if (error instanceof ZodError) {
        errorNotification(error.issues[0].message);
      }
    }
  };

  const urlPut = async () => {
    if (file) {
      const url = await putURL(token, file.type.split("/")[1]);
      if (url?.status == 200) {
        await fetch(url.data.url, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": `image/${file.type.split("/")[1]}`,
          },
        });
        const splitUrl = url?.data.url;
        setFileUrl(splitUrl.split("?")[0]);
        return splitUrl.split("?"[0]);
      } else {
        errorNotification("Não foi possível fazer upload desse arquivo");
      }
    }
  };

  const props: UploadProps = {
    name: "file",
    multiple: false,
    maxCount: 1,
    onRemove() {
      setFile(undefined);
    },
    beforeUpload(file) {
      setFile(file);
      return false;
    },
  };

  const handleCheckbox: CheckboxProps["onChange"] = (e) => {
    console.log(e.target.value);
    setCategory(e.target.value);
  };

  const handleSearchTermChange = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  const handleSearchFilter = () => {
    if (searchTerm.length == 1 || searchTerm.length == 0) {
      handleGetMaterial();
    } else {
      setMaterials(
        materials.filter(
          (material) =>
            (material.title?.toLowerCase().includes(searchTerm.toLowerCase()) ??
              false) ||
            (material.description
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()) ??
              false)
        )
      );
    }
  };

  const handleDownload = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    handleGetMaterial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  useEffect(() => {
    handleGetMaterial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <SearchInput
            onChangeSearchFunction={handleSearchTermChange}
            searchFunction={handleSearchFilter}
          />
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
        {materials.length > 0 ? (
          materials.map(({ title, description, url }, index) => (
            <Card
              key={index}
              extend={true}
              title={title}
              content={description}
              download={true}
              onDownload={() => url && handleDownload(url)}
              edit={userProfile == "SUPER_USER"}
              editFunction={() => setAttachModal(true)}
              rateCard={false}
              like={false}
            ></Card>
          ))
        ) : (
          <S.NoPost>Publique um material de apoio</S.NoPost>
        )}
      </S.CardArea>
      <S.ModalFilterArea
        open={modalFiltro}
        onCancel={() => setModalFiltro(false)}
        footer={
          <S.ModalFilterBtnArea>
            {category && (
              <S.ModalCleanButton onClick={handleCleanFilter}>
                Limpar Filtros
              </S.ModalCleanButton>
            )}
            <S.ModalButton onClick={() => handleCategoryFilter()}>
              Aplicar
            </S.ModalButton>
          </S.ModalFilterBtnArea>
        }
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
              value="EDITAIS_DE_BOLSAS"
              checked={category?.toString() == "EDITAIS_DE_BOLSAS"}
            >
              Editais de Bolsas
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
            <S.ModalRow>
              <S.Archivelabel>Arquivo*</S.Archivelabel>
              <S.SelectArea
                placeholder="Categoria"
                style={{ width: 120 }}
                onChange={handleSelectChange}
                options={[
                  { value: "BAREMA", label: "Barema" },
                  { value: "REQUERIMENTO", label: "Requerimento" },
                  { value: "EDITAIS", label: "Editais" },
                  { value: "EDITAIS_DE_BOLSA", label: "Editais de bolsa" },
                ]}
              />
            </S.ModalRow>
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
