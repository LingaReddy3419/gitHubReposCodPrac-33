import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, onClickingRepo, activeRepo} = props

  const {id, language} = languageDetails
  const activeBtn = activeRepo === id

  const activeClassName = activeBtn ? 'button active' : 'button'
  const onChangingRepo = () => {
    onClickingRepo(id)
  }
  return (
    <li>
      <button
        type="button"
        onClick={onChangingRepo}
        className={activeClassName}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
