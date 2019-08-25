import React from 'react'
import toUpper from 'lodash/toUpper'

const styles = {
  logoText : { fontFamily: 'Montserrat', fontSize: '36px', marginLeft: '8px' }
}

const Logo = ({text}) => {

  return (
    <p style={styles.logoText}>
      {toUpper(text)}
    </p>
  );
};

export default Logo;