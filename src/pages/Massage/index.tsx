import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import Filter from "../../components/Filters";
import Gallery from "../../components/Gallery";
import massageHouseData from "../../db/massagesHouse.json";
import Loading from "../../components/Loading";
import NewBreadcrumbs from "../../components/NewBreadcrumbs";

const firstPage = "Home";
const pathToFirstPage = "/";
const pageTitle = "Casas de Massagem";

const Massage = () => {
  const [filters, setFilters] = useState({ city: "", neighborhood: "" });
  const [massageHouses, setMassageHouses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMassageHouses(massageHouseData);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (newFilters: {
    city: string;
    neighborhood: string;
  }) => {
    setFilters(newFilters);
  };

  return (
    <Container>
      {loading && <Loading />}
      <NewBreadcrumbs firstPage={firstPage} pathToFirstPage={pathToFirstPage} currentPage={pageTitle} />
      <Typography variant="h4" align="center" gutterBottom pb={2}>
        {pageTitle}
      </Typography>
      <Filter
        onFilterChange={handleFilterChange}
        massageHouses={massageHouses}
        
      />
      <Gallery filters={filters} />
    </Container>
  );
};

export default Massage;
