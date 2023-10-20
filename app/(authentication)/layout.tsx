//Common layout for sign-in and sign out, containing containers for clerc-content
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center h-full">
      {children}</div>
  );
}
