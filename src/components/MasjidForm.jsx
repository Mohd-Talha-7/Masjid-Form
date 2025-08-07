import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
} from "@mui/material";

const MasjidForm = () => {
  const [formData, setFormData] = useState({
    masjidName: "",
    location: "",
    fajr: "",
    dhuhr: "",
    asr: "",
    maghrib: "",
    isha: "",
    juma: "",
    event: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = import.meta.env.VITE_GOOGLE_SHEET_WEBHOOK;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: formData }),
    });

    if (response.ok) {
      alert("Form submitted successfully!");
      setFormData({
        masjidName: "",
        location: "",
        fajr: "",
        dhuhr: "",
        asr: "",
        maghrib: "",
        isha: "",
        juma: "",
        event: "",
      });
    } else {
      alert("Submission failed!");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url('/Al-Aqsa.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 5,
          maxWidth: 800,
          width: "100%",
          backdropFilter: "blur(15px)",
          background: "rgba(255, 255, 255, 0.15)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        }}
      >
        <Typography
          variant="h4"
          mb={4}
          align="center"
          fontWeight="bold"
          sx={{
            color: "#1b1b1b",
            textShadow: "1px 1px 1px rgba(255,255,255,0.4)",
          }}
        >
          🕌 Masjid Timing & Event Form
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Masjid Name"
                name="masjidName"
                fullWidth
                required
                value={formData.masjidName}
                onChange={handleChange}
                sx={textFieldStyles}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Location"
                name="location"
                fullWidth
                required
                value={formData.location}
                onChange={handleChange}
                sx={textFieldStyles}
              />
            </Grid>

            {["fajr", "dhuhr", "asr", "maghrib", "isha", "juma"].map(
              (namaz) => (
                <Grid item xs={12} sm={6} key={namaz}>
                  <TextField
                    label={`${namaz.charAt(0).toUpperCase() + namaz.slice(1)} Time`}
                    name={namaz}
                    type="time"
                    fullWidth
                    required
                    InputLabelProps={{ shrink: true }}
                    value={formData[namaz]}
                    onChange={handleChange}
                    sx={textFieldStyles}
                  />
                </Grid>
              )
            )}

            <Grid item xs={12}>
              <TextField
                label="Event"
                name="event"
                fullWidth
                required
                multiline
                minRows={3}
                value={formData.event}
                onChange={handleChange}
                sx={textFieldStyles}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{
                  mt: 2,
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  textTransform: "none",
                  py: 1.5,
                  borderRadius: 3,
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
                  },
                }}
              >
                📩 Submit Form
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

const textFieldStyles = {
  "& .MuiInputBase-root": {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: "8px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(0,0,0,0.1)",
  },
  "& label": {
    fontWeight: 500,
  },
};

export default MasjidForm;