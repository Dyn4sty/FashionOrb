import React from 'react'
import { sections } from './directory.data'
import MenuItem from '../menu-item/menu-item'
import './directory.styles.scss'
class Directory extends React.Component {
    constructor() {
        super()
        this.state = {
            sections: sections
        }
    }
    render() {
        return (
          <div className='directory-menu'>
            {this.state.sections.map(({id, ...otherSectionProps}) => (
              <MenuItem key={id} {...otherSectionProps} />
            ))}
          </div>
        );
      }
    }

export default Directory