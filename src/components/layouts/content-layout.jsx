export function ContentLayout({ title, children }) {
  return (
    <section>
      {title && (
        <h1
          className="text-3xl font-bold mb-6"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {title}
        </h1>
      )}
      {children}
    </section>
  )
}
