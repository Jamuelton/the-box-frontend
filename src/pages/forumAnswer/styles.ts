import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
`;

export const ButtonContainer = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: flex-end;
`;

export const PostContainer = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

export const PostHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export const PostTitle = styled.h2`
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
  color: #333;
`;

export const PostDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #777;
`;

export const PostCategory = styled.span`
  background-color: #365486;
  color: #fff;
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
  font-size: 0.75rem;
  margin-right: 0.5rem;
`;

export const PostDate = styled.span`
  color: #555;
`;

export const PostContent = styled.p`
  color: #555;
`;
