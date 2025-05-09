// src/components/FilterBar.jsx
import React from 'react'
import Nav from 'react-bootstrap/Nav'
import '../styles/components/FillterBar.scss';

export default function FilterBar({ types, activeType, onSelectType }) {
  return (
    <Nav
      variant="pills"
      activeKey={activeType}
      onSelect={onSelectType}
      className="filter-bar"
    >
      {types.map((type) => (
        <Nav.Item key={type}>
          <Nav.Link eventKey={type}>{type}</Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  )
}
