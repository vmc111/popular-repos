// Write your code here
import Loader from 'react-loader-spinner'

import './index.css'

const starsLogo = 'https://assets.ccbp.in/frontend/react-js/stars-count-img.png'

const RepoItem = props => {
  const {reposList, apiStatus, apiStrings} = props
  const successView = (
    <ul className="sucess-container">
      {reposList.map(repo => (
        <li key={repo.id} className="repo-item">
          <img src={repo.avatarUrl} alt={repo.name} className="logo" />
          <p className="repo-name">{repo.name}</p>
          <div className="stats">
            <div className="icon-value-container">
              <img alt="star" src={starsLogo} className="icon" />
              <p className="value">{repo.starsCount} stars</p>
            </div>
            <div className="icon-value-container">
              <img
                alt="forks"
                src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png "
                className="icon"
              />
              <p className="value">{repo.forksCount} forks</p>
            </div>
            <div className="icon-value-container">
              <img
                alt="issues"
                src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png "
                className="icon"
              />
              <p className="value">{repo.issuesCount} open issues</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )

  const failureView = (
    <div className="failure-container">
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-text">Something Went Wrong</h1>
    </div>
  )

  const loadingView = (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  switch (apiStatus) {
    case apiStrings.success:
      return successView
    case apiStrings.failure:
      return failureView
    case apiStrings.loading:
      return loadingView
    default:
      return null
  }
}

export default RepoItem
