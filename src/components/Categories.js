import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { CGoodCard } from '../components/Goods'
//ссылка на категорию
const CategoryMenuItem = ({ category: { _id, name } = {} }) => (
  <li className="CategoryMenuItem">
    <Link to={`/category/${_id}`}>{name}</Link>
  </li>
)
//отображение всех корневых категорий
const RootCategories = ({ categories = [] }) => (
  <ul className="Aside">
    {categories ? (
      categories.map((item) => <CategoryMenuItem category={item} />)
    ) : (
      <img src="https://c.tenor.com/RVvnVPK-6dcAAAAC/reload-cat.gif" />
    )}
  </ul>
)
//коннект
export const CRootCategories = connect((state) => ({
  categories: state.promise.rootCats?.payload || [],
}))(RootCategories)
export const Aside = () => (
  <aside className="Aside">
    <CRootCategories />
  </aside>
)

export const Category = ({
  category: { _id, name, goods, subCategories, parent } = {},
}) => (
  <section className="Category">
    <h1> {name}</h1>

    {subCategories?.length != 0 &&
      subCategories?.map(({ _id, name }) => (
        <Link style={{ flexDirection: 'column' }} to={`/category/${_id}`}>
          Перейти на подкатегорию {name}
        </Link>
      ))}
    {/* {(parent)&&Object?.values(parent)?.length!==0 && console.log('parent', parent.name )}
    {console.log('sub',subCategories)} */}
    {(goods || []).map((item) => (
      <CGoodCard good={item} />
    ))}
    {parent && (
      <Link style={{ flexDirection: 'column' }} to={`/category/${parent?._id}`}>
        Вернуться к родительской категории {parent?.name}
      </Link>
    )}
  </section>
)
export const CCategory = connect((state) => ({
  category: state.promise.catById?.payload || {},
}))(Category)
