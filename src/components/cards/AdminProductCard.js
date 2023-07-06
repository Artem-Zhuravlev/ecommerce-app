import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from "antd"
import card from '../../images/default-card.png'
import { EditOutlined,  DeleteOutlined } from '@ant-design/icons'
const  { Meta } = Card

const AdminProductCard = ({ product, handleRemove }) => {
  const {
    title,
    description,
    images,
    slug
  } = product
  return (
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : card}
          style={{ height: '150px', objectFit: 'cover' }}
          className="m-1"
        />
      }
      actions={[
        <Link
          to={`/admin/product/${slug}`}
        >
          <EditOutlined
            className='text-warning'
          />
        </Link>,
        <DeleteOutlined
          className='text-danger'
          onClick={() => handleRemove(slug)}
        />
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 40) }`}
      />
      {title}
    </Card>
  )
}

export default AdminProductCard
