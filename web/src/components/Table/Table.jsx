import * as React from "react";
import {
  Container,
  StyledTable,
  HeaderRow,
  HeaderCell,
  BodyRow,
  BodyCell,
  Actions,
} from "./TableStyle";
import { DeleteButton, EditButton, BlockButton } from "../Button/Button";
import trash from "../../img/trash.png";
import pencil from "../../img/pencil.png";
import block from "../../img/block.svg";
import activate from "../../img/activate.svg";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useLocation } from "react-router-dom";

export function Table(props) {
  const location = useLocation();
  const path = location.pathname;

  const userType = localStorage.getItem("userType");
  
  const dataTable = props.dataTable;
  const columns = props.dataColumns;
  const [data, setData] = React.useState(() => [...dataTable]);
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Container>
      <StyledTable>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <HeaderRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <HeaderCell key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </HeaderCell>
              ))}
              { data.find(data => Object.keys(data).includes('status')) ?
                <HeaderCell>Bloquear <br /> Ativar</HeaderCell>
                :
                null
              }
              <HeaderCell>Editar</HeaderCell>
              <HeaderCell>Excluir</HeaderCell>
            </HeaderRow>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <BodyRow key={row.id} index={index}>
              {row.getVisibleCells().map((cell) => (
                <BodyCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </BodyCell>
              ))}
              {path === "/usuarios" || path === "/equipamentos" ? null : (
              <BodyCell width={"5%"}>
                <Actions>
                  
                    <BlockButton
                      img={row.original.status === "Ativo" ? activate : block}
                      id={row.original.id}
                      stationStatus={row.original.status}
                      urlBlock={props.urlBlock}
                      name={row.original.name}
                    />
                  
                </Actions>
              </BodyCell>
              )}
              <BodyCell width={"5%"}>
                <Actions>
                  <EditButton img={pencil} id={row.original.id} click={props.click} name={row.original.name} />
                </Actions>
              </BodyCell>
              <BodyCell width={"5%"}>
                <Actions>
                  <DeleteButton img={trash} id={row.original.id} url={props.url} name={row.original.name} />
                </Actions>
              </BodyCell>
            </BodyRow>
          ))}
        </tbody>
      </StyledTable>
    </Container>
  );
}
