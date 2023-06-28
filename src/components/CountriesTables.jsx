/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const CountriesTables = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const getCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v2/all");
      setCountries(response.data);
      setFilteredCountries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "Country Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Country Native Name",
      selector: (row) => row.nativeName,
    },
    {
      name: "Country Capital",
      selector: (row) => row.capital,
    },
    {
      name: "Country flag",
      selector: (row) => <img width={50} height={50} src={row.flag} />,
    },
    {
      name: "Active",
      cell: (row) => (
        <button
          className="btn btn-primary"
          onClick={() => alert(row.alpha2Code)}
        >
          Edit
        </button>
      ),
    },
  ];

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    const result = countries.filter((country) => {
      return country.name.toLowerCase().match(search.toLowerCase());
    });
    setFilteredCountries(result);
  }, [search]);

  return (
    <DataTable
      columns={columns}
      data={filteredCountries}
      pagination
      title="Country List"
      fixedHeader
      fixedHeaderScrollHeight="450px"
      selectableRows
      highlightOnHover
      selectableRowsHighlight
      actions={<button className="btn btn-sm btn-info">Export</button>}
      subHeader
      subHeaderComponent={
        <input
          type="text"
          placeholder="Search here"
          className=" w-25 form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      }
      //   subHeaderAlign="center"
    />
  );
};

export default CountriesTables;
