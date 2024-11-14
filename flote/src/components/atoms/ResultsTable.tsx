import AccordionCard from "@atoms/cards/AccordionCard";
import { SearchTableColumn } from "@models/SearchTableColumn";
import { SearchTableRow } from "@models/SearchTableRow";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";

type Props = {
  title: string;
  columns: SearchTableColumn[];
  rows: SearchTableRow[];
  onRowAction: (arg0: any) => void;
};

export default function ResultsTable({
  title,
  columns,
  rows,
  onRowAction,
}: Props) {
  // TODO table sorting
  return (
    <AccordionCard title={title}>
      <Table
        aria-label={title}
        removeWrapper
        selectionMode="single"
        onRowAction={onRowAction}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} className="uppercase">
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows} emptyContent="No results found">
          {(item) => (
            <TableRow key={item.id} className="cursor-pointer">
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </AccordionCard>
  );
}
