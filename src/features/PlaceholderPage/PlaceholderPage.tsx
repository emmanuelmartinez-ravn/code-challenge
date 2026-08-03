import './PlaceholderPage.css'

function PlaceholderPage({ name }: { readonly name: string }) {
  return (
    <section className="placeholder-page display display--m display--bold">
      <p>{`This is a placeholder for ${name}`.toUpperCase()}</p>
    </section>
  )
}

export default PlaceholderPage
