import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Breadcrumb = ({
  className,
  items,
  renderAs,
  hrefAttr,
  separator,
  size,
  align,
  ...props
}) => {
  const Element = renderAs;
  return (
    <nav
      {...props}
      className={classnames('breadcrumb', className, {
        [`has-${separator}-separator`]: separator,
        [`is-${size}`]: size,
        [`is-${align}`]: align,
      })}
    >
      <ul>
        {
            items.map((item) => {
              const p = {
                [renderAs === 'a' ? 'href' : hrefAttr]: item.url,
              };
              return (
                <li
                  key={item.url}
                  className={classnames({
                    'is-active': item.active,
                  })}
                >
                  <Element {...p}>
                    {item.name}
                  </Element>
                </li>
              );
            })
          }
      </ul>
    </nav>
  );
};

Breadcrumb.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape({}),
  separator: PropTypes.oneOf(['arrow', 'bullet', 'dot', 'succeeds']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  align: PropTypes.oneOf(['right', 'center']),
  items: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    active: PropTypes.bool,
    name: PropTypes.node,
  })),
  renderAs: PropTypes.oneOfType([
    PropTypes.oneOf(['a']),
    PropTypes.func,
  ]),
  hrefAttr: PropTypes.string,
};

Breadcrumb.defaultProps = {
  items: [],
  hrefAttr: null,
  separator: null,
  renderAs: 'a',
  className: '',
  style: {},
  size: null,
  align: null,
};

export default Breadcrumb;
