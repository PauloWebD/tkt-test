import React, { useEffect, useState } from 'react';
import { fetchBusinessById } from '../api';
import { useParams } from 'react-router-dom';

export default function Graph() {
    const { id, name, siren } = useParams();
    const [businessData, setBusinessData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const business = await fetchBusinessById(id);
            setBusinessData(business);
            console.log('==>', business);
        } catch (error) {
            console.error(error);
        }
        };

        fetchData();
    }, [id]);

    if (!businessData) {
        return <div>Loading...</div>;
    }

    const { ca, margin, ebitda, loss, year, business } = businessData;

    return (
        <div>
                <p>{name}</p>
                <p>{siren}</p>
            <div>
                <p>CA: {ca}</p>
                <p>Margin: {margin}</p>
                <p>EBITDA: {ebitda}</p>
                <p>Loss: {loss}</p>
                <p>Year: {year}</p>
                <p>Business: {business}</p>
            </div>
        </div>
    );
}
