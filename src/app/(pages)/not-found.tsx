import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="pt-[64] pb-[64px]">
        <h1>404</h1>
        <p>This page could not be found.</p>
        <Link href="/" className="primary">Come black</Link>
      </div>
    </>
  )
}
