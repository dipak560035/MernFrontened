export default function Container({ children, className }) {
  return <div className={`mx-auto max-w-[1440px] px-4 sm:px-6 ${className || ""}`}>{children}</div>;
}
