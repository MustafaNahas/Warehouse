import { useEffect, useState } from "react";
import {
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    Button,
    CardActions,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from "@mui/material";
import type {Product} from "../assets/Types.ts";
import axios from "axios";

import {useNavigate} from "react-router-dom";

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("Alle");

    useEffect(() => {
        axios
            .get<Product[]>("/api/products")
            .then((res) => setProducts(res.data))
            .catch((err) => {
                console.error("Fehler beim Laden der Produkte:", err);
            });
    }, []);
    const navigate = useNavigate();
    const handleDetails = (id: number) => {
        console.log("Details anzeigen für Produkt:", id);

    };
    const categories = ["Alle", ...new Set(products.map((p) => p.categorie))];
    const handleEdit = (id: number) => {

       navigate(`/products/${id}`, { state: {  categories } });

    };

    const handleDelete = (id: number) => {
        if (window.confirm("Willst du dieses Produkt wirklich löschen?")) {
            axios
                .delete(`/api/products/${id}`)
                .then(() => {
                    setProducts((prev) => prev.filter((p) => p.id !== id));
                })
                .catch((err) => {
                    console.error("Fehler beim Löschen:", err);
                });
        }
    };

    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.barcode.toLowerCase().includes(search.toLowerCase());

        const matchesCategory = category === "Alle" || product.categorie === category;

        return matchesSearch && matchesCategory;
    });

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Produkte Übersicht
            </Typography>

            {/* Filter Controls */}
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <TextField sx={{minWidth: 250}}
                    label="Suche nach Name oder Barcode"
                    variant="outlined"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    fullWidth
                />
                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Kategorie</InputLabel>
                    <Select
                        value={category}
                        label="Kategorie"
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {categories.map((cat, index) => (
                            <MenuItem key={index} value={cat}>
                                {cat}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {/* Produktkarten */}


            <Grid container spacing={1}   sx={{  alignItems: "center" }}>
                {filteredProducts.map((product) => (
                    <Box  sx={{ boxShadow: 1  }} key={product.id}    >

                        <Card  sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                            <CardMedia
                                component="img"
                                height="150"
                                image={product.imageUrl || "public/no-image-icon-23485.png"}
                                alt={product.name}
                                sx={{ objectFit: "contain" }}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" gutterBottom>
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Barcode: {product.barcode}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Kategorie: {product.categorie}
                                </Typography>
                                <Typography variant="body1" sx={{ mt: 1 }}>
                                    <strong>Verkaufspreis:</strong> €{product.salePrice}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Einkaufspreis: €{product.purchasePrice}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Bestand: {product.quantity}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => handleDetails(product.id)}>
                                    Details
                                </Button>
                                <Button size="small" onClick={() => handleEdit(product.id)}>
                                    Bearbeiten
                                </Button>
                                <Button size="small" color="error" onClick={() => handleDelete(product.id)}>
                                    Löschen
                                </Button>
                            </CardActions>
                        </Card>

                    </Box>
                ))}
            </Grid>

        </Box>
    );
}
