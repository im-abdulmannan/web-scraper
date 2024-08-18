import { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";

export default function Home() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all cards when the component mounts
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/scraped-data"
        );
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred");
      }
    };

    fetchAllData();
  }, []);

  const handleCreate = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/web-scrape",
        { url }
      );
      setData((prevData) => [response.data, ...prevData]);
      setError("");
      setUrl("");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h3" gutterBottom align="center">
          Web Scraper
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
          <TextField
            label="Enter URL"
            variant="outlined"
            fullWidth
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            sx={{ maxWidth: "600px" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreate}
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Create"
            )}
          </Button>
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </Box>
        <Grid container spacing={3}>
          {data.length === 0 ? (
            <Grid item xs={12}>
              <Typography variant="h6" align="center">
                No data available
              </Typography>
            </Grid>
          ) : (
            data.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                <Card
                  sx={{
                    maxWidth: 345,
                    boxShadow: 3,
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                      sx={{ mb: 1 }}
                    >
                      {item.storyLine}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      Ratings: {item.ratings}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                      sx={{ mb: 1 }}
                    >
                      Tags: {item.tags.join(", ")}
                    </Typography>
                    {item.image && (
                      <Box mt={2} textAlign="center">
                        <img
                          src={item.image}
                          alt={item.title}
                          style={{
                            maxWidth: "100%",
                            borderRadius: 4,
                            objectFit: "cover",
                            height: "200px",
                            width: "100%",
                          }}
                        />
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Container>
  );
}
