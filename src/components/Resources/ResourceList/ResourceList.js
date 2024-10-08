import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Pagination,
  Card,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import ResourceCard from "../ResourceCard/ResourceCard";
import Googlemap from "../../GoogleMap/GoogleMap";

const ResourceList = () => {
  const { category } = useParams();

  const itemsPerPage = 5;
  const [resources, setResources] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };

    fetchResources();
  }, [category]);

  const paginateResources = resources.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box sx={{ p: 2 }}>
      <Typography
        variant="h5"
        sx={{ textAlign: "center", color: "#6A1B9A", mb: 2 }}
      >
        Near By{" "}
        {category
          .replace("lgbtq_", "")
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}{" "}
        Resources
      </Typography>

      <Card
        sx={{
          p: 2,
          borderRadius: "10px",
          backgroundColor: "#f5f5f5",
          boxShadow: "0 4px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Googlemap category={category} onResourcesFetched={setResources} />
      </Card>

      <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
        <Pagination
          count={Math.ceil(resources.length / itemsPerPage)}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          color="primary"
        />
      </Box>

      <Box
        sx={{
          gap: "30px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : paginateResources.length > 0 ? (
          <ResourceCard resource={paginateResources} category={category} />
        ) : (
          <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
            No {category} Resources Found Near By
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ResourceList;
