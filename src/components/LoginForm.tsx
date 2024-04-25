import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "firebaseApp";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginForm() {
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("로그인에 성공했습니다.");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.code);
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "email") {
      setEmail(value);
      const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (!value?.match(validRegex)) {
        setError("이메일 형식이 올바르지 않습니다.");
      } else {
        setError("");
      }
    }

    if (name === "password") {
      setPassword(value);

      if (value?.length < 8) {
        setError("비밀번호는 8자리 이상으로 입력해주세요");
      } else {
        setError("");
      }
    }
  };

  return (
    <form onSubmit={handleSubmitLogin} className="form form--lg">
      <h1 className="form__title">로그인</h1>
      <div className="form__block">
        <label htmlFor="title">이메일</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          onChange={handleChangeInput}
          value={email}
        />
      </div>
      <div className="form__block">
        <label htmlFor="summary">비밀번호</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          onChange={handleChangeInput}
          value={password}
        />
      </div>
      {error && error?.length > 0 && (
        <div className="form__block">
          <div className="form__error">{error}</div>
        </div>
      )}
      <div className="form__block">
        계정이 없으신가요?
        <Link to="/signup" className="form__link">
          회원가입하기
        </Link>
      </div>
      <div className="form__block">
        <input type="submit" value="로그인" className="form__btn--submit" />
      </div>
    </form>
  );
}
