import { useState } from "react";
import { useSelector } from "react-redux";
import { Form, Input, Button } from "antd";
import { selectIsAddingComment } from "../../redux/shop/shop.selectors";
// import swal from "@sweetalert/with-react";

const { TextArea } = Input;

const Editor = ({ addCommentStart, user }) => {
  const [content, setContent] = useState("");
  const submitting = useSelector(selectIsAddingComment);
  const handleChange = ({ target: { value } }) => {
    setContent(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.length < 1) {
      return;
    }
    addCommentStart({
      author: user.displayName,
      avatar: user.photoURL,
      content,
      userId: user.id,
      datetime: new Date(),
    });
    setContent("");
  };
  if (!user)
    return (
      <>
        <p>You Must Sign In</p>
      </>
    );
  return (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={handleChange} value={content} />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={handleSubmit}
          type="primary"
        >
          Add Comment
        </Button>
      </Form.Item>
    </>
  );
};

export default Editor;
