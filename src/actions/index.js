
export const actionCartAdd = (good, count = 1) => ({ type: 'CART_ADD', good, count })
export const actionCartChange = (good, count = 1) => ({
  type: 'CART_CHANGE',
  good,
  count,
})
export const actionCartDelete = (good) => ({ type: 'CART_DELETE', good })
export const actionCartClear = () => ({ type: 'CART_CLEAR' })

export const actionAuthLogin = (token) => ({ type: 'AUTH_LOGIN', token })
export const actionAuthLogout = () => ({ type: 'AUTH_LOGOUT' })


export const getGQL = (url) => (query, variables) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(localStorage.authToken
        ? { Authorization: 'Bearer ' + localStorage.authToken }
        : {}),
    },
    body: JSON.stringify({ query, variables }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.data) {
        return Object.values(data.data)[0]
      } else {
        throw new Error(JSON.stringify(data.errors))
      }
    })

const backendURL = 'http://shop-roles.asmer.fs.a-level.com.ua'

export const gql = getGQL(backendURL + '/graphql')

export const actionPending = (name) => ({ type: 'PROMISE', name, status: 'PENDING' })
export const actionFulfilled = (name, payload) => ({
  type: 'PROMISE',
  name,
  status: 'FULFILLED',
  payload,
})
export const actionRejected = (name, error) => ({
  type: 'PROMISE',
  name,
  status: 'REJECTED',
  error,
})

export const actionCatById = (_id) =>
  actionPromise(
    'catById',
    gql(
      `query catById($q: String){
        CategoryFindOne(query: $q){
            _id name goods {
                _id name price images {
                    url
                }

            }
            subCategories {
                _id name
                }
                parent {
                 _id name
                }
        }
    }`,
      { q: JSON.stringify([{ _id }]) },
    ),
  )
  export const actionPromise = (name, promise) => async (dispatch) => {
  dispatch(actionPending(name))
  try {
    let payload = await promise
    dispatch(actionFulfilled(name, payload))
    return payload
  } catch (error) {
    dispatch(actionRejected(name, error))
  }
}

export const actionRootCats = () =>
  actionPromise(
    'rootCats',
    gql(`query {
        CategoryFind(query: "[{\\"parent\\":null}]"){
            _id name
        }
    }`),
  )

  export const actionFullLogin = (login, password) => async (dispatch) => {
  let token = await dispatch(
    actionPromise(
      'auth',
      gql(
        ` query login($login:String, $password:String){
            login(login:$login, password:$password)} `,
        { login, password },
      ),
    ),
  )
  if (token) {
    dispatch(actionAuthLogin(token))
  }
}
export const actionRegister = (login, password) =>
  actionPromise(
    'register',
    gql(
      `mutation register($login: String, $password: String) {
                UserUpsert(user: {login: $login, password: $password, nick: $login}) {
                  _id login
                }
              }`,
      { login: login, password: password },
    ),
  )
  export const actionGoodById = (_id) =>
  actionPromise(
    "goodById",
    gql(
      `query goodById($good: String){
          GoodFindOne(query: $good){
              _id name description price categories{_id name owner{_id login nick}}images{url}
    }
  }`,
      { good: JSON.stringify([{ _id }]) }
    )
  );
  export const actionFullRegister = (login, password) => async (dispatch) => {
  let tokenCheck = await dispatch(actionRegister(login, password))

  if (tokenCheck?.login === login) {
    dispatch(actionFullLogin(login, password))
  }
}

export const actionOrders = () =>
  actionPromise(
    "orders",
    gql(`
  query orders {
    OrderFind(query: "[{}]") {
      _id
      total
      createdAt
      orderGoods {
        price
        count
        total
        good {
          name images {
            url
        }
          categories {
            name
          }
        }
      }
    }
  }`)
  );

  
export const actionOrder = () => async (dispatch, getState) => {
  let { cart } = getState();
  const orderGoods = Object.entries(cart).map(([_id, { count }]) => ({
    good: { _id },
    count,
  }));
  let result = await dispatch(
    actionPromise(
      "order",
      gql(
        `
                    mutation newOrder($order:OrderInput){
                      OrderUpsert(order:$order)
                        { _id total }
                    }
            `,
        { order: { orderGoods: orderGoods } }
      )
    )
  );
  if (result?._id) {
    dispatch(actionCartClear());
  }
};
