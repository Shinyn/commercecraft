
export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
        
      <div className={"w-full"}>
        {children}
      </div>
    )
  }