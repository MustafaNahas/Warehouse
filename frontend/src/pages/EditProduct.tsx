import React, {useEffect, useState} from "react";
import {useParams, useNavigate, useLocation} from "react-router-dom";
import {Box, Typography,CircularProgress} from "@mui/material";
import axios from "axios";
import type {Product} from "../assets/Types.ts";
import ProductForm from "../components/ProductForm.tsx";



export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const categories: string[] = location.state?.categories || [] ;
    const [product, setProduct] = useState<Product>({
        id:0,
        name: "",
        barcode: "",
        purchasePrice: 0,
        salePrice: 0,
        quantity: 0,
        imageUrl: "",
        tag: "",
        categorie: "",
    });
    useEffect(() => {
        axios
            .get(`/api/products/${id}`)
            .then((res) => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSave = () => {

        axios.put(`/api/products/${id}`, product).then(() => {
            navigate("/stock");
        });
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={5}>
                <CircularProgress />
            </Box>
        );
    }

    if (!product) {
        return (
            <Typography variant="h6" color="error" align="center" mt={5}>
                Product not found
            </Typography>
        );
    }

    const handleInputChange = (newValue: string) => {

        setProduct({
            ...product,
            imageUrl: newValue
        });
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
                Produkt bearbeiten
            </Typography>
            <ProductForm
                product={product}
                onChange={handleChange}
                onImageChange={handleInputChange}
                onSubmit={handleSave}
                onCancel={() => navigate("/stock")}
                submitLabel="Speichern"
                categories={categories.filter((c) => (c != null && c!="Alle"))}
            />
        </Box>
    );
}
