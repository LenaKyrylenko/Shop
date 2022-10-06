import { actionCartAdd } from '../actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export const GoodCard = ({ good, onCartAdd, cart }) => (
  <>
    <div>
      <h2> {good.name}</h2>

      <img
        src={
          'http://shop-roles.asmer.fs.a-level.com.ua/' +
          (good.images && good.images[0] ? good.images[0].url : '')
        }
      />
      <div>Цена: {good.price}</div>

      <button className="Btn" onClick={() => onCartAdd(good)}>
        Add
      </button>
      {cart[good._id] && (
        <strong className="Strong">
          Выбранное количество: {cart[good._id].count}
        </strong>
      )}
    </div>
  </>
)
const LinkGood = ({ good, onCartAdd, cart }) => (
  <>
    <GoodCard good={good} onCartAdd={onCartAdd} cart={cart} />
    <Link to={`/good/${good._id}`}>Перейти на товар {good.name}</Link>
  </>
)
export const CGoodCard = connect((state) => ({ cart: state.cart || {} }), {
  onCartAdd: actionCartAdd,
})(LinkGood)
const GoodWithCategory = ({ good, onCartAdd, cart = {} }) => (
  <>
    <GoodCard good={good} onCartAdd={onCartAdd} cart={cart} />
    <h1>
      {good?.categories && good.categories[0] ? good.categories[0].name : ' '}
    </h1>
    <strong> Описание товара: </strong>
    <h3 className="Block">{good.description}</h3>
    <Link
      to={`/category/${good?.categories && good.categories[0] ? good.categories[0]._id : '' }`}>
      Перейти назад
      {good?.categories && good.categories[0]
        ? good.categories[0].name
        : ' nety'}
    </Link>
  </>
)

export const CGood = connect(
  (state) => ({
    good: state.promise.goodById?.payload || {},
    cart: state.cart || {},
  }),
  { onCartAdd: actionCartAdd },
)(GoodWithCategory)
