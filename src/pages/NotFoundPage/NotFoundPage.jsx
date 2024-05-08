import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <>
      <Link to="/">Go home</Link>
      <h1>Not found page</h1>
    </>
  );
}
