import React from "react";
import { Comment, List, Avatar } from "antd";
import moment from "moment";
import { UserOutlined } from "@ant-design/icons";

const CommentList = ({ comments }) => {
  return (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
      itemLayout="horizontal"
      renderItem={({ datetime, author, content, avatar }) => {
        console.log(author);

        return (
          <Comment
            datetime={moment
              .unix(datetime?.seconds || Math.floor(datetime.getTime() / 1000))
              .fromNow()}
            author={author}
            avatar={
              <Avatar src={avatar} icon={<UserOutlined />} alt={author} />
            }
            content={content}
          />
        );
      }}
    />
  );
};

export default CommentList;
