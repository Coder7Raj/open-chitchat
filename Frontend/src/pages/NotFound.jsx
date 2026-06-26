import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <img
        src="/notFound.webp"
        alt="404 Not Found"
        className="w-80 max-w-full"
      />

      <h1 className="mt-6 text-4xl font-bold">404</h1>

      <h2 className="mt-2 text-2xl font-semibold">Page Not Found</h2>

      <p className="mt-2 max-w-md text-base-content/70">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <Link
        to="/"
        className="z-10 mt-6 rounded-lg bg-primary px-5 py-3 font-medium text-primary-content transition hover:opacity-90"
      >
        Go Home
      </Link>
    </div>
  );
}
