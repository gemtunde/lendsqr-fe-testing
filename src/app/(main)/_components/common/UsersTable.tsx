import React, { useState } from "react";
import {
  MoreVertical,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  SlidersHorizontal,
  Loader2,
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
// import { useNavigate } from "react-router-dom";
//import { useUserStorage } from "@/hooks/useUserStorage";
// import UserFilterForm from "@/components/users/UserFilterForm";
import styles from "../../../styles/UsersTable.module.scss";
//import { User } from "../../home/page";
import { useUserStorage } from "@/hooks/useUserStorage";
import { User } from "../../users/page";
//import type { User } from '@/pages/UsersPage';

interface FilterValues {
  organization?: string;
  username?: string;
  email?: string;
  date?: Date | null;
  phoneNumber?: string;
  status?: string;
}

const UsersTable = ({
  users,
  loading,
}: {
  users: User[];
  loading: boolean;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  //const navigate = useNavigate();
  const router = useRouter();
  const { saveUser } = useUserStorage();

  // Update filteredUsers when the users prop changes
  React.useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / rowsPerPage));
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleFilter = (values: FilterValues) => {
    const filtered = users.filter((user) => {
      // Only apply filters for fields that have values
      if (
        values.organization &&
        user.organization.toLowerCase() !== values.organization.toLowerCase()
      )
        return false;
      if (
        values.username &&
        !user.username.toLowerCase().includes(values.username.toLowerCase())
      )
        return false;
      if (
        values.email &&
        !user.email.toLowerCase().includes(values.email.toLowerCase())
      )
        return false;
      if (values.phoneNumber && !user.phoneNumber.includes(values.phoneNumber))
        return false;
      if (
        values.status &&
        user.status.toLowerCase() !== values.status.toLowerCase()
      )
        return false;
      if (values.date) {
        const userDateString = user.dateJoined.split(" ")[0];
        const filterDate = values.date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
        if (!userDateString.includes(filterDate.split(",")[0])) return false;
      }
      return true;
    });

    setFilteredUsers(filtered);
    setIsFilterOpen(false);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleReset = () => {
    setFilteredUsers(users);
    setIsFilterOpen(false);
    setCurrentPage(1); // Reset to first page when clearing filters
  };

  const handleViewDetails = (user: User) => {
    // Save user data to localStorage
    saveUser(user);
    // Navigate to user details page
    // navigate(`/users/${user.id}`);
    router.push(`/users/${user.id}`);
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableActions}>
        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className={styles.filterButton}>
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className={styles.filterDrawer}>
            {/* <UserFilterForm onFilter={handleFilter} onReset={handleReset} /> */}
          </SheetContent>
        </Sheet>
      </div>

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
          {loading ? (
            <TableRow>
              <TableCell colSpan={7} className={styles.loadingCell}>
                <div className={styles.loadingWrapper}>
                  <Loader2 className={`${styles.loadingIcon} animate-spin`} />
                  <p>Loading users...</p>
                </div>
              </TableCell>
            </TableRow>
          ) : paginatedUsers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className={styles.emptyCell}>
                <p>No users found</p>
              </TableCell>
            </TableRow>
          ) : (
            paginatedUsers.map((user) => (
              <TableRow key={user.id}>
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
                      <DropdownMenuItem
                        className={styles.dropdownItem}
                        onClick={() => handleViewDetails(user)}
                      >
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
            ))
          )}
        </TableBody>
      </Table>

      {!loading && paginatedUsers.length > 0 && (
        <div className={styles.pagination}>
          <div className={styles.paginationInfo}>
            <span>Showing</span>
            <div className={styles.selectWrapper}>
              <select
                className={styles.select}
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <ChevronDown className={styles.chevronIcon} size={12} />
            </div>
            <span>out of {filteredUsers.length}</span>
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

            {totalPages > 5 && <span className={styles.ellipsis}>...</span>}

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
      )}
    </div>
  );
};

export default UsersTable;
