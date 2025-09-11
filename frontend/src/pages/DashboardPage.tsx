import { useEffect, useState } from "react";
import {Box, Typography, Grid, Paper, Divider} from "@mui/material";
import axios from "axios";
import {
    PieChart, Pie, Cell, Tooltip, Legend,
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    LineChart, Line,
    AreaChart, Area
} from "recharts";
import type { Product } from "../assets/Types.ts";

export default function DashboardPage() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        axios.get<Product[]>("/api/products").then((res) => setProducts(res.data));
    }, []);
    const totalProducts = products.length;
    const totalStock = products.reduce((sum, p) => sum + p.quantity, 0);
    const totalValue = products.reduce((sum, p) => sum + p.purchasePrice * p.quantity, 0);
    const totalSaleValue = products.reduce((sum, p) => sum + p.salePrice * p.quantity, 0);

    // Chart 1: Produkte pro Kategorie
    const categoryData = Object.entries(
        products.reduce((acc, p) => {
            acc[p.categorie] = (acc[p.categorie] || 0) + 1;
            return acc;
        }, {} as Record<string, number>)
    ).map(([name, value]) => ({ name, value }));

    // Chart 2: Top 5 Produkte nach Bestand
    const topStock = [...products]
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 5)
        .map((p) => ({ name: p.name, quantity: p.quantity }));

    // Chart 3: Verkaufspreis-Verlauf (einfach nach IDs sortiert)
    const salePrices = products.map((p) => ({
        name: p.name,
        salePrice: p.salePrice,
    }));

    // Chart 4: Gewinnpotenzial (SalePrice - PurchasePrice) * Quantity
    const profitData = products.map((p) => ({
        name: p.name,
        profit: (p.salePrice - p.purchasePrice) * p.quantity,
    }));

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

    return (
        <>   <Typography variant="h4" gutterBottom>
            Dashboard
        </Typography>
            <Box p={4} >



            {/* KPIs */}
            <Grid container justifyContent="space-between" spacing={6} mb={4}>

                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6">Produkte</Typography>
                        <Typography variant="h4">{totalProducts}</Typography>
                    </Paper>

                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6">Gesamtbestand</Typography>
                        <Typography variant="h4">{totalStock}</Typography>
                    </Paper>

                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6">Lagerwert (EK)</Typography>
                        <Typography variant="h4">€{totalValue}</Typography>
                    </Paper>

                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6">Verkaufswert</Typography>
                        <Typography variant="h4">€{totalSaleValue.toFixed(2)}</Typography>
                    </Paper>

            </Grid>
            </Box>
            <Divider />
        <Box p={4}>


            <Grid container spacing={3}>
                {/* Chart 1: Pie */}

                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Produkte pro Kategorie
                        </Typography>
                        <PieChart width={350} height={300}>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                dataKey="value"
                                label
                            >
                                {categoryData.map((_, i) => (
                                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </Paper>


                {/* Chart 2: Bar */}

                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Top 5 Produkte nach Bestand
                        </Typography>
                        <BarChart width={400} height={300} data={topStock}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="quantity" fill="#82ca9d" />
                        </BarChart>
                    </Paper>


                {/* Chart 3: Line */}

                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Verkaufspreise pro Produkt
                        </Typography>
                        <LineChart width={400} height={300} data={salePrices}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="salePrice" stroke="#8884d8" />
                        </LineChart>
                    </Paper>


                {/* Chart 4: Area */}

                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Gewinnpotenzial pro Produkt
                        </Typography>
                        <AreaChart width={400} height={300} data={profitData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="profit" stroke="#82ca9d" fill="#82ca9d" />
                        </AreaChart>
                    </Paper>

            </Grid>
        </Box>
        </>
    );
}
