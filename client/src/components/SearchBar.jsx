// src/components/SearchBar.jsx

import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import { FaSearch } from 'react-icons/fa'

export default function SearchBar({ value, onChange }) {
  return (
    <div className="mb-4 search-bar">
      <InputGroup className="search-bar__group">
        <InputGroup.Text id="search-addon" className="search-bar__icon">
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="搜尋商品"
          aria-label="搜尋茶飲"
          aria-describedby="search-addon"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="search-bar__input"
        />
      </InputGroup>
    </div>
  );
}
