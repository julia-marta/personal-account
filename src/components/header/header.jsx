import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {Link} from "react-router-dom";
import {BoxArrowRight} from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import {logOut, clearState} from '../../store/slice';
import Logo from '../logo/logo';
import {AppRoute} from '../../const';

const {ROOT} = AppRoute;

const Header = ({isMain}) => {

  const dispatch = useDispatch();
  const  history = useHistory();

  const user = useSelector((state) => state.authorizedUser);

  const handleLogOut = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(logOut());
      dispatch(clearState());
      history.push(ROOT);
    }, [dispatch, history]
  )

  return (
    <header className="header">
      {isMain ?
        <Logo /> :
        <Link to={ROOT}><Logo /></Link>
      }
      <h2 className="header__title">Personal Account</h2>
      <div className="header__info">
        {user.name ?
        <div className="header__user">
          <p className="header__title header__title--sub">{user.name}</p>
          <img src={`img/${user.avatar}`} className="header__avatar" width="40" height="40" alt="avatar" />
          <Link className="header__link" to={ROOT} onClick={handleLogOut} aria-label="Exit"><BoxArrowRight /></Link>
        </div> :
        <p className="header__title header__title--sub">test app</p>}
      </div>
    </header>
  );
};

Header.propTypes = {
  isMain: PropTypes.bool,
};

export default Header;
