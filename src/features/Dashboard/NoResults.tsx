import './NoResults.css'

function NoResults({ isSearching }: { readonly isSearching: boolean }) {
  return (
    <div className="no-results">
      <p className="body body--l">
        {isSearching ? 'No tasks match your search.' : 'There are no tasks yet.'}
      </p>
    </div>
  )
}

export default NoResults
