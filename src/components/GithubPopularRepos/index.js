import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiConstantStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    reposList: [],
    language: languageFiltersData[0].id,
    apiStatus: apiConstantStatus.initial,
    activeRepo: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getRepos()
  }

  getRepos = async () => {
    this.setState({apiStatus: apiConstantStatus.inProgress})
    const {language} = this.state

    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${language}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const fetchedData = data.popular_repos
    if (response.ok === true) {
      const updatedData = fetchedData.map(eachRepo => ({
        avatarUrl: eachRepo.avatar_url,
        forksCount: eachRepo.forks_count,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        name: eachRepo.name,
        starsCount: eachRepo.stars_count,
      }))
      this.setState({
        reposList: updatedData,
        apiStatus: apiConstantStatus.success,
      })
    }
  }

  onClickingRepo = id => {
    this.setState({language: id, activeRepo: id}, this.getRepos)
  }

  renderReposList = () => {
    const {reposList} = this.state
    return (
      <ul className="repos-container">
        {reposList.map(eachItem => (
          <RepositoryItem key={eachItem.id} repoDetails={eachItem} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="fail-image"
      />
      <p className="fail">Something Went Wrong</p>
    </div>
  )

  renderLoaderView = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderResults = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstantStatus.success:
        return this.renderReposList()
      case apiConstantStatus.inProgress:
        return this.renderLoaderView()

      case apiConstantStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {activeRepo} = this.state
    return (
      <div className="main-container">
        <h1 className="heading">Popular</h1>
        <ul className="languages-container">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              key={eachItem.id}
              languageDetails={eachItem}
              onClickingRepo={this.onClickingRepo}
              activeRepo={activeRepo}
            />
          ))}
        </ul>
        {this.renderResults()}
      </div>
    )
  }
}

export default GithubPopularRepos
