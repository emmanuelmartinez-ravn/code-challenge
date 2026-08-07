import './PlaceholderPage.css'

// TODO: this component exists for mockup purposes to stand in for unbuilt pages
function PlaceholderPage({ name }: { readonly name: string }) {
  return (
    <section className="placeholder-page display display--xs display--bold">
      <h1>{`This is a placeholder for ${name}`.toUpperCase()}</h1>
    </section>
  )
}

export default PlaceholderPage
