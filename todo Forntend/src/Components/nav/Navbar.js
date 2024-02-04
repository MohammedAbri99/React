import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ChangeLang from '../../store/Action/LanguageAction/LanguageAction'
export default function Navbar() {
  const lang   = useSelector((state) =>state.language.lang)
  const dispatch = useDispatch();
  // ChangeLang(){

  // }
  const ChangeLanguage = (payload)=>{
    dispatch(ChangeLang(payload))
  }

  return (
    <>
      <nav className="navbar navbar-expand-sm bg-light">
        <div className="container-fluid pe-3">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/listtodo">Todos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " to='/Addtodo'>AddTodo</Link>
            </li>
          </ul>
          <button type="button" onClick={lang=="en" ?  ()=>ChangeLanguage("ar") : ()=>ChangeLanguage("en") } className="btn btn-primary position-relative">
            Language
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {lang}
              <span className="visually-hidden">unread messages</span>
            </span>
          </button>
        </div>
      </nav>
    </>
  )
}
