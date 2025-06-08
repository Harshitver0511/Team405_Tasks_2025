import React from 'react'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
function RecomendSearches() {
        const list = ['Nature', 'Cities', 'Animals', 'Food', 'Travel', 'Flowers', 'Valentine' , 'Random' , 'Mountains', 'Ocean', 'Sky', 'Sunset', 'Wildlife', 'Architecture', 'Portraits', 'Abstract'];
        const navigate = useNavigate();
        const handleClick = (item) => {
            navigate(`/searches?query=${encodeURIComponent(item)}`);
        }

        const genrateColor = () => {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            return `rgb(${r}, ${g}, ${b})`;
        };

    return (
        <div className="recommends flex flex-col items-center mt-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Treanding Searches</h2>
            <div className="flex flex-wrap justify-center gap-2">
                {list.map((item, index) => (
                    <Button
                        key={index}
                        variant="outlined"
                        size="small"
                        sx={{
                            color: genrateColor(),
                            borderColor: genrateColor(),
                            '&:hover': {
                                borderColor: genrateColor(),
                                backgroundColor: '#f0f0f0',
                            },
                        }}
                        onClick={() => handleClick(item)}
                    >
                        {item}
                    </Button>
                ))}
            </div>
        </div>
    )
}

export default RecomendSearches


