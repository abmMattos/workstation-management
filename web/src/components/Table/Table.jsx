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
import { SmallButton } from "../Button/Button";
import search from "../../img/search.png";
import clock from "../../img/clock.png";
import trash from "../../img/trash.png";
import pencil from "../../img/pencil.png";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export function Table(props) {
  const dataTable = props.dataTable
  const columns = props.dataColumns
  console.log(dataTable);
  const [data, setData] = React.useState(() => [...dataTable]);
  const rerender = React.useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  function handleGetObject(id) {
    const obj = data.find(obj => obj.id === id);
    return obj;
  }
  
  function handleDelete(id) {
    const updatedData = data.filter(obj => obj.id !== id);
    setData(updatedData);
  }

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
              <BodyCell width={'22%'}>
                <Actions>
                  <SmallButton img={search} event={() => handleGetObject(row.original.id)} />
                  <SmallButton img={clock} event={() => handleGetObject(row.original.id)} />
                  <SmallButton img={pencil} event={() => handleGetObject(row.original.id)} />
                  <SmallButton img={trash} event={() => handleDelete(row.original.id)} />
                </Actions>
              </BodyCell>
            </BodyRow>
          ))}
        </tbody>
      </StyledTable>
    </Container>
  );
}
