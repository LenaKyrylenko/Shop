import { actionOrders } from '../actions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const LinkDash = ({ onOrders }) => (
  <Link className="Link" to={`/dashboard`} onClick={() => onOrders()}>
    {' '}
    Dashboard{' '}
  </Link>
)

export const CDash = connect(
  (state) => ({
    orders: state.promise.orders?.payload || {},
  }),
  { onOrders: actionOrders },
)(LinkDash)

const Dashboard = ({ orders = [] }) => (
  <section className="Order">
    {orders.length == 0 ? (
      <p className="Strong">
        У вас пока нету заказов или же вы не вошли в систему !
      </p>
    ) : (
      <p className="Strong"> Все ваши заказы: </p>
    )}
    {orders.length != 0 &&
      orders.map(({ _id, total, orderGoods }) => (
        <div>
          <h1 style={{ background: '#FFFFE0', color: '#191970' }}>
            Заказ № {_id}
          </h1>
          {orderGoods.map(({ good, count, price, total }) => (
            <div>
              <h2>Название товара: {good?.name} </h2>
              <img
                src={
                  'http://shop-roles.asmer.fs.a-level.com.ua/' +
                  (good?.images && good?.images[0] ? good?.images[0]?.url : '')
                }
                alt="тут должна быть картинка товара"
              />
              <h3> Количество: {count}</h3>
              <h3> Цена за одну единицу товара: {price}</h3>
              <strong className="Strong"> Общая цена : {total}</strong>
              <h4 style={{ color: '#800080' }}>
                Товар из категории --- {good?.categories[0] && good?.categories[0]?.name}
              </h4>
            </div>
          ))}
          <h2> Общая сумма заказа {total} </h2>
        </div>
      ))}
  </section>
)
export const CDashboard = connect((state) => ({
  orders: state.promise.orders?.payload || [],
}))(Dashboard)
