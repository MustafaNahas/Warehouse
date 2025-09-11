import { Container, Typography, Box, Paper } from "@mui/material";

const About = () => {
    return (
        <Container maxWidth="md" sx={{ mt: 10, mb: 5 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                <Box textAlign="center" mb={4}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Über dieses Projekt
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Warehouse Management System
                    </Typography>
                </Box>

                <Typography variant="body1" >
                    Dieses Projekt ist eine moderne Web-Anwendung zur Verwaltung von
                    Produkten in einem Kiosk oder Lager. Es ermöglicht das Hinzufügen,
                    Bearbeiten, Suchen und Löschen von Produkten. Jede Ware kann mit
                    Barcode, Preis, Menge, Kategorie und Bild hinterlegt werden.
                </Typography>

                <Typography variant="body1" >
                    Die Anwendung basiert auf einer <strong>Spring Boot REST API</strong> im
                    Backend und einem <strong>React + Material UI</strong> Frontend. Die
                    Authentifizierung erfolgt über <strong>OAuth2 (z. B. GitHub Login)</strong>,
                    sodass nur angemeldete Benutzer Zugriff auf die Daten haben.
                </Typography>

                <Typography variant="body1" >
                    Zukünftige Erweiterungen umfassen:
                </Typography>
                <ul>
                    <li>Integration von Verkauf & Kassenfunktionen</li>
                    <li>Statistiken und Dashboards über Verkäufe</li>
                    <li>Mehrbenutzerverwaltung mit Rollen (z. B. Admin, Mitarbeiter)</li>
                </ul>

                <Typography variant="body2" color="text.secondary" mt={3}>
                    Version 1.0 – entwickelt mit ❤️ von Mustafa
                </Typography>
            </Paper>
        </Container>
    );
};

export default About;
