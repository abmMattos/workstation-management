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
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const dataTable = [
  {
    id: "1",
    status: "Disponível",
    description: "2 Monitores",
    local: "2º andar - Sala 1",
  },
  {
    id: "2",
    status: "Disponível",
    description: "2 Monitores",
    local: "2º andar - Sala 1",
  },
  {
    id: "3",
    status: "Disponível",
    description: "2 Monitores",
    local: "2º andar - Sala 1",
  },
  {
    id: "4",
    status: "Disponível",
    description: "2 Monitores",
    local: "2º andar - Sala 1",
  },
];

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: () => <strong>#</strong>,
  }),
  columnHelper.accessor((row) => row.status, {
    id: "status",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <strong>Status</strong>,
  }),
  columnHelper.accessor("description", {
    header: () => <strong>Descrição</strong>,
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("local", {
    header: () => <strong>Localização</strong>,
  }),
];

export function Table() {
  const [data, _setData] = React.useState(() => [...dataTable]);
  const rerender = React.useReducer(() => ({}), {})[1];

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
                  <SmallButton img={search} />
                  <SmallButton img={clock} />
                  <SmallButton img={pencil} />
                  <SmallButton img={trash} />
                </Actions>
              </BodyCell>
            </BodyRow>
          ))}
        </tbody>
      </StyledTable>
    </Container>
  );
}
