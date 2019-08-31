
// components/PostCard.js

import React from "react";
import Link from 'next/link'; // add this
import { Card, Avatar } from "antd";

const { Meta } = Card;

const PostCard = ({ id, author, title, description, header_image }) => {
    return (
        <Link href={`/post?id=${id}`} as={`/post/${id}`}>
            <Card
                hoverable={true}
                style={{ width: 300, margin: "0 auto", cursor: 'pointer' }}
                cover={
                    <img
                        alt="example"
                        style={{ height: 200, width: '100%', objectFit: 'cover' }}
                        src={header_image}
                    />
                }
            >
                <Meta
                    avatar={
                        <Avatar size='large' >
                            {author[0].toUpperCase()}
                        </Avatar>
                    }
                    title={title}
                    description={author}
                />
            </Card>
        </Link>
    );
};

export default PostCard;