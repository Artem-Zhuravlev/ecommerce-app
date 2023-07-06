import React from 'react';
import Resizer from 'react-image-file-resizer'
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";

const FileUpload = ({ values, setValues, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }))
  const fileUploadAndResize = (e) => {
    const files = e.target.files;
    const allUploadedFiles = values.images;

    if (files) {
      setLoading(true)
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          'JPEG',
          100,
          0,
          (uri) => {
            axios.post(`${process.env.REACT_APP_API}/uploadimages`, {image: uri}, {
              headers: {
                authtoken: user ? user.token: ''
              }
            })
              .then(res => {
                setLoading(false);
                allUploadedFiles.push(res.data);
                setValues({ ...values, images: allUploadedFiles });
              })
              .catch(err => {
                setLoading(false);
                console.log('cloudinary upload error', err);
              })
          }, 'base64'
        )
      }
    }
  }

  const removeImage = (public_id) => {
    setLoading(true)
    axios.post(`${process.env.REACT_APP_API}/removeimage`, { public_id }, {
      headers: {
        authtoken: user ? user.token : ''
      }
    })
      .then(res => {
        const { images } = values
        const filteredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, images: filteredImages })
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }

  return (
    <>
      <div className='mb-4'>
        { values.images && values.images.map((image) => (
          <Badge
            count='X'
            key={image.public_id}
            onClick={() => removeImage(image.public_id)}
            style={{ cursor: 'pointer' }}
          >
            <Avatar
              src={image.url}
              size={100}
              shape='square'
              className='me-3'
            />
          </Badge>
        )) }
      </div>
      <div
        className='fileUpload'
      >
        <label
          className="form-label btn btn-primary"
        >
          Choose file

          <input
            type="file"
            multiple
            hidden
            accept='images/*'
            className='form-control'
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  )
}

export default FileUpload;
