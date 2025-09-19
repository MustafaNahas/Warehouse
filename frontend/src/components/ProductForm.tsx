import React from "react";
import {Grid, TextField, Button, Autocomplete} from "@mui/material";
import ImageFileUpload from "./ImageFileUpload.tsx";
import type {Product} from "../assets/Types.ts";

interface ProductFormProps {
    product: Product,
    categories: string[],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onImageChange: (newValue: string) => void,
    onSubmit: () => void,
    onCancel?: () => void,
    submitLabel: string
}

const ProductForm: React.FC<ProductFormProps> = ({
                                                     product,
                                                     categories,
                                                     onChange,
                                                     onImageChange,
                                                     onSubmit,
                                                     onCancel,
                                                     submitLabel

                                                 }) => {

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}
        >
            <Grid container spacing={2}>

                <TextField fullWidth label="Name" name="name" value={product.name || ""} onChange={onChange} required/>


                <TextField fullWidth label="Barcode" name="barcode" value={product.barcode || ""} onChange={onChange}/>


                <TextField fullWidth type="number" label="Einkaufspreis" name="purchasePrice"
                           value={product.purchasePrice || ""} onChange={onChange} required/>


                <TextField fullWidth type="number" label="Verkaufspreis" name="salePrice"
                           value={product.salePrice || ""} onChange={onChange} required/>

                <TextField fullWidth type="number" label="Menge" name="quantity" value={product.quantity || ""}
                           onChange={onChange} required/>

                <ImageFileUpload value={product.imageUrl} onChange={onImageChange}/>

                <TextField fullWidth label="Tag" name="tag" value={product.tag || ""} onChange={onChange}/>


                <Autocomplete
                    fullWidth
                    freeSolo
                    options={categories}
                    value={product.categorie }
                    onChange={(_, newValue) => {
                        onChange({
                            target: { name: "categorie", value: newValue }
                        } as React.ChangeEvent<HTMLInputElement>);
                    }}
                    onInputChange={(_, newInputValue) => {
                        onChange({
                            target: { name: "categorie", value: newInputValue }
                        } as React.ChangeEvent<HTMLInputElement>);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />

                <Button type="submit" variant="contained" color="primary">
                    {submitLabel}
                </Button>
                {onCancel && (
                    <Button variant="outlined" color="secondary" onClick={onCancel}>
                        Abbrechen
                    </Button>
                )}

            </Grid>
        </form>
    );
};

export default ProductForm;
