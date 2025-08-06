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
    eventName: "",
    eventTime: "",
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

    // 🛑 Replace with your webhook/API URL
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
        eventName: "",
        eventTime: "",
      });
    } else {
      alert("Submission failed!");
    }
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" mb={3} align="center" fontWeight="bold">
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
              />
            </Grid>

            {[
              "fajr",
              "dhuhr",
              "asr",
              "maghrib",
              "isha",
              "juma",
            ].map((namaz) => (
              <Grid item xs={12} sm={6} key={namaz}>
                <TextField
                  label={`${namaz.charAt(0).toUpperCase() + namaz.slice(1)} Time`}
                  name={namaz}
                  type="time"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={formData[namaz]}
                  onChange={handleChange}
                />
              </Grid>
            ))}

            {/* Event + Time Combined */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Event Name"
                name="eventName"
                fullWidth
                value={formData.eventName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Event Time"
                name="eventTime"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formData.eventTime}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{ mt: 2 }}
              >
                Submit Form
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default MasjidForm;
