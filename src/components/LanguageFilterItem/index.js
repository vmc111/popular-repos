// Write your code here
import './index.css'

const FilterItem = props => {
  const {selected, languages, onCLickItem} = props

  const renderNavElements = languages.map(eachLanguage => {
    const classToAdd =
      eachLanguage.language === selected ? 'name selected-name' : 'name'
    const onChangeId = () => {
      onCLickItem(eachLanguage.language)
    }
    return (
      <p className={classToAdd} key={eachLanguage.id} onClick={onChangeId}>
        {eachLanguage.language}
      </p>
    )
  })

  return <nav className="nav-bar">{renderNavElements}</nav>
}

export default FilterItem
