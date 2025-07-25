import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';

function Cards({ images, loading, error }) {
    const navigate = useNavigate();

    if (loading && images.length === 0) {
        return (
            <LoadingButton
                className="w-full h-24 text-xl"
                loading
                variant="text"
                startIcon={<SaveIcon style={{ fontSize: 32 }} />}
                sx={{ border: 'none', boxShadow: 'none', fontSize: 24, py: 3 }}
            >
                Loading
            </LoadingButton>
        );
    }
    if (error) {
        return <div className="flex justify-center items-center h-screen">Error fetching images</div>
    }
    return (
        <div className="flex flex-col items-center px-4 mt-8">
            <div className="w-full max-w-7xl columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6 align-top">
                {images.map((image) => (
                    <Card
                        key={image.id}
                        className="my-6 break-inside-avoid shadow-md align-top cursor-pointer"
                        onClick={() => navigate(`/images/${image.id}/${encodeURIComponent(image.alt_description || "Random")}`)}
                    >
                        <img
                            src={image.urls.small}
                            alt={image.alt_description || "Placeholder"}
                            className="w-full cursor-pointer object-contain bg-white rounded-t-md"
                        />
                        <CardContent className="w-full flex flex-col items-center">
                            <Typography variant="body2" className="text-gray-600 text-center">
                                {image.alt_description || "Undefined"}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>
            {loading && images.length > 0 && (
                <div className="h-10 flex justify-center items-center w-full">
                    <LoadingButton
                        className="w-full h-24 text-xl"
                        loading
                        variant="text"
                        startIcon={<SaveIcon style={{ fontSize: 32 }} />}
                        sx={{ border: 'none', boxShadow: 'none', fontSize: 24, py: 3 }}
                    >
                        Loading
                    </LoadingButton>
                </div>
            )}
        </div>
    )
}

export default Cards