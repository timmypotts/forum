import styled from "styled-components";

const gray = "#ccc";
const teal = "#008080";
const outline = `1px solid ${gray}`;

export const PostWrapper = styled.section`
  text-align: center;
  :hover {
    cursor: pointer;
    .card {
      border-color: ${teal};
    }
  }
  .card {
    border: ${outline};
  }
  .card-body {
    padding: 1.25rem 0.75rem;
  }
`;
