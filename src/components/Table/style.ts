import styled from "styled-components";

export const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: 800px;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th {
    background-color: white;
    color: black;
    padding: 5px;
    border: 1px solid #ddd;
    text-align: left;
  }

  td {
    background-color: transparent;
    padding: 5px;
    border: 1px solid #ddd;
    text-align: left;
  }

  tr:nth-child(even) td {
    background-color: #dddce3;
  }

  tr:hover td {
    background-color: white;
  }
`;
