import * as S from "./styles";
import { Button, MenuProps } from "antd";
import { FilterButton } from "../../components/FilterButton";
import { OrdenationButton } from "../../components/OrdenationButton";
import { Title } from "../../components/Title/";
import { List, MagnifyingGlass, Plus, XCircle } from "@phosphor-icons/react";
import { Card } from "../../components/Card/Index";
import { useEffect, useState } from "react";
import { Input } from "../../components/Input";
import { createPost, getPosts } from "../../services/ForumServices";
import { CategoryEnum, ForumInterface } from "../../services/Types/forumTypes";
import {
  errorNotification,
  successNotification,
} from "../../components/Notification";
import { ForumPostSchema } from "../../services/ForumServices/forumSchema";
import { ZodError } from "zod";

export function Forum() {
  const [modalFiltro, setModalFiltro] = useState<boolean>(false);
  const [modalPost, setModalPost] = useState<boolean>(false);
  const [ordering, setOrdering] = useState<string>("date");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [hamburguer, setHamburguer] = useState<boolean>(false);
  const [post, setPost] = useState<ForumInterface[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState<CategoryEnum>();

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
  const [errorContent, setErrorContent] = useState<ErrorInterface>({
    errorShow: false,
    errorText: "",
    status: "",
  });

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
          label: "Posts Recentes",
        },
        {
          key: "2-2",
          label: "Posts Antigos",
        },
      ],
    },
  ];

  const ordenationItems: MenuProps["items"] = [
    {
      key: 1,
      label: "Posts Recentes",
      onClick: () => {
        setOrderingAndOrderPosts("date");
      },
    },
    {
      type: "divider",
    },
    {
      key: 2,
      label: "Posts antigos",
      onClick: () => {
        setOrderingAndOrderPosts("replies");
      },
    },
    {
      type: "divider",
    },
  ];

  const setOrderingAndOrderPosts = (order: string) => {
    setOrdering(order);
    orderPost(post, order);
  };

  const handleSelectChange = (value: unknown) => {
    if (Object.values(CategoryEnum).includes(value as CategoryEnum)) {
      setCategory(value as CategoryEnum);
    }
  };

  const orderPost = (posts: ForumInterface[], order: string) => {
    switch (order) {
      case "date":
        posts.sort((a, b) => {
          const dateA = new Date(a.created_at ?? 0).getTime();
          const dateB = new Date(b.created_at ?? 0).getTime();
          return dateB - dateA;
        });
        break;
      case "replies":
        posts.sort((a, b) => {
          const dateA = new Date(a.created_at ?? 0).getTime();
          const dateB = new Date(b.created_at ?? 0).getTime();
          return dateA - dateB;
        });
        break;
      default:
        break;
    }

    setPost(posts);
  };

  const getPost = async () => {
    const response = await getPosts();
    if (response?.status == 200) {
      orderPost(response.data, ordering);
    } else {
      errorNotification("Não foi possível carregar os posts");
    }
  };

  const handleChangeTitle = (e: { target: { value: string } }) => {
    const { value } = e.target;
    try {
      ForumPostSchema.shape.title.parse(value);
      setErrorTitle({ errorShow: false });
    } catch (error) {
      setErrorTitle({
        errorShow: true,
        errorText: "Insira um título válido (1, 20)",
        status: "error",
      });
    }

    setTitle(value);
  };

  const handleChangeContent = (e: { target: { value: string } }) => {
    const { value } = e.target;
    try {
      ForumPostSchema.shape.content.parse(value);
      setErrorContent({ errorShow: false });
    } catch (error) {
      setErrorContent({
        errorShow: true,
        errorText: "Insira um conteúdo válido (1, 250)",
        status: "error",
      });
    }

    setContent(value);
  };

  const ForumData: ForumInterface = {
    title: title,
    content: content,
    category: category,
    user_id: 1,
  };

  const handleSearchTermChange = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  const handleSearchFilter = () => {
    if (searchTerm.length == 1 || searchTerm.length == 0) {
      getPost();
    } else {
      setPost(
        post.filter(
          (post) =>
            (post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ??
              false) ||
            (post.content?.toLowerCase().includes(searchTerm.toLowerCase()) ??
              false)
        )
      );
    }
  };

  const createPosts = async () => {
    try {
      ForumPostSchema.parse(ForumData);
      const response = await createPost(ForumData);

      if (response?.status == 200) {
        successNotification("Post publicado com sucesso");
        setModalPost(false);
        getPost();
      }
      if (response?.status == 400) {
        errorNotification("Não foi possível criar post");
      }
    } catch (error) {
      if (error instanceof ZodError) {
        errorNotification(error.issues[0].message);
      }
    }
  };

  useEffect(() => {
    getPost();
  }, []);
  return (
    <S.Container>
      <S.Title>
        <Title text="Fórum"></Title>
      </S.Title>
      <S.ButtonsArea>
        <S.NewButton onClick={() => setModalPost(!modalPost)}>
          Novo Post <Plus size={22} weight="bold" />
        </S.NewButton>
        <S.NewButtonIcon onClick={() => setModalPost(!modalPost)}>
          <Plus size={20} weight="bold" />
        </S.NewButtonIcon>
        <span>
          <span style={{ background: "#f2f2f2", borderRadius: 10, width: 250 }}>
            <Input
              placeHolder="Pesquisar"
              inputFunction={handleSearchTermChange}
            />
            <Button
              onClick={handleSearchFilter}
              style={{
                border: "none",
                boxShadow: "none",
                background: "transparent",
              }}
              icon={
                <MagnifyingGlass
                  size={24}
                  style={{
                    marginInline: 10,
                    border: "none",
                    background: "transparent",
                  }}
                />
              }
            />
          </span>
          <S.hamburguerButtons>
            <OrdenationButton items={ordenationItems} placement="bottomRight" />
            <FilterButton buttonFunction={() => setModalFiltro(!modalFiltro)} />
          </S.hamburguerButtons>
          <S.hamburguerSection menu={{ items }}>
            <List size={30} onClick={() => setHamburguer(!hamburguer)} />
          </S.hamburguerSection>
        </span>
      </S.ButtonsArea>
      <S.CardArea>
        {post.length > 0 ? (
          post.map(({ title, content }, index) => (
            <Card
              key={index}
              title={title}
              content={content}
              rateCard={false}
              like={true}
              extend={true}
              details={true}
            />
          ))
        ) : (
          <S.NoPost>Publique um post no fórum</S.NoPost>
        )}
      </S.CardArea>
      <S.ModalArea
        open={modalFiltro}
        onCancel={() => setModalFiltro(false)}
        footer={<S.ModalButton>Aplicar</S.ModalButton>}
        title="Filtros"
        centered
        closeIcon={<XCircle size={22} weight="bold" color="#23335e" />}
      >
        <S.ModalContent>
          <h3>Categorias</h3>
          <div>
            <S.CheckboxArea>Checkbox</S.CheckboxArea>
            <S.CheckboxArea>Checkbox</S.CheckboxArea>
            <S.CheckboxArea>Checkbox</S.CheckboxArea>
          </div>
        </S.ModalContent>
      </S.ModalArea>
      <S.NewPostModal
        open={modalPost}
        onCancel={() => setModalPost(false)}
        title="Novo Post"
        width={800}
        closeIcon={<XCircle size={22} weight="bold" color="#23335e" />}
        footer={
          <S.TextAreaFooter>
            <S.TextAreaCancelBtn onClick={() => setModalPost(false)}>
              Cancelar
            </S.TextAreaCancelBtn>
            <S.TextAreaOkBtn onClick={createPosts}>Publicar</S.TextAreaOkBtn>
          </S.TextAreaFooter>
        }
      >
        <S.newPostContent>
          <div>
            <h3>Título *</h3>
            <S.newPostDiv>
              <Input
                placeHolder="Título"
                inputFunction={handleChangeTitle}
                status={errorTitle.status}
                errorShow={errorTitle.errorShow}
                errorText={errorTitle.errorText}
              ></Input>
              <S.SelectArea
                placeholder="Categoria"
                style={{ width: 120 }}
                onChange={handleSelectChange}
                options={[
                  { value: "TECHNOLOGY", label: "Tecnologia" },
                  { value: "UNIVERSITY", label: "Universidade" },
                  { value: "LIFESTYLE", label: "Lifestyle" },
                  { value: "RESEARCH", label: "Pesquisa" },
                ]}
              />
            </S.newPostDiv>
          </div>
          <div>
            <h3>Corpo da Publicação *</h3>
            <S.TextAreaContainer
              placeholder="Sua publicação..."
              rows={8}
              onChange={handleChangeContent}
              status={errorContent.status}
            ></S.TextAreaContainer>
            {errorContent.errorShow && (
              <S.TextAreaError>{errorContent.errorText}</S.TextAreaError>
            )}
          </div>
        </S.newPostContent>
      </S.NewPostModal>
    </S.Container>
  );
}
