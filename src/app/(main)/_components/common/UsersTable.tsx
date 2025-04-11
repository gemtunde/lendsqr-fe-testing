import { useState } from "react";
import {
  MoreVertical,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import styles from "../../../styles/UsersTable.module.scss";
// import styles from './UsersTable.module.scss';

interface User {
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: "Active" | "Inactive" | "Pending" | "Blacklisted";
}

const UsersTable = ({ users }: { users: User[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(100);

  const totalPages = Math.ceil(users.length / rowsPerPage);
  const paginatedUsers = users.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className={styles.tableContainer}>
      <Table className={styles.table}>
        <TableHeader className={styles.tableHeader}>
          <TableRow>
            <TableHead>
              <div className={styles.headerCell}>
                ORGANIZATION
                <Filter className="h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>
              <div className={styles.headerCell}>
                USERNAME
                <Filter className="h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>
              <div className={styles.headerCell}>
                EMAIL
                <Filter className="h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>
              <div className={styles.headerCell}>
                PHONE NUMBER
                <Filter className="h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>
              <div className={styles.headerCell}>
                DATE JOINED
                <Filter className="h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>
              <div className={styles.headerCell}>
                STATUS
                <Filter className="h-4 w-4" />
              </div>
            </TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className={styles.tableBody}>
          {paginatedUsers.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.organization}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>{user.dateJoined}</TableCell>
              <TableCell>
                <span
                  className={`${styles.statusBadge} ${styles[user.status.toLowerCase()]}`}
                >
                  {user.status}
                </span>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={styles.actionButton}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className={styles.dropdownMenu}
                  >
                    <DropdownMenuItem className={styles.dropdownItem}>
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem className={styles.dropdownItem}>
                      Blacklist User
                    </DropdownMenuItem>
                    <DropdownMenuItem className={styles.dropdownItem}>
                      Activate User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className={styles.pagination}>
        <div className={styles.paginationInfo}>
          <span>Showing</span>
          <div className={styles.selectWrapper}>
            <select
              className={styles.select}
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <ChevronDown className={styles.chevronIcon} size={12} />
          </div>
          <span>out of 100</span>
        </div>

        <div className={styles.paginationControls}>
          <button
            className={styles.pageButton}
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className={styles.chevronIcon} />
          </button>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNumber = i + 1;
            return (
              <button
                key={pageNumber}
                className={`${styles.pageButton} ${pageNumber === currentPage ? styles.active : ""}`}
                onClick={() => setCurrentPage(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          })}

          <span className={styles.ellipsis}>...</span>

          <button
            className={styles.pageButton}
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
          >
            <ChevronRight className={styles.chevronIcon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
