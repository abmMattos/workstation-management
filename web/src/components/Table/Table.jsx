import * as React from "react";
import {
  Container,
  StyledTable,
  HeaderRow,
  HeaderCell,
  BodyRow,
  BodyCell,
  Actions
} from "./TableStyle";
import { DeleteButton, ReservationButton, SmallButton } from "../Button/Button";
import search from "../../img/search.png";
import clock from "../../img/clock.png";
import trash from "../../img/trash.png";
import pencil from "../../img/pencil.png";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useLocation } from "react-router-dom";

export function Table(props) {

  const location = useLocation();
  const path = location.pathname;

  const userType = localStorage.getItem('userType');

  const dataTable = props.dataTable
  const columns = props.dataColumns
  const [data, setData] = React.useState(() => [...dataTable]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // function handleGetObject(id) {
  //   const obj = data.find(obj => obj.id === id);
  //   return obj;
  // }

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
              <HeaderCell />
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
              <BodyCell width={'5%'}>
                <Actions>              
                      <SmallButton img={pencil} event={() => (row.original.id)} />
                      <DeleteButton img={trash} id={row.original.id} url={props.url} />
                </Actions>
              </BodyCell>
            </BodyRow>
          ))}
        </tbody>
      </StyledTable>
    </Container>
  );
}
