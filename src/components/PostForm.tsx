import { useContext, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "firebaseApp";
import { AuthContext } from "context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function PostForm() {
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "posts"), {
        title,
        summary,
        content,
        createAt: new Date()?.toLocaleDateString(),
        email: user?.email,
      });
      toast?.success("게시글을 생성했습니다.");
      navigate("/");
    } catch (e: any) {
      console.log(e);
      toast?.error(e?.code);
    }
  };

  const handleChagePostInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = e;

    if (name === "title") {
      setTitle(value);
    }

    if (name === "summary") {
      setSummary(value);
    }

    if (name === "content") {
      setContent(value);
    }
  };

  return (
    <form onSubmit={handleSubmitPost} className="form">
      <div className="form__block">
        <label htmlFor="title">제목</label>
        <input
          type="text"
          name="title"
          id="title"
          required
          onChange={handleChagePostInput}
          value={title}
        />
      </div>
      <div className="form__block">
        <label htmlFor="summary">요약</label>
        <input
          type="text"
          name="summary"
          id="summary"
          required
          onChange={handleChagePostInput}
          value={summary}
        />
      </div>
      <div className="form__block">
        <label htmlFor="content">내용</label>
        <textarea
          name="content"
          id="content"
          required
          onChange={handleChagePostInput}
          value={content}
        />
      </div>
      <div className="form__block">
        <input type="submit" value="제출" className="form__btn--submit" />
      </div>
    </form>
  );
}
