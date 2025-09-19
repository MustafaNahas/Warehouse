
import React, {useEffect, useState} from "react";
import {Box, Typography} from "@mui/material";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import ProductForm from "../components/ProductForm.tsx";
import type {Product} from "../assets/Types.ts";



const AddProduct: React.FC = () => {
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



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    };
    const handleInputChange = (newValue: string) => {

        setProduct({
            ...product,
            imageUrl: newValue
        });
    };

    const navigate = useNavigate();
    const [categories,setCategories] =useState<string[]>([]);
    useEffect(() => {
        axios
            .get<string[]>("/api/products/categories")
            .then((res) => setCategories(res.data))
            .catch((err) => {console.error("Fehler beim Laden die Kategorien:", err);
            });
    }, []);

    const handleSubmit = async () => {

        try {
            await axios.post("/api/products", {
                ...product,
                purchasePrice: (product.purchasePrice),
                salePrice: (product.salePrice),
                quantity: (product.quantity),
            });
            alert("Produkt erfolgreich erstellt!");
            navigate("/stock")
        } catch (error) {
            console.error("Fehler beim Erstellen des Produkts:", error);
            alert("Fehler beim Erstellen des Produkts.");
        }
    };


    return (
        <Box component="section" sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
                Neues Produkt hinzufügen
            </Typography>

            <ProductForm
                product={product}
                onChange={handleChange}
                onImageChange={handleInputChange}
                onSubmit={handleSubmit}
                submitLabel="Produkt hinzufügen"
                categories={categories.filter((c) => c != null)}
            />
        </Box>
    );
};

export default AddProduct;
