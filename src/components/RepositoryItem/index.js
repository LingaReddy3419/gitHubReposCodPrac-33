import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {avatarUrl, starsCount, issuesCount, name, forksCount} = repoDetails

  return (
    <li className="repo-item-container">
      <img src={avatarUrl} alt="repo" className="image" />
      <p className="name">{name}</p>
      <div className="counts-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icon"
        />
        <p className="count">{starsCount} stars</p>
      </div>
      <div className="counts-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icon"
        />
        <p className="count">{forksCount} forks</p>
      </div>
      <div className="counts-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="icon"
        />
        <p className="count">{issuesCount} open issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem
