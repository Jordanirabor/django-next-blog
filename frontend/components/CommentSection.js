
// components/CommentSection.js

import { Comment, Avatar, Form, Button, List, Input } from "antd";

const TextArea = Input.TextArea;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    itemLayout="horizontal"
    renderItem={comment => (
      <Comment
        avatar={
          <Avatar alt={comment.author}>
            {comment.author[0].toUpperCase()}
          </Avatar>
        }
        {...comment}
      />
    )}
  />
);

const CommentEditor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

const CommentSection = props => {
  const {
    comments,
    commentText,
    onChange,
    onSubmit,
    submitting,
    user
  } = props;
  return (
    <div>
      <Comment
        avatar={<Avatar alt={user}>{user && user[0].toUpperCase()}</Avatar>}
        content={
          <CommentEditor
            onChange={onChange}
            onSubmit={onSubmit}
            submitting={submitting}
            value={commentText}
          />
        }
      />
      {comments.length > 0 && <CommentList comments={comments} />}
    </div>
  );
};

export default CommentSection;