/* eslint-disable react/prop-types */
import { Header } from "../components";

export default function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
