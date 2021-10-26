import React, { useState, useEffect } from "react";

import api from '../config/configApi';

const GetImages = () => {
    const [data, setData] = useState([])
    const [url, setUrl] = useState()

    const getImages = async () => {

        await api.get("/list-image")
            .then((response) => {
                // console.log(response.data)
                setData(response.data.images)
                setUrl(response.data.url)
            }).catch((err) => {
                console.log(err.response)
            })
    }

    useEffect(() => {
        getImages();
    }, [])


    return (
        <>
            <h1>Listar Imagens</h1>
            {data.map(image => (
                <div key={image.id}>
                    <span>{image.id}</span><br />
                    <span>{image.image}</span><br />
                    <img src={url + image.image} alt={image.id} height="120" />
                    <hr />
                </div>
            ))}
        </>
    );
}

export default GetImages;