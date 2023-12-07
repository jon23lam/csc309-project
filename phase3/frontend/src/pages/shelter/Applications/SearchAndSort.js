import React, { useContext, useEffect, useState } from "react";

import { observer } from "mobx-react";
import "../../../BaseStyles.scss";
import "./ApplicationsPage.scss";
import { RootStoreContext } from "../../../providers/RootProvider";
import app from "../../../App";

export const SearchAndSort = observer((props) => {
  const rootStore = useContext(RootStoreContext);
  const { applicationStore } = rootStore;

  const [filters, setFilters] = useState({ filters: { status: "any" } });
  const [sortBy, setSortBy] = useState("lastUpdated");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    applicationStore.getApplicationsFilterd(filters);
  }, [filters]);

  function onFiltersChange(filterValue) {
    setFilters({ status: filterValue });
  }

  function onSortby(sort) {
    setFilters({ sort_by: sort });
  }

  return (
    <div className="ApplicationsPage__controls">
      <div className="ApplicationsPage__sortingButtons">
        <button
          className={`Button__purple ${
            sortBy === "lastUpdated" ? "active" : ""
          }`}
          onClick={() => onSortby("updated")}
        >
          Sort by Last Updated
        </button>
        <button
          className={`Button__purple ${
            sortBy === "lastCreated" ? "active" : ""
          }`}
          onClick={() => onSortby("created")}
        >
          Sort by Last Created
        </button>
      </div>
      <div className="ApplicationsPage__statusFilter">
        <select
          value={statusFilter}
          onChange={(e) => onFiltersChange(e.target.value)}
          className="form-select"
        >
          <option value="">Filter by Status</option>
          <option value="approved">Approved</option>
          <option value="withdrawn">Withdrawn</option>
          <option value="pending">Pending</option>
          <option value="denied">Denied</option>
        </select>
      </div>

      <div className="ApplicationsPage__searchBar">
        <input
          type="text"
          placeholder="Search applications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="Button__purple" onClick={() => setSearchTerm("")}>
          Clear
        </button>
      </div>
    </div>
  );
});
