import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { privateRoute, publicRoutes } from '../route/route'
import { useAppSelector } from '../hooks/redux'

const AppRoute = () => {
  const { isAuth, user } = useAppSelector(state => state.user)
  return (
    <Routes>
      {
        isAuth && user
          ? privateRoute.map(route => <Route key={route.path} {...route}>
            {route.nestedRoute && <Route key={route.nestedRoute.path} {...route.nestedRoute} />}
          </Route>)
          : publicRoutes.map(route => <Route key={route.path} {...route} />)
      }
    </Routes>
  )
}

export default AppRoute