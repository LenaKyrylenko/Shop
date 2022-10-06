import { actionCartAdd, actionCartDelete, actionCartChange, actionCartClear, actionOrder} from '../actions'
import { connect } from 'react-redux'
import { CGoodCard } from '../components/Goods'
const Cart = ({ cart = {}, onCartChange, onCartAdd, onCartDelete, onCartClear, onOrder}) => {
  return (
    <section className="Cart">
      {Object.keys(cart).length == 0 ? (
        <h1> У вас пустая корзина! Выберите товарчики!</h1>) :
        ( <h1> Ваши товары:</h1>)}
      {Object.values(cart).map(({ good, count }) => (
        <>
          <CGoodCard good={good} cart={cart} onCartAdd={onCartAdd} />

          <button
            className="Btn"
            style={{ background: '#FF6347', color: 'white' }}
            onClick={() => onCartDelete(good)}>
            Delete
          </button>
          <label> Изменить количество выбранного товара : </label>
          <input
            className=""
            type="number"
            min="0"
            value={count}
            onChange={(e) => onCartChange(good, e.target.value)}/>
          <h3> Общая сумма: {good.price * count}</h3>
        </>
      ))}
      {Object.keys(cart).length != 0 && (
        <>
          <button
            className="Btn"
            style={{ width: '100%', background: '#DC143C', color: 'white' }}
            onClick={() => onCartClear()}>
            Clear all goods
          </button>

          <button
            className="Btn"
            style={{ width: '100%', background: '#FFD700', color: 'white' }}
            onClick={() => {
              alert('Ваш заказ оформлен! Спасибо что выбираете наш магазин!')
              onOrder() }}>
            Make order
          </button>
        </>
      )}
    </section>
  )
}
export const CCart = connect(
  (state) => ({
    cart: state.cart || {},
  }),
  {
    onCartAdd: actionCartAdd,
    onCartDelete: actionCartDelete,
    onCartChange: actionCartChange,
    onCartClear: actionCartClear,
    onOrder: actionOrder,
  },
)(Cart)
