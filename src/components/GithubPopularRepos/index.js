import {Component} from 'react'

import FilterItem from '../LanguageFilterItem'
import RepoItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
export default class GithubPopularRepos extends Component {
  apiStrings = {
    initial: 'INITIAL',
    loading: 'LOADING',
    success: 'SUCCESS',
    failure: 'FAILURE',
  }

  state = {
    activeLanguage: languageFiltersData[0].language,
    reposList: [],
    apiStatus: this.apiStrings.initial,
  }

  componentDidMount() {
    this.getRepoList()
  }

  toCamelCase = repo => ({
    avatarUrl: repo.avatar_url,
    forksCount: repo.forks_count,
    issuesCount: repo.issues_count,
    starsCount: repo.stars_count,
    name: repo.name,
    id: repo.id,
  })

  onSuccessApiCall = data => {
    const formattedData = data.popular_repos.map(eachRepo =>
      this.toCamelCase(eachRepo),
    )
    this.setState({
      reposList: formattedData,
      apiStatus: this.apiStrings.success,
    })
  }

  getRepoList = async () => {
    this.setState({apiStatus: this.apiStrings.loading})
    const {activeLanguage} = this.state
    const apiQuery = `https://apis.ccbp.in/popular-repos?language=${activeLanguage}`

    const response = await fetch(apiQuery)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccessApiCall(data)
    } else {
      this.setState({apiStatus: this.apiStrings.failure})
    }
  }

  render() {
    const {activeLanguage, reposList, apiStatus} = this.state

    const changeActiveLanguage = language =>
      this.setState({activeLanguage: language}, this.getRepoList)

    return (
      <div className="bg-main">
        <h1 className="heading">Popular</h1>
        <FilterItem
          languages={languageFiltersData}
          selected={activeLanguage}
          onCLickItem={changeActiveLanguage}
        />
        <RepoItem
          apiStrings={this.apiStrings}
          reposList={reposList}
          apiStatus={apiStatus}
        />
      </div>
    )
  }
}
