import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import canUseDOM from '../../services/can-use-dom';
import Brand from './components/brand';
import Burger from './components/burger';
import Menu from './components/menu';
import Item from './components/item';
import Dropdown from './components/dropdown';
import Divider from './components/divider';
import Link from './components/link';
import Container from './components/container';
import CONSTANTS from '../../constants';
import { ShowContext } from './context';
import Element from '../element';
import modifiers from '../../modifiers';

const colors = [null].concat(Object.keys(CONSTANTS.COLORS).map(key => CONSTANTS.COLORS[key]));

let htmlClass = '';

export const getHtmlClasses = () => htmlClass;

class Navbar extends React.PureComponent {
  static propTypes = {
    ...modifiers.propTypes,
    children: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.shape({}),
    transparent: PropTypes.bool,
    renderAs: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    fixed: PropTypes.oneOf(['top', 'bottom']),
    color: PropTypes.oneOf(colors),
    active: PropTypes.bool,
  }

  static defaultProps = {
    ...modifiers.defaultProps,
    children: null,
    className: undefined,
    style: undefined,
    renderAs: 'nav',
    transparent: false,
    active: false,
    fixed: undefined,
    color: undefined,
  }

  state = {}

  componentWillUnmount() {
    const { fixed } = this.props;
    window.document.querySelector('html').classList.remove(`has-navbar-fixed-${fixed}`);
  }

  static getDerivedStateFromProps(nextProps) {
    if (!canUseDOM) {
      return null;
    }
    const html = window.document.querySelector('html');
    html.classList.remove('has-navbar-fixed-top');
    html.classList.remove('has-navbar-fixed-bottom');
    if (nextProps.fixed) {
      htmlClass = `has-navbar-fixed-${nextProps.fixed}`;
      html.classList.add(`has-navbar-fixed-${nextProps.fixed}`);
    }
    return null;
  }

  render() {
    const {
      children,
      className,
      fixed,
      transparent,
      color,
      active,
      ...props
    } = this.props;

    return (
      <ShowContext.Provider value={active}>
        <Element
          {...props}
          role="navigation"
          className={classnames('navbar', modifiers.classnames(props), className, {
            'is-transparent': transparent,
            [`is-fixed-${fixed}`]: fixed,
            [`is-${color}`]: color,
          })}
        >
          {children}
        </Element>
      </ShowContext.Provider>
    );
  }
}

Navbar.Brand = Brand;
Navbar.Burger = Burger;
Navbar.Menu = Menu;
Navbar.Item = Item;
Navbar.Dropdown = Dropdown;
Navbar.Link = Link;
Navbar.Divider = Divider;
Navbar.Container = Container;

export default Navbar;
