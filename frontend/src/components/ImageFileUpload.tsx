import {type SyntheticEvent, type ChangeEvent, useRef, useState } from 'react';
import axios from 'axios';
import {Card, CardMedia, IconButton, InputAdornment, TextField, Typography} from '@mui/material';
import {CameraAlt, PhotoLibrary, UploadFile} from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
interface ChildInputProps {
    value: string;
    onChange: (value: string) => void;
}
const ImageFileUpload = (  Prop:ChildInputProps) => {

    const cameraInputRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const max_file_size = 1000000;
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [imageUrl, setImageUrl] = useState<string>('');
    const isUploaded = Prop.value.startsWith("https://");
    const handleFileChange = (event:ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            if (file.size > max_file_size)
            {
                alert('Bitte wählen Sie eine Datei aus und klein als 1 Mb!');

                setSelectedFile(null);
                event.target.value = '';
            }
            else
            {
                setSelectedFile(file);
                setImageUrl(URL.createObjectURL(file));
                Prop.onChange(URL.createObjectURL(file));
        }
        }
    };

    const handleSubmit = async (event:  SyntheticEvent) => {
        event.preventDefault();
if(!isUploaded){
        const formData = new FormData();

        formData.append('image', selectedFile as File );

        try {
            const response = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setImageUrl(response.data);
            Prop.onChange(response.data);

            console.log('Erfolg! Bild-URL:', response.data);
        } catch (error) {
            console.error('Fehler beim Hochladen:', error);

            alert('Upload fehlgeschlagen!');
        }
    }};

    const handleCameraClick = () => {

        cameraInputRef.current?.click();
    };

    const handleGalleryClick = () => {

        fileInputRef.current?.click();
    };
    return (
        <>
            <TextField
                fullWidth
                label="Bild-URL"
                name="imageUrl"
                value={imageUrl || Prop.value }
                onChange={handleFileChange}
                slotProps={{
                    input: {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={handleCameraClick}
                                edge="end"
                            >
                                <CameraAlt />
                            </IconButton>
                            <IconButton
                                onClick={handleGalleryClick}
                                edge="end"
                            >
                                <PhotoLibrary />
                            </IconButton>
                            <IconButton
                                onClick={handleSubmit}

                                edge="end"
                            >
                                {isUploaded ? <CheckIcon /> : <UploadFile />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}}
            />

            <input
                type="file"
                accept="image/*"
                capture="environment"
                hidden
                ref={cameraInputRef}
                onChange={handleFileChange}
            />
            <input
                type="file"
                accept="image/*"
                hidden
                ref={fileInputRef}
                onChange={handleFileChange}
            />



            {(imageUrl || Prop.value) ? (
                <Card sx={{ maxWidth: 200 }}>
                    <CardMedia
                        component="img"
                        height="200"
                        image={imageUrl || Prop.value}
                        alt="Produkt Vorschau"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/no-image-icon-23485.png";
                        }}/>
                </Card>
            ) : (
                <Typography variant="body2" color="text.secondary">
                    Kein Bild ausgewählt
                </Typography>
            )}


        </>
    );
};

export default ImageFileUpload;