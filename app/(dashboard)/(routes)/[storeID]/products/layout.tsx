//layout för produkt-pagen

export default function ProductsLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section className={"w-full"}>
        {/* Include shared UI here e.g. a header or sidebar */}
   
        {children}
      </section>
    )
  }